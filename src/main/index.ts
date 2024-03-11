import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import { isEmpty, isNil } from 'lodash';
import mongoose from 'mongoose';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
import { CartRepository } from './db/repositories/cart-repository';
import { MonthlyDebtsRepository } from './db/repositories/monthly-debts-repository';
import { PersonRepository } from './db/repositories/person-repository';
import { Cart, CartModel } from './db/schemas/cart-schema';
import { MonthlyDebtsModel } from './db/schemas/monthly-debts-schema';
import { Person, PersonModel } from './db/schemas/person-schema';
import bwipjs from 'bwip-js';
import { writeFile } from 'fs';

const monthlyDebtsRepository = new MonthlyDebtsRepository(MonthlyDebtsModel);
const cartRepository = new CartRepository(CartModel);
const personRepository = new PersonRepository(PersonModel);

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  mongoose
    .connect('mongodb://127.0.0.1:27017/cart-park')
    .then(() => {
      console.log('Connected to MongoDB');
      electronApp.setAppUserModelId('com.electron');

      // Default open or close DevTools by F12 in development
      // and ignore CommandOrControl + R in production.
      // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
      });
      // create person action
      ipcMain.on('create-person', async (event, person: Person) => {
        try {
          await personRepository.create(person);
          event.reply('create-person-reply', true);
        } catch (error) {
          event.reply('create-person-reply', false);
        }
      });

      ipcMain.on('create-cart', async (event, cart: Cart) => {
        try {
          const cartQuantity = await cartRepository.getGetQuantity();

          cart.cartCode = `CARRINHO-${cartQuantity + 1}`;

          const person = await personRepository.findByDocument(
            cart.personDocument,
          );

          if (isNil(person)) return event.reply('create-cart-reply', false);

          await cartRepository.create(cart);
          event.reply('create-cart-reply', true);
        } catch (error) {
          event.reply('create-cart-reply', false);
        }
      });

      ipcMain.on('list-cart', async (event, personDocument: string) => {
        try {
          const person = await personRepository.findByDocument(personDocument);

          if (isNil(person)) return event.reply('list-cart-reply', []);

          const carts = await cartRepository.findByUserDocument(personDocument);
          event.reply(
            'list-cart-reply',
            carts.map((cart) => ({
              id: cart.id,
              personDocument: cart.personDocument,
              deleted: cart.deleted,
              cartCode: cart.cartCode,
              name: cart.name,
              active: cart.active,
              createdAt: cart.createdAt,
              updatedAt: cart.updatedAt,
            })),
          );
        } catch (error) {
          event.reply('list-cart-reply', []);
        }
      });

      ipcMain.on('enable-cart', async (event, cartId: string) => {
        try {
          const cart = await cartRepository.enable(cartId);

          if (isNil(cart)) return event.reply('enable-cart-reply', false);

          const monthlyDebt = await monthlyDebtsRepository.create({
            cartId: cartId,
          });

          if (isNil(monthlyDebt))
            return event.reply('enable-cart-reply', false);
          return event.reply('enable-cart-reply', true);
        } catch (error) {
          event.reply('enable-cart-reply', false);
        }
      });

      ipcMain.on('disable-cart', async (event, cartId: string) => {
        try {
          const debtsList = await monthlyDebtsRepository.findByCartId(cartId);

          if (isEmpty(debtsList))
            return event.reply('disable-cart-reply', false);

          const monthsInDebt = debtsList.filter((debt) =>
            isNil(debt.paymentDate),
          );

          if (isEmpty(monthsInDebt)) {
            const cart = await cartRepository.disable(cartId);
            if (isNil(cart)) return event.reply('disable-cart-reply', false);
            return event.reply('disable-cart-reply', true);
          }

          return event.reply('disable-cart-reply', false);
        } catch (error) {
          event.reply('disable-cart-reply', false);
        }
      });

      ipcMain.on('pay-monthly-debts', async (event, ids: string[]) => {
        try {
          for (const id of ids) {
            const debt = await monthlyDebtsRepository.findById(id);
            if (isNil(debt))
              return event.reply('pay-monthly-debts-reply', false);

            if (isNil(debt.paymentDate)) {
              await monthlyDebtsRepository.setPaymentDate(id, new Date());
            }
          }

          return event.reply('pay-monthly-debts-reply', true);
        } catch (error) {
          console.log(error);
          event.reply('pay-monthly-debts-reply', false);
        }
      });

      ipcMain.on('get-monthly-debts', async (event, cartId: string) => {
        try {
          const debts = await monthlyDebtsRepository.findByCartId(cartId);
          if (isNil(debts)) return event.reply('get-monthly-debts-reply', []);

          return event.reply(
            'get-monthly-debts-reply',
            debts.map((debt) => ({
              id: debt.id,
              paymentDate: debt.paymentDate,
              createdAt: debt.createdAt,
            })),
          );
        } catch (error) {
          event.reply('get-monthly-debts-reply', []);
        }
      });

      ipcMain.on('get-cart', async (event, cartCode: string) => {
        try {
          const cart = await cartRepository.findByCode(cartCode);

          if (isNil(cart)) return event.reply('get-cart-reply', false);

          return event.reply('get-cart-reply', {
            id: cart.id,
            personDocument: cart.personDocument,
            deleted: cart.deleted,
            cartCode: cart.cartCode,
            name: cart.name,
            active: cart.active,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
          });
        } catch (error) {
          event.reply('get-cart-reply', false);
        }
      });

      ipcMain.on('delete-cart', async (event, cartId: string) => {
        try {
          const debtsList = await monthlyDebtsRepository.findByCartId(cartId);

          if (isEmpty(debtsList))
            return event.reply('delete-cart-reply', false);

          const monthsInDebt = debtsList.filter((debt) =>
            isNil(debt.paymentDate),
          );

          if (isEmpty(monthsInDebt)) {
            await cartRepository.deleteCart(cartId);
            return event.reply('delete-cart-reply', true);
          }
          return event.reply('delete-cart-reply', false);
        } catch (error) {
          console.log(error);
          event.reply('delete-cart-reply', false);
        }
      });

      ipcMain.on('generate-barcode', async (event, cartCode: string) => {
        bwipjs.toBuffer(
          {
            bcid: 'code128', // Barcode type
            text: cartCode, // Text to encode
            scale: 3, // 3x scaling factor
            height: 10, // Bar height, in millimeters
            includetext: true, // Show human-readable text
            textxalign: 'center', // Always good to set this
          },
          function (err, png) {
            if (err) {
              // `err` may be a string or Error object
            } else {
              writeFile('./barcode/out.png', png, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const win = new BrowserWindow();
                win.loadFile('./barcode/out.png');

                const options = {
                  silent: false,
                  deviceName: 'My-Printer',
                  pageRanges: [
                    {
                      from: 0,
                      to: 1,
                    },
                  ],
                };
                win.webContents.print(options, (success, errorType) => {
                  if (!success) console.log(errorType);
                });
              });
            }
          },
        );
      });

      ipcMain.on('get-person-by-document', async (event, document: string) => {
        try {
          const person = await personRepository.findByDocument(document);

          if (isNil(person))
            return event.reply('get-person-by-document-reply', undefined);

          event.reply('get-person-by-document-reply', {
            id: person.id,
            name: person.name,
            document: person.document,
            telephone: person.telephone,
          });
        } catch (error) {
          event.reply('get-person-by-document-reply', undefined);
        }
      });

      createWindow();

      app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      // Handle the error
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

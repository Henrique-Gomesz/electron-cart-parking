import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import mongoose from 'mongoose';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
import { PersonRepository } from './db/repositories/person-repository';
import { Person, PersonModel } from './db/schemas/person-schema';
import { Cart, CartModel } from './db/schemas/cart-schema';
import { CartRepository } from './db/repositories/cart-repository';
import { MonthlyDebtsRepository } from './db/repositories/monthly-debts-repository';
import { MonthlyDebtsModel } from './db/schemas/monthly-debts-schema';
import { isNil } from 'lodash';

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
app.whenReady().then(() => {
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
            carts.map((cart) => cart.toObject()),
          );
        } catch (error) {
          event.reply('list-cart-reply', []);
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

import { ListCart } from '@renderer/entities/cart';
import { useEffect, useState } from 'react';

type UseGetCartByIdAction = {
  getCartAction: (cartCode: string) => void;
  cart: ListCart;
};

const DEFAULT_CART: ListCart = {
  id: '',
  personDocument: '',
  deleted: false,
  cartCode: '',
  name: '',
  active: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useGetCartByCodeAction = (): UseGetCartByIdAction => {
  const [cart, setCart] = useState<ListCart>(DEFAULT_CART);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'get-cart-reply',
      (_event, reply: ListCart) => {
        console.log(reply);
        setCart(reply);
      },
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners('get-cart-reply');
    };
  }, []);

  function getCartAction(cartCode: string): void {
    window.electron.ipcRenderer.send('get-cart', cartCode);
  }

  return {
    cart,
    getCartAction,
  };
};

import { ListCart } from '@renderer/entities/cart';
import { useEffect, useState } from 'react';

type UseListCartAction = {
  getCartsAction: (personDocument: string) => void;
  carts: ListCart[];
};

export const useListCartAction = (): UseListCartAction => {
  const [carts, setCarts] = useState<ListCart[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'list-cart-reply',
      (_event, reply: ListCart[]) => {
        setCarts(reply);
      },
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners('list-cart-reply');
    };
  }, []);

  function getCartsAction(personDocument: string): void {
    window.electron.ipcRenderer.send('list-cart', personDocument);
  }

  return {
    carts,
    getCartsAction,
  };
};

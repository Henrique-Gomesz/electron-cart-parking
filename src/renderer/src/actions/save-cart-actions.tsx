import { SaveCart } from '@renderer/entities/cart';
import { useEffect, useState } from 'react';

type UseSaveCartAction = {
  saveCartAction: (person: SaveCart) => void;
  reply: boolean | undefined;
};

export const useSaveCartAction = (): UseSaveCartAction => {
  const [reply, setReply] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'create-cart-reply',
      (_event, reply: boolean) => {
        saveCartReply(reply);
      },
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners('create-cart-reply');
    };
  }, []);

  function saveCartAction(cart: SaveCart): void {
    setReply(undefined);
    window.electron.ipcRenderer.send('create-cart', cart);
  }

  function saveCartReply(reply: boolean): void {
    setReply(reply);
  }

  return {
    saveCartAction,
    reply,
  };
};

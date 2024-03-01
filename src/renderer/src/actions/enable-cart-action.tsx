import { useEffect, useState } from 'react';

type EnableCartAction = {
  enableCart: (cartId: string) => void;
  reply: boolean;
};



export const useEnableCartAction = (): EnableCartAction => {
  const [reply, setReply] = useState<boolean>(false);
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'enable-cart-reply',
      (_event, reply: boolean) => {
        setReply(reply)
      },
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('enable-cart-reply');
    };
  }, []);

  function enableCart(cartId: string): void {
    window.electron.ipcRenderer.send('enable-cart', cartId);
  }

  return {
    enableCart,
    reply,
  };
};

import { useEffect, useState } from 'react';

type EnableCartAction = {
  disableCart: (cartId: string) => void;
  reply: boolean;
};

export const useDisableCartAction = (): EnableCartAction => {
  const [reply, setReply] = useState<boolean>(false);
  useEffect(() => {
    window.electron.ipcRenderer.on(
      'disable-cart-reply',
      (_event, reply: boolean) => {
        setReply(reply);
      },
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('disable-cart-reply');
    };
  }, []);

  function disableCart(cartId: string): void {
    window.electron.ipcRenderer.send('disable-cart', cartId);
  }

  return {
    disableCart,
    reply,
  };
};

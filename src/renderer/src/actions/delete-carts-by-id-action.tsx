import { useEffect, useState } from 'react';

type UseDeleteCartByIdAction = {
  deleteCartAction: (cartCode: string) => void;
  reply: boolean | undefined;
};

export const useDeleteCartByIdAction = (): UseDeleteCartByIdAction => {
  const [reply, setReply] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'delete-cart-reply',
      (_event, reply: boolean) => {
        setReply(reply);
      },
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners('delete-cart-reply');
    };
  }, []);

  function deleteCartAction(cartId: string): void {
    window.electron.ipcRenderer.send('delete-cart', cartId);
  }

  return {
    reply,
    deleteCartAction,
  };
};

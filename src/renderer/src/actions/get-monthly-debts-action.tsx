import { ListMonthlyDebts } from '@renderer/entities/monthly-debts';
import { useEffect, useState } from 'react';

type GetMonthlyDebts = {
  getMonthlyDebts: (cartId: string) => void;
  debts: ListMonthlyDebts[];
};

export const useGetMonthlyDebtsAction = (): GetMonthlyDebts => {
  const [debts, setDebts] = useState<ListMonthlyDebts[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'get-monthly-debts-reply',
      (_event, reply: ListMonthlyDebts[]) => {
        setDebts([...reply]);
      },
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('get-monthly-debts-reply');
    };
  }, []);

  function getMonthlyDebts(cartId: string): void {
    window.electron.ipcRenderer.send('get-monthly-debts', cartId);
  }

  return {
    debts,
    getMonthlyDebts,
  };
};

import { useEffect, useState } from 'react';

type GetMonthlyDebts = {
  payMonthlyDebts: (monthlyDebtsIds: string[]) => void;
  paymentReply: boolean | undefined;
};

export const usePayMonthlyDebtsAction = (): GetMonthlyDebts => {
  const [reply, setReply] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'pay-monthly-debts-reply',
      (_event, reply: boolean) => {
        setReply(reply);
      },
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners('pay-monthly-debts');
    };
  }, []);

  function payMonthlyDebts(monthlyDebtsIds: string[]): void {
    window.electron.ipcRenderer.send('pay-monthly-debts', monthlyDebtsIds);
  }

  return {
    paymentReply: reply,
    payMonthlyDebts,
  };
};

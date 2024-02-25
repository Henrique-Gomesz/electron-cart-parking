import { SavePerson } from '@renderer/entities/person';
import { useEffect, useState } from 'react';

type UseSavePersonAction = {
  savePersonAction: (person: SavePerson) => void;
  reply: boolean | undefined;
};

export const useSavePersonAction = (): UseSavePersonAction => {
  const [reply, setReply] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'create-person-reply',
      (_event, reply: boolean) => {
        savePersonReply(reply);
      },
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners('create-person-reply');
    };
  }, []);

  function savePersonAction(person: SavePerson): void {
    setReply(undefined);
    window.electron.ipcRenderer.send('create-person', person);
  }

  function savePersonReply(reply: boolean): void {
    setReply(reply);
  }

  return {
    savePersonAction,
    reply,
  };
};

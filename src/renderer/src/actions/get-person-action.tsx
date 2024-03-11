import { ListPerson } from '@renderer/entities/person';
import { useEffect, useState } from 'react';

type GetPersonByDocument = {
  getPersonById: (document: string) => void;
  person: ListPerson | undefined;
};

export const useGetPersonByDocument = (): GetPersonByDocument => {
  const [person, setPerson] = useState<ListPerson | undefined>(undefined);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'get-person-by-document-reply',
      (_event, reply: ListPerson | undefined) => {
        console.log(reply);
        setPerson(reply);
      },
    );

    return (): void => {
      window.electron.ipcRenderer.removeAllListeners(
        'get-person-by-document-reply',
      );
    };
  }, []);

  function getPersonById(document: string): void {
    window.electron.ipcRenderer.send('get-person-by-document', document);
  }

  return {
    person,
    getPersonById,
  };
};

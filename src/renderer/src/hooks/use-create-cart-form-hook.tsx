import { useSaveCartAction } from '@renderer/actions/save-cart-actions';
import { useState } from 'react';

type UseCreateCartForm = {
  document: string;
  name: string;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  reply: boolean | undefined;
};

export const useCreateCartForm = (): UseCreateCartForm => {
  const { reply, saveCartAction } = useSaveCartAction();
  const [document, setDocument] = useState<string>('');
  const [name, setName] = useState<string>('');

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value;
    const name = event.target.name;

    if (name === 'document') {
      setDocument(data);
    } else {
      setName(data);
    }
  }

  function onSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();

    const documentWithoutMask = document.replace(/[^0-9]/g, '');

    saveCartAction({ name: name, personDocument: documentWithoutMask });
  }

  return {
    document,
    name,
    handleFormChange,
    onSubmit,
    reply,
  };
};

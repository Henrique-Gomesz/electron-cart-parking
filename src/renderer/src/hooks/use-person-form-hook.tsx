import { useSavePersonAction } from '@renderer/actions/save-person-action';
import {
  CNPJ_MASK,
  CPF_MASK,
  TELEPHONE_MASK,
} from '@renderer/components/text-field/text-field-masks';
import { TextField } from '@renderer/components/text-field/text-field.';
import { SavePerson } from '@renderer/entities/person';
import { SubmitButton } from '@renderer/screens/person-form-screen/person-form.screen.styles';
import React, { ChangeEvent, ReactElement, useState } from 'react';

type UsePersonForm = {
  form: SavePerson;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  renderForm: () => ReactElement;
  reply: boolean | undefined;
  clearForm: () => void;
};

export const usePersonForm = (): UsePersonForm => {
  const { savePersonAction, reply } = useSavePersonAction();

  const [form, setForm] = useState<SavePerson>({
    name: '',
    document: '',
    telephone: '',
  });

  function handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value;

    setForm({
      ...form,
      [event.target.name]: data,
    });
  }

  function onSubtmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    savePersonAction(form);
  }

  function clearForm(): void {
    setForm({
      name: '',
      document: '',
      telephone: '',
    });
  }

  function renderForm(): ReactElement {
    return (
      <>
        <TextField
          onChange={handleFormChange}
          value={form.name}
          name='name'
          label='Nome'
          placeholder='João Carlos'
        />
        <TextField
          isMasked
          mask={CPF_MASK}
          onChange={handleFormChange}
          value={form.document}
          name='document'
          label='CPF/CNPJ'
          placeholder='416.662.128-80'
        />
        <TextField
          isMasked
          mask={TELEPHONE_MASK}
          name='telephone'
          id='telehpone-input'
          onChange={handleFormChange}
          value={form.telephone}
          placeholder='(11) 99913-9204'
          label='Telefone'
        />
        <SubmitButton onClick={onSubtmit} variant='contained'>
          Enviar
        </SubmitButton>
      </>
    );
  }

  return {
    form,
    handleFormChange,
    renderForm,
    reply,
    clearForm,
  };
};

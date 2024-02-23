import { SavePerson } from "@renderer/entities/person";
import {
  SubmitButton,
  TextInput,
} from "@renderer/screens/person-form-screen/person-form.screen.styles";
import { useSavePersonAction } from "@renderer/actions/save-person-action";
import { ChangeEvent, ReactElement, useState } from "react";

type UsePersonForm = {
  form: SavePerson;
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  renderForm: () => ReactElement;
  reply: boolean | undefined;
};

export const usePersonForm = (): UsePersonForm => {
  const { savePersonAction, reply } = useSavePersonAction();

  const [form, setForm] = useState<SavePerson>({
    name: "",
    document: "",
    telephone: "",
  });

  function handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function onSubtmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    savePersonAction(form);
  }

  function renderForm(): ReactElement {
    return (
      <>
        <TextInput
          onChange={handleFormChange}
          value={form.name}
          name="name"
          label="Nome"
          variant="outlined"
          placeholder="João Carlos"
        />
        <TextInput
          onChange={handleFormChange}
          value={form.document}
          name="document"
          label="CPF/CNPJ"
          variant="outlined"
          placeholder="13-614-538-80"
        />
        <TextInput
          onChange={handleFormChange}
          value={form.telephone}
          name="telephone"
          label="Telefone"
          variant="outlined"
          placeholder="(11) 99913-9204"
        />
        <SubmitButton onClick={onSubtmit} variant="contained">
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
  };
};

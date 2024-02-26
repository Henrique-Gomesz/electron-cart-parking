import { AddCircle, SearchRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { CPF_MASK } from '@renderer/components/text-field/text-field-masks';
import { TextField } from '@renderer/components/text-field/text-field.';
import { SearchCartWrapper } from '@renderer/screens/manage-carts/manage-carts.styles';
import { ReactElement, useState } from 'react';

type UseSearchCart = {
  document: string;
  renderSearch: () => ReactElement;
};

export const useSearchCart = (): UseSearchCart => {
  const [document, setDocument] = useState<string>('');

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value;
    setDocument(data);
  }

  function renderSearch(): ReactElement {
    return (
      <SearchCartWrapper>
        <TextField
          isMasked
          mask={CPF_MASK}
          onChange={handleFormChange}
          value={document}
          name='document'
          label='CPF/CNPJ'
          placeholder='416.662.128-80'
        />
        <Button variant='contained' startIcon={<SearchRounded />}>
          buscar
        </Button>
        <Button variant='text' startIcon={<AddCircle />}>
          novo
        </Button>
      </SearchCartWrapper>
    );
  }

  return {
    document,
    renderSearch,
  };
};

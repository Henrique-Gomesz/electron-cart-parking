import { SearchRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { TextField } from '@renderer/components/text-field/text-field.';
import { SearchCartWrapper } from '@renderer/screens/manage-carts/manage-carts.styles';
import { ReactElement, useState } from 'react';

type UseSearchCartDebts = {
  cartNumber: string;
  renderSearch: () => ReactElement;
  onSearchCarts: (cartId: string) => void;
};

type Props = {
  onSearchCarts: (cartId: string) => void;
};

export const useSearchCartDebts = ({
  onSearchCarts,
}: Props): UseSearchCartDebts => {
  const [cartNumber, setCartNumber] = useState<string>('');

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value;
    setCartNumber(data);
  }

  function renderSearch(): ReactElement {
    return (
      <SearchCartWrapper>
        <TextField
          onChange={handleFormChange}
          value={cartNumber}
          name='cartCod'
          label='Número do carrinho'
          placeholder='Ex: CARRINHO1'
        />
        <Button
          variant='contained'
          onClick={() => onSearchCarts(cartNumber)}
          startIcon={<SearchRounded />}
        >
          buscar
        </Button>
      </SearchCartWrapper>
    );
  }

  return {
    cartNumber,
    renderSearch,
    onSearchCarts,
  };
};

import { AddCircle, SearchRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDeleteCartByIdAction } from '@renderer/actions/delete-carts-by-id-action';
import { useDisableCartAction } from '@renderer/actions/disable-cart-action';
import { useEnableCartAction } from '@renderer/actions/enable-cart-action';
import { useListCartAction } from '@renderer/actions/list-carts-action';
import { CPF_MASK } from '@renderer/components/text-field/text-field-masks';
import { TextField } from '@renderer/components/text-field/text-field.';
import { ListCart } from '@renderer/entities/cart';
import { SearchCartWrapper } from '@renderer/screens/manage-carts/manage-carts.styles';
import { ReactElement, useState } from 'react';

type UseSearchCart = {
  document: string;
  renderSearch: () => ReactElement;
  carts: ListCart[];
  cartSwitch: (cartId: string, document: string, value: boolean) => void;
  onPressDelete: (cartId: string, document: string) => void;
};

type Props = {
  onPressNew(): void;
};

export const useSearchCart = ({ onPressNew }: Props): UseSearchCart => {
  const [document, setDocument] = useState<string>('');
  const { carts, getCartsAction } = useListCartAction();
  const { deleteCartAction } = useDeleteCartByIdAction();
  const { enableCart: enableCartAction } = useEnableCartAction();
  const { disableCart } = useDisableCartAction();

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value;
    setDocument(data);
  }

  function searchCarts(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    event.preventDefault();
    const documentWithoutMask = document.replace(/[^0-9]/g, '');

    getCartsAction(documentWithoutMask);
  }

  function cartSwitch(cartId: string, document: string, value: boolean): void {
    if (value) {
      enableCartAction(cartId);
    } else {
      disableCart(cartId);
    }
    getCartsAction(document);
  }

  function onPressDelete(cartId: string, document: string): void {
    deleteCartAction(cartId);
    getCartsAction(document);
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
        <Button
          variant='contained'
          onClick={searchCarts}
          startIcon={<SearchRounded />}
        >
          buscar
        </Button>
        <Button variant='text' onClick={onPressNew} startIcon={<AddCircle />}>
          novo
        </Button>
      </SearchCartWrapper>
    );
  }

  return {
    document,
    renderSearch,
    carts,
    cartSwitch,
    onPressDelete,
  };
};

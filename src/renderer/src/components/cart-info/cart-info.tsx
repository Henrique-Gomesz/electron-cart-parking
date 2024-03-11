import { ListCart } from '@renderer/entities/cart';
import { ReactElement } from 'react';
import {
  Wrapper,
  CartInfoLabel,
  CartInfoText,
  CartInfoWrapper,
} from './cart-info.styles';

type Props = {
  cart: ListCart;
};

export const CartInfo = ({ cart }: Props): ReactElement => {
  return (
    <Wrapper>
      <CartInfoWrapper>
        <CartInfoLabel>Nome do carrinho:</CartInfoLabel>
        <CartInfoText>{cart.name}</CartInfoText>
      </CartInfoWrapper>
      <CartInfoWrapper>
        <CartInfoLabel>Código do carrinho</CartInfoLabel>
        <CartInfoText>{cart.cartCode}</CartInfoText>
      </CartInfoWrapper>
      <CartInfoWrapper>
        <CartInfoLabel>Ativo:</CartInfoLabel>
        <CartInfoText>{cart.active ? 'Sim' : 'Não'}</CartInfoText>
      </CartInfoWrapper>
    </Wrapper>
  );
};

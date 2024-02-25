import { BaseScreen } from '@renderer/components/base-screen/base-screen';
import { Screens } from '@renderer/hooks/use-navigation-hook';
import { useSearchCart } from '@renderer/hooks/use-search-cart-hook';
import { ReactElement } from 'react';
import { Wrapper } from './manage-carts.styles';

export const ManageCarts = (): ReactElement => {
  const { renderSearch } = useSearchCart();

  return (
    <BaseScreen title={Screens.GerenciarCarrinhos}>
      <Wrapper>{renderSearch()}</Wrapper>
    </BaseScreen>
  );
};

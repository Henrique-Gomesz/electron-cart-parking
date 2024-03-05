import { BaseScreen } from '@renderer/components/base-screen/base-screen';
import { Screens } from '@renderer/hooks/use-navigation-hook';
import { useSearchCart } from '@renderer/hooks/use-search-cart-hook';
import { ReactElement, useState } from 'react';
import { CartList } from './components/cart-list/cart-list';
import { CreateCart } from './components/create-cart/create-cart';
import { Wrapper } from './manage-carts.styles';
import { CartMonthlyDebts } from './components/cart-monthly-debts/cart-monthly-debts';

export const ManageCarts = (): ReactElement => {
  const { renderSearch, carts, cartSwitch } = useSearchCart({
    onPressNew: showCreateCartForm,
  });
  const [showCreateCart, setShowCreateCart] = useState<boolean>(false);

  const [showCartMonthlyDebts, setShowCartMonthlyDebts] = useState(false);

  function showCreateCartForm(): void {
    setShowCreateCart(true);
  }

  function hideCreateCartForm(): void {
    setShowCreateCart(false);
  }

  function onPressCalendar(): void {
    setShowCartMonthlyDebts(true);
  }

  function hideCartMonthlyDebts(): void {
    setShowCartMonthlyDebts(false);
  }

  function renderContent(): ReactElement {
    if (showCartMonthlyDebts) {
      return <CartMonthlyDebts onGoBack={hideCartMonthlyDebts} />;
    }
    if (showCreateCart) {
      return <CreateCart onGoBack={hideCreateCartForm} />;
    }

    return (
      <>
        {renderSearch()}
        <CartList
          onPressCalendar={onPressCalendar}
          onChangeSwitch={cartSwitch}
          onPressDelete={() => {}}
          data={carts}
        />
      </>
    );
  }

  return (
    <BaseScreen
      title={showCreateCart ? 'Criar Carrinho' : Screens.GerenciarCarrinhos}
    >
      <Wrapper>{renderContent()}</Wrapper>
    </BaseScreen>
  );
};

import { BaseScreen } from '@renderer/components/base-screen/base-screen';
import { Screens } from '@renderer/hooks/use-navigation-hook';
import { useSearchCart } from '@renderer/hooks/use-search-cart-hook';
import { ReactElement, useState } from 'react';
import { CartList } from './components/cart-list/cart-list';
import { CartMonthlyDebts } from './components/cart-monthly-debts/cart-monthly-debts';
import { CreateCart } from './components/create-cart/create-cart';
import { Wrapper } from './manage-carts.styles';

export const ManageCarts = (): ReactElement => {
  const [cartId, setCartId] = useState<string>('');

  const { renderSearch, carts, cartSwitch, onPressDelete } = useSearchCart({
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

  function onPressCalendar(cartId: string): void {
    setCartId(cartId);
    setShowCartMonthlyDebts(true);
  }

  function hideCartMonthlyDebts(): void {
    setShowCartMonthlyDebts(false);
  }

  async function generateBarcode(cartCode: string): Promise<void> {
    console.log(cartCode);
    window.electron.ipcRenderer.send('generate-barcode', cartCode);
  }

  function renderContent(): ReactElement {
    if (showCartMonthlyDebts) {
      return (
        <CartMonthlyDebts cartId={cartId} onGoBack={hideCartMonthlyDebts} />
      );
    }
    if (showCreateCart) {
      return <CreateCart onGoBack={hideCreateCartForm} />;
    }

    return (
      <>
        {renderSearch()}
        <CartList
          onPressPrint={async (cartCode) => await generateBarcode(cartCode)}
          onPressCalendar={onPressCalendar}
          onChangeSwitch={cartSwitch}
          onPressDelete={onPressDelete}
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

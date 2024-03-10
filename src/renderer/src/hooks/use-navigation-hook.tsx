import { NavbarButtons } from '@renderer/components/nav-bar/nav-bar';
import { ListCartMonthlyDebts } from '@renderer/screens/list-cart-monthly-debts/list-cart-monthly-debts';
import { ManageCarts } from '@renderer/screens/manage-carts/manage-carts';
import { PersonFormScreen } from '@renderer/screens/person-form-screen/person-form-screen';
import { ReactElement, useState } from 'react';

export enum Screens {
  CadastrarUsuarios = 'Cadastrar Usuários',
  GerenciarCarrinhos = 'Gerenciar Carrinhos',
  ListarPendenciasDoCarrinho = 'Ver dívidas do Carrinho',
}

type UseNavigation = {
  onMenuItemPress: (pressedButton: NavbarButtons) => void;
  renderScreen: () => ReactElement;
};

export const useNavigation = (): UseNavigation => {
  const [screen, setScreen] = useState<Screens>(Screens.GerenciarCarrinhos);

  const SCREEN_MAPPER = new Map<Screens, ReactElement>([
    [
      Screens.CadastrarUsuarios,
      <PersonFormScreen key={Screens.CadastrarUsuarios} />,
    ],
    [
      Screens.GerenciarCarrinhos,
      <ManageCarts key={Screens.GerenciarCarrinhos} />,
    ],
    [
      Screens.ListarPendenciasDoCarrinho,
      <ListCartMonthlyDebts key={Screens.ListarPendenciasDoCarrinho} />,
    ],
  ]);

  const onMenuItemPress = (pressedButton: NavbarButtons): void => {
    switch (pressedButton) {
      case NavbarButtons.CadastrarUsuarios:
        setScreen(Screens.CadastrarUsuarios);
        break;
      case NavbarButtons.GerenciarCarrinhos:
        setScreen(Screens.GerenciarCarrinhos);
        break;
      case NavbarButtons.ListarPendenciasDoCarrinho:
        setScreen(Screens.ListarPendenciasDoCarrinho);
        break;
    }
  };

  function renderContent(): ReactElement {
    return SCREEN_MAPPER.get(screen) ?? <div>Not Found</div>;
  }

  function renderScreen(): ReactElement {
    return renderContent();
  }

  return {
    onMenuItemPress,
    renderScreen,
  };
};

import MenuIcon from '@mui/icons-material/Menu';
import { Button, ButtonGroup } from '@mui/material';
import { ReactElement, useState } from 'react';
import {
  Collapse,
  MenuButton,
  MenuTitle,
  NavBarWrapper,
} from './nav-bar.styles';
export enum NavbarButtons {
  CadastrarUsuarios = 'Cadastrar Usuários',
  GerenciarCarrinhos = 'Gerenciar Carrinhos',
  ListarPendenciasDoCarrinho = 'Listar Pendencias do Carrinho',
}

type NavbarProps = {
  onPress: (pressedButton: NavbarButtons) => void;
};

export const NavBar = ({ onPress }: NavbarProps): ReactElement => {
  const [open, setOpen] = useState(false);

  const BUTTONS = [
    {
      name: NavbarButtons.CadastrarUsuarios,
      onClick: () => onButtonPress(NavbarButtons.CadastrarUsuarios),
    },
    {
      name: NavbarButtons.GerenciarCarrinhos,
      onClick: () => onButtonPress(NavbarButtons.GerenciarCarrinhos),
    },
    {
      name: NavbarButtons.ListarPendenciasDoCarrinho,
      onClick: () => onButtonPress(NavbarButtons.ListarPendenciasDoCarrinho),
    },
  ];

  function toggleDrawer(): void {
    setOpen(() => !open);
  }

  function onButtonPress(pressedButton: NavbarButtons): void {
    onPress(pressedButton);
    toggleDrawer();
  }

  function renderButtons(): ReactElement {
    return (
      <ButtonGroup
        variant='contained'
        orientation='vertical'
        aria-label='Basic button group'
      >
        {BUTTONS.map((button, index) => (
          <MenuButton
            key={index}
            onClick={() => {
              onButtonPress(button.name);
            }}
          >
            {button.name}
          </MenuButton>
        ))}
      </ButtonGroup>
    );
  }

  return (
    <NavBarWrapper>
      <Button onClick={() => toggleDrawer()}>
        <MenuIcon />
      </Button>
      <Collapse anchor='left' open={open} onClose={() => toggleDrawer()}>
        <MenuTitle>MENU</MenuTitle>
        {renderButtons()}
      </Collapse>
    </NavBarWrapper>
  );
};

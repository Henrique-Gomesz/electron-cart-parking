import { NavbarButtons } from '@renderer/components/nav-bar/nav-bar'
import { ReactElement, useState } from 'react'

export enum Screens {
  CadastrarUsuarios = 'Cadastrar Usuários',
  VerificarPendencias = 'Verificar Pendências',
  Three = 'Three'
}

export const useNavigation = (): void => {
  const [screen, setScreen] = useState<Screens>(Screens.CadastrarUsuarios)

  const onMenuItemPress = (pressedButton: NavbarButtons): void => {
    switch (pressedButton) {
      case NavbarButtons.CadastrarUsuarios:
        setScreen(Screens.CadastrarUsuarios)
        break
      case NavbarButtons.VerificarPendencias:
        setScreen(Screens.VerificarPendencias)
        break
      case NavbarButtons.Three:
        setScreen(Screens.Three)
        break
    }
  }

  function renderScreen(): ReactElement {
    switch (screen) {
      case Screens.CadastrarUsuarios:
        return <div>Cadastrar Usuarios</div>
      case Screens.VerificarPendencias:
        return <div>Verificar Pendencias</div>
      case Screens.Three:
        return <div>Three</div>
    }
  }
}

import { NavbarButtons } from '@renderer/components/nav-bar/nav-bar'
import { PersonFormScreen } from '@renderer/screens/person-form-screen/person-form-screen'
import { ReactElement, useState } from 'react'

export enum Screens {
  CadastrarUsuarios = 'Cadastrar Usuários',
  VerificarPendencias = 'Verificar Pendências',
  Three = 'Three'
}

type UseNavigation = {
  onMenuItemPress: (pressedButton: NavbarButtons) => void
  renderScreen: () => ReactElement
}

export const useNavigation = (): UseNavigation => {
  const [screen, setScreen] = useState<Screens>(Screens.CadastrarUsuarios)

  const SCREEN_MAPPER = new Map<Screens, ReactElement>([
    [Screens.CadastrarUsuarios, <PersonFormScreen key={Screens.CadastrarUsuarios} />],
    [
      Screens.VerificarPendencias,
      <div key={Screens.VerificarPendencias}>Verificar Pendencias</div>
    ],
    [Screens.Three, <div key={Screens.Three}>Three</div>]
  ])

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

  function renderContent(): ReactElement {
    return SCREEN_MAPPER.get(screen) ?? <div>Not Found</div>
  }

  function renderScreen(): ReactElement {
    return renderContent()
  }

  return {
    onMenuItemPress,
    renderScreen
  }
}

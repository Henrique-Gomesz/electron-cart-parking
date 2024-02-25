import { ScreenWrapper } from './app.styles'
import { NavBar } from './components/nav-bar/nav-bar'
import { useNavigation } from './hooks/use-navigation-hook'
function App(): JSX.Element {
  const { onMenuItemPress, renderScreen } = useNavigation()

  return (
    <ScreenWrapper>
      <NavBar onPress={onMenuItemPress} />
      {renderScreen()}
    </ScreenWrapper>
  )
}

export default App

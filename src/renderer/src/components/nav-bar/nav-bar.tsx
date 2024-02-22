import { Button, ButtonGroup } from '@mui/material'
import { ReactElement } from 'react'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { NavBarWrapper } from './nav-bar.styles'
export const NavBar = (): ReactElement => {
  return (
    <NavBarWrapper>
      <ButtonGroup  variant="outlined" orientation="vertical" aria-label="Basic button group">
        <Button>Cadastrar Usuários</Button>
        <Button>Verificar pendências</Button>
        <Button startIcon={<AcUnitIcon />}>Three</Button>
      </ButtonGroup>
    </NavBarWrapper>
  )
}

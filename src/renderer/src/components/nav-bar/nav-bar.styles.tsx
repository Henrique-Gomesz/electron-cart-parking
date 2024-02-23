import { Button, ButtonGroup, Drawer } from '@mui/material'
import styled from 'styled-components'

export const NavBarWrapper = styled.nav`
  height: 100%;
  background-color: #2b2a2a;
`
export const ButtonWrapper = styled(ButtonGroup)`
  gap: 16px;
`

export const MenuTitle = styled.p`
  color: white;
  font-weight: bold;
  margin: 8px 0px;
`
export const MenuButton = styled(Button).attrs({
  variant: 'contained'
})``

export const Collapse = styled(Drawer).attrs({
  PaperProps: {
    style: {
      backgroundColor: '#2b2a2a',
      padding: 0,
      margin: 0,
      textAlign: 'center'
    }
  }
})``

import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type Icon = OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string
}

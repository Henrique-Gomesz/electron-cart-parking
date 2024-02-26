import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { ButtonsWrapper } from './cart-list.styles';
import { Button } from '@mui/material';
import { EditAttributes, EditNote, EditRounded, Print } from '@mui/icons-material';

export const CartList = (): React.ReactElement => {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Carrinhos</ListSubheader>}
    >
      <ListItem>
        <ListItemText
          primaryTypographyProps={{ color: 'black' }}
          primary={'Carrinho 1'}
        />
        <ButtonsWrapper>
        <Button>
            <Print />
          </Button>
          <Button>
            <EditRounded />
          </Button>

          <Switch
            edge='end'
            onChange={handleToggle('wifi')}
            checked={checked.indexOf('wifi') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
          />
        </ButtonsWrapper>
      </ListItem>
    </List>
  );
};

import { DeleteForever, EditRounded, Print } from '@mui/icons-material';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { ButtonsWrapper, Empty, EmptyWrapper } from './cart-list.styles';
import { ListCart } from '@renderer/entities/cart';
import { isEmpty, noop } from 'lodash';

type Props = {
  data: ListCart[];
};

export const CartList = ({ data }: Props): React.ReactElement => {
  function renderItems(): React.ReactElement[] | React.ReactElement {
    return data.map((cart, index) => {
      return (
        <ListItem key={index}>
          <ListItemText
            primaryTypographyProps={{ color: 'black' }}
            primary={cart.name}
          />
          <ButtonsWrapper>
            <Button>
              <Print />
            </Button>
            <Button>
              <EditRounded />
            </Button>
            <Button>
              <DeleteForever color='error' />
            </Button>
            <Switch
              edge='end'
              onChange={noop}
              checked={cart.active}
              inputProps={{
                'aria-labelledby': 'switch-list-label-wifi',
              }}
            />
          </ButtonsWrapper>
        </ListItem>
      );
    });
  }

  if (isEmpty(data))
    return (
      <EmptyWrapper>
        <Empty>Nenhum carrinho foi encontrado para este CPF</Empty>
      </EmptyWrapper>
    );

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>Carrinhos</ListSubheader>}
    >
      {renderItems()}
    </List>
  );
};

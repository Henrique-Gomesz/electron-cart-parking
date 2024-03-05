import {
  CalendarMonth,
  DeleteForever,
  EditRounded,
  Print,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { ListCart } from '@renderer/entities/cart';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { ButtonsWrapper, Empty, EmptyWrapper } from './cart-list.styles';

type Props = {
  data: ListCart[];
  onPressDelete: (cartId: string) => void;
  onChangeSwitch: (cartId: string, document: string, value: boolean) => void;
  onPressCalendar: () => void;
};

export const CartList = ({
  data,
  onChangeSwitch,
  onPressCalendar,
}: Props): React.ReactElement => {
  function renderItems(): React.ReactElement[] | React.ReactElement {
    return data.map((cart, index) => {
      return (
        <ListItem key={index}>
          <ListItemText
            primaryTypographyProps={{ color: 'black' }}
            primary={cart.name}
          />
          <ButtonsWrapper>
            <Button onClick={onPressCalendar}>
              <CalendarMonth color='success' />
            </Button>
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
              onChange={(event) => {
                onChangeSwitch(
                  cart.id,
                  cart.personDocument,
                  event.target.checked,
                );
              }}
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

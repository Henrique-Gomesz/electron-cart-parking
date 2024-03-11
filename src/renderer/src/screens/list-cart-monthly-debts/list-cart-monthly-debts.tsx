import { Payments } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMonthlyDebtsAction } from '@renderer/actions/get-monthly-debts-action';
import { usePayMonthlyDebtsAction } from '@renderer/actions/pay-monthly-debts-action';
import { BaseScreen } from '@renderer/components/base-screen/base-screen';
import { Screens } from '@renderer/hooks/use-navigation-hook';
import { useSearchCartDebts } from '@renderer/hooks/use-search-cart-debts-hook';
import { isNil } from 'lodash';
import './list-cart-monthly-devts.css';
import * as React from 'react';
import {
  ButtonsWrapper,
  CartInfoWrapper,
  ContentWrapper,
  PersonInfoWrapper,
  TableWrapper,
} from './list-cart-monthly-debts.styles';
import { useGetCartByCodeAction } from '@renderer/actions/get-carts-by-id-action';
import { CartInfo } from '@renderer/components/cart-info/cart-info';
import { useGetPersonByDocument } from '@renderer/actions/get-person-action';
import { PersonInfo } from '@renderer/components/person-info/person-info';

const columns: GridColDef[] = [
  {
    field: 'hasPayed',
    headerName: 'Pago',
    width: 200,
    type: 'boolean',
    cellClassName: (params): string => {
      if (params.value) return 'paidRow';
      return 'unpaidRow';
    },
    valueGetter: (params): boolean => {
      if (isNil(params.row.paymentDate)) return false;
      return true;
    },
  },
  {
    field: 'paymentDate',
    headerName: 'Data de pagamento',
    width: 200,
    type: 'date',
    valueFormatter: (params): string => {
      const value = params.value as Date | undefined;
      if (isNil(value)) return '';
      return value.toLocaleDateString('pt-br');
    },
  },
  {
    field: 'createdAt',
    headerName: 'Data de Criação',
    width: 200,
    type: 'date',
    valueFormatter: (params): string => {
      const value = params.value as Date;
      return value.toLocaleDateString('pt-br');
    },
  },
];

type Props = {
  cartId: string;
};

export const ListCartMonthlyDebts = ({ cartId }: Props): React.ReactElement => {
  const { debts, getMonthlyDebts } = useGetMonthlyDebtsAction();
  const { cart, getCartAction } = useGetCartByCodeAction();
  const { payMonthlyDebts } = usePayMonthlyDebtsAction();
  const { getPersonById, person } = useGetPersonByDocument();
  const { renderSearch, cartNumber } = useSearchCartDebts({
    onSearchCarts: onSearchCartDebts,
  });
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const onPayMonthlyDebts = (): void => {
    if (selectedRows.length > 0) payMonthlyDebts(selectedRows);

    setTimeout(() => getMonthlyDebts(cartId), 1000);
  };

  function onSearchCartDebts(): void {
    getCartAction(cartNumber);
  }

  React.useEffect(() => {
    getMonthlyDebts(cart.id);
    getPersonById(cart.personDocument);
  }, [cart]);

  return (
    <BaseScreen title={Screens.ListarPendenciasDoCarrinho}>
      <ContentWrapper>
        {renderSearch()}
        <CartInfoWrapper>
          <CartInfo cart={cart} />
        </CartInfoWrapper>
        <PersonInfoWrapper>
          <PersonInfo person={person} />
        </PersonInfoWrapper>
        <TableWrapper>
          <DataGrid
            rows={debts}
            columns={columns}
            getRowClassName={(params) => {
              console.log(params);
              if (params.row.paymentDate) return 'paidRow';
              return 'unpaidRow';
            }}
            initialState={{
              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
              },
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(params) =>
              setSelectedRows(params as string[])
            }
          />
          <ButtonsWrapper>
            <Button
              variant='contained'
              startIcon={<Payments />}
              onClick={onPayMonthlyDebts}
            >
              Pagar
            </Button>
          </ButtonsWrapper>
        </TableWrapper>
      </ContentWrapper>
    </BaseScreen>
  );
};

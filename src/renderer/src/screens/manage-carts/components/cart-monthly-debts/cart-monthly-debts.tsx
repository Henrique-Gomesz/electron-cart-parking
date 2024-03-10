import { ChevronLeft, Payments } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMonthlyDebtsAction } from '@renderer/actions/get-monthly-debts-action';
import { usePayMonthlyDebtsAction } from '@renderer/actions/pay-monthly-debts-action';
import { isNil } from 'lodash';
import * as React from 'react';
import { ButtonsWrapper, TableWrapper } from './cart-monthly-debts.styles';

const columns: GridColDef[] = [
  {
    field: 'hasPayed',
    headerName: 'Pago',
    width: 200,
    type: 'boolean',
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
  onGoBack: () => void;
};

export const CartMonthlyDebts = ({
  onGoBack,
  cartId,
}: Props): React.ReactElement => {
  const { debts, getMonthlyDebts } = useGetMonthlyDebtsAction();
  const { payMonthlyDebts } = usePayMonthlyDebtsAction();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const onPayMonthlyDebts = (): void => {
    if (selectedRows.length > 0) payMonthlyDebts(selectedRows);

    setTimeout(() => getMonthlyDebts(cartId), 1000);
  };

  React.useEffect(() => {
    getMonthlyDebts(cartId);
  }, []);

  return (
    <TableWrapper>
      <DataGrid
        rows={debts}
        columns={columns}
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
        <Button startIcon={<ChevronLeft />} onClick={onGoBack}>
          Voltar
        </Button>
        <Button
          variant='contained'
          startIcon={<Payments />}
          onClick={onPayMonthlyDebts}
        >
          Pagar
        </Button>
      </ButtonsWrapper>
    </TableWrapper>
  );
};

import { ChevronLeft, Payments } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ListMonthlyDebts } from '@renderer/entities/monthly-debts';
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

const rows: ListMonthlyDebts[] = [
  {
    id: '1',
    cartId: 'cartId',
    paymentDate: new Date(),
    createdAt: new Date(),
  },
];

type Props = {
  onGoBack: () => void;
};

export const CartMonthlyDebts = ({ onGoBack }: Props): React.ReactElement => {
  const [monthlyDebts, setMonthlyDebts] = React.useState<ListMonthlyDebts[]>(
    [],
  );
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  return (
    <TableWrapper>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
        <Button variant='contained' startIcon={<Payments />} onClick={onGoBack}>
          Pagar
        </Button>
      </ButtonsWrapper>
    </TableWrapper>
  );
};

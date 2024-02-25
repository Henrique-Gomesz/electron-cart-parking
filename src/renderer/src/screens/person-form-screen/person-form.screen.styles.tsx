import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const FormWrapper = styled.div`
  padding: 32px;
  width: 100%;
  background-color: #ffffff;
  flex-direction: column;
  display: flex;
  gap: 24px;
`;

export const TextInput = styled(TextField).attrs({
  id: 'filled-basic',
  variant: 'outlined',
})``;

export const SubmitButton = styled(Button)``;

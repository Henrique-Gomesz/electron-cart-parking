import { ChevronLeft, SaveRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { CPF_MASK } from '@renderer/components/text-field/text-field-masks';
import { TextField } from '@renderer/components/text-field/text-field.';
import { useCreateCartForm } from '@renderer/hooks/use-create-cart-form-hook';
import { ReactElement, useEffect } from 'react';
import { ButtonsWrapper, Wrapper } from './create-cart.styles';
import { useFeedbackModal } from '@renderer/hooks/use-feedback-modal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import { isNil } from 'lodash';

type Props = {
  onGoBack(): void;
};

export const CreateCart = ({ onGoBack }: Props): ReactElement => {
  const {
    openModal: successOpenModal,
    renderFeedbackModal: successRenderFeedbackModal,
  } = useFeedbackModal({
    iconColor: 'success',
    icon: CheckCircleRoundedIcon,
    message: 'Carrinho cadastrado com sucesso!',
    title: 'Sucesso',
  });

  const {
    openModal: errorOpenModal,
    renderFeedbackModal: errorRenderFeedbackModal,
  } = useFeedbackModal({
    iconColor: 'error',
    icon: ErrorOutlineRounded,
    message: 'Erro ao cadastrar carrinho!',
    title: 'Erro',
  });

  const { document, handleFormChange, name, onSubmit, reply } =
    useCreateCartForm();

  useEffect(() => {
    if (isNil(reply)) return;

    if (reply) {
      successOpenModal();
    } else {
      errorOpenModal();
    }
  }, [reply]);

  return (
    <Wrapper>
      <TextField
        onChange={handleFormChange}
        value={name}
        name='name'
        label='Nome do carrinho'
        placeholder='Carrinho de roupas'
      />
      <TextField
        isMasked
        mask={CPF_MASK}
        onChange={handleFormChange}
        value={document}
        name='document'
        label='CPF/CNPJ'
        placeholder='416.662.128-80'
      />
      <ButtonsWrapper>
        <Button
          variant='contained'
          onClick={onGoBack}
          startIcon={<ChevronLeft />}
        >
          voltar
        </Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          startIcon={<SaveRounded />}
        >
          salvar
        </Button>
      </ButtonsWrapper>
      {successRenderFeedbackModal()}
      {errorRenderFeedbackModal()}
    </Wrapper>
  );
};

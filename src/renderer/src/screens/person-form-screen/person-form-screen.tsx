import { BaseScreen } from '@renderer/components/base-screen/base-screen';
import { Screens } from '@renderer/hooks/use-navigation-hook';
import { usePersonForm } from '@renderer/hooks/use-person-form-hook';
import { ReactElement, useEffect } from 'react';
import { FormWrapper } from './person-form.screen.styles';
import { useFeedbackModal } from '@renderer/hooks/use-feedback-modal';
import { isNil } from 'lodash';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
export const PersonFormScreen = (): ReactElement => {
  const {
    openModal: successOpenModal,
    renderFeedbackModal: successRenderFeedbackModal,
  } = useFeedbackModal({
    iconColor: 'success',
    icon: CheckCircleRoundedIcon,
    message: 'Usuário cadastrado com sucesso!',
    title: 'Sucesso',
  });

  const {
    openModal: errorOpenModal,
    renderFeedbackModal: errorRenderFeedbackModal,
  } = useFeedbackModal({
    iconColor: 'error',
    icon: ErrorOutlineRounded,
    message: 'Erro ao cadastrar usuário!',
    title: 'Erro',
  });

  const { renderForm, reply, clearForm } = usePersonForm();

  useEffect(() => {
    if (isNil(reply)) return;

    if (reply) {
      successOpenModal();
      clearForm();
    } else {
      errorOpenModal();
    }
  }, [reply]);

  return (
    <>
      <BaseScreen title={Screens.CadastrarUsuarios}>
        <>
          <FormWrapper>{renderForm()}</FormWrapper>
          {successRenderFeedbackModal()}
          {errorRenderFeedbackModal()}
        </>
      </BaseScreen>
    </>
  );
};

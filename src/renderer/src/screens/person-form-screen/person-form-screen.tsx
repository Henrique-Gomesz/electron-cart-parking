import { BaseScreen } from "@renderer/components/base-screen/base-screen";
import { Screens } from "@renderer/hooks/use-navigation-hook";
import { usePersonForm } from "@renderer/hooks/use-person-form-hook";
import { ReactElement, useEffect } from "react";
import { FormWrapper } from "./person-form.screen.styles";
import { useFeedbackModal } from "@renderer/hooks/use-feedback-modal";
import { isNil } from "lodash";

export const PersonFormScreen = (): ReactElement => {
  const {openModal,renderFeedbackModal} = useFeedbackModal()
  const { renderForm, reply } = usePersonForm();
  
  useEffect(() => {
    if (isNil(reply)) return
    
    if(reply){
      openModal()
    }
    else{
      openModal()
    }
  }, [reply]);

  return (
    <>
      <BaseScreen title={Screens.CadastrarUsuarios}>
        <>
          
      <FormWrapper>{renderForm()}</FormWrapper>
      {renderFeedbackModal()}
        </>
      </BaseScreen>
    </>
  );
};

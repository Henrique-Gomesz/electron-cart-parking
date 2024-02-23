import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement } from "react";
import {
  Button,
  ButtonWrapper,
  IconWrapper,
  Message,
  Title,
  TitleWrapper,
  Wrapper,
} from "./feedback-modal.styles";
type Props = {
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  onPress: () => void;
};

export const FeedbackModal = ({ onPress,Icon }: Props): ReactElement => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon fontSize="large" color="success" />
      </IconWrapper>
      <TitleWrapper>
        <Title>Child Modal</Title>
      </TitleWrapper>
      <Message>Child Modal</Message>
      <ButtonWrapper>
        <Button onClick={onPress}>Fechar</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

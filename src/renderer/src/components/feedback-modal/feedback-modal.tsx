import { Icon } from '@renderer/types/icon-type';
import { ReactElement } from 'react';
import {
  Button,
  ButtonWrapper,
  IconWrapper,
  Message,
  Title,
  TitleWrapper,
  Wrapper,
} from './feedback-modal.styles';
type Props = {
  Icon: Icon;
  title: string;
  message: string;
  iconColor: 'success' | 'error' | 'primary';
  onPress: () => void;
};

export const FeedbackModal = ({
  onPress,
  Icon,
  message,
  title,
  iconColor,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon fontSize='large' color={iconColor} />
      </IconWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <Message>{message}</Message>
      <ButtonWrapper>
        <Button onClick={onPress}>Fechar</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

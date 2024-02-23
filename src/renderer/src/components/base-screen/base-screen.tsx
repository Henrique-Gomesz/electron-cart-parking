import { ReactElement } from "react";
import { ContentWrapper, Screen, Title, TitleWrapper } from "./base-screen.styles";

type BaseScreenProps = {
  children: ReactElement;
  title: string;
};

export const BaseScreen = ({
  children,
  title,
}: BaseScreenProps): ReactElement => {
  return (
    <Screen>
      <TitleWrapper><Title>{title}</Title></TitleWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Screen>
  );
};

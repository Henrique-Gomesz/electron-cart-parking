import { ListPerson } from '@renderer/entities/person';
import { ReactElement } from 'react';
import {
  PersonInfoLabel,
  PersonInfoText,
  PersonInfoWrapper,
  Wrapper,
} from './person-info.styles';

type Props = {
  person: ListPerson | undefined;
};

export const PersonInfo = ({ person }: Props): ReactElement => {
  return (
    <Wrapper>
      <PersonInfoWrapper>
        <PersonInfoLabel>Nome:</PersonInfoLabel>
        <PersonInfoText>{person ? person.name : ''}</PersonInfoText>
      </PersonInfoWrapper>
      <PersonInfoWrapper>
        <PersonInfoLabel>CPF/CNPJ:</PersonInfoLabel>
        <PersonInfoText>{person ? person.document : ''}</PersonInfoText>
      </PersonInfoWrapper>
      <PersonInfoWrapper>
        <PersonInfoLabel>Telefone:</PersonInfoLabel>
        <PersonInfoText>{person ? person.telephone : ''}</PersonInfoText>
      </PersonInfoWrapper>
    </Wrapper>
  );
};

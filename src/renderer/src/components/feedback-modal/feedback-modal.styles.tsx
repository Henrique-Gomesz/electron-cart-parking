import { Box, Button as BaseButton } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled(Box)`
  text-align: center;
  position: absolute;
  border-radius: 8px;
  padding: 16px;
  background-color: #2b2a2a;
`;

export const IconWrapper = styled.div``;

export const TitleWrapper = styled.div``;

export const Title = styled.p``;

export const Message = styled.p``;

export const ButtonWrapper = styled.div``;

export const Button = styled(BaseButton).attrs({
    variant: "contained",
    color: "error",
})``;

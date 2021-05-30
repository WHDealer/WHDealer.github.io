import styled from "styled-components";
import { colors, size, spacing } from ".";

export const Container = styled.div`
  width: 90%;
  margin: 10px auto;
`;

export const ErrorMessage = styled.p`
  font-size: ${size.textSize.small}px;
  color: ${colors.error};
  margin-top: ${spacing[1]}px;
`;
import styled from 'styled-components';
import {theme} from 'theme/variables';

export const Title = styled.h1`
  color: ${theme.colors.white};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xlarge}px ${theme.spacing.xxsmall}px;
`;

export const SubTitle = styled.h2`
  margin-top: ${theme.spacing.xsmall}px;
  color: ${theme.colors.white};
`;

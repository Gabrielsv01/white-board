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
  height: 100vh;
  width: 100;
  background-color: ${theme.colors.black};
`;

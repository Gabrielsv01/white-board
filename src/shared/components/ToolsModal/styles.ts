import styled from 'styled-components';
import {theme} from 'theme/variables';

export const Title = styled.h1`
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.medium}px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.orange};
  padding: 20px;
  height: 100vh;
  width: 400px;
  overflow-y: scroll;
`;

export const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
`;

export const ButtonClose = styled.button`
  align-self: self-end;
  background-color: ${theme.colors.white};
  margin-bottom: 20px;
  font-size: ${theme.fontSize.medium}px;
`;

export const Button = styled.button`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: 20px;
  margin-left: 20px;
`;

export const WrapperComponents = styled.div`
  display: flex;
  flex-direction: row;
`;

export const WrapperColorSelector = styled.div`
  position: 'absolute';
  z-index: 99;
`;

export const Cover = styled.div`
  position: 'fixed';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Label = styled.label`
  margin-right: ${theme.spacing.xxsmall}px;
`;
export const Input = styled.input`
  margin-right: ${theme.spacing.xxsmall}px;
`;

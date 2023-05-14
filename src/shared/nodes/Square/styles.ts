import {Handle, HandleProps} from 'reactflow';
import styled from 'styled-components';
import {theme} from 'theme/variables';

export const Content = styled.div<{nodeColorValue?: string}>`
  display: flex;
  width: 100%;
  min-height: 50px;
  min-width: 140px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.border.radius.small}px;
  background-color: ${props => props?.nodeColorValue || theme.colors.white};
`;

export const Title = styled.h3`
  color: ${theme.colors.black};
`;

interface internalHandleStyle extends HandleProps {
  activeDisplay?: boolean;
}

export const HandleLeft = styled(Handle)<internalHandleStyle>`
  ${props => !props.activeDisplay && ' opacity:0'};
  left: -10px;
`;

export const HandleRight = styled(Handle)<internalHandleStyle>`
  ${props => !props.activeDisplay && ' opacity:0'};
  right: -10px;
`;

export const HandleTop = styled(Handle)<internalHandleStyle>`
  ${props => !props.activeDisplay && ' opacity:0'};
  top: -10px;
`;

export const HandleBottom = styled(Handle)<internalHandleStyle>`
  ${props => !props.activeDisplay && ' opacity:0'};
  bottom: -10px;
`;

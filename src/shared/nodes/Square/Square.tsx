/* eslint-disable react/require-default-props */
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useAtomValue, useSetAtom} from 'jotai';
import {NodeProps, NodeResizer, Position} from 'reactflow';
import {hideHandle} from 'shared/atoms/hideHandle';
import {nodeColor, nodeSelectedID, nodeProps} from 'shared/atoms/nodeProps';
import {hideToolModal} from 'shared/atoms/toolModal';
import {theme} from 'theme/variables';

import {getIndexById} from '../../utils';

import * as S from './styles';

interface SquareProps extends NodeProps {
  disableHandles?: boolean;
  toolsColor?: boolean;
}

const Square = ({
  disableHandles = true,
  toolsColor = false,
  ...props
}: SquareProps) => {
  const {selected, id} = props;
  const isShowHideHandleAtom = useAtomValue(hideHandle);
  const setHideToolModal = useSetAtom(hideToolModal);
  // const nodeColorValue = useAtomValue(nodeColor);
  const nodePropsValue = useAtomValue(nodeProps);
  const setNodeSelectedID = useSetAtom(nodeSelectedID);
  const nodeSelectedIDValue = useAtomValue(nodeSelectedID);
  const setNodeColor = useSetAtom(nodeColor);
  const colorID = getIndexById(nodePropsValue.colors, id);

  if (selected && nodeSelectedIDValue !== id) {
    setNodeSelectedID(id);
    setHideToolModal(true);
    if (colorID) {
      setNodeColor(nodePropsValue.colors[colorID].color);
    }
  }

  const renderHander = useMemo(
    () => !disableHandles || selected || isShowHideHandleAtom,
    [disableHandles, selected, isShowHideHandleAtom],
  );

  return (
    <S.Content
      nodeColorValue={
        colorID ? nodePropsValue.colors[colorID].color : undefined
      }>
      <S.Title>Square</S.Title>
      {renderHander && <NodeResizer />}
      <S.HandleLeft
        activeDisplay={renderHander}
        id="left"
        type="source"
        position={Position.Left}
      />
      <S.HandleRight
        activeDisplay={renderHander}
        id="right"
        type="source"
        position={Position.Right}
      />
      <S.HandleTop
        activeDisplay={renderHander}
        id="top"
        type="source"
        position={Position.Top}
      />
      <S.HandleBottom
        activeDisplay={renderHander}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
    </S.Content>
  );
};

export default Square;

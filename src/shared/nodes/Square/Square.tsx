/* eslint-disable react/require-default-props */
import React, {useMemo} from 'react';

import {useAtomValue, useSetAtom} from 'jotai';
import {NodeProps, NodeResizer, Position} from 'reactflow';
import {hideHandle} from 'shared/atoms/hideHandle';
import {nodeColor, nodeSelectedID, nodeProps} from 'shared/atoms/nodeProps';
import {hideToolModal} from 'shared/atoms/toolModal';

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
  const nodePropsValue = useAtomValue(nodeProps);
  const setNodeSelectedID = useSetAtom(nodeSelectedID);
  const nodeSelectedIDValue = useAtomValue(nodeSelectedID);
  const setNodeColor = useSetAtom(nodeColor);
  const nodeID = getIndexById(nodePropsValue, id);

  if (selected && nodeSelectedIDValue !== id) {
    setNodeSelectedID(id);
    setHideToolModal(true);
    if (nodeID?.toString() && nodeID >= 0) {
      setNodeColor(nodePropsValue[nodeID].color);
    }
  }

  const renderHander = useMemo(
    () => !disableHandles || selected || isShowHideHandleAtom,
    [disableHandles, selected, isShowHideHandleAtom],
  );

  const handleColorChange = () => {
    if (nodeID?.toString() && nodeID >= 0) {
      return nodePropsValue[nodeID].color;
    }
    return undefined;
  };

  return (
    <S.Content nodeColorValue={handleColorChange()}>
      <S.Title>
        {nodeID ? nodePropsValue[nodeID].data?.mensage : 'Square'}
      </S.Title>

      {renderHander && <NodeResizer />}
      <S.HandleLeft
        activeDisplay={renderHander && !toolsColor}
        id="left"
        type="source"
        position={Position.Left}
      />
      <S.HandleRight
        activeDisplay={renderHander && !toolsColor}
        id="right"
        type="source"
        position={Position.Right}
      />
      <S.HandleTop
        activeDisplay={renderHander && !toolsColor}
        id="top"
        type="source"
        position={Position.Top}
      />
      <S.HandleBottom
        activeDisplay={renderHander && !toolsColor}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
    </S.Content>
  );
};

export default Square;

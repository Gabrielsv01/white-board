import React, {useState} from 'react';

import {useAtomValue, useSetAtom} from 'jotai';
import {ChromePicker} from 'react-color';
import {hideHandle} from 'shared/atoms/hideHandle';
import {nodeColor, nodeProps, nodeSelectedID} from 'shared/atoms/nodeProps';
import {hideToolModal} from 'shared/atoms/toolModal';
import Square from 'shared/nodes/Square/Square';

import {mockDefaultProps} from '../../constants';
import {getIndexById} from '../../utils';

import {ToolsModalProps} from './types';
import {NodeCustomType} from 'shared/nodes/Square/types';

import * as S from './styles';

const ToolsModal: React.FC<ToolsModalProps> = ({addNode}) => {
  const setOnHideHandle = useSetAtom(hideHandle);
  const setNodeColor = useSetAtom(nodeColor);
  const setNodePropsValue = useSetAtom(nodeProps);
  const isShowHideToolModal = useAtomValue(hideToolModal);
  const setHideToolModal = useSetAtom(hideToolModal);
  const nodeColorValue = useAtomValue(nodeColor);
  const nodePropsValue = useAtomValue(nodeProps);
  const nodeSelectedIDValue = useAtomValue(nodeSelectedID);
  const [selectedCheckbox, setSelectedCheckbox] = useState('top');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (event: any) => {
    setSelectedCheckbox(event.target.value);
  };

  const updateObjectColorById = (id: string, newColor: string) => {
    const colorID = getIndexById(nodePropsValue, id);
    if (colorID?.toString() && colorID >= 0 && newColor) {
      const aux = nodePropsValue;
      aux[colorID].color = newColor;
      setNodePropsValue(aux);
    }
  };

  const handleChange = (color: {hex: string | ((prev: string) => string)}) => {
    setNodeColor(color.hex);
    updateObjectColorById(nodeSelectedIDValue, color.hex as string);
  };

  if (!isShowHideToolModal) {
    return null;
  }
  return (
    <S.Content className="modal">
      <S.Container className="modal-content">
        <S.ButtonClose
          className="modal-close"
          onClick={() => {
            setHideToolModal(false);
            setNodeColor('');
          }}>
          X
        </S.ButtonClose>
        <S.Title>Painel de Ferramentas</S.Title>
        <div>
          <p>Este é o conteúdo do modal.</p>

          <div>
            <S.WrapperComponents>
              <Square {...mockDefaultProps} disableHandles={false} toolsColor />
              <S.Button
                className="modal-close"
                onClick={() => {
                  setOnHideHandle(false);
                  addNode({
                    targetHandle: selectedCheckbox,
                    type: NodeCustomType.Square,
                    data: {
                      mensage: 'Square',
                    },
                  });
                  setHideToolModal(false);
                }}>
                Adicionar Square
              </S.Button>
            </S.WrapperComponents>
            <S.Label>
              <S.Input
                type="checkbox"
                value="top"
                checked={selectedCheckbox === 'top'}
                onChange={handleCheckboxChange}
              />
              Top
            </S.Label>
            <S.Label>
              <S.Input
                type="checkbox"
                value="right"
                checked={selectedCheckbox === 'right'}
                onChange={handleCheckboxChange}
              />
              Right
            </S.Label>
            <S.Label>
              <S.Input
                type="checkbox"
                value="bottom"
                checked={selectedCheckbox === 'bottom'}
                onChange={handleCheckboxChange}
              />
              Bottom
            </S.Label>
            <S.Label>
              <S.Input
                type="checkbox"
                value="left"
                checked={selectedCheckbox === 'left'}
                onChange={handleCheckboxChange}
              />
              Left
            </S.Label>
          </div>
          <S.WrapperColorSelector>
            <ChromePicker color={nodeColorValue} onChange={handleChange} />
          </S.WrapperColorSelector>
        </div>
      </S.Container>
    </S.Content>
  );
};

export default ToolsModal;

import React, {useState} from 'react';

import {useAtomValue, useSetAtom} from 'jotai';
import {ChromePicker} from 'react-color';
import {hideHandle} from 'shared/atoms/hideHandle';
import {hideToolModal} from 'shared/atoms/toolModal';

import {nodeColor, nodeProps, nodeSelectedID} from '../../atoms/nodeProps';
import {mockDefaultProps} from '../../constants';
import Square from '../../nodes/Square/Square';
import {getIndexById} from '../../utils';

import * as S from './styles';

type ToolsModalProps = {
  addNode: (target: string) => void;
};

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
    const colorID = getIndexById(nodePropsValue.colors, id);
    if (colorID && colorID >= 0 && newColor) {
      const aux = {
        colors: nodePropsValue.colors,
      };
      aux.colors[colorID].color = newColor;
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
        <S.Button
          className="modal-close"
          onClick={() => {
            setOnHideHandle(false);
          }}>
          Ocultar nodes
        </S.Button>
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
                  addNode(selectedCheckbox);
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

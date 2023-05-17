import {atom} from 'jotai';

export interface NodeDataProps {
  mensage: string;
}

interface NodeProps {
  id: string;
  color: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: NodeDataProps;
}

const nodeProps = atom([] as NodeProps[]);
const nodeColor = atom('');
const nodeSelectedID = atom('');

export {nodeColor, nodeProps, nodeSelectedID};

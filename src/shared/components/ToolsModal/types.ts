import {AddProps} from 'pages/Home/types';

export interface ToolsModalProps {
  addNode: ({targetHandle, type, data}: AddProps) => void;
}

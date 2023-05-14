import React, {useCallback, useEffect, useRef} from 'react';

import {useAtomValue, useSetAtom} from 'jotai';
import ReactFlow, {
  Background,
  ConnectionMode,
  Controls,
  Connection,
  Node as NodeFlow,
  useEdgesState,
  addEdge,
  useNodesState,
  useReactFlow,
  OnConnectStart,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {hideHandle} from 'shared/atoms/hideHandle';
import {nodeProps, nodeSelectedID} from 'shared/atoms/nodeProps';
import {hideToolModal} from 'shared/atoms/toolModal';
import ToolsModal from 'shared/components/ToolsModal/ToolsModal';
import Default from 'shared/edges/default/default';
import Square from 'shared/nodes/Square/Square';

import * as S from './styles';

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: Default,
};

const fitViewOptions = {
  padding: 3,
};

const Home: React.FC = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const {project} = useReactFlow();
  const setHideToolModal = useSetAtom(hideToolModal);
  const handleIDSide = useRef<string | null>(null);
  const position = useRef({x: 0, y: 0});
  const setOnHideHandle = useSetAtom(hideHandle);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reactFlowWrapper = useRef<any>(null);
  const connectingNodeId = useRef<string | null>(null);
  const setNodePropsValue = useSetAtom(nodeProps);
  const nodePropsValue = useAtomValue(nodeProps);
  const setNodeSelectedID = useSetAtom(nodeSelectedID);

  const addNode = (targetHandle?: string) => {
    const id = crypto.randomUUID();
    const newNode = {
      id,
      type: 'square',
      position: project({
        x: position.current.x,
        y: position.current.y,
      }),
      data: {
        add: addNode,
      },
    };
    setNodes(nds => nds.concat(newNode));
    setNodePropsValue({
      colors: [
        ...nodePropsValue.colors,
        {
          id,
          color: '#fff',
        },
      ],
    });

    setEdges(eds =>
      eds.concat({
        id,
        source: connectingNodeId.current as string,
        sourceHandle: handleIDSide.current,
        targetHandle,
        target: id,
      }),
    );
  };

  const onConnect = useCallback((connection: Connection) => {
    setHideToolModal(false);
    setEdges(newsEdges => addEdge(connection, newsEdges));
  }, []);

  const onConnectEnd = useCallback((event: any) => {
    setHideToolModal(true);
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane) {
      // we need to remove the wrapper bounds, in order to get the correct position
      const {top, left} = reactFlowWrapper.current.getBoundingClientRect();
      position.current = {
        x: event.clientX - left,
        y: event.clientY - top,
      };
    }
    setOnHideHandle(false);
  }, []);

  const onConnectStart: OnConnectStart = useCallback(
    (_, {nodeId, handleId}) => {
      handleIDSide.current = handleId;
      connectingNodeId.current = nodeId;
      setOnHideHandle(true);
    },
    [],
  );

  useEffect(() => {
    setHideToolModal(true);
  }, []);

  return (
    <S.Content ref={reactFlowWrapper}>
      <S.Title>Home</S.Title>
      <ReactFlow
        deleteKeyCode={['Backspace', 'Delete']}
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        onConnectEnd={onConnectEnd}
        onConnectStart={onConnectStart}
        onEdgesChange={onEdgesChange}
        edgeTypes={EDGE_TYPES}
        edges={edges}
        fitView
        fitViewOptions={fitViewOptions}>
        <Background gap={12} size={2} color="#494949" />
        <ToolsModal addNode={addNode} />
        <Controls />
      </ReactFlow>
    </S.Content>
  );
};

export default Home;

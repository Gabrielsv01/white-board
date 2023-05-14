import React from 'react';

import {ReactFlowProvider} from 'reactflow';

import Routers from './routes';

const App = () => (
  <ReactFlowProvider>
    <Routers />
  </ReactFlowProvider>
);

export default App;

import { useCallback} from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <div className="app">
      <header>My Toolbar</header>
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onSelectionChange={(elements) => console.log("onSelectChange", elements)}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
          >
          <Background 
            id="1"
            gap={10}
            color="#222"
            bgColor="#111"
            variant={BackgroundVariant.Dots}/>
          {/* <MiniMap /> */}
          {/* <Controls /> */}
        </ReactFlow>
      </div>
      <footer>Status Bar</footer>
    </div>

  );
}

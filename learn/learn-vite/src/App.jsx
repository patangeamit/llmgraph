import { useCallback, useState } from "react";
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onSubmit = () => {
    // Handle submit logic here
    console.log("Submitted query:", query);
    const parent = nodes.find((n) => n.id === selectedNodeId);
    if (!parent || !query.trim()) return;
    const id = crypto.randomUUID();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "position-logger",
        position: {
          x: parent.position.x,
          y: parent.position.y + 150,
        },
        data: {
          title: query,
          subtitle: "Lorem Espum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
      },
    ]);

    setEdges((eds) => [
      ...eds,
      {
        id: `${parent.id}-${id}`,
        source: parent.id,
        target: id,
      },
    ]);

  };

  return (
    <div className="app">
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onSelectionChange={(elements) => {
              setSelectedNodeId(elements?.nodes[0]?.id || null);
              console.log("onSelectChange", elements)
            }
          }
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
      <div>
        <textarea value={query} onChange={(e) => setQuery(e.target.value)}></textarea>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <footer>Status Bar</footer>
    </div>

  );
}

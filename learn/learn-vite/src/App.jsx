import { useCallback, useState, useMemo } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import FloatingConnectionLine from "./edges/FloatingConnectionLine";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  // const [contextNodeIds, setContextNodeIds] = useState(new Set());
  // const onConnect = useCallback(
  //   (connection) => setEdges((edges) => addEdge(connection, edges)),
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onSubmit = () => {
    // Handle submit logic here
    const parent = nodes.find((n) => n.id === selectedNodeId);
    if (!parent || !query.trim()) return;
    const id = crypto.randomUUID();
    setNodes((nds) => [
      ...nds.map((n) => ({
        ...n,
        selected: false
      })),
      
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
        selected: true
      },
    ]);

    setEdges((eds) => [
      ...eds,
      {
        id: `${parent.id}-${id}`,
        source: parent.id,
        target: id,
        type: 'floating',
        markerEnd: { type: MarkerType.Arrow },
      },
    ]);

  };

  const onSelectionChange = ({ nodes }) => {
    console.log("selection", nodes);
    if (nodes.length === 0) {
      setSelectedNodeId(null);
      return;
    }
    console.log("setting", nodes[0].id);
    setSelectedNodeId(nodes[0].id);
  }
  
  const contextNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set();

    const ids = new Set([selectedNodeId]);
    let current = selectedNodeId;

    while (true) {
      const parentEdge = edges.find(e => e.target === current);
      if (!parentEdge) break;

      ids.add(parentEdge.source);
      current = parentEdge.source;
    }

    return ids;
  }, [selectedNodeId, edges]);

  const displayNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      isContext: contextNodeIds.has(node.id),
    }}));


  return (
    <div className="app">
      <div className="flow-container">
        <ReactFlow
          nodes={displayNodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onSelectionChange={onSelectionChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{ hideAttribution: true }}
          connectionLineComponent={FloatingConnectionLine}
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

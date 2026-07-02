import FloatingEdge from "./FloatingEdge";
import { MarkerType } from "@xyflow/react";
export const initialEdges = [
  { id: "b->d",
    source: "b", 
    target: "d", 
    animated: false, 
    type: 'floating',
    markerEnd: { type: MarkerType.Arrow }, 
  },
  { id: "a->b", source: "a", target: "b", animated: false
    , type: 'floating', markerEnd: { type: MarkerType.Arrow },
   },
  { id: "a->c", source: "a", target: "c", animated: false, type: 'floating', markerEnd: { type: MarkerType.Arrow } },
  { id: "a->e", source: "a", target: "e", animated: false, type: 'floating', markerEnd: { type: MarkerType.Arrow } },
];

export const edgeTypes = {
    floating: FloatingEdge,
};
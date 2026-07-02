import React, { useState } from "react";
import { Handle } from "@xyflow/react";

export function PositionLoggerNode({ data , selected}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="react-flow__node-default"
      style={{
        minWidth: 220,
        borderRadius: 8,
        background: "#222",
        color: "white",
        border: selected ? "2px solid #3b82f6" : "1px solid #555",
      }}
    >
      {/* <Handle type="target" position="top" /> */}

      <div
        style={{
          fontWeight: 600,
          cursor: "pointer",
          userSelect: "none",
          textAlign: "start",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "▼" : "▶"} {data.title}
      </div>

      {expanded && (
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            fontSize: 11,
            lineHeight: 1.4,
            color: "#d1d5db",
            textAlign: "start",
          }}
        >
          {data.subtitle}
        </p>
      )}

      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />

    </div>
  );
}

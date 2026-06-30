import { PositionLoggerNode } from "./PositionLoggerNode";
const style = {
      background: '#222222',
      color: '#fff',
      border: '1px solid #475569',
      borderRadius: '8px',
    }
export const initialNodes = [
  { id: "a", type: "position-logger", position: { x: 0, y: 0 }, data: { title: "What is kafka?",
    "subtitle": "Kafka is a distributed event streaming platform used for building real-time data pipelines and streaming applications. It is designed to handle high-throughput, fault-tolerant, and scalable data streams."
  }, 
    style: style ,
   },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { title: "What is a broker?", subtitle: "A broker in Kafka is a server that manages the distribution of messages across topics and partitions." },
    style: style
  },
  { id: "c", type: "position-logger", position: { x: 100, y: 100 }, data: { title: "What are partitions?", subtitle: "Partitions in Kafka are the fundamental units of parallelism and scalability within a topic." }, style: style},
  {
    id: "d",
    type: "position-logger",
    position: { x: 0, y: 200 },
    data: { title: "Does it store data? ", subtitle: "Yes, Kafka stores data in a distributed and fault-tolerant manner." },
    style: style
  },
  
  {
    id: "e",
    type: "position-logger",
    position: { x: 200, y: 200 },
    data: {
      title: "Large Language Model",
      subtitle:
        "A Large Language Model (LLM) is a neural network trained on massive amounts of text to understand and generate human language.",
    },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
};

import React, { useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

interface FlowDiagramProps {
  data: {
    endpoints: Array<{
      method: string;
      path: string;
      description: string;
    }>;
    schema: Record<string, {
      fields: Array<{
        name: string;
        type: string;
        required: boolean;
      }>;
    }>;
  };
}

export function FlowDiagram({ data }: FlowDiagramProps) {
  // Convert API data to nodes and edges
  const initialNodes: Node[] = [
    // API Gateway Node
    {
      id: 'gateway',
      type: 'input',
      data: { label: 'API Gateway' },
      position: { x: 250, y: 0 },
      className: 'bg-blue-500/20 border-2 border-blue-500 rounded-lg p-2 text-white'
    },
    // Endpoint Nodes
    ...data.endpoints.map((endpoint, index) => ({
      id: `endpoint-${index}`,
      data: { 
        label: (
          <div className="p-2">
            <div className="font-mono text-sm">{endpoint.method}</div>
            <div className="text-xs">{endpoint.path}</div>
          </div>
        )
      },
      position: { x: 100 + (index * 200), y: 100 },
      className: 'bg-slate-800 border border-slate-700 rounded-lg text-white'
    })),
    // Schema Nodes
    ...Object.entries(data.schema).map(([name, schema], index) => ({
      id: `schema-${index}`,
      data: { 
        label: (
          <div className="p-2">
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-400">
              {schema.fields.length} fields
            </div>
          </div>
        )
      },
      position: { x: 100 + (index * 200), y: 200 },
      className: 'bg-purple-500/20 border border-purple-500 rounded-lg text-white'
    }))
  ];

  const initialEdges: Edge[] = [
    // Connect gateway to endpoints
    ...data.endpoints.map((_, index) => ({
      id: `gateway-to-endpoint-${index}`,
      source: 'gateway',
      target: `endpoint-${index}`,
      animated: true,
      className: 'text-blue-500'
    })),
    // Connect endpoints to related schemas
    ...data.endpoints.map((_, endpointIndex) => 
      Object.keys(data.schema).map((_, schemaIndex) => ({
        id: `endpoint-${endpointIndex}-to-schema-${schemaIndex}`,
        source: `endpoint-${endpointIndex}`,
        target: `schema-${schemaIndex}`,
        animated: true,
        className: 'text-purple-500'
      }))
    ).flat()
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => 
    setEdges((eds) => addEdge(params, eds)), [setEdges]
  );

  return (
    <div className="h-[600px] bg-slate-900 rounded-xl border border-slate-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
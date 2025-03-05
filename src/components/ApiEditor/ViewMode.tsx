import React, { useState } from 'react';
import { FlowDiagram } from './FlowDiagram';
import { PerformanceSimulator } from './PerformanceSimulator';
import { CodePreview } from './CodePreview';
import { ProtocolConverter } from './ProtocolConverter';
import { Layout, Activity, Code2, Network } from 'lucide-react';

interface ViewModeProps {
  data: {
    endpoints: Array<{
      method: string;
      path: string;
      description: string;
      parameters?: Array<{
        name: string;
        type: string;
        required: boolean;
      }>;
    }>;
    schema: Record<string, {
      fields: Array<{
        name: string;
        type: string;
        required: boolean;
      }>;
    }>;
  };
  viewLevel: 'high' | 'low';
}

type ViewType = 'standard' | 'flow' | 'performance' | 'protocols';

export function ViewMode({ data, viewLevel }: ViewModeProps) {
  const [viewType, setViewType] = useState<ViewType>('standard');

  return (
    <div className="space-y-6">
      {/* View Type Selector */}
      <div className="flex gap-4 bg-slate-800 rounded-xl p-4">
        <button
          onClick={() => setViewType('standard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            viewType === 'standard' 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layout className="w-4 h-4" />
          Standard View
        </button>
        <button
          onClick={() => setViewType('flow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            viewType === 'flow' 
              ? 'bg-purple-500/20 text-purple-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Code2 className="w-4 h-4" />
          Flow Diagram
        </button>
        <button
          onClick={() => setViewType('performance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            viewType === 'performance' 
              ? 'bg-cyan-500/20 text-cyan-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          Performance
        </button>
        <button
          onClick={() => setViewType('protocols')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            viewType === 'protocols' 
              ? 'bg-green-500/20 text-green-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Network className="w-4 h-4" />
          Protocols
        </button>
      </div>

      {/* View Content */}
      {viewType === 'standard' && (
        <StandardView data={data} viewLevel={viewLevel} />
      )}
      
      {viewType === 'flow' && (
        <FlowDiagram data={data} />
      )}
      
      {viewType === 'performance' && (
        <PerformanceSimulator data={data} />
      )}

      {viewType === 'protocols' && (
        <ProtocolConverter endpoints={data.endpoints} schema={data.schema} />
      )}
    </div>
  );
}

function StandardView({ data, viewLevel }: ViewModeProps) {
  return (
    <>
      {/* Endpoints Preview */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">API Endpoints</h2>
        <div className="space-y-4">
          {data.endpoints.map((endpoint, index) => (
            <div key={index} className="border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className={`
                  px-2 py-1 rounded text-sm font-mono
                  ${endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                    endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                    endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'}
                `}>
                  {endpoint.method}
                </span>
                <code className="text-gray-300">{endpoint.path}</code>
              </div>
              {viewLevel === 'low' && (
                <>
                  <p className="text-gray-400 text-sm mb-3">{endpoint.description}</p>
                  {endpoint.parameters && endpoint.parameters.length > 0 && (
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Parameters:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {endpoint.parameters.map((param, pIndex) => (
                          <div key={pIndex} className="flex items-center gap-2 text-sm">
                            <span className="font-mono text-gray-400">{param.name}</span>
                            <span className="text-gray-500">({param.type})</span>
                            {param.required && (
                              <span className="text-xs text-red-400">required</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Schema Preview */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Data Models</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(data.schema).map(([modelName, { fields }]) => (
            <div key={modelName} className="border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">{modelName}</h3>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-300">{field.name}</span>
                      <span className="text-gray-500">{field.type}</span>
                    </div>
                    {viewLevel === 'low' && field.required && (
                      <span className="text-xs text-red-400">required</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
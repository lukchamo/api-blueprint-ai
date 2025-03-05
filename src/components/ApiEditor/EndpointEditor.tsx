import React, { useState } from 'react';
import { Plus, Trash2, Wand2, Link, FileJson, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const parameterSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  required: z.boolean(),
  example: z.string().optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional()
  }).optional()
});

const endpointSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string(),
  description: z.string(),
  parameters: z.array(parameterSchema).optional(),
  responseSchema: z.string().optional(), // Reference to a schema model
  tags: z.array(z.string()).optional(),
  security: z.array(z.string()).optional()
});

interface EndpointEditorProps {
  endpoints: any[];
  viewLevel: 'high' | 'low';
  schema: Record<string, any>;
  onChange: (endpoints: any[]) => void;
}

export function EndpointEditor({ endpoints, viewLevel, schema, onChange }: EndpointEditorProps) {
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<number | null>(null);

  const handleAddEndpoint = () => {
    onChange([
      ...endpoints,
      {
        method: 'GET',
        path: '/api/new-endpoint',
        description: 'New endpoint description',
        parameters: [],
        tags: [],
        security: ['bearer']
      }
    ]);
  };

  const handleEndpointChange = (index: number, field: string, value: any) => {
    const newEndpoints = [...endpoints];
    newEndpoints[index] = { ...newEndpoints[index], [field]: value };
    
    try {
      endpointSchema.parse(newEndpoints[index]);
      onChange(newEndpoints);
    } catch (error) {
      console.error('Invalid endpoint data:', error);
    }
  };

  const handleAiSuggestParameter = async (endpointIndex: number) => {
    // Simulate AI suggestions
    const suggestions = [
      {
        name: 'page',
        type: 'number',
        description: 'Page number for pagination',
        required: false,
        example: '1',
        validation: { min: 1 }
      },
      {
        name: 'limit',
        type: 'number',
        description: 'Number of items per page',
        required: false,
        example: '10',
        validation: { min: 1, max: 100 }
      }
    ];

    const newEndpoints = [...endpoints];
    newEndpoints[endpointIndex].parameters = [
      ...newEndpoints[endpointIndex].parameters,
      ...suggestions
    ];
    onChange(newEndpoints);
  };

  const generateZodSchema = (endpoint: any) => {
    let schemaStr = 'z.object({\n';
    endpoint.parameters?.forEach((param: any) => {
      schemaStr += `  ${param.name}: z.${param.type}()`;
      if (param.validation?.min) schemaStr += `.min(${param.validation.min})`;
      if (param.validation?.max) schemaStr += `.max(${param.validation.max})`;
      if (param.validation?.pattern) schemaStr += `.regex(/${param.validation.pattern}/)`;
      if (!param.required) schemaStr += '.optional()';
      schemaStr += ',\n';
    });
    schemaStr += '})';
    return schemaStr;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Endpoints</h2>
        <button
          onClick={handleAddEndpoint}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Endpoint
        </button>
      </div>

      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <div key={index} className="border border-slate-700 rounded-lg p-4">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <select
                value={endpoint.method}
                onChange={(e) => handleEndpointChange(index, 'method', e.target.value)}
                className="bg-slate-700 rounded-lg px-3 py-2 text-sm"
              >
                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <input
                type="text"
                value={endpoint.path}
                onChange={(e) => handleEndpointChange(index, 'path', e.target.value)}
                className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-sm"
                placeholder="Path (e.g., /api/resource)"
              />
              <button
                onClick={() => onChange(endpoints.filter((_, i) => i !== index))}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="mb-4">
              <textarea
                value={endpoint.description}
                onChange={(e) => handleEndpointChange(index, 'description', e.target.value)}
                className="w-full bg-slate-700 rounded-lg px-3 py-2 text-sm"
                placeholder="Endpoint description"
                rows={2}
              />
            </div>

            {/* Parameters Section */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-300">Parameters</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAiSuggestParameter(index)}
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    <Wand2 className="w-4 h-4" />
                    Add with AI
                  </button>
                </div>
              </div>

              {endpoint.parameters?.map((param: any, pIndex: number) => (
                <div key={pIndex} className="grid grid-cols-12 gap-2 items-start">
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) => {
                      const newParams = [...endpoint.parameters];
                      newParams[pIndex] = { ...param, name: e.target.value };
                      handleEndpointChange(index, 'parameters', newParams);
                    }}
                    className="col-span-2 bg-slate-700 rounded-lg px-3 py-2 text-sm"
                    placeholder="Name"
                  />
                  <select
                    value={param.type}
                    onChange={(e) => {
                      const newParams = [...endpoint.parameters];
                      newParams[pIndex] = { ...param, type: e.target.value };
                      handleEndpointChange(index, 'parameters', newParams);
                    }}
                    className="col-span-2 bg-slate-700 rounded-lg px-3 py-2 text-sm"
                  >
                    {['string', 'number', 'boolean', 'array', 'object', 'date'].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={param.description}
                    onChange={(e) => {
                      const newParams = [...endpoint.parameters];
                      newParams[pIndex] = { ...param, description: e.target.value };
                      handleEndpointChange(index, 'parameters', newParams);
                    }}
                    className="col-span-4 bg-slate-700 rounded-lg px-3 py-2 text-sm"
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={param.example}
                    onChange={(e) => {
                      const newParams = [...endpoint.parameters];
                      newParams[pIndex] = { ...param, example: e.target.value };
                      handleEndpointChange(index, 'parameters', newParams);
                    }}
                    className="col-span-2 bg-slate-700 rounded-lg px-3 py-2 text-sm"
                    placeholder="Example"
                  />
                  <div className="col-span-1 flex items-center gap-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) => {
                          const newParams = [...endpoint.parameters];
                          newParams[pIndex] = { ...param, required: e.target.checked };
                          handleEndpointChange(index, 'parameters', newParams);
                        }}
                        className="rounded border-slate-600 bg-slate-700"
                      />
                      <span className="text-sm text-gray-400">Req.</span>
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      const newParams = endpoint.parameters.filter((_: any, i: number) => i !== pIndex);
                      handleEndpointChange(index, 'parameters', newParams);
                    }}
                    className="col-span-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newParams = [...(endpoint.parameters || []), {
                    name: '',
                    type: 'string',
                    description: '',
                    required: false,
                    example: ''
                  }];
                  handleEndpointChange(index, 'parameters', newParams);
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                + Add Parameter
              </button>
            </div>

            {/* Response Schema */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-300">Response Schema</h4>
                <button
                  onClick={() => {
                    // Show schema selector
                  }}
                  className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                >
                  <Link className="w-4 h-4" />
                  Link to Model
                </button>
              </div>
              <select
                value={endpoint.responseSchema}
                onChange={(e) => handleEndpointChange(index, 'responseSchema', e.target.value)}
                className="w-full bg-slate-700 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select a model...</option>
                {Object.keys(schema).map(modelName => (
                  <option key={modelName} value={modelName}>{modelName}</option>
                ))}
              </select>
            </div>

            {/* Export Options */}
            {viewLevel === 'low' && (
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
                <button
                  onClick={() => {
                    // Copy Zod schema
                    navigator.clipboard.writeText(generateZodSchema(endpoint));
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600"
                >
                  <FileJson className="w-4 h-4" />
                  Copy Zod Schema
                </button>
                <button
                  onClick={() => {
                    // Show validation settings
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg text-sm hover:bg-slate-600"
                >
                  <AlertCircle className="w-4 h-4" />
                  Validation Settings
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
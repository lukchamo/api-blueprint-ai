import React from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';

interface ApiGenerationResultProps {
  result: {
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
    schema: {
      [key: string]: {
        fields: Array<{
          name: string;
          type: string;
          required: boolean;
        }>;
      };
    };
    documentation: string;
  };
}

export function ApiGenerationResult({ result }: ApiGenerationResultProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Generation Complete</span>
            </div>
            <h1 className="text-3xl font-bold">Your API Blueprint</h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
              <Copy className="w-4 h-4" />
              Copy Code
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Open in Editor
            </button>
          </div>
        </div>

        {/* Endpoints Section */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-4">
            {result.endpoints.map((endpoint, index) => (
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
                <p className="text-gray-400 text-sm">{endpoint.description}</p>
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Parameters:</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {endpoint.parameters.map((param, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-2 text-gray-400">
                          <span className="font-mono">{param.name}</span>
                          <span className="text-gray-500">({param.type})</span>
                          {param.required && (
                            <span className="text-xs text-red-400">required</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Schema Section */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Data Models</h2>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(result.schema).map(([model, { fields }]) => (
              <div key={model} className="border border-slate-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">{model}</h3>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-300">{field.name}</span>
                        <span className="text-gray-500">{field.type}</span>
                      </div>
                      {field.required && (
                        <span className="text-xs text-red-400">required</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Preview */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Documentation Preview</h2>
          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result.documentation }} />
          </div>
        </div>
      </div>
    </div>
  );
}
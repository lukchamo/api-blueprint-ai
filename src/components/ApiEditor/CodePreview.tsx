import React from 'react';
import { FileJson } from 'lucide-react';

interface CodePreviewProps {
  data: {
    endpoints: any[];
    schema: Record<string, any>;
  };
}

export function CodePreview({ data }: CodePreviewProps) {
  const generateTypeScript = () => {
    let code = '// Generated TypeScript types\n\n';
    
    // Generate types for schemas
    Object.entries(data.schema).forEach(([name, schema]) => {
      code += `interface ${name} {\n`;
      (schema as any).fields.forEach((field: any) => {
        code += `  ${field.name}${field.required ? '' : '?'}: ${field.type};\n`;
      });
      code += '}\n\n';
    });

    // Generate API client
    code += '// API Client\n';
    code += 'class ApiClient {\n';
    data.endpoints.forEach(endpoint => {
      const methodName = endpoint.path.split('/').pop();
      code += `  async ${methodName}(`;
      if (endpoint.parameters?.length) {
        code += 'params: {\n';
        endpoint.parameters.forEach((param: any) => {
          code += `    ${param.name}${param.required ? '' : '?'}: ${param.type};\n`;
        });
        code += '  }';
      }
      code += ') {\n';
      code += `    return fetch('${endpoint.path}', {\n`;
      code += `      method: '${endpoint.method}',\n`;
      code += '    });\n';
      code += '  }\n\n';
    });
    code += '}\n';

    return code;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Generated Code</h2>
        <button
          onClick={() => navigator.clipboard.writeText(generateTypeScript())}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
        >
          <FileJson className="w-4 h-4" />
          Copy Code
        </button>
      </div>
      <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">
          {generateTypeScript()}
        </code>
      </pre>
    </div>
  );
}
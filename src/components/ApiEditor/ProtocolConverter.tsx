import React, { useState } from 'react';
import { ArrowRight, Code2, Loader2 } from 'lucide-react';

interface ProtocolConverterProps {
  endpoints: any[];
  schema: Record<string, any>;
}

export function ProtocolConverter({ endpoints, schema }: ProtocolConverterProps) {
  const [targetProtocol, setTargetProtocol] = useState<'graphql' | 'grpc'>('graphql');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedCode, setConvertedCode] = useState<string | null>(null);

  const handleConvert = async () => {
    setIsConverting(true);
    setConvertedCode(null);

    // Simulate conversion
    await new Promise(resolve => setTimeout(resolve, 2000));

    let code = '';
    if (targetProtocol === 'graphql') {
      code = generateGraphQLSchema(endpoints, schema);
    } else {
      code = generateProtoSchema(endpoints, schema);
    }

    setConvertedCode(code);
    setIsConverting(false);
  };

  const generateGraphQLSchema = (endpoints: any[], schema: any) => {
    let code = '# GraphQL Schema\n\n';

    // Types
    Object.entries(schema).forEach(([name, { fields }]: [string, any]) => {
      code += `type ${name} {\n`;
      fields.forEach((field: any) => {
        code += `  ${field.name}: ${mapTypeToGraphQL(field.type)}${field.required ? '!' : ''}\n`;
      });
      code += '}\n\n';
    });

    // Queries and Mutations
    code += 'type Query {\n';
    endpoints.filter(e => e.method === 'GET').forEach(endpoint => {
      const name = endpoint.path.split('/').pop();
      code += `  ${name}: ${endpoint.responseSchema || 'JSON'}\n`;
    });
    code += '}\n\n';

    code += 'type Mutation {\n';
    endpoints.filter(e => e.method !== 'GET').forEach(endpoint => {
      const name = endpoint.path.split('/').pop();
      code += `  ${name}(input: ${name}Input!): ${endpoint.responseSchema || 'JSON'}\n`;
    });
    code += '}\n';

    return code;
  };

  const generateProtoSchema = (endpoints: any[], schema: any) => {
    let code = 'syntax = "proto3";\n\n';
    code += 'package api;\n\n';

    // Messages
    Object.entries(schema).forEach(([name, { fields }]: [string, any]) => {
      code += `message ${name} {\n`;
      fields.forEach((field: any, index: number) => {
        code += `  ${mapTypeToProto(field.type)} ${field.name} = ${index + 1};\n`;
      });
      code += '}\n\n';
    });

    // Service
    code += 'service APIService {\n';
    endpoints.forEach(endpoint => {
      const name = endpoint.path.split('/').pop();
      code += `  rpc ${name}(${name}Request) returns (${name}Response);\n`;
    });
    code += '}\n';

    return code;
  };

  const mapTypeToGraphQL = (type: string) => {
    const typeMap: Record<string, string> = {
      'string': 'String',
      'number': 'Float',
      'integer': 'Int',
      'boolean': 'Boolean',
      'array': '[JSON]',
      'object': 'JSON'
    };
    return typeMap[type] || 'String';
  };

  const mapTypeToProto = (type: string) => {
    const typeMap: Record<string, string> = {
      'string': 'string',
      'number': 'double',
      'integer': 'int32',
      'boolean': 'bool',
      'array': 'repeated string',
      'object': 'map<string, string>'
    };
    return typeMap[type] || 'string';
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Protocol Converter</h2>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={targetProtocol}
          onChange={(e) => setTargetProtocol(e.target.value as 'graphql' | 'grpc')}
          className="bg-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="graphql">GraphQL</option>
          <option value="grpc">gRPC</option>
        </select>

        <button
          onClick={handleConvert}
          disabled={isConverting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors"
        >
          {isConverting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              Convert
            </>
          )}
        </button>
      </div>

      {convertedCode && (
        <div className="relative">
          <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-gray-300">{convertedCode}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(convertedCode)}
            className="absolute top-2 right-2 p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Server, Globe, Database, Braces, Workflow, Network } from 'lucide-react';

interface ProjectTypeStepProps {
  value: string;
  onChange: (value: string) => void;
}

const projectTypes = [
  {
    id: 'rest',
    title: 'REST API',
    description: 'Traditional RESTful API with endpoints and resources',
    icon: Server,
    color: 'blue',
    features: ['Resource-based endpoints', 'HTTP methods', 'Status codes', 'CRUD operations']
  },
  {
    id: 'graphql',
    title: 'GraphQL API',
    description: 'Flexible API with a single endpoint and type system',
    icon: Braces,
    color: 'purple',
    features: ['Type system', 'Query language', 'Real-time subscriptions', 'Nested resolvers']
  },
  {
    id: 'grpc',
    title: 'gRPC Microservices',
    description: 'High-performance RPC framework for microservices',
    icon: Network,
    color: 'emerald',
    features: ['Protocol buffers', 'Bi-directional streaming', 'Code generation', 'Service discovery']
  }
];

export function ProjectTypeStep({ value, onChange }: ProjectTypeStepProps) {
  return (
    <div className="space-y-8">
      {/* Project Type Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {projectTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`
              relative p-6 rounded-xl border transition-all duration-300
              ${value === type.id 
                ? `bg-${type.color}-500/20 border-${type.color}-500/50` 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-lg mb-4 flex items-center justify-center
              ${value === type.id 
                ? `bg-${type.color}-500/30` 
                : 'bg-slate-700/30'
              }
            `}>
              <type.icon className={`
                w-6 h-6
                ${value === type.id 
                  ? `text-${type.color}-400` 
                  : 'text-gray-400'
                }
              `} />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{type.description}</p>

            {/* Features */}
            <div className="space-y-2">
              {type.features.map((feature, index) => (
                <div 
                  key={index}
                  className={`
                    text-xs px-2 py-1 rounded-full inline-block mr-2
                    ${value === type.id 
                      ? `bg-${type.color}-500/30 text-${type.color}-300` 
                      : 'bg-slate-700/30 text-gray-400'
                    }
                  `}
                >
                  {feature}
                </div>
              ))}
            </div>

            {value === type.id && (
              <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Type Details */}
      {value && (
        <div className={`
          p-6 rounded-xl border
          ${value === 'rest' ? 'bg-blue-500/10 border-blue-500/30' :
            value === 'graphql' ? 'bg-purple-500/10 border-purple-500/30' :
            'bg-emerald-500/10 border-emerald-500/30'}
        `}>
          <h4 className="text-lg font-semibold text-white mb-4">
            {projectTypes.find(t => t.id === value)?.title} Development Guide
          </h4>
          <div className="prose prose-invert max-w-none">
            {value === 'rest' && (
              <p className="text-gray-300">
                REST APIs are built around resources and HTTP methods. We'll help you design
                clear endpoints, implement proper status codes, and ensure your API follows
                RESTful principles.
              </p>
            )}
            {value === 'graphql' && (
              <p className="text-gray-300">
                GraphQL provides a single endpoint with a powerful query language. We'll guide
                you through schema design, resolver implementation, and type system optimization.
              </p>
            )}
            {value === 'grpc' && (
              <p className="text-gray-300">
                gRPC uses Protocol Buffers for efficient communication. We'll help you define
                services, implement streaming, and set up proper service discovery mechanisms.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
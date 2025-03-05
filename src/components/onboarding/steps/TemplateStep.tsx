import React from 'react';
import { ShoppingCart, Users, BarChart as ChartBar, MessageSquare, Calendar, FileSearch, Network, Database, Workflow, Boxes, Activity, Share2 } from 'lucide-react';

interface TemplateStepProps {
  value: string;
  projectType: string;
  onChange: (value: string) => void;
}

const templates = {
  rest: [
    {
      id: 'ecommerce',
      title: 'E-commerce API',
      description: 'Product catalog, cart, and order management',
      icon: ShoppingCart,
      color: 'blue',
      features: ['Product management', 'Shopping cart', 'Order processing', 'Payment integration']
    },
    {
      id: 'social',
      title: 'Social Network',
      description: 'Users, posts, comments, and interactions',
      icon: Users,
      color: 'purple',
      features: ['User profiles', 'Content management', 'Social interactions', 'Activity feeds']
    },
    {
      id: 'analytics',
      title: 'Analytics API',
      description: 'Event tracking and data aggregation',
      icon: ChartBar,
      color: 'cyan',
      features: ['Event tracking', 'Data aggregation', 'Custom reporting', 'Real-time metrics']
    }
  ],
  graphql: [
    {
      id: 'content-platform',
      title: 'Content Platform',
      description: 'Flexible content management with rich relationships',
      icon: MessageSquare,
      color: 'purple',
      features: [
        'Content types & schemas',
        'Nested relationships',
        'Real-time subscriptions',
        'Field-level permissions'
      ]
    },
    {
      id: 'booking-system',
      title: 'Booking System',
      description: 'Advanced scheduling and reservation management',
      icon: Calendar,
      color: 'blue',
      features: [
        'Resource scheduling',
        'Availability queries',
        'Complex filtering',
        'Real-time updates'
      ]
    },
    {
      id: 'knowledge-base',
      title: 'Knowledge Base',
      description: 'Documentation and knowledge management system',
      icon: FileSearch,
      color: 'emerald',
      features: [
        'Document graphs',
        'Advanced search',
        'Version control',
        'Metadata management'
      ]
    }
  ],
  grpc: [
    {
      id: 'service-mesh',
      title: 'Service Mesh',
      description: 'Distributed system with service discovery',
      icon: Network,
      color: 'emerald',
      features: [
        'Service registry',
        'Load balancing',
        'Circuit breaking',
        'Health checks'
      ]
    },
    {
      id: 'data-pipeline',
      title: 'Data Pipeline',
      description: 'Real-time data processing and streaming',
      icon: Workflow,
      color: 'blue',
      features: [
        'Stream processing',
        'Data transformation',
        'Event sourcing',
        'Message queuing'
      ]
    },
    {
      id: 'distributed-cache',
      title: 'Distributed Cache',
      description: 'High-performance distributed caching system',
      icon: Database,
      color: 'purple',
      features: [
        'Cache invalidation',
        'Replication',
        'Partitioning',
        'Consistency protocols'
      ]
    }
  ]
};

const projectTypeInfo = {
  rest: {
    title: 'REST API Templates',
    description: 'Traditional HTTP-based APIs with clear resource endpoints'
  },
  graphql: {
    title: 'GraphQL Templates',
    description: 'Schema-first APIs with flexible querying capabilities'
  },
  grpc: {
    title: 'gRPC Microservices Templates',
    description: 'High-performance RPC-based distributed services'
  }
};

export function TemplateStep({ value, projectType, onChange }: TemplateStepProps) {
  const availableTemplates = templates[projectType as keyof typeof templates] || templates.rest;
  const typeInfo = projectTypeInfo[projectType as keyof typeof projectTypeInfo];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3">{typeInfo.title}</h3>
        <p className="text-gray-400">{typeInfo.description}</p>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`
              group relative p-6 rounded-xl border text-left transition-all duration-300
              ${value === template.id 
                ? `bg-${template.color}-500/20 border-${template.color}-500/50` 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }
            `}
          >
            {/* Icon */}
            <div className={`
              w-12 h-12 rounded-lg mb-4 flex items-center justify-center
              transition-all duration-300 group-hover:scale-110
              ${value === template.id 
                ? `bg-${template.color}-500/30` 
                : 'bg-slate-700/30'
              }
            `}>
              <template.icon className={`
                w-6 h-6
                ${value === template.id 
                  ? `text-${template.color}-400` 
                  : 'text-gray-400'
                }
              `} />
            </div>

            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:translate-x-1 transition-transform">
                {template.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{template.description}</p>
            </div>

            {/* Features */}
            <ul className="space-y-2">
              {template.features.map((feature, index) => (
                <li 
                  key={index}
                  className={`
                    flex items-center gap-2 text-sm
                    transform group-hover:translate-x-2
                    transition-transform duration-300
                    ${value === template.id ? `text-${template.color}-300` : 'text-gray-400'}
                  `}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className={`
                    w-1.5 h-1.5 rounded-full
                    ${value === template.id ? `bg-${template.color}-400` : 'bg-gray-500'}
                  `} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Selection Indicator */}
            {value === template.id && (
              <div className={`
                absolute inset-0 border-2 rounded-xl pointer-events-none
                border-${template.color}-500/50
              `} />
            )}
          </button>
        ))}
      </div>

      {/* Selected Template Info */}
      {value && (
        <div className={`
          p-6 rounded-xl border bg-slate-800/50
          ${value.startsWith('service') || value.startsWith('data') || value.startsWith('distributed')
            ? 'border-emerald-500/30'
            : value.startsWith('content') || value.startsWith('booking') || value.startsWith('knowledge')
              ? 'border-purple-500/30'
              : 'border-blue-500/30'
          }
        `}>
          <h4 className="text-lg font-semibold text-white mb-4">
            Template Details
          </h4>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              {projectType === 'graphql' && 'This GraphQL template provides a schema-first approach with type definitions, resolvers, and real-time subscription capabilities.'}
              {projectType === 'grpc' && 'This gRPC template includes protocol buffer definitions, service implementations, and client/server streaming examples.'}
              {projectType === 'rest' && 'This REST API template follows best practices with clear resource endpoints, proper status codes, and comprehensive documentation.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
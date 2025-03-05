import React from 'react';
import { Check } from 'lucide-react';

interface ConfigurationStepProps {
  value: {
    name: string;
    description: string;
    features: string[];
  };
  template: string;
  onChange: (value: any) => void;
}

export function ConfigurationStep({ value, template, onChange }: ConfigurationStepProps) {
  const handleChange = (key: string, newValue: any) => {
    onChange({ ...value, [key]: newValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Project Name
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="My Awesome API"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Description
        </label>
        <textarea
          value={value.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Describe your API project..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-4">
          Features
        </label>
        <div className="space-y-3">
          {getTemplateFeatures(template).map((feature) => (
            <label
              key={feature.id}
              className="flex items-center p-4 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-600 transition-colors"
            >
              <input
                type="checkbox"
                checked={value.features.includes(feature.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleChange('features', [...value.features, feature.id]);
                  } else {
                    handleChange('features', value.features.filter((f: string) => f !== feature.id));
                  }
                }}
                className="hidden"
              />
              <div className={`
                w-5 h-5 rounded border mr-3 flex items-center justify-center
                ${value.features.includes(feature.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-600'
                }
              `}>
                {value.features.includes(feature.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-white">{feature.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function getTemplateFeatures(template: string) {
  // This would be expanded based on the selected template
  return [
    { id: 'auth', name: 'Authentication & Authorization' },
    { id: 'docs', name: 'Auto-generated Documentation' },
    { id: 'testing', name: 'Test Suite Generation' },
    { id: 'monitoring', name: 'Performance Monitoring' }
  ];
}
import React, { useState } from 'react';
import { Plus, Trash2, Wand2, Link, FileJson, Book, Loader2 } from 'lucide-react';
import { z } from 'zod';

// Base validation schemas
const validationSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().optional()
}).optional().default({});

const fieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.string().min(1, "Field type is required"),
  description: z.string().optional().default(""),
  required: z.boolean().default(false),
  example: z.string().optional().default(""),
  validation: validationSchema
});

const relationshipSchema = z.object({
  type: z.enum(['one-to-one', 'one-to-many', 'many-to-one', 'many-to-many']),
  model: z.string().min(1, "Related model is required"),
  field: z.string().min(1, "Related field is required")
});

const modelSchema = z.object({
  description: z.string().min(1, "Model description is required"),
  fields: z.array(fieldSchema).default([]),
  relationships: z.array(relationshipSchema).optional().default([])
});

interface SchemaEditorProps {
  schema: Record<string, any>;
  viewLevel: 'high' | 'low';
  onChange: (schema: Record<string, any>) => void;
}

export function SchemaEditor({ schema, viewLevel, onChange }: SchemaEditorProps) {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const validateModel = (model: any) => {
    try {
      return modelSchema.parse(model);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors);
      }
      return null;
    }
  };

  const handleAddModel = () => {
    const newModel = {
      description: "Description of the model",
      fields: [],
      relationships: []
    };

    const validatedModel = validateModel(newModel);
    if (validatedModel) {
      onChange({
        ...schema,
        ['NewModel']: validatedModel
      });
    }
  };

  const handleModelChange = (modelName: string, field: string, value: any) => {
    const newSchema = { ...schema };
    const currentModel = newSchema[modelName] || {};
    const updatedModel = { 
      ...currentModel, 
      [field]: value 
    };

    const validatedModel = validateModel(updatedModel);
    if (validatedModel) {
      newSchema[modelName] = validatedModel;
      onChange(newSchema);
    }
  };

  const handleFieldChange = (modelName: string, fieldIndex: number, updates: Partial<z.infer<typeof fieldSchema>>) => {
    const newSchema = { ...schema };
    const model = newSchema[modelName];
    const updatedFields = [...(model.fields || [])];
    
    const currentField = updatedFields[fieldIndex] || {};
    const updatedField = {
      ...currentField,
      ...updates
    };

    try {
      const validatedField = fieldSchema.parse(updatedField);
      updatedFields[fieldIndex] = validatedField;
      handleModelChange(modelName, 'fields', updatedFields);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Field validation error:', error.errors);
      }
    }
  };

  const handleAddField = (modelName: string) => {
    const newField = {
      name: '',
      type: 'string',
      description: '',
      required: false,
      example: '',
      validation: {}
    };

    try {
      const validatedField = fieldSchema.parse(newField);
      const newFields = [...(schema[modelName]?.fields || []), validatedField];
      handleModelChange(modelName, 'fields', newFields);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Field validation error:', error.errors);
      }
    }
  };

  const handleAiSuggestFields = async (modelName: string) => {
    setIsAiLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const suggestedFields = [
        {
          name: 'id',
          type: 'string',
          description: 'Unique identifier for the record',
          required: true,
          example: 'uuid-v4',
          validation: { pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' }
        },
        {
          name: 'createdAt',
          type: 'date',
          description: 'Timestamp when the record was created',
          required: true,
          example: '2024-03-15T10:30:00Z',
          validation: {}
        },
        {
          name: 'updatedAt',
          type: 'date',
          description: 'Timestamp when the record was last updated',
          required: true,
          example: '2024-03-15T10:30:00Z',
          validation: {}
        }
      ];

      const validatedFields = suggestedFields.map(field => fieldSchema.parse(field));
      const newFields = [...(schema[modelName]?.fields || []), ...validatedFields];
      handleModelChange(modelName, 'fields', newFields);
    } catch (error) {
      console.error('Error suggesting fields:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCustomAiPrompt = async (modelName: string, prompt: string) => {
    if (!prompt.trim()) return;

    setIsAiLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const suggestedField = {
        name: prompt.toLowerCase().replace(/\s+/g, '_'),
        type: 'string',
        description: `Field generated from prompt: ${prompt}`,
        required: false,
        example: 'example value',
        validation: {}
      };

      const validatedField = fieldSchema.parse(suggestedField);
      const newFields = [...(schema[modelName]?.fields || []), validatedField];
      handleModelChange(modelName, 'fields', newFields);
      setCustomPrompt('');
    } catch (error) {
      console.error('Error processing custom prompt:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddRelationship = (modelName: string) => {
    const newRelationship = {
      type: 'one-to-many' as const,
      model: '',
      field: ''
    };

    try {
      const validatedRelationship = relationshipSchema.parse(newRelationship);
      const newRelationships = [...(schema[modelName]?.relationships || []), validatedRelationship];
      handleModelChange(modelName, 'relationships', newRelationships);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Relationship validation error:', error.errors);
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-semibold">Data Models</h2>
        <button
          onClick={handleAddModel}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors text-base"
        >
          <Plus className="w-5 h-5" />
          Add Model
        </button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {Object.entries(schema).map(([modelName, model]) => (
          <div key={modelName} className="border border-slate-700 rounded-xl p-6 space-y-6">
            {/* Model Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                type="text"
                value={modelName}
                onChange={(e) => {
                  const newSchema = { ...schema };
                  const modelData = newSchema[modelName];
                  delete newSchema[modelName];
                  newSchema[e.target.value] = modelData;
                  onChange(newSchema);
                }}
                className="flex-1 min-w-[200px] bg-slate-700 rounded-lg px-4 py-2.5 text-base font-medium"
                placeholder="Model name"
              />
              <button
                onClick={() => {
                  const newSchema = { ...schema };
                  delete newSchema[modelName];
                  onChange(newSchema);
                }}
                className="text-red-400 hover:text-red-300 transition-colors p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Model Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Book className="w-5 h-5 text-gray-400" />
                <label className="text-base text-gray-400">Description</label>
              </div>
              <textarea
                value={model.description || ''}
                onChange={(e) => handleModelChange(modelName, 'description', e.target.value)}
                className="w-full bg-slate-700 rounded-lg px-4 py-3 text-base"
                placeholder="Describe the purpose and usage of this model..."
                rows={3}
              />
            </div>

            {/* Fields Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h4 className="text-lg font-medium text-gray-300">Fields</h4>
                <button
                  onClick={() => handleAiSuggestFields(modelName)}
                  disabled={isAiLoading}
                  className="flex items-center gap-2 text-base text-purple-400 hover:text-purple-300 px-3 py-1.5 rounded-lg hover:bg-purple-500/10"
                >
                  {isAiLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  Suggest Fields
                </button>
              </div>

              {/* Custom AI Prompt */}
              <div className="relative">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ask AI to add a specific field..."
                  className="w-full bg-slate-700 rounded-lg px-4 py-3 text-base pr-32"
                />
                <button
                  onClick={() => handleCustomAiPrompt(modelName, customPrompt)}
                  disabled={isAiLoading || !customPrompt.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-purple-600 text-white rounded-lg disabled:opacity-50 hover:bg-purple-500 transition-colors text-base"
                >
                  {isAiLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Add Field'
                  )}
                </button>
              </div>

              {/* Fields List */}
              <div className="space-y-3">
                {(model.fields || []).map((field: any, index: number) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={field.name || ''}
                        onChange={(e) => handleFieldChange(modelName, index, { name: e.target.value })}
                        className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                        placeholder="Field name"
                      />
                      <select
                        value={field.type || 'string'}
                        onChange={(e) => handleFieldChange(modelName, index, { type: e.target.value })}
                        className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                      >
                        {['string', 'number', 'boolean', 'array', 'object', 'date'].map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={field.description || ''}
                        onChange={(e) => handleFieldChange(modelName, index, { description: e.target.value })}
                        className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                        placeholder="Field description"
                      />
                      <input
                        type="text"
                        value={field.example || ''}
                        onChange={(e) => handleFieldChange(modelName, index, { example: e.target.value })}
                        className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                        placeholder="Example value"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={field.required || false}
                          onChange={(e) => handleFieldChange(modelName, index, { required: e.target.checked })}
                          className="rounded border-slate-600 bg-slate-700 w-5 h-5"
                        />
                        <span className="text-base text-gray-400">Required field</span>
                      </label>
                      <button
                        onClick={() => {
                          const newFields = (model.fields || []).filter((_: any, i: number) => i !== index);
                          handleModelChange(modelName, 'fields', newFields);
                        }}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Field Button */}
                <button
                  onClick={() => handleAddField(modelName)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-blue-400 hover:text-blue-300"
                >
                  <Plus className="w-5 h-5" />
                  Add New Field
                </button>
              </div>

              {/* Model Relationships */}
              {viewLevel === 'low' && (
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h4 className="text-lg font-medium text-gray-300">Relationships</h4>
                    <button
                      onClick={() => handleAddRelationship(modelName)}
                      className="flex items-center gap-2 text-base text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/10"
                    >
                      <Link className="w-5 h-5" />
                      Add Relationship
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(model.relationships || []).map((rel: any, index: number) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <select
                            value={rel.type || 'one-to-many'}
                            onChange={(e) => {
                              const newRelationships = [...(model.relationships || [])];
                              newRelationships[index] = { ...rel, type: e.target.value };
                              handleModelChange(modelName, 'relationships', newRelationships);
                            }}
                            className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                          >
                            <option value="one-to-one">One-to-One</option>
                            <option value="one-to-many">One-to-Many</option>
                            <option value="many-to-one">Many-to-One</option>
                            <option value="many-to-many">Many-to-Many</option>
                          </select>
                          <select
                            value={rel.model || ''}
                            onChange={(e) => {
                              const newRelationships = [...(model.relationships || [])];
                              newRelationships[index] = { ...rel, model: e.target.value };
                              handleModelChange(modelName, 'relationships', newRelationships);
                            }}
                            className="bg-slate-700 rounded-lg px-4 py-2.5 text-base w-full"
                          >
                            <option value="">Select model...</option>
                            {Object.keys(schema).filter(m => m !== modelName).map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              const newRelationships = (model.relationships || []).filter((_: any, i: number) => i !== index);
                              handleModelChange(modelName, 'relationships', newRelationships);
                            }}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
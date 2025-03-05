import React, { useState } from 'react';
import { Layout, Code2, Eye, History, Wand2, ArrowLeft, Save } from 'lucide-react';
import { EndpointEditor } from './EndpointEditor';
import { SchemaEditor } from './SchemaEditor';
import { VersionHistory } from './VersionHistory';
import { AiSuggestions } from './AiSuggestions';
import { ViewMode } from './ViewMode';

type EditorMode = 'code' | 'preview' | 'history';
type ViewLevel = 'high' | 'low';

interface ApiEditorProps {
  initialData: {
    endpoints: any[];
    schema: Record<string, any>;
  };
  onBack: () => void;
  onSave: (data: any) => void;
}

export function ApiEditor({ initialData, onBack, onSave }: ApiEditorProps) {
  const [mode, setMode] = useState<EditorMode>('code');
  const [viewLevel, setViewLevel] = useState<ViewLevel>('high');
  const [currentData, setCurrentData] = useState(initialData);
  const [history, setHistory] = useState([{ timestamp: Date.now(), data: initialData }]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleDataChange = (newData: any) => {
    setCurrentData(newData);
    setHistory(prev => [...prev, { timestamp: Date.now(), data: newData }]);
  };

  const handleEndpointsChange = (newEndpoints: any[]) => {
    handleDataChange({ ...currentData, endpoints: newEndpoints });
  };

  const handleSchemaChange = (newSchema: Record<string, any>) => {
    handleDataChange({ ...currentData, schema: newSchema });
  };

  const handleAiSuggest = () => {
    // Mock AI suggestions
    setAiSuggestions([
      'Add pagination metadata to GET /products response',
      'Include rate limiting headers in responses',
      'Add search endpoint with fuzzy matching',
      'Consider adding bulk operations endpoint'
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold">API Editor</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode('code')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${mode === 'code' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <Code2 className="w-4 h-4" />
                Code
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${mode === 'preview' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setMode('history')}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors
                  ${mode === 'history' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                <History className="w-4 h-4" />
                History
              </button>
              <div className="w-px h-6 bg-slate-700 mx-2" />
              <button
                onClick={() => setViewLevel(prev => prev === 'high' ? 'low' : 'high')}
                className="px-3 py-2 rounded-lg flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Layout className="w-4 h-4" />
                {viewLevel === 'high' ? 'High Level' : 'Low Level'}
              </button>
              <button
                onClick={handleAiSuggest}
                className="px-3 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
                AI Suggest
              </button>
              <button
                onClick={() => onSave(currentData)}
                className="px-3 py-2 rounded-lg flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Main Editor Area */}
          <div className="col-span-2 space-y-6">
            {mode === 'code' && (
              <>
                <EndpointEditor
                  endpoints={currentData.endpoints}
                  schema={currentData.schema}
                  viewLevel={viewLevel}
                  onChange={handleEndpointsChange}
                />
                <SchemaEditor
                  schema={currentData.schema}
                  viewLevel={viewLevel}
                  onChange={handleSchemaChange}
                />
              </>
            )}
            {mode === 'preview' && (
              <ViewMode data={currentData} viewLevel={viewLevel} />
            )}
            {mode === 'history' && (
              <VersionHistory
                history={history}
                onRestore={(data) => setCurrentData(data)}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AiSuggestions
              suggestions={aiSuggestions}
              onApply={(suggestion) => {
                // Handle applying AI suggestion
                console.log('Applying suggestion:', suggestion);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
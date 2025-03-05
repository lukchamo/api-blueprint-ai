import React, { useState } from 'react';
import { Wand2, Plus, Send, Loader2 } from 'lucide-react';

interface AiSuggestionsProps {
  suggestions: string[];
  onApply: (suggestion: string) => void;
}

export function AiSuggestions({ suggestions, onApply }: AiSuggestionsProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    onApply(customPrompt);
    setCustomPrompt('');
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Wand2 className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </div>

      {/* Custom Prompt Input */}
      <div className="mb-6">
        <div className="relative">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ask AI to help with your API design..."
            className="w-full h-24 bg-slate-900 rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none"
          />
          <button
            onClick={handleCustomPrompt}
            disabled={isLoading || !customPrompt.trim()}
            className="absolute bottom-3 right-3 p-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="border border-slate-700 rounded-lg p-4 hover:border-purple-500/30 transition-all group"
          >
            <p className="text-gray-300 text-sm mb-3">{suggestion}</p>
            <button
              onClick={() => onApply(suggestion)}
              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Apply Suggestion
            </button>
          </div>
        ))}
      </div>

      {suggestions.length === 0 && !isLoading && (
        <p className="text-gray-400 text-sm">
          Use the AI assistant to get intelligent recommendations for your API design.
        </p>
      )}
    </div>
  );
}
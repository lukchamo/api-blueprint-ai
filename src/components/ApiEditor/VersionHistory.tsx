import React from 'react';
import { History, RotateCcw } from 'lucide-react';

interface VersionHistoryProps {
  history: Array<{
    timestamp: number;
    data: any;
  }>;
  onRestore: (data: any) => void;
}

export function VersionHistory({ history, onRestore }: VersionHistoryProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl font-semibold">Version History</h2>
      </div>

      <div className="space-y-4">
        {history.map((version, index) => (
          <div
            key={index}
            className="border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm text-gray-400">
                  {new Date(version.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  Version {history.length - index}
                </div>
              </div>
              <button
                onClick={() => onRestore(version.data)}
                className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Restore
              </button>
            </div>

            <div className="text-sm text-gray-400">
              <div>
                {version.data.endpoints.length} endpoints,{' '}
                {Object.keys(version.data.schema).length} models
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
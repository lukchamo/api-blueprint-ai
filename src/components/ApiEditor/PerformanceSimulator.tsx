import React, { useState } from 'react';
import { Activity, Play, RefreshCw } from 'lucide-react';

interface PerformanceSimulatorProps {
  data: {
    endpoints: Array<{
      method: string;
      path: string;
    }>;
  };
}

interface SimulationResult {
  endpoint: string;
  method: string;
  latency: number;
  successRate: number;
  requestsPerSecond: number;
}

export function PerformanceSimulator({ data }: PerformanceSimulatorProps) {
  const [concurrentUsers, setConcurrentUsers] = useState(100);
  const [duration, setDuration] = useState(30);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate performance testing
    const simulatedResults = data.endpoints.map(endpoint => ({
      endpoint: endpoint.path,
      method: endpoint.method,
      latency: Math.random() * 200 + 50, // 50-250ms
      successRate: Math.random() * 10 + 90, // 90-100%
      requestsPerSecond: Math.floor(Math.random() * 1000 + 500) // 500-1500 RPS
    }));

    setTimeout(() => {
      setResults(simulatedResults);
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Performance Test Configuration</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Concurrent Users
            </label>
            <input
              type="number"
              value={concurrentUsers}
              onChange={(e) => setConcurrentUsers(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Duration (seconds)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white"
            />
          </div>
        </div>
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 rounded-lg text-white transition-colors"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Run Simulation
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Simulation Results</h2>
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className={`
                      px-2 py-1 rounded text-sm font-mono
                      ${result.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                        result.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                        result.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'}
                    `}>
                      {result.method}
                    </span>
                    <code className="ml-2 text-gray-300">{result.endpoint}</code>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Avg. Latency</div>
                    <div className="text-2xl font-semibold text-white">
                      {result.latency.toFixed(1)}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Success Rate</div>
                    <div className="text-2xl font-semibold text-white">
                      {result.successRate.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Requests/sec</div>
                    <div className="text-2xl font-semibold text-white">
                      {result.requestsPerSecond}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
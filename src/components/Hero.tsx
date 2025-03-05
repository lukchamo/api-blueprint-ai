import React from 'react';
import { ChevronRight, Play, Sparkles, Code2, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 backdrop-blur-[120px] mix-blend-normal" />
          <div className="absolute inset-0 bg-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50" />
        </div>
        
        {/* Animated Dots */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 p-8 pointer-events-none select-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative">
        <div className="text-center">
          {/* Floating Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">AI-Powered API Design</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Design APIs with
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-50"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> AI-Powered</span>
            </span>
            <br />Intelligence
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up-delay leading-relaxed">
            Transform your API development workflow with AI-driven insights. Design, simulate, 
            and optimize your APIs before writing a single line of code.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up-delay">
            <div className="flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
              <Code2 className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-gray-300">Auto Documentation</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
              <Zap className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-gray-300">Real-time Testing</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up-delay-2">
            <button 
              onClick={onGetStarted}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all group transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start Building Free
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {/* <button  className="flex items-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all group transform hover:scale-105 disabled">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10x</div>
              <div className="text-gray-400">Faster Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">API Templates</div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">AI Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
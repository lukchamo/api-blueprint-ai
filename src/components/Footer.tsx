import React from 'react';
import { Github, Twitter, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">API Blueprint AI</span>
            </div>
            <p className="text-gray-400 mb-6">
              Design robust APIs in minutes with AI-powered assistance. Transform your API development workflow.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#templates" className="text-gray-400 hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/lukchamo/api-blueprint-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="space-y-4">
              <a 
                href="https://github.com/lukchamo/api-blueprint-ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a 
                href="https://twitter.com/lukchamo" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & License */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400">
              © 2024 API Blueprint AI. Created by{' '}
              <a 
                href="https://github.com/lukchamo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                @lukchamo
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/lukchamo/api-blueprint-ai/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                MIT License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
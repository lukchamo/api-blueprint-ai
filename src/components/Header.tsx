import React, { useState } from 'react';
import { Code2, Github, Menu, X, AlertCircle } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <>
      {/* Disclaimer Banner */}
      {showDisclaimer && (
        <div className="bg-blue-600/20 border-b border-blue-500/20 text-blue-300">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">
                This is a prototype with mock data to demonstrate the concept. Features are simulated for demonstration purposes.
              </p>
            </div>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="text-blue-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed w-full top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-slate-800">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">API Blueprint AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </a>
              <a 
                href="#templates" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Templates
              </a>
              <a 
                href="https://github.com/lukchamo/api-blueprint-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                Open Source
              </a>
              {/* <button 
                onClick={() => {
                  document.querySelector('#get-started')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                Get Started
              </button> */}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a 
                href="#features"
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Features
              </a>
              <a 
                href="#templates"
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                Templates
              </a>
              <a 
                href="https://github.com/lukchamo/api-blueprint-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors py-2"
              >
                <Github className="w-4 h-4 mr-2" />
                Open Source
              </a>
              {/* <button 
                onClick={() => {
                  document.querySelector('#get-started')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button> */}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
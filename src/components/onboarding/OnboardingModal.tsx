import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { ProjectTypeStep } from './steps/ProjectTypeStep';
import { TemplateStep } from './steps/TemplateStep';
import { ConfigurationStep } from './steps/ConfigurationStep';
import { ApiEditor } from '../ApiEditor';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 'project', title: 'Project Type' },
  { id: 'template', title: 'Select Template' },
  { id: 'configure', title: 'Configuration' }
];

const initialFormData = {
  projectType: '',
  template: '',
  configuration: {
    name: '',
    description: '',
    features: []
  }
};

const initialApiData = {
  endpoints: [
    {
      method: 'GET',
      path: '/api/hello',
      description: 'Welcome endpoint',
      parameters: []
    }
  ],
  schema: {
    Example: {
      fields: [
        { name: 'id', type: 'string', required: true },
        { name: 'name', type: 'string', required: true }
      ]
    }
  }
};

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [showEditor, setShowEditor] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    if (showEditor) {
      setShowEditor(false);
      return;
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleUpdateData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleGetStarted = () => {
    setShowEditor(true);
  };

  const renderStep = () => {
    if (showEditor) {
      return (
        <ApiEditor
          initialData={initialApiData}
          onBack={handleBack}
          onSave={(data) => {
            console.log('Saving API data:', data);
            // Handle saving the API configuration
          }}
        />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <ProjectTypeStep 
            value={formData.projectType} 
            onChange={(value) => handleUpdateData('projectType', value)} 
          />
        );
      case 1:
        return (
          <TemplateStep 
            value={formData.template}
            projectType={formData.projectType}
            onChange={(value) => handleUpdateData('template', value)}
          />
        );
      case 2:
        return (
          <ConfigurationStep 
            value={formData.configuration}
            template={formData.template}
            onChange={(value) => handleUpdateData('configuration', value)}
          />
        );
      default:
        return null;
    }
  };

  if (showEditor) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-slate-900 rounded-2xl w-full max-w-4xl shadow-2xl">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 rounded-t-2xl">
            <div 
              className="h-full bg-blue-500 rounded-l transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="pt-12 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {steps[currentStep].title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-slate-800">
              <button
                onClick={handleBack}
                className={`flex items-center px-6 py-3 rounded-lg transition-all
                  ${currentStep === 0 
                    ? 'opacity-0 pointer-events-none' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={currentStep === steps.length - 1 ? handleGetStarted : handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
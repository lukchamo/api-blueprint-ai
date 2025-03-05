import React, { useState } from 'react';
import { Wand2, Code2, Zap, Rocket, Database, Cloud, BookOpen, Sparkles, Share2, Brain } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureCard } from './components/FeatureCard';
import { TemplateCard } from './components/TemplateCard';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { Footer } from './components/Footer';
import './styles/animations.css';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Design',
    description: 'Intelligent suggestions for endpoint design and optimization',
    color: 'blue'
  },
  {
    icon: Code2,
    title: 'Auto Documentation',
    description: 'Generate comprehensive API documentation automatically',
    color: 'purple'
  },
  {
    icon: Zap,
    title: 'Real-time Testing',
    description: 'Simulate and validate API behavior instantly',
    color: 'cyan'
  }
];

const templates = [
  {
    icon: Rocket,
    title: 'E-commerce API',
    prompt: 'Design a scalable e-commerce API with product catalog, cart management, and order processing endpoints',
    features: ['Product inventory system', 'Shopping cart endpoints', 'Order management flow'],
    color: 'blue'
  },
  {
    icon: Cloud,
    title: 'Social Network API',
    prompt: 'Create a social platform API with user profiles, posts, comments, and real-time notifications',
    features: ['User authentication', 'Content management', 'Real-time events'],
    color: 'purple'
  },
  {
    icon: Database,
    title: 'Analytics API',
    prompt: 'Build a data analytics API with event tracking, metrics aggregation, and reporting endpoints',
    features: ['Event tracking', 'Data aggregation', 'Custom reporting'],
    color: 'emerald'
  }
];

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsOnboardingOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="pt-16">
        <Hero onGetStarted={() => setIsOnboardingOpen(true)} />
        
        {/* Why API Blueprint AI Section */}
        <section className="py-24 relative overflow-hidden" id="why-api-blueprint">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why API Blueprint AI?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Design robust APIs in minutes with AI-powered assistance. From documentation to development,
                we streamline your entire API lifecycle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Documentation</h3>
                <p className="text-gray-400">
                  Start with comprehensive documentation that both AI and humans understand perfectly.
                  Clear specifications lead to better implementation.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Development</h3>
                <p className="text-gray-400">
                  Leverage AI to accelerate development. Well-documented APIs enable AI to assist
                  more effectively in implementation.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Quality Assurance</h3>
                <p className="text-gray-400">
                  Perfect documentation ensures quality development. Automated testing and validation
                  become more reliable and efficient.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Community Marketplace</h3>
                <p className="text-gray-400">
                  Share and discover API templates. Learn from the community and contribute your
                  expertise to help others.
                </p>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-blue-500/10" />
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-500/10" />
          </div>
        </section>
        
        {/* Features Grid */}
        <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to design and document your APIs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* API Templates Section */}
        <section id="templates" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start with Expert Templates
              </h2>
              <p className="text-xl text-gray-400">
                Choose a template and let AI guide you through the architecture
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <TemplateCard 
                  key={index} 
                  {...template} 
                  onUseTemplate={() => handleUseTemplate(template.title)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={() => {
          setIsOnboardingOpen(false);
          setSelectedTemplate(null);
        }}
        initialTemplate={selectedTemplate}
      />
    </div>
  );
}

export default App;
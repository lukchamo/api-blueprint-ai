import React from 'react';
import { DivideIcon as LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface TemplateCardProps {
  icon: LucideIcon;
  title: string;
  prompt: string;
  features: string[];
  color: string;
  onUseTemplate: () => void;
}

const colorVariants = {
  blue: {
    gradient: 'from-blue-900/50 to-blue-800/30',
    border: 'border-blue-700/50 hover:border-blue-500/50',
    icon: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400'
    },
    prompt: 'text-blue-300',
    button: 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300',
    glow: 'group-hover:shadow-blue-500/25'
  },
  purple: {
    gradient: 'from-purple-900/50 to-purple-800/30',
    border: 'border-purple-700/50 hover:border-purple-500/50',
    icon: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-400'
    },
    prompt: 'text-purple-300',
    button: 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300',
    glow: 'group-hover:shadow-purple-500/25'
  },
  emerald: {
    gradient: 'from-emerald-900/50 to-emerald-800/30',
    border: 'border-emerald-700/50 hover:border-emerald-500/50',
    icon: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400'
    },
    prompt: 'text-emerald-300',
    button: 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300',
    glow: 'group-hover:shadow-emerald-500/25'
  }
};

export function TemplateCard({ icon: Icon, title, prompt, features, color, onUseTemplate }: TemplateCardProps) {
  const colors = colorVariants[color as keyof typeof colorVariants];

  return (
    <div className={`
      relative group rounded-2xl overflow-hidden transition-all duration-500
      bg-gradient-to-br ${colors.gradient} ${colors.border}
      hover:scale-[1.02] hover:shadow-2xl ${colors.glow}
      border backdrop-blur-sm
    `}>
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
        <div className="absolute -inset-[500px] bg-gradient-to-t from-transparent via-white/5 to-transparent rotate-45 translate-y-full group-hover:translate-y-[0%] transition-transform duration-1000" />
      </div>

      <div className="relative p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className={`
            ${colors.icon.bg} p-4 rounded-xl
            transform group-hover:scale-110 transition-all duration-300
            relative
          `}>
            <Icon className={`w-8 h-8 ${colors.icon.text}`} />
            {/* Animated sparkles */}
            <Sparkles className={`
              w-4 h-4 ${colors.icon.text} absolute -top-2 -right-2
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              animate-pulse
            `} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
            {title}
          </h3>

          {/* Prompt */}
          <div className="relative">
            <div className={`
              bg-slate-900/50 p-4 rounded-lg
              transform group-hover:-rotate-1 transition-transform duration-300
              border border-slate-700/50 group-hover:border-slate-600/50
            `}>
              <p className={`font-mono text-sm ${colors.prompt}`}>
                "{prompt}"
              </p>
            </div>
            {/* Decorative corner */}
            <div className={`
              absolute -top-1 -right-1 w-3 h-3 rounded-full
              ${colors.icon.bg} opacity-0 group-hover:opacity-100
              transition-all duration-300 delay-100
            `} />
          </div>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li 
                key={index} 
                className={`
                  flex items-center gap-3 text-gray-400
                  transform group-hover:translate-x-2
                  transition-transform duration-300
                  hover:text-white
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <ArrowRight className={`w-4 h-4 ${colors.icon.text}`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button 
          onClick={onUseTemplate}
          className={`
            w-full py-3 px-4 rounded-lg
            flex items-center justify-center gap-2
            transform transition-all duration-300
            ${colors.button}
            group-hover:scale-[1.02]
            relative overflow-hidden
          `}
        >
          <span className="relative z-10">Use Template</span>
          <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          
          {/* Button hover effect */}
          <div className={`
            absolute inset-0 -translate-x-full
            group-hover:translate-x-0
            bg-gradient-to-r ${colors.gradient}
            transition-transform duration-300
          `} />
        </button>
      </div>
    </div>
  );
}
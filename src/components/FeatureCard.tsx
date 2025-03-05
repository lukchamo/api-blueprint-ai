import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const colorVariants = {
  blue: {
    background: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    hover: 'hover:border-blue-500/40 hover:bg-blue-500/20',
    glow: 'group-hover:shadow-blue-500/25'
  },
  purple: {
    background: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    hover: 'hover:border-purple-500/40 hover:bg-purple-500/20',
    glow: 'group-hover:shadow-purple-500/25'
  },
  cyan: {
    background: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-400',
    hover: 'hover:border-cyan-500/40 hover:bg-cyan-500/20',
    glow: 'group-hover:shadow-cyan-500/25'
  }
};

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const colors = colorVariants[color as keyof typeof colorVariants];

  return (
    <div 
      className={`
        group relative rounded-xl border backdrop-blur-xl
        transition-all duration-300 ease-out
        ${colors.background} ${colors.border} ${colors.hover}
        hover:scale-105 hover:shadow-lg
      `}
    >
      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 transition-opacity
        duration-300 group-hover:opacity-100 blur-xl -z-10
        ${colors.background} ${colors.glow}
      `} />

      <div className="p-6 relative">
        {/* Icon Container */}
        <div className={`
          relative w-12 h-12 mb-6 rounded-lg
          flex items-center justify-center
          ${colors.background} ${colors.border}
          group-hover:scale-110 transition-transform duration-300
        `}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
          
          {/* Animated dots */}
          <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-white/20 animate-pulse" />
          <div className="absolute -left-1 -bottom-1 w-2 h-2 rounded-full bg-white/20 animate-pulse delay-100" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:translate-x-1 transition-transform">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Hover line effect */}
        <div className={`
          absolute bottom-0 left-0 h-0.5 w-0
          group-hover:w-full transition-all duration-300
          ${colors.background}
        `} />
      </div>
    </div>
  );
}
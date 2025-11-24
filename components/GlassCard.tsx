import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverEffect = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/[0.05] 
        backdrop-blur-xl 
        border border-white/10 
        rounded-xl 
        p-6 
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d6cb]/30 hover:shadow-[0_0_20px_rgba(0,214,203,0.15)] cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
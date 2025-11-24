import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
  const getStyles = (lvl: RiskLevel) => {
    switch (lvl) {
      case RiskLevel.LOW:
        return 'bg-green-500/15 text-green-400 border-green-500/30';
      case RiskLevel.MEDIUM:
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
      case RiskLevel.HIGH:
        return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
      case RiskLevel.CRITICAL:
        return 'bg-red-500/15 text-red-400 border-red-500/30 animate-pulse';
      default:
        return 'bg-gray-500/15 text-gray-400';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStyles(level)}`}>
      {level}
    </span>
  );
};
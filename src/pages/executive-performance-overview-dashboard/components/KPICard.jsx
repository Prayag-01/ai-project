import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, unit, change, trend, icon, color = 'primary' }) => {
  const isPositive = change >= 0;
  const trendIcon = isPositive ? 'TrendingUp' : 'TrendingDown';
  const changeColor = isPositive ? 'text-success' : 'text-error';

  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/20',
    secondary: 'from-secondary/20 to-secondary/5 border-secondary/20',
    accent: 'from-accent/20 to-accent/5 border-accent/20',
    success: 'from-success/20 to-success/5 border-success/20'
  };

  return (
    <div className={`relative p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm hover:scale-102 transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <Icon name={icon} size={20} className={`text-${color}`} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={trendIcon} size={16} className={changeColor} />
          <span className={`text-sm font-medium ${changeColor}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {/* Trend Sparkline */}
        <div className="flex items-center space-x-1 mt-3">
          <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-${color} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min(Math.abs(change) * 10, 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default KPICard;
import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType, 
  icon, 
  status = 'normal',
  isLoading = false 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-error border-error/20 bg-error/5';
      case 'warning': return 'text-warning border-warning/20 bg-warning/5';
      case 'success': return 'text-success border-success/20 bg-success/5';
      default: return 'text-foreground border-border bg-card';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-elevation-2 ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${status === 'critical' ? 'bg-error/10' : status === 'warning' ? 'bg-warning/10' : status === 'success' ? 'bg-success/10' : 'bg-primary/10'}`}>
            <Icon 
              name={icon} 
              size={20} 
              className={status === 'critical' ? 'text-error' : status === 'warning' ? 'text-warning' : status === 'success' ? 'text-success' : 'text-primary'} 
            />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {status === 'critical' && (
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          {isLoading ? (
            <div className="h-8 w-24 bg-muted/30 rounded animate-pulse" />
          ) : (
            <>
              <span className="text-2xl font-bold font-data">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </>
          )}
        </div>

        {change && (
          <div className={`flex items-center space-x-1 text-xs ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={12} />
            <span>{change}</span>
            <span className="text-muted-foreground">vs last hour</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExecutiveSummaryCard = ({ title, subtitle, value, description, actionLabel, onAction, type = 'default' }) => {
  const typeStyles = {
    success: {
      bg: 'bg-gradient-to-br from-success/10 to-success/5',
      border: 'border-success/20',
      icon: 'TrendingUp',
      iconColor: 'text-success'
    },
    warning: {
      bg: 'bg-gradient-to-br from-warning/10 to-warning/5',
      border: 'border-warning/20',
      icon: 'AlertTriangle',
      iconColor: 'text-warning'
    },
    info: {
      bg: 'bg-gradient-to-br from-secondary/10 to-secondary/5',
      border: 'border-secondary/20',
      icon: 'Info',
      iconColor: 'text-secondary'
    },
    default: {
      bg: 'bg-gradient-to-br from-muted/10 to-muted/5',
      border: 'border-border',
      icon: 'BarChart3',
      iconColor: 'text-muted-foreground'
    }
  };

  const style = typeStyles[type];

  return (
    <div className={`p-6 rounded-xl ${style.bg} ${style.border} border backdrop-blur-sm hover:scale-102 transition-all duration-300 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-card/50">
            <Icon name={style.icon} size={18} className={style.iconColor} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        
        {actionLabel && onAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full mt-4"
          >
            {actionLabel}
          </Button>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ExecutiveSummaryCard;
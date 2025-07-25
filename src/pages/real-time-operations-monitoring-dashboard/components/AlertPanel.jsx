import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertPanel = ({ alerts = [], onDismissAlert, onViewDetails }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return { 
          color: 'text-error', 
          bg: 'bg-error/10', 
          border: 'border-error/20', 
          icon: 'AlertCircle' 
        };
      case 'warning':
        return { 
          color: 'text-warning', 
          bg: 'bg-warning/10', 
          border: 'border-warning/20', 
          icon: 'AlertTriangle' 
        };
      case 'info':
        return { 
          color: 'text-secondary', 
          bg: 'bg-secondary/10', 
          border: 'border-secondary/20', 
          icon: 'Info' 
        };
      default:
        return { 
          color: 'text-muted-foreground', 
          bg: 'bg-muted/10', 
          border: 'border-muted/20', 
          icon: 'Bell' 
        };
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">System Alerts</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {filteredAlerts.length} alerts
          </span>
          <Button variant="ghost" size="sm" iconName="Settings" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted/20 rounded-lg">
        {['all', 'critical', 'warning', 'info'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
              filter === filterType
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {filterType}
            {filterType !== 'all' && (
              <span className="ml-1 text-xs">
                ({alerts.filter(a => a.severity === filterType).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <p className="text-muted-foreground">No alerts to display</p>
            <p className="text-sm text-muted-foreground">All systems are running smoothly</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-elevation-1 ${config.bg} ${config.border}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${config.bg}`}>
                    <Icon name={config.icon} size={16} className={config.color} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {getTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color} font-medium`}>
                        {alert.source}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Eye"
                          onClick={() => onViewDetails?.(alert)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="X"
                          onClick={() => onDismissAlert?.(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" iconName="Archive" iconPosition="left">
            Clear All
          </Button>
          <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;
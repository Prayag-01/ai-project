import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ControlBar = ({ 
  environment, 
  onEnvironmentChange, 
  refreshInterval, 
  onRefreshIntervalChange,
  isAutoRefresh,
  onAutoRefreshToggle,
  systemHealth = 'healthy'
}) => {
  const environmentOptions = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Development' }
  ];

  const refreshOptions = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' }
  ];

  const getHealthStatus = () => {
    switch (systemHealth) {
      case 'healthy':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle', text: 'All Systems Operational' };
      case 'warning':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'AlertTriangle', text: 'Minor Issues Detected' };
      case 'critical':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'AlertCircle', text: 'Critical Issues' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'HelpCircle', text: 'Status Unknown' };
    }
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Environment & Health */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-3">
            <Select
              options={environmentOptions}
              value={environment}
              onChange={onEnvironmentChange}
              placeholder="Select environment"
              className="w-40"
            />
          </div>

          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${healthStatus.bg}`}>
            <Icon name={healthStatus.icon} size={16} className={healthStatus.color} />
            <span className={`text-sm font-medium ${healthStatus.color}`}>
              {healthStatus.text}
            </span>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Auto-refresh:</span>
            <button
              onClick={onAutoRefreshToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                isAutoRefresh ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAutoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {isAutoRefresh && (
            <Select
              options={refreshOptions}
              value={refreshInterval}
              onChange={onRefreshIntervalChange}
              className="w-32"
            />
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh Now
            </Button>

            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
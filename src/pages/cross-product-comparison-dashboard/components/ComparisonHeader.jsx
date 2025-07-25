import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ComparisonHeader = ({ 
  dateRange, 
  onDateRangeChange, 
  normalizationMode, 
  onNormalizationChange,
  comparisonMode,
  onComparisonModeChange,
  onExport 
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'last6months', label: 'Last 6 months' },
    { value: 'lastyear', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const normalizationOptions = [
    { value: 'absolute', label: 'Absolute Values' },
    { value: 'relative', label: 'Relative (%)' },
    { value: 'normalized', label: 'Normalized (0-100)' }
  ];

  const comparisonModeOptions = [
    { value: 'sidebyside', label: 'Side-by-Side' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'ratio', label: 'Ratio Analysis' }
  ];

  return (
    <div className="bg-card/50 glass border border-border rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Section - Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon name="GitCompare" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Cross-Product Comparison
              </h1>
              <p className="text-sm text-muted-foreground">
                Strategic analysis across all AI products
              </p>
            </div>
          </div>

          {/* Sync Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-lg border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success font-medium">Synced</span>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date Range Selector */}
          <div className="relative">
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={onDateRangeChange}
              placeholder="Select date range"
              className="min-w-[160px]"
            />
          </div>

          {/* Normalization Toggle */}
          <Select
            options={normalizationOptions}
            value={normalizationMode}
            onChange={onNormalizationChange}
            placeholder="Value type"
            className="min-w-[140px]"
          />

          {/* Comparison Mode */}
          <Select
            options={comparisonModeOptions}
            value={comparisonMode}
            onChange={onComparisonModeChange}
            placeholder="Comparison mode"
            className="min-w-[150px]"
          />

          {/* Export Button */}
          <Button
            variant="outline"
            size="default"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
            className="whitespace-nowrap"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">6</div>
            <div className="text-xs text-muted-foreground">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">2.4M</div>
            <div className="text-xs text-muted-foreground">Total Calls</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">94.2%</div>
            <div className="text-xs text-muted-foreground">Avg Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">1.2s</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonHeader;
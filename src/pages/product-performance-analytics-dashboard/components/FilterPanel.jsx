import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const productOptions = [
    { value: 'wrapportal', label: 'Wrapportal', description: 'Insurance wrapper platform' },
    { value: 'kinetic', label: 'Kinetic', description: 'Dynamic risk assessment' },
    { value: 'asureify', label: 'Asureify', description: 'Policy assurance engine' },
    { value: 'riskguru', label: 'Riskguru', description: 'Risk analysis platform' },
    { value: 'anzenn', label: 'Anzenn', description: 'Claims processing AI' },
    { value: 'prequaligy', label: 'Prequaligy', description: 'Pre-qualification system' }
  ];

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const aggregationOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleAccuracyThresholdChange = (e) => {
    handleFilterChange('accuracyThreshold', parseFloat(e.target.value));
  };

  const resetFilters = () => {
    onFiltersChange({
      selectedProducts: ['wrapportal'],
      dateRange: 'last7days',
      customStartDate: '',
      customEndDate: '',
      accuracyThreshold: 95,
      aggregation: 'daily'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={resetFilters}
          >
            Reset
          </Button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product Selection */}
          <div className="space-y-2">
            <Select
              label="Products"
              options={productOptions}
              value={filters.selectedProducts}
              onChange={(value) => handleFilterChange('selectedProducts', value)}
              multiple
              searchable
              placeholder="Select products..."
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select range..."
            />
            {filters.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="date"
                  placeholder="Start date"
                  value={filters.customStartDate}
                  onChange={(e) => handleFilterChange('customStartDate', e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="End date"
                  value={filters.customEndDate}
                  onChange={(e) => handleFilterChange('customEndDate', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Accuracy Threshold */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Accuracy Threshold: {filters.accuracyThreshold}%
            </label>
            <div className="relative">
              <input
                type="range"
                min="80"
                max="100"
                step="0.1"
                value={filters.accuracyThreshold}
                onChange={handleAccuracyThresholdChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>80%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Aggregation */}
          <div className="space-y-2">
            <Select
              label="Aggregation"
              options={aggregationOptions}
              value={filters.aggregation}
              onChange={(value) => handleFilterChange('aggregation', value)}
              placeholder="Select aggregation..."
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default FilterPanel;
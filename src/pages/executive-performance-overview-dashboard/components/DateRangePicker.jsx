import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangePicker = ({ selectedRange, onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { label: 'Last 7 days', value: '7d', description: 'Recent week performance' },
    { label: 'Last 30 days', value: '30d', description: 'Monthly overview' },
    { label: 'Last 90 days', value: '90d', description: 'Quarterly analysis' },
    { label: 'Q1 2024', value: 'q1', description: 'Jan - Mar 2024' },
    { label: 'Q2 2024', value: 'q2', description: 'Apr - Jun 2024' },
    { label: 'Q3 2024', value: 'q3', description: 'Jul - Sep 2024' },
    { label: 'Q4 2024', value: 'q4', description: 'Oct - Dec 2024' },
    { label: 'Year to Date', value: 'ytd', description: '2024 performance' }
  ];

  const currentPreset = presets.find(p => p.value === selectedRange);

  const handleRangeSelect = (value) => {
    onRangeChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Calendar"
        iconPosition="left"
        className="min-w-48"
      >
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{currentPreset?.label}</span>
          <span className="text-xs text-muted-foreground">{currentPreset?.description}</span>
        </div>
        <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} className="ml-2" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card/95 glass border border-border rounded-lg shadow-elevation-3 z-50 animate-slide-down">
          <div className="p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Select Time Range</h3>
            <div className="space-y-1">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleRangeSelect(preset.value)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200
                    hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring
                    ${selectedRange === preset.value 
                      ? 'bg-primary/10 text-primary border border-primary/20' :'text-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div>
                    <div className="font-medium text-sm">{preset.label}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                  {selectedRange === preset.value && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-border mt-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Custom Date Range
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DateRangePicker;
import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparativeDataTable = ({ data, onExport }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'accuracy', label: 'Accuracy' },
    { value: 'responseTime', label: 'Response Time' },
    { value: 'volume', label: 'Volume' },
    { value: 'successRate', label: 'Success Rate' },
    { value: 'costPerCall', label: 'Cost per Call' }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    
    if (searchTerm) {
      sortableData = sortableData.filter(item =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig, searchTerm]);

  const getPercentageDifference = (current, baseline) => {
    const diff = ((current - baseline) / baseline) * 100;
    return {
      value: Math.abs(diff).toFixed(1),
      isPositive: diff > 0,
      isSignificant: Math.abs(diff) > 5
    };
  };

  const getSignificanceIndicator = (isSignificant) => {
    return isSignificant ? (
      <Icon name="AlertCircle" size={12} className="text-warning" />
    ) : (
      <Icon name="Minus" size={12} className="text-muted-foreground" />
    );
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? 
      <Icon name="ArrowUp" size={14} className="text-primary" /> :
      <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card/50 glass border border-border rounded-xl p-6">
      {/* Table Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Detailed Comparison Table
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive metrics with statistical analysis
          </p>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Metric Filter */}
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                Product
              </th>
              <th 
                className="text-center py-4 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('accuracy')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Accuracy (%)</span>
                  {getSortIcon('accuracy')}
                </div>
              </th>
              <th 
                className="text-center py-4 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('responseTime')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Response Time</span>
                  {getSortIcon('responseTime')}
                </div>
              </th>
              <th 
                className="text-center py-4 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('volume')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Volume</span>
                  {getSortIcon('volume')}
                </div>
              </th>
              <th 
                className="text-center py-4 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('successRate')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Success Rate</span>
                  {getSortIcon('successRate')}
                </div>
              </th>
              <th 
                className="text-center py-4 px-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('costPerCall')}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span>Cost/Call</span>
                  {getSortIcon('costPerCall')}
                </div>
              </th>
              <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                Trend
              </th>
              <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                Significance
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const accuracyDiff = getPercentageDifference(item.accuracy, 92); // baseline 92%
              const responseDiff = getPercentageDifference(1200, item.responseTime); // baseline 1200ms (lower is better)
              const volumeDiff = getPercentageDifference(item.volume, 350000); // baseline 350k
              const successDiff = getPercentageDifference(item.successRate, 93); // baseline 93%
              const costDiff = getPercentageDifference(0.05, item.costPerCall); // baseline $0.05 (lower is better)

              return (
                <tr key={item.product} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  {/* Product */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <Icon name={item.icon} size={16} color="white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.product}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Accuracy */}
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{item.accuracy}%</div>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon 
                          name={accuracyDiff.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                          size={12} 
                          className={accuracyDiff.isPositive ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-xs ${accuracyDiff.isPositive ? 'text-success' : 'text-error'}`}>
                          {accuracyDiff.value}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Response Time */}
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{item.responseTime}ms</div>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon 
                          name={responseDiff.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                          size={12} 
                          className={responseDiff.isPositive ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-xs ${responseDiff.isPositive ? 'text-success' : 'text-error'}`}>
                          {responseDiff.value}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{item.volume.toLocaleString()}</div>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon 
                          name={volumeDiff.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                          size={12} 
                          className={volumeDiff.isPositive ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-xs ${volumeDiff.isPositive ? 'text-success' : 'text-error'}`}>
                          {volumeDiff.value}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Success Rate */}
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{item.successRate}%</div>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon 
                          name={successDiff.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                          size={12} 
                          className={successDiff.isPositive ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-xs ${successDiff.isPositive ? 'text-success' : 'text-error'}`}>
                          {successDiff.value}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Cost per Call */}
                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">${item.costPerCall}</div>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon 
                          name={costDiff.isPositive ? 'TrendingUp' : 'TrendingDown'} 
                          size={12} 
                          className={costDiff.isPositive ? 'text-success' : 'text-error'} 
                        />
                        <span className={`text-xs ${costDiff.isPositive ? 'text-success' : 'text-error'}`}>
                          {costDiff.value}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Trend */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Icon 
                        name={item.trend === 'up' ? 'TrendingUp' : item.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                        size={16} 
                        className={
                          item.trend === 'up' ? 'text-success' : 
                          item.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                        } 
                      />
                      <span className={`text-sm font-medium ${
                        item.trend === 'up' ? 'text-success' : 
                        item.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                      }`}>
                        {item.trendValue}
                      </span>
                    </div>
                  </td>

                  {/* Statistical Significance */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getSignificanceIndicator(accuracyDiff.isSignificant || responseDiff.isSignificant)}
                      <span className="text-xs text-muted-foreground">
                        {(accuracyDiff.isSignificant || responseDiff.isSignificant) ? 'Significant' : 'Normal'}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {sortedData.length} of {data.length} products
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} className="text-success" />
              <span>Positive trend</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingDown" size={12} className="text-error" />
              <span>Negative trend</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="AlertCircle" size={12} className="text-warning" />
              <span>Statistically significant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeDataTable;
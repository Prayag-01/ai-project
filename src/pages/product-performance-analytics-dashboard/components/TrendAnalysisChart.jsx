import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendAnalysisChart = ({ data, selectedProducts, filters }) => {
  const [zoomDomain, setZoomDomain] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('accuracy');

  const productColors = {
    wrapportal: '#8B5CF6',
    kinetic: '#06B6D4',
    asureify: '#10B981',
    riskguru: '#F59E0B',
    anzenn: '#EC4899',
    prequaligy: '#06B6D4'
  };

  const metrics = [
    { id: 'accuracy', label: 'Accuracy (%)', unit: '%' },
    { id: 'responseTime', label: 'Response Time (ms)', unit: 'ms' },
    { id: 'volume', label: 'Call Volume', unit: '' },
    { id: 'successRate', label: 'Success Rate (%)', unit: '%' }
  ];

  const handleZoom = (domain) => {
    setZoomDomain(domain);
  };

  const resetZoom = () => {
    setZoomDomain(null);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.dataKey}:</span>
              <span className="font-medium text-foreground">
                {entry.value}{metrics.find(m => m.id === selectedMetric)?.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="LineChart" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Trend Analysis</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Metric Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom Controls */}
          {zoomDomain && (
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomOut"
              iconPosition="left"
              onClick={resetZoom}
            >
              Reset Zoom
            </Button>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            onMouseDown={(e) => {
              if (e && e.activeLabel) {
                // Handle brush start
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="timestamp"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={zoomDomain || ['dataMin', 'dataMax']}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{
                value: metrics.find(m => m.id === selectedMetric)?.label,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedProducts.map((productId) => (
              <Line
                key={productId}
                type="monotone"
                dataKey={`${productId}_${selectedMetric}`}
                stroke={productColors[productId]}
                strokeWidth={2}
                dot={{ fill: productColors[productId], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: productColors[productId], strokeWidth: 2 }}
                name={productId.charAt(0).toUpperCase() + productId.slice(1)}
              />
            ))}
            
            <Brush
              dataKey="timestamp"
              height={30}
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Best Performer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Asureify shows consistent upward trend with 12% improvement
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Attention Needed</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Kinetic showing volatility in response times during peak hours
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Correlation</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Strong negative correlation between volume and accuracy (-0.73)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;
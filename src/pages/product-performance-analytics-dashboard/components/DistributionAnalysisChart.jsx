import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';


const DistributionAnalysisChart = ({ data, selectedProducts, filters }) => {
  const [chartType, setChartType] = useState('histogram');
  const [selectedProduct, setSelectedProduct] = useState(selectedProducts[0] || 'wrapportal');

  const productColors = {
    wrapportal: '#8B5CF6',
    kinetic: '#06B6D4',
    asureify: '#10B981',
    riskguru: '#F59E0B',
    anzenn: '#EC4899',
    prequaligy: '#06B6D4'
  };

  const chartTypes = [
    { id: 'histogram', label: 'Histogram', icon: 'BarChart3' },
    { id: 'boxplot', label: 'Box Plot', icon: 'Box' }
  ];

  const generateHistogramData = () => {
    // Mock histogram data for response time distribution
    return [
      { range: '0-50ms', count: 1250, percentage: 15.2 },
      { range: '50-100ms', count: 2800, percentage: 34.1 },
      { range: '100-150ms', count: 2200, percentage: 26.8 },
      { range: '150-200ms', count: 1400, percentage: 17.1 },
      { range: '200-250ms', count: 350, percentage: 4.3 },
      { range: '250-300ms', count: 150, percentage: 1.8 },
      { range: '300ms+', count: 50, percentage: 0.6 }
    ];
  };

  const generateBoxPlotData = () => {
    // Mock box plot statistics
    return selectedProducts.map(product => ({
      product: product.charAt(0).toUpperCase() + product.slice(1),
      min: Math.random() * 50 + 20,
      q1: Math.random() * 30 + 60,
      median: Math.random() * 40 + 90,
      q3: Math.random() * 50 + 130,
      max: Math.random() * 100 + 180,
      outliers: [15, 18, 22, 280, 320, 350]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {chartType === 'histogram' ? (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Count:</span>
                <span className="font-medium text-foreground">{data.count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Percentage:</span>
                <span className="font-medium text-foreground">{data.percentage}%</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Median:</span>
                <span className="font-medium text-foreground">{data.median?.toFixed(1)}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Q1-Q3:</span>
                <span className="font-medium text-foreground">{data.q1?.toFixed(1)}-{data.q3?.toFixed(1)}ms</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderHistogram = () => {
    const histogramData = generateHistogramData();
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="range"
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {histogramData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={productColors[selectedProduct]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderBoxPlot = () => {
    const boxPlotData = generateBoxPlotData();
    
    return (
      <div className="space-y-6">
        {boxPlotData.map((product, index) => (
          <div key={product.product} className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">{product.product}</h4>
            <div className="relative h-12 bg-muted/20 rounded-lg">
              {/* Box plot visualization */}
              <div className="absolute inset-y-2 flex items-center w-full px-4">
                {/* Min-Max line */}
                <div
                  className="h-0.5 bg-muted-foreground"
                  style={{
                    left: `${(product.min / 400) * 100}%`,
                    width: `${((product.max - product.min) / 400) * 100}%`
                  }}
                />
                
                {/* Box (Q1-Q3) */}
                <div
                  className="absolute h-6 border-2 rounded"
                  style={{
                    left: `${(product.q1 / 400) * 100}%`,
                    width: `${((product.q3 - product.q1) / 400) * 100}%`,
                    borderColor: productColors[selectedProducts[index]] || productColors.wrapportal,
                    backgroundColor: `${productColors[selectedProducts[index]] || productColors.wrapportal}20`
                  }}
                />
                
                {/* Median line */}
                <div
                  className="absolute w-0.5 h-6 bg-foreground"
                  style={{ left: `${(product.median / 400) * 100}%` }}
                />
              </div>
              
              {/* Statistics */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>{product.min.toFixed(0)}ms</span>
                <span>Q1: {product.q1.toFixed(0)}ms</span>
                <span>Median: {product.median.toFixed(0)}ms</span>
                <span>Q3: {product.q3.toFixed(0)}ms</span>
                <span>{product.max.toFixed(0)}ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Distribution Analysis</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-1 bg-muted/20 rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
                  ${chartType === type.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={type.icon} size={14} />
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Product Selector for Histogram */}
          {chartType === 'histogram' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Product:</span>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="bg-input border border-border rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {selectedProducts.map((product) => (
                  <option key={product} value={product}>
                    {product.charAt(0).toUpperCase() + product.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        {chartType === 'histogram' ? renderHistogram() : renderBoxPlot()}
      </div>

      {/* Distribution Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Normal Distribution</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Response times follow normal distribution with slight right skew
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Outliers Detected</span>
          </div>
          <p className="text-sm text-muted-foreground">
            3.2% of requests exceed 250ms threshold requiring investigation
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Performance Mode</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Peak performance at 85-95ms range with 34% of all requests
          </p>
        </div>
      </div>
    </div>
  );
};

export default DistributionAnalysisChart;
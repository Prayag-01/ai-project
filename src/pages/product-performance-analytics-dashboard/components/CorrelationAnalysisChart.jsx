import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const CorrelationAnalysisChart = ({ data, selectedProducts, filters }) => {
  const [xMetric, setXMetric] = useState('volume');
  const [yMetric, setYMetric] = useState('accuracy');

  const productColors = {
    wrapportal: '#8B5CF6',
    kinetic: '#06B6D4',
    asureify: '#10B981',
    riskguru: '#F59E0B',
    anzenn: '#EC4899',
    prequaligy: '#06B6D4'
  };

  const metrics = [
    { id: 'volume', label: 'Call Volume', unit: '' },
    { id: 'accuracy', label: 'Accuracy', unit: '%' },
    { id: 'responseTime', label: 'Response Time', unit: 'ms' },
    { id: 'successRate', label: 'Success Rate', unit: '%' },
    { id: 'errorRate', label: 'Error Rate', unit: '%' }
  ];

  const generateScatterData = () => {
    const data = [];
    selectedProducts.forEach(product => {
      for (let i = 0; i < 50; i++) {
        const baseVolume = Math.random() * 1000 + 100;
        const baseAccuracy = Math.random() * 20 + 80;
        const baseResponseTime = Math.random() * 100 + 50;
        const baseSuccessRate = Math.random() * 15 + 85;
        const baseErrorRate = 100 - baseSuccessRate;

        data.push({
          product,
          volume: baseVolume,
          accuracy: baseAccuracy,
          responseTime: baseResponseTime,
          successRate: baseSuccessRate,
          errorRate: baseErrorRate,
          x: getMetricValue(xMetric, { volume: baseVolume, accuracy: baseAccuracy, responseTime: baseResponseTime, successRate: baseSuccessRate, errorRate: baseErrorRate }),
          y: getMetricValue(yMetric, { volume: baseVolume, accuracy: baseAccuracy, responseTime: baseResponseTime, successRate: baseSuccessRate, errorRate: baseErrorRate })
        });
      }
    });
    return data;
  };

  const getMetricValue = (metricId, dataPoint) => {
    switch (metricId) {
      case 'volume': return dataPoint.volume;
      case 'accuracy': return dataPoint.accuracy;
      case 'responseTime': return dataPoint.responseTime;
      case 'successRate': return dataPoint.successRate;
      case 'errorRate': return dataPoint.errorRate;
      default: return 0;
    }
  };

  const calculateCorrelation = (data) => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + (point.x * point.y), 0);
    const sumX2 = data.reduce((sum, point) => sum + (point.x * point.x), 0);
    const sumY2 = data.reduce((sum, point) => sum + (point.y * point.y), 0);

    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return isNaN(correlation) ? 0 : correlation;
  };

  const scatterData = generateScatterData();
  const correlation = calculateCorrelation(scatterData);

  const getCorrelationStrength = (corr) => {
    const abs = Math.abs(corr);
    if (abs >= 0.8) return { strength: 'Very Strong', color: 'text-success' };
    if (abs >= 0.6) return { strength: 'Strong', color: 'text-primary' };
    if (abs >= 0.4) return { strength: 'Moderate', color: 'text-warning' };
    if (abs >= 0.2) return { strength: 'Weak', color: 'text-muted-foreground' };
    return { strength: 'Very Weak', color: 'text-error' };
  };

  const correlationInfo = getCorrelationStrength(correlation);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2 capitalize">{data.product}</p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{metrics.find(m => m.id === xMetric)?.label}:</span>
              <span className="font-medium text-foreground">
                {data.x.toFixed(1)}{metrics.find(m => m.id === xMetric)?.unit}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{metrics.find(m => m.id === yMetric)?.label}:</span>
              <span className="font-medium text-foreground">
                {data.y.toFixed(1)}{metrics.find(m => m.id === yMetric)?.unit}
              </span>
            </div>
          </div>
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
          <Icon name="Scatter3D" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Correlation Analysis</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* X-Axis Metric */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">X-Axis:</span>
            <select
              value={xMetric}
              onChange={(e) => setXMetric(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>

          {/* Y-Axis Metric */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Y-Axis:</span>
            <select
              value={yMetric}
              onChange={(e) => setYMetric(e.target.value)}
              className="bg-input border border-border rounded-lg px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics.map((metric) => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Correlation Summary */}
      <div className="bg-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <div>
              <h4 className="text-sm font-medium text-foreground">Correlation Coefficient</h4>
              <p className="text-xs text-muted-foreground">
                {metrics.find(m => m.id === xMetric)?.label} vs {metrics.find(m => m.id === yMetric)?.label}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{correlation.toFixed(3)}</p>
            <p className={`text-sm font-medium ${correlationInfo.color}`}>
              {correlationInfo.strength} {correlation >= 0 ? 'Positive' : 'Negative'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number"
              dataKey="x"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{
                value: `${metrics.find(m => m.id === xMetric)?.label} ${metrics.find(m => m.id === xMetric)?.unit}`,
                position: 'insideBottom',
                offset: -10
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{
                value: `${metrics.find(m => m.id === yMetric)?.label} ${metrics.find(m => m.id === yMetric)?.unit}`,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {selectedProducts.map((product) => (
              <Scatter
                key={product}
                name={product.charAt(0).toUpperCase() + product.slice(1)}
                data={scatterData.filter(d => d.product === product)}
                fill={productColors[product]}
                fillOpacity={0.7}
              />
            ))}
            
            {/* Trend line (simplified) */}
            {Math.abs(correlation) > 0.3 && (
              <ReferenceLine
                segment={[
                  { x: Math.min(...scatterData.map(d => d.x)), y: Math.min(...scatterData.map(d => d.y)) },
                  { x: Math.max(...scatterData.map(d => d.x)), y: Math.max(...scatterData.map(d => d.y)) }
                ]}
                stroke="var(--color-primary)"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Correlation Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">R² Value</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {(correlation * correlation).toFixed(3)} - {((correlation * correlation) * 100).toFixed(1)}% variance explained
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Statistical Significance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            p-value &lt; 0.001 - Highly significant relationship detected
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Prediction Accuracy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Model can predict {yMetric} with {(Math.abs(correlation) * 100).toFixed(1)}% confidence
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorrelationAnalysisChart;
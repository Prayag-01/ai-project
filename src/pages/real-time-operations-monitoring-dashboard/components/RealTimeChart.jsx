import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const RealTimeChart = ({ 
  title, 
  data, 
  dataKey, 
  color = '#8B5CF6', 
  type = 'line',
  height = 300,
  showGrid = true,
  showTooltip = true,
  unit = '',
  isLoading = false
}) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [data]);

  const formatTooltipValue = (value, name) => {
    if (typeof value === 'number') {
      return [`${value.toLocaleString()}${unit}`, name];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    if (tickItem instanceof Date) {
      return tickItem.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return tickItem;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm text-muted-foreground mb-1">
            {label instanceof Date ? label.toLocaleTimeString() : label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value?.toLocaleString()}${unit}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="w-4 h-4 bg-muted/30 rounded animate-pulse" />
        </div>
        <div className="w-full bg-muted/20 rounded animate-pulse" style={{ height }}>
          <div className="flex items-center justify-center h-full">
            <Icon name="BarChart3" size={48} className="text-muted-foreground/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-success font-medium">Live</span>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart key={animationKey} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />}
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxisLabel}
                stroke="rgba(148, 163, 184, 0.5)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(148, 163, 184, 0.5)"
                fontSize={12}
                tickFormatter={(value) => `${value}${unit}`}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${dataKey})`}
                animationDuration={1000}
              />
            </AreaChart>
          ) : (
            <LineChart key={animationKey} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />}
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatXAxisLabel}
                stroke="rgba(148, 163, 184, 0.5)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(148, 163, 184, 0.5)"
                fontSize={12}
                tickFormatter={(value) => `${value}${unit}`}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                animationDuration={1000}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RealTimeChart;
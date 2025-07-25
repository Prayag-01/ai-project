import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

const ProductRadarChart = ({ data, selectedProducts }) => {
  const products = [
    { key: 'wrapportal', name: 'Wrapportal', color: '#8B5CF6' },
    { key: 'kinetic', name: 'Kinetic', color: '#06B6D4' },
    { key: 'asureify', name: 'Asureify', color: '#10B981' },
    { key: 'riskguru', name: 'Riskguru', color: '#F59E0B' },
    { key: 'anzenn', name: 'Anzenn', color: '#EF4444' },
    { key: 'prequaligy', name: 'Prequaligy', color: '#8B5CF6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 glass border border-border rounded-lg p-4 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            className="text-xs"
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#94A3B8', fontSize: 10 }}
            tickCount={5}
          />
          {products.map((product) => 
            selectedProducts.includes(product.key) && (
              <Radar
                key={product.key}
                name={product.name}
                dataKey={product.key}
                stroke={product.color}
                fill={product.color}
                fillOpacity={0.1}
                strokeWidth={2}
                dot={{ fill: product.color, strokeWidth: 2, r: 3 }}
              />
            )
          )}
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductRadarChart;
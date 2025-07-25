import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductPerformanceChart = ({ data, selectedProducts, onProductToggle }) => {
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
              <span className="font-medium text-foreground">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Product Toggle Buttons */}
      <div className="flex flex-wrap gap-2">
        {products.map((product) => (
          <button
            key={product.key}
            onClick={() => onProductToggle(product.key)}
            className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedProducts.includes(product.key)
                ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-border'
              }
            `}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: product.color }}
            />
            <span>{product.name}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[85, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            {products.map((product) => 
              selectedProducts.includes(product.key) && (
                <Line
                  key={product.key}
                  type="monotone"
                  dataKey={product.key}
                  stroke={product.color}
                  strokeWidth={2}
                  dot={{ fill: product.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: product.color, strokeWidth: 2 }}
                  name={product.name}
                />
              )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductPerformanceChart;
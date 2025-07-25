import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComparisonCharts = ({ data, selectedProducts, comparisonMode }) => {
  const [activeTab, setActiveTab] = useState('trends');

  const tabs = [
    { id: 'trends', label: 'Trend Analysis', icon: 'TrendingUp' },
    { id: 'volume', label: 'Volume Comparison', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance Radar', icon: 'Radar' }
  ];

  const productColors = {
    'wrapportal': '#8B5CF6',
    'kinetic': '#06B6D4',
    'asureify': '#10B981',
    'riskguru': '#F59E0B',
    'anzenn': '#EF4444',
    'prequaligy': '#8B5CF6'
  };

  const timeSeriesData = [
    { date: '2024-07-17', wrapportal: 94.2, kinetic: 91.8, asureify: 96.1, riskguru: 89.5, anzenn: 92.3, prequaligy: 88.7 },
    { date: '2024-07-18', wrapportal: 95.1, kinetic: 92.4, asureify: 95.8, riskguru: 90.2, anzenn: 93.1, prequaligy: 89.4 },
    { date: '2024-07-19', wrapportal: 93.8, kinetic: 91.2, asureify: 96.5, riskguru: 88.9, anzenn: 91.8, prequaligy: 87.9 },
    { date: '2024-07-20', wrapportal: 96.3, kinetic: 93.7, asureify: 97.2, riskguru: 91.4, anzenn: 94.2, prequaligy: 90.1 },
    { date: '2024-07-21', wrapportal: 94.7, kinetic: 92.1, asureify: 95.9, riskguru: 89.8, anzenn: 92.7, prequaligy: 88.5 },
    { date: '2024-07-22', wrapportal: 95.4, kinetic: 93.2, asureify: 96.8, riskguru: 90.7, anzenn: 93.5, prequaligy: 89.8 },
    { date: '2024-07-23', wrapportal: 96.1, kinetic: 94.1, asureify: 97.1, riskguru: 91.2, anzenn: 94.8, prequaligy: 90.3 }
  ];

  const volumeData = [
    { product: 'Wrapportal', calls: 450000, success: 432000, failed: 18000 },
    { product: 'Kinetic', calls: 380000, success: 361400, failed: 18600 },
    { product: 'Asureify', calls: 520000, success: 504400, failed: 15600 },
    { product: 'Riskguru', calls: 290000, success: 271100, failed: 18900 },
    { product: 'Anzenn', calls: 340000, success: 321800, failed: 18200 },
    { product: 'Prequaligy', calls: 420000, success: 394200, failed: 25800 }
  ];

  const radarData = [
    { metric: 'Accuracy', wrapportal: 96, kinetic: 94, asureify: 97, riskguru: 91, anzenn: 95, prequaligy: 90 },
    { metric: 'Speed', wrapportal: 88, kinetic: 92, asureify: 85, riskguru: 95, anzenn: 89, prequaligy: 87 },
    { metric: 'Reliability', wrapportal: 94, kinetic: 91, asureify: 96, riskguru: 88, anzenn: 93, prequaligy: 86 },
    { metric: 'Scalability', wrapportal: 92, kinetic: 89, asureify: 94, riskguru: 87, anzenn: 90, prequaligy: 85 },
    { metric: 'Cost Efficiency', wrapportal: 85, kinetic: 88, asureify: 82, riskguru: 92, anzenn: 86, prequaligy: 89 },
    { metric: 'User Satisfaction', wrapportal: 91, kinetic: 87, asureify: 93, riskguru: 85, anzenn: 89, prequaligy: 84 }
  ];

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
        <XAxis 
          dataKey="date" 
          stroke="#94A3B8"
          fontSize={12}
          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        />
        <YAxis 
          stroke="#94A3B8"
          fontSize={12}
          domain={['dataMin - 2', 'dataMax + 2']}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1E293B',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            color: '#F8FAFC'
          }}
          formatter={(value) => [`${value}%`, 'Accuracy']}
          labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}
        />
        <Legend />
        {selectedProducts.map((productId) => (
          <Line
            key={productId}
            type="monotone"
            dataKey={productId}
            stroke={productColors[productId]}
            strokeWidth={2}
            dot={{ fill: productColors[productId], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: productColors[productId], strokeWidth: 2 }}
            name={productId.charAt(0).toUpperCase() + productId.slice(1)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderVolumeChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={volumeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
        <XAxis 
          dataKey="product" 
          stroke="#94A3B8"
          fontSize={12}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#94A3B8"
          fontSize={12}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1E293B',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            color: '#F8FAFC'
          }}
          formatter={(value, name) => [
            value.toLocaleString(), 
            name === 'success' ? 'Successful Calls' : name === 'failed' ? 'Failed Calls' : 'Total Calls'
          ]}
        />
        <Legend />
        <Bar dataKey="success" stackId="a" fill="#10B981" name="Successful" />
        <Bar dataKey="failed" stackId="a" fill="#EF4444" name="Failed" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRadarChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
        <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
        <PolarAngleAxis 
          dataKey="metric" 
          tick={{ fill: '#94A3B8', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#94A3B8', fontSize: 10 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#1E293B',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            color: '#F8FAFC'
          }}
        />
        <Legend />
        {selectedProducts.slice(0, 3).map((productId) => (
          <Radar
            key={productId}
            name={productId.charAt(0).toUpperCase() + productId.slice(1)}
            dataKey={productId}
            stroke={productColors[productId]}
            fill={productColors[productId]}
            fillOpacity={0.1}
            strokeWidth={2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card/50 glass border border-border rounded-xl p-6 mb-8">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Comparative Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Visual comparison across selected products
          </p>
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <div className="flex items-center space-x-1 p-1 bg-muted/30 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Products Legend */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-muted/20 rounded-lg">
          <span className="text-sm text-muted-foreground">Comparing:</span>
          {selectedProducts.map((productId) => (
            <div key={productId} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: productColors[productId] }}
              />
              <span className="text-sm font-medium text-foreground">
                {productId.charAt(0).toUpperCase() + productId.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Chart Content */}
      <div className="min-h-[400px]">
        {selectedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Icon name="GitCompare" size={48} className="text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Select Products to Compare
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Choose products from the matrix above to see comparative analysis and performance trends.
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'trends' && renderTrendChart()}
            {activeTab === 'volume' && renderVolumeChart()}
            {activeTab === 'performance' && renderRadarChart()}
          </>
        )}
      </div>

      {/* Chart Insights */}
      {selectedProducts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-success" />
              <div>
                <div className="text-sm font-medium text-foreground">Best Performer</div>
                <div className="text-xs text-muted-foreground">Asureify leads in accuracy</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
              <Icon name="Zap" size={20} className="text-warning" />
              <div>
                <div className="text-sm font-medium text-foreground">Fastest Response</div>
                <div className="text-xs text-muted-foreground">Riskguru at 0.8s average</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-secondary/10 rounded-lg">
              <Icon name="BarChart3" size={20} className="text-secondary" />
              <div>
                <div className="text-sm font-medium text-foreground">Highest Volume</div>
                <div className="text-xs text-muted-foreground">Asureify with 520K calls</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonCharts;
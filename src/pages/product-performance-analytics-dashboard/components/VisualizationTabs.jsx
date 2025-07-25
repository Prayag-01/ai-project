import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TrendAnalysisChart from './TrendAnalysisChart';
import DistributionAnalysisChart from './DistributionAnalysisChart';
import CorrelationAnalysisChart from './CorrelationAnalysisChart';

const VisualizationTabs = ({ selectedProducts, chartData, filters }) => {
  const [activeTab, setActiveTab] = useState('trend');

  const tabs = [
    {
      id: 'trend',
      label: 'Trend Analysis',
      icon: 'TrendingUp',
      description: 'Multi-line charts showing performance trends over time'
    },
    {
      id: 'distribution',
      label: 'Distribution Analysis',
      icon: 'BarChart3',
      description: 'Histograms and box plots for performance distribution'
    },
    {
      id: 'correlation',
      label: 'Correlation Analysis',
      icon: 'Scatter3D',
      description: 'Scatter plots with regression lines showing relationships'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trend':
        return <TrendAnalysisChart data={chartData.trend} selectedProducts={selectedProducts} filters={filters} />;
      case 'distribution':
        return <DistributionAnalysisChart data={chartData.distribution} selectedProducts={selectedProducts} filters={filters} />;
      case 'correlation':
        return <CorrelationAnalysisChart data={chartData.correlation} selectedProducts={selectedProducts} filters={filters} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                border-b-2 transition-all duration-200 hover:bg-muted/50
                ${activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Description */}
      <div className="px-6 py-3 bg-muted/20 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VisualizationTabs;
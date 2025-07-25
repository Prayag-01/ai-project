import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import KPIComparisonStrip from './components/KPIComparisonStrip';
import VisualizationTabs from './components/VisualizationTabs';
import InsightsPanel from './components/InsightsPanel';
import DataGrid from './components/DataGrid';
import BookmarkSystem from './components/BookmarkSystem';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductPerformanceAnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    selectedProducts: ['wrapportal'],
    dateRange: 'last7days',
    customStartDate: '',
    customEndDate: '',
    accuracyThreshold: 95,
    aggregation: 'daily'
  });

  const [isExporting, setIsExporting] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      id: 'wrapportal',
      accuracy: 94.2,
      accuracyChange: -1.8,
      responseTime: 127,
      responseTimeChange: 12,
      volume: 8420,
      volumeChange: 15.3,
      successRate: 96.8,
      significance: 0.94
    },
    {
      id: 'kinetic',
      accuracy: 91.7,
      accuracyChange: -3.2,
      responseTime: 156,
      responseTimeChange: 23,
      volume: 6230,
      volumeChange: -8.1,
      successRate: 93.4,
      significance: 0.87
    },
    {
      id: 'asureify',
      accuracy: 97.1,
      accuracyChange: 2.4,
      responseTime: 89,
      responseTimeChange: -5,
      volume: 12100,
      volumeChange: 22.7,
      successRate: 98.2,
      significance: 0.96
    },
    {
      id: 'riskguru',
      accuracy: 95.8,
      accuracyChange: 1.1,
      responseTime: 134,
      responseTimeChange: 8,
      volume: 9850,
      volumeChange: 11.4,
      successRate: 97.1,
      significance: 0.91
    },
    {
      id: 'anzenn',
      accuracy: 88.9,
      accuracyChange: -4.7,
      responseTime: 178,
      responseTimeChange: 31,
      volume: 4560,
      volumeChange: -12.3,
      successRate: 91.2,
      significance: 0.83
    },
    {
      id: 'prequaligy',
      accuracy: 93.5,
      accuracyChange: 0.8,
      responseTime: 142,
      responseTimeChange: 15,
      volume: 7890,
      volumeChange: 6.9,
      successRate: 95.7,
      significance: 0.89
    }
  ];

  // Mock chart data
  const chartData = {
    trend: generateTrendData(),
    distribution: generateDistributionData(),
    correlation: generateCorrelationData()
  };

  function generateTrendData() {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const entry = {
        timestamp: date.toISOString().split('T')[0]
      };
      
      filters.selectedProducts.forEach(product => {
        entry[`${product}_accuracy`] = Math.random() * 20 + 80;
        entry[`${product}_responseTime`] = Math.random() * 100 + 50;
        entry[`${product}_volume`] = Math.floor(Math.random() * 1000 + 500);
        entry[`${product}_successRate`] = Math.random() * 15 + 85;
      });
      
      data.push(entry);
    }
    
    return data;
  }

  function generateDistributionData() {
    return {
      histogram: [],
      boxplot: []
    };
  }

  function generateCorrelationData() {
    return [];
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleLoadBookmark = (bookmarkFilters) => {
    setFilters(bookmarkFilters);
  };

  const handleExport = async (format) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the file
    console.log(`Exporting data in ${format} format`);
    
    setIsExporting(false);
  };

  useEffect(() => {
    document.title = 'Product Performance Analytics Dashboard - InjalaOne Analytics';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Product Performance Analytics
              </h1>
              <p className="text-muted-foreground">
                Deep-dive analysis and interactive exploration of AI product performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <BookmarkSystem 
                filters={filters} 
                onLoadBookmark={handleLoadBookmark} 
              />
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => handleExport('pdf')}
                  disabled={isExporting}
                >
                  PDF Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleExport('csv')}
                  disabled={isExporting}
                >
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />

          {/* KPI Comparison Strip */}
          <KPIComparisonStrip 
            selectedProducts={filters.selectedProducts} 
            kpiData={kpiData} 
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
            {/* Visualization Area */}
            <div className="xl:col-span-3">
              <VisualizationTabs 
                selectedProducts={filters.selectedProducts}
                chartData={chartData}
                filters={filters}
              />
            </div>

            {/* Insights Panel */}
            <div className="xl:col-span-1">
              <InsightsPanel 
                selectedProducts={filters.selectedProducts}
                filters={filters}
              />
            </div>
          </div>

          {/* Data Grid */}
          <DataGrid 
            selectedProducts={filters.selectedProducts}
            filters={filters}
          />

          {/* Loading Overlay */}
          {isExporting && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-3">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={20} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">Generating export...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPerformanceAnalyticsDashboard;
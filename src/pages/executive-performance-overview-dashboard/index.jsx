import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import ProductPerformanceChart from './components/ProductPerformanceChart';
import ExecutiveSummaryCard from './components/ExecutiveSummaryCard';
import ProductRadarChart from './components/RadarChart';
import DateRangePicker from './components/DateRangePicker';
import ProductToggle from './components/ProductToggle';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ExecutivePerformanceOverviewDashboard = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState('30d');
  const [selectedView, setSelectedView] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState(['wrapportal', 'kinetic', 'asureify', 'riskguru']);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total AI Call Volume',
      value: 2847293,
      unit: 'calls',
      change: 12.5,
      trend: 'up',
      icon: 'Phone',
      color: 'primary'
    },
    {
      title: 'Overall Accuracy Rate',
      value: '94.2',
      unit: '%',
      change: 2.1,
      trend: 'up',
      icon: 'Target',
      color: 'success'
    },
    {
      title: 'Average Response Time',
      value: '1.8',
      unit: 'sec',
      change: -8.3,
      trend: 'down',
      icon: 'Clock',
      color: 'secondary'
    },
    {
      title: 'Revenue per AI Call',
      value: '$0.42',
      unit: '',
      change: 15.7,
      trend: 'up',
      icon: 'DollarSign',
      color: 'accent'
    }
  ];

  // Mock chart data
  const chartData = [
    {
      month: 'Jan',
      wrapportal: 96.2,
      kinetic: 94.8,
      asureify: 92.1,
      riskguru: 95.3,
      anzenn: 91.7,
      prequaligy: 93.9
    },
    {
      month: 'Feb',
      wrapportal: 95.8,
      kinetic: 95.2,
      asureify: 93.4,
      riskguru: 94.9,
      anzenn: 92.3,
      prequaligy: 94.2
    },
    {
      month: 'Mar',
      wrapportal: 96.5,
      kinetic: 95.7,
      asureify: 94.1,
      riskguru: 95.8,
      anzenn: 93.1,
      prequaligy: 94.8
    },
    {
      month: 'Apr',
      wrapportal: 97.1,
      kinetic: 96.3,
      asureify: 94.7,
      riskguru: 96.2,
      anzenn: 93.8,
      prequaligy: 95.1
    },
    {
      month: 'May',
      wrapportal: 96.8,
      kinetic: 96.1,
      asureify: 95.2,
      riskguru: 95.9,
      anzenn: 94.2,
      prequaligy: 95.4
    },
    {
      month: 'Jun',
      wrapportal: 97.3,
      kinetic: 96.8,
      asureify: 95.8,
      riskguru: 96.5,
      anzenn: 94.7,
      prequaligy: 95.9
    }
  ];

  // Mock radar chart data
  const radarData = [
    { metric: 'Accuracy', wrapportal: 97, kinetic: 96, asureify: 94, riskguru: 95 },
    { metric: 'Speed', wrapportal: 92, kinetic: 89, asureify: 91, riskguru: 88 },
    { metric: 'Reliability', wrapportal: 95, kinetic: 93, asureify: 92, riskguru: 94 },
    { metric: 'Cost Efficiency', wrapportal: 88, kinetic: 91, asureify: 89, riskguru: 87 },
    { metric: 'User Satisfaction', wrapportal: 94, kinetic: 92, asureify: 90, riskguru: 93 },
    { metric: 'Scalability', wrapportal: 90, kinetic: 88, asureify: 86, riskguru: 89 }
  ];

  // Mock executive summary data
  const executiveSummary = [
    {
      title: 'Top Performer',
      subtitle: 'Best overall metrics',
      value: 'Wrapportal',
      description: 'Leading with 97.3% accuracy and highest user satisfaction scores across all key performance indicators.',
      actionLabel: 'View Details',
      type: 'success'
    },
    {
      title: 'Biggest Improvement',
      subtitle: 'Month-over-month growth',
      value: 'Asureify',
      description: 'Achieved 15.2% improvement in response time and 8.7% increase in accuracy rate this quarter.',
      actionLabel: 'Analyze Trends',
      type: 'info'
    },
    {
      title: 'Needs Attention',
      subtitle: 'Performance concerns',
      value: 'Anzenn',
      description: 'Below target accuracy at 94.7% and showing declining user satisfaction trends requiring immediate focus.',
      actionLabel: 'Action Plan',
      type: 'warning'
    }
  ];

  const handleProductToggle = (productKey) => {
    setSelectedProducts(prev => 
      prev.includes(productKey) 
        ? prev.filter(p => p !== productKey)
        : [...prev, productKey]
    );
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting executive summary...');
  };

  const handleDrillDown = (action) => {
    switch(action) {
      case 'View Details': navigate('/product-performance-analytics-dashboard');
        break;
      case 'Analyze Trends': navigate('/product-performance-analytics-dashboard');
        break;
      case 'Action Plan': navigate('/real-time-operations-monitoring-dashboard');
        break;
      default:
        break;
    }
  };

  // Auto-refresh data every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Executive Performance Overview
              </h1>
              <p className="text-muted-foreground">
                Strategic insights across all AI-powered insurance products
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <DateRangePicker 
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
              />
              <ProductToggle 
                selectedView={selectedView}
                onViewChange={setSelectedView}
              />
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
              >
                Export
              </Button>
            </div>
          </div>

          {/* Last Updated Indicator */}
          <div className="flex items-center space-x-2 mb-6 text-sm text-muted-foreground">
            <Icon name="RefreshCw" size={16} />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-2" />
            <span className="text-success">Live</span>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            {/* Main Chart Area */}
            <div className="xl:col-span-8">
              <div className="bg-card/50 glass border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                      Product Accuracy Comparison
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Monthly accuracy rates across all AI products
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Maximize2"
                    onClick={() => navigate('/cross-product-comparison-dashboard')}
                  />
                </div>
                
                <ProductPerformanceChart 
                  data={chartData}
                  selectedProducts={selectedProducts}
                  onProductToggle={handleProductToggle}
                />
              </div>
            </div>

            {/* Executive Summary Sidebar */}
            <div className="xl:col-span-4 space-y-6">
              {executiveSummary.map((summary, index) => (
                <ExecutiveSummaryCard 
                  key={index}
                  {...summary}
                  onAction={() => handleDrillDown(summary.actionLabel)}
                />
              ))}
            </div>
          </div>

          {/* Radar Chart Section */}
          <div className="bg-card/50 glass border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">
                  Multi-Dimensional Performance Analysis
                </h2>
                <p className="text-sm text-muted-foreground">
                  Comparative radar chart across key performance metrics
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Settings"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                />
              </div>
            </div>
            
            <ProductRadarChart 
              data={radarData}
              selectedProducts={selectedProducts}
            />
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="outline"
              iconName="BarChart3"
              iconPosition="left"
              onClick={() => navigate('/product-performance-analytics-dashboard')}
            >
              Detailed Analytics
            </Button>
            <Button
              variant="outline"
              iconName="Activity"
              iconPosition="left"
              onClick={() => navigate('/real-time-operations-monitoring-dashboard')}
            >
              Live Monitoring
            </Button>
            <Button
              variant="outline"
              iconName="GitCompare"
              iconPosition="left"
              onClick={() => navigate('/cross-product-comparison-dashboard')}
            >
              Product Comparison
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutivePerformanceOverviewDashboard;
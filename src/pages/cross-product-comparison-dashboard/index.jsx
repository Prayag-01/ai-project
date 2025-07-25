import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ComparisonHeader from './components/ComparisonHeader';
import ProductComparisonMatrix from './components/ProductComparisonMatrix';
import ComparisonCharts from './components/ComparisonCharts';
import PerformanceBenchmarking from './components/PerformanceBenchmarking';
import ComparativeDataTable from './components/ComparativeDataTable';

const CrossProductComparisonDashboard = () => {
  const [dateRange, setDateRange] = useState('last7days');
  const [normalizationMode, setNormalizationMode] = useState('absolute');
  const [comparisonMode, setComparisonMode] = useState('sidebyside');
  const [selectedProducts, setSelectedProducts] = useState(['wrapportal', 'asureify']);

  // Mock data for products
  const productsData = [
    {
      id: 'wrapportal',
      name: 'Wrapportal',
      category: 'Claims Processing',
      icon: 'Shield',
      color: 'bg-gradient-to-br from-violet-500 to-purple-600',
      accuracy: 96.1,
      accuracyChange: 2.3,
      responseTime: 850,
      volume: 450000,
      successRate: 97.2,
      overallScore: 94,
      marketShare: 18.5,
      rank: 1
    },
    {
      id: 'kinetic',
      name: 'Kinetic',
      category: 'Risk Assessment',
      icon: 'Zap',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      accuracy: 94.1,
      accuracyChange: 1.8,
      responseTime: 720,
      volume: 380000,
      successRate: 95.8,
      overallScore: 91,
      marketShare: 15.2,
      rank: 2
    },
    {
      id: 'asureify',
      name: 'Asureify',
      category: 'Policy Management',
      icon: 'FileText',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600',
      accuracy: 97.1,
      accuracyChange: 3.1,
      responseTime: 920,
      volume: 520000,
      successRate: 98.1,
      overallScore: 96,
      marketShare: 22.3,
      rank: 1
    },
    {
      id: 'riskguru',
      name: 'Riskguru',
      category: 'Fraud Detection',
      icon: 'AlertTriangle',
      color: 'bg-gradient-to-br from-amber-500 to-orange-600',
      accuracy: 91.2,
      accuracyChange: -0.8,
      responseTime: 680,
      volume: 290000,
      successRate: 93.4,
      overallScore: 87,
      marketShare: 12.8,
      rank: 4
    },
    {
      id: 'anzenn',
      name: 'Anzenn',
      category: 'Customer Service',
      icon: 'Users',
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
      accuracy: 94.8,
      accuracyChange: 1.5,
      responseTime: 1100,
      volume: 340000,
      successRate: 96.3,
      overallScore: 89,
      marketShare: 14.7,
      rank: 3
    },
    {
      id: 'prequaligy',
      name: 'Prequaligy',
      category: 'Underwriting',
      icon: 'Calculator',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      accuracy: 90.3,
      accuracyChange: -1.2,
      responseTime: 1250,
      volume: 420000,
      successRate: 92.7,
      overallScore: 85,
      marketShare: 16.5,
      rank: 5
    }
  ];

  // Mock benchmark data
  const benchmarkData = {
    percentileRankings: [
      {
        product: 'Asureify',
        percentile: 95,
        rank: 2,
        totalCompetitors: 50,
        score: 96,
        icon: 'FileText',
        color: 'bg-gradient-to-br from-emerald-500 to-green-600'
      },
      {
        product: 'Wrapportal',
        percentile: 92,
        rank: 4,
        totalCompetitors: 50,
        score: 94,
        icon: 'Shield',
        color: 'bg-gradient-to-br from-violet-500 to-purple-600'
      },
      {
        product: 'Kinetic',
        percentile: 88,
        rank: 7,
        totalCompetitors: 50,
        score: 91,
        icon: 'Zap',
        color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
      },
      {
        product: 'Anzenn',
        percentile: 82,
        rank: 12,
        totalCompetitors: 50,
        score: 89,
        icon: 'Users',
        color: 'bg-gradient-to-br from-red-500 to-pink-600'
      },
      {
        product: 'Riskguru',
        percentile: 78,
        rank: 15,
        totalCompetitors: 50,
        score: 87,
        icon: 'AlertTriangle',
        color: 'bg-gradient-to-br from-amber-500 to-orange-600'
      },
      {
        product: 'Prequaligy',
        percentile: 72,
        rank: 18,
        totalCompetitors: 50,
        score: 85,
        icon: 'Calculator',
        color: 'bg-gradient-to-br from-indigo-500 to-purple-600'
      }
    ],
    peerComparisons: [
      {
        product: 'Wrapportal',
        ourScore: 96.1,
        industryAvg: 89.2,
        bestInClass: 98.5,
        gap: '+6.9',
        gapTrend: 'positive',
        status: 'excellent',
        icon: 'Shield',
        color: 'bg-gradient-to-br from-violet-500 to-purple-600'
      },
      {
        product: 'Kinetic',
        ourScore: 94.1,
        industryAvg: 87.8,
        bestInClass: 96.2,
        gap: '+6.3',
        gapTrend: 'positive',
        status: 'good',
        icon: 'Zap',
        color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
      },
      {
        product: 'Asureify',
        ourScore: 97.1,
        industryAvg: 91.4,
        bestInClass: 98.8,
        gap: '+5.7',
        gapTrend: 'positive',
        status: 'excellent',
        icon: 'FileText',
        color: 'bg-gradient-to-br from-emerald-500 to-green-600'
      },
      {
        product: 'Riskguru',
        ourScore: 91.2,
        industryAvg: 88.9,
        bestInClass: 95.4,
        gap: '+2.3',
        gapTrend: 'positive',
        status: 'good',
        icon: 'AlertTriangle',
        color: 'bg-gradient-to-br from-amber-500 to-orange-600'
      },
      {
        product: 'Anzenn',
        ourScore: 94.8,
        industryAvg: 90.1,
        bestInClass: 97.3,
        gap: '+4.7',
        gapTrend: 'positive',
        status: 'good',
        icon: 'Users',
        color: 'bg-gradient-to-br from-red-500 to-pink-600'
      },
      {
        product: 'Prequaligy',
        ourScore: 90.3,
        industryAvg: 86.7,
        bestInClass: 94.1,
        gap: '+3.6',
        gapTrend: 'positive',
        status: 'good',
        icon: 'Calculator',
        color: 'bg-gradient-to-br from-indigo-500 to-purple-600'
      }
    ],
    goalAchievement: [
      {
        metric: 'Overall Accuracy',
        description: 'Target accuracy across all products',
        current: 94.2,
        target: 95.0,
        achievement: 99.2,
        timeToGoal: '2 weeks',
        onTrack: true
      },
      {
        metric: 'Response Time',
        description: 'Average response time under 1 second',
        current: 920,
        target: 1000,
        achievement: 108.7,
        timeToGoal: 'Achieved',
        onTrack: true
      },
      {
        metric: 'Success Rate',
        description: 'Minimum 95% success rate',
        current: 95.6,
        target: 95.0,
        achievement: 100.6,
        timeToGoal: 'Achieved',
        onTrack: true
      },
      {
        metric: 'Cost Efficiency',
        description: 'Cost per call under $0.05',
        current: 0.048,
        target: 0.050,
        achievement: 104.2,
        timeToGoal: 'Achieved',
        onTrack: true
      }
    ]
  };

  // Mock comparative data for table
  const comparativeTableData = [
    {
      product: 'Wrapportal',
      category: 'Claims Processing',
      accuracy: 96.1,
      responseTime: 850,
      volume: 450000,
      successRate: 97.2,
      costPerCall: 0.045,
      trend: 'up',
      trendValue: '+2.3%',
      icon: 'Shield',
      color: 'bg-gradient-to-br from-violet-500 to-purple-600'
    },
    {
      product: 'Kinetic',
      category: 'Risk Assessment',
      accuracy: 94.1,
      responseTime: 720,
      volume: 380000,
      successRate: 95.8,
      costPerCall: 0.042,
      trend: 'up',
      trendValue: '+1.8%',
      icon: 'Zap',
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      product: 'Asureify',
      category: 'Policy Management',
      accuracy: 97.1,
      responseTime: 920,
      volume: 520000,
      successRate: 98.1,
      costPerCall: 0.048,
      trend: 'up',
      trendValue: '+3.1%',
      icon: 'FileText',
      color: 'bg-gradient-to-br from-emerald-500 to-green-600'
    },
    {
      product: 'Riskguru',
      category: 'Fraud Detection',
      accuracy: 91.2,
      responseTime: 680,
      volume: 290000,
      successRate: 93.4,
      costPerCall: 0.039,
      trend: 'down',
      trendValue: '-0.8%',
      icon: 'AlertTriangle',
      color: 'bg-gradient-to-br from-amber-500 to-orange-600'
    },
    {
      product: 'Anzenn',
      category: 'Customer Service',
      accuracy: 94.8,
      responseTime: 1100,
      volume: 340000,
      successRate: 96.3,
      costPerCall: 0.051,
      trend: 'up',
      trendValue: '+1.5%',
      icon: 'Users',
      color: 'bg-gradient-to-br from-red-500 to-pink-600'
    },
    {
      product: 'Prequaligy',
      category: 'Underwriting',
      accuracy: 90.3,
      responseTime: 1250,
      volume: 420000,
      successRate: 92.7,
      costPerCall: 0.053,
      trend: 'down',
      trendValue: '-1.2%',
      icon: 'Calculator',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-600'
    }
  ];

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting comparison data...');
    // In a real app, this would trigger a download
  };

  useEffect(() => {
    // Mock data refresh every hour
    const interval = setInterval(() => {
      console.log('Refreshing comparison data...');
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Comparison Header */}
          <ComparisonHeader
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            normalizationMode={normalizationMode}
            onNormalizationChange={setNormalizationMode}
            comparisonMode={comparisonMode}
            onComparisonModeChange={setComparisonMode}
            onExport={handleExport}
          />

          {/* Product Comparison Matrix */}
          <ProductComparisonMatrix
            products={productsData}
            selectedProducts={selectedProducts}
            onProductToggle={handleProductToggle}
          />

          {/* Comparison Charts */}
          <ComparisonCharts
            data={productsData}
            selectedProducts={selectedProducts}
            comparisonMode={comparisonMode}
          />

          {/* Performance Benchmarking */}
          <PerformanceBenchmarking
            benchmarkData={benchmarkData}
          />

          {/* Comparative Data Table */}
          <ComparativeDataTable
            data={comparativeTableData}
            onExport={handleExport}
          />
        </div>
      </main>
    </div>
  );
};

export default CrossProductComparisonDashboard;
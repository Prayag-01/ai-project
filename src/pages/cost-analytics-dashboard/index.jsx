import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const CostAnalyticsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [accuracyThreshold, setAccuracyThreshold] = useState(90);
  const [costThreshold, setCostThreshold] = useState(1000);
  const [alerts, setAlerts] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [predictiveData, setPredictiveData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock cost data by category
  const categoryData = [
    { name: 'AI Services', cost: 4250, percentage: 58, color: '#6366F1' },
    { name: 'AWS Infrastructure', cost: 2100, percentage: 29, color: '#8B5CF6' },
    { name: 'Other Infrastructure', cost: 950, percentage: 13, color: '#EC4899' }
  ];

  // Mock AI model costs
  const modelCostData = [
    { 
      model: 'GPT-4o-mini', 
      cost: 1850, 
      calls: 125000, 
      avgCostPerCall: 0.0148,
      products: { wrapportal: 450, kinetic: 320, asureify: 680, riskguru: 400 }
    },
    { 
      model: 'GPT-4', 
      cost: 1200, 
      calls: 15000, 
      avgCostPerCall: 0.08,
      products: { wrapportal: 300, kinetic: 250, asureify: 400, riskguru: 250 }
    },
    { 
      model: 'Claude-3-Sonnet', 
      cost: 800, 
      calls: 25000, 
      avgCostPerCall: 0.032,
      products: { wrapportal: 200, kinetic: 150, asureify: 250, riskguru: 200 }
    },
    { 
      model: 'Gemini Pro', 
      cost: 400, 
      calls: 40000, 
      avgCostPerCall: 0.01,
      products: { wrapportal: 100, kinetic: 80, asureify: 120, riskguru: 100 }
    }
  ];

  // Mock product-wise breakdown
  const productCostData = [
    {
      product: 'Wrapportal',
      totalCost: 1050,
      aiCost: 650,
      awsCost: 280,
      infraCost: 120,
      calls: 45000,
      accuracy: 96.2,
      documentAccuracy: { contracts: 98.1, claims: 94.5, policies: 97.2 }
    },
    {
      product: 'Asureify',
      totalCost: 1450,
      aiCost: 850,
      awsCost: 420,
      infraCost: 180,
      calls: 62000,
      accuracy: 94.8,
      documentAccuracy: { policies: 96.5, applications: 93.2, certificates: 95.8 }
    },
    {
      product: 'Kinetic',
      totalCost: 800,
      aiCost: 500,
      awsCost: 200,
      infraCost: 100,
      calls: 35000,
      accuracy: 92.1,
      documentAccuracy: { reports: 94.2, assessments: 90.8, forms: 91.5 }
    },
    {
      product: 'Riskguru',
      totalCost: 950,
      aiCost: 600,
      awsCost: 250,
      infraCost: 100,
      calls: 38000,
      accuracy: 95.3,
      documentAccuracy: { claims: 97.1, investigations: 93.8, reports: 95.0 }
    }
  ];

  // Mock AWS service costs
  const awsServiceData = [
    { service: 'EC2 Instances', cost: 650, percentage: 31 },
    { service: 'Lambda Functions', cost: 420, percentage: 20 },
    { service: 'S3 Storage', cost: 280, percentage: 13 },
    { service: 'RDS Database', cost: 350, percentage: 17 },
    { service: 'CloudFront CDN', cost: 180, percentage: 9 },
    { service: 'API Gateway', cost: 220, percentage: 10 }
  ];

  // Mock daily cost trends
  const dailyCostTrends = [
    { date: '2025-01-19', ai: 145, aws: 78, infra: 32 },
    { date: '2025-01-20', ai: 162, aws: 82, infra: 28 },
    { date: '2025-01-21', ai: 138, aws: 75, infra: 35 },
    { date: '2025-01-22', ai: 175, aws: 88, infra: 42 },
    { date: '2025-01-23', ai: 156, aws: 79, infra: 38 },
    { date: '2025-01-24', ai: 189, aws: 92, infra: 45 },
    { date: '2025-01-25', ai: 167, aws: 85, infra: 40 }
  ];

  // Generate predictive data for next 7 days
  const generatePredictiveData = () => {
    const predictions = [];
    const lastTrend = dailyCostTrends[dailyCostTrends.length - 1];
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        ai: Math.round(lastTrend.ai * (1 + (Math.random() - 0.5) * 0.2)),
        aws: Math.round(lastTrend.aws * (1 + (Math.random() - 0.5) * 0.15)),
        infra: Math.round(lastTrend.infra * (1 + (Math.random() - 0.5) * 0.1)),
        predicted: true
      });
    }
    return predictions;
  };

  // Generate alerts based on thresholds
  const generateAlerts = () => {
    const newAlerts = [];
    
    // Cost threshold alerts
    productCostData.forEach(product => {
      if (product.totalCost > costThreshold) {
        newAlerts.push({
          id: `cost-${product.product}`,
          type: 'warning',
          title: `High Cost Alert: ${product.product}`,
          message: `Total cost ($${product.totalCost}) exceeds threshold ($${costThreshold})`,
          timestamp: new Date(),
          product: product.product
        });
      }
    });

    // Accuracy threshold alerts
    productCostData.forEach(product => {
      if (product.accuracy < accuracyThreshold) {
        newAlerts.push({
          id: `accuracy-${product.product}`,
          type: 'critical',
          title: `Low Accuracy Alert: ${product.product}`,
          message: `Accuracy (${product.accuracy}%) below threshold (${accuracyThreshold}%)`,
          timestamp: new Date(),
          product: product.product
        });
      }
    });

    return newAlerts;
  };

  // Filter data based on selected filters
  const getFilteredData = () => {
    let filtered = productCostData;
    
    if (selectedProduct !== 'all') {
      filtered = filtered.filter(product => 
        product.product.toLowerCase() === selectedProduct.toLowerCase()
      );
    }
    
    if (selectedCategory !== 'all') {
      // Filter by cost category if needed
    }
    
    return filtered;
  };

  // Export functionality
  const handleExport = async (format) => {
    setIsExporting(true);
    
    const data = {
      timestamp: new Date().toISOString(),
      filters: { selectedTimeRange, selectedProduct, selectedCategory },
      summary: {
        totalAICost: 4250,
        totalAWSCost: 2100,
        totalInfraCost: 950
      },
      products: getFilteredData(),
      models: modelCostData,
      trends: dailyCostTrends
    };
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cost-analytics-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvData = getFilteredData().map(p => 
        `${p.product},${p.totalCost},${p.aiCost},${p.awsCost},${p.calls},${p.accuracy}`
      ).join('\n');
      const csv = `Product,Total Cost,AI Cost,AWS Cost,Calls,Accuracy\n${csvData}`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cost-analytics-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    setIsExporting(false);
  };

  // Auto-update alerts and predictions
  useEffect(() => {
    const newAlerts = generateAlerts();
    setAlerts(newAlerts);
    setPredictiveData(generatePredictiveData());
    
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setAlerts(generateAlerts());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [accuracyThreshold, costThreshold]);

  const AlertPanel = () => (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Smart Alerts</h3>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Icon name="Clock" size={12} />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>
      
      {alerts.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <Icon name="CheckCircle" size={48} className="mx-auto mb-2 text-green-500" />
          <p>All systems operating within thresholds</p>
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'critical' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-medium ${
                    alert.type === 'critical' ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {alert.title}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {alert.message}
                  </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const FilterPanel = () => (
    <div className={`bg-white rounded-lg border border-slate-200 p-6 mb-8 transition-all duration-300 ${
      showFilters ? 'block' : 'hidden'
    }`}>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Advanced Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Product</label>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="all">All Products</option>
            <option value="wrapportal">Wrapportal</option>
            <option value="asureify">Asureify</option>
            <option value="kinetic">Kinetic</option>
            <option value="riskguru">Riskguru</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            <option value="ai">AI Services</option>
            <option value="aws">AWS Infrastructure</option>
            <option value="infra">Other Infrastructure</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Accuracy Threshold (%)</label>
          <input 
            type="range" 
            min="80" 
            max="100" 
            value={accuracyThreshold}
            onChange={(e) => setAccuracyThreshold(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-slate-500 mt-1">{accuracyThreshold}%</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Cost Threshold ($)</label>
          <input 
            type="range" 
            min="500" 
            max="2000" 
            step="50"
            value={costThreshold}
            onChange={(e) => setCostThreshold(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-slate-500 mt-1">${costThreshold}</div>
        </div>
      </div>
    </div>
  );

  const PredictiveChart = () => {
    const combinedData = [...dailyCostTrends, ...predictiveData];
    
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Cost Trends with 7-Day Prediction</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ai" 
                stroke="#6366F1" 
                strokeWidth={2} 
                dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                strokeDasharray={(entry) => entry?.predicted ? '5 5' : '0'}
              />
              <Line 
                type="monotone" 
                dataKey="aws" 
                stroke="#8B5CF6" 
                strokeWidth={2} 
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                strokeDasharray={(entry) => entry?.predicted ? '5 5' : '0'}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-slate-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-600"></div>
              <span>Historical Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-blue-600" style={{ borderTop: '2px dashed #6366F1' }}></div>
              <span>Predicted Trends</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CostCard = ({ title, amount, change, changeType, icon, description }) => (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600`}>
          <Icon name={icon} size={20} color="white" />
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
          changeType === 'positive' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
        }`}>
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-slate-800">${amount.toLocaleString()}</h3>
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );

  const ModelCostCard = ({ model, cost, calls, avgCostPerCall, products }) => (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-slate-800">{model}</h4>
        <span className="text-lg font-bold text-slate-800">${cost.toLocaleString()}</span>
      </div>
      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Total Calls:</span>
          <span className="font-medium">{calls.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg Cost/Call:</span>
          <span className="font-medium">${avgCostPerCall.toFixed(4)}</span>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-1">Product Distribution:</p>
          {Object.entries(products).map(([product, productCost]) => (
            <div key={product} className="flex justify-between text-xs">
              <span className="capitalize">{product}:</span>
              <span>${productCost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Dashboard Header */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Cost Analytics Dashboard</h1>
              <p className="text-slate-500">AI usage analytics with predictive insights and smart alerts</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time monitoring</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Icon name="TrendingUp" size={16} />
                  <span>Predictive analytics enabled</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                iconName="Filter" 
                iconPosition="left"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <select 
                value={selectedTimeRange} 
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Download" 
                  iconPosition="left"
                  onClick={() => {
                    const dropdown = document.getElementById('export-dropdown');
                    dropdown.classList.toggle('hidden');
                  }}
                  disabled={isExporting}
                >
                  {isExporting ? 'Exporting...' : 'Export'}
                </Button>
                <div id="export-dropdown" className="hidden absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  <button 
                    onClick={() => handleExport('csv')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Export as CSV</span>
                  </button>
                  <button 
                    onClick={() => handleExport('json')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <Icon name="Code" size={16} />
                    <span>Export as JSON</span>
                  </button>
                  <button 
                    onClick={() => handleExport('pdf')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Generate PDF Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <FilterPanel />

          {/* Smart Alerts Panel */}
          <AlertPanel />

          {/* Cost Category Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <CostCard 
              title="AI Services" 
              amount={4250} 
              change="+12%" 
              changeType="positive" 
              icon="Brain"
              description="OpenAI, Claude, Gemini models"
            />
            <CostCard 
              title="AWS Infrastructure" 
              amount={2100} 
              change="+8%" 
              changeType="positive" 
              icon="Cloud"
              description="EC2, Lambda, S3, RDS"
            />
            <CostCard 
              title="Other Infrastructure" 
              amount={950} 
              change="-3%" 
              changeType="negative" 
              icon="Server"
              description="Tools, services, monitoring"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Daily Cost Trends */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Daily Cost Trends</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={dailyCostTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
                    <Legend />
                    <Area type="monotone" dataKey="ai" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="aws" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="infra" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost Category Breakdown */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Cost Distribution</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie 
                      data={categoryData} 
                      dataKey="cost" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={100} 
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', color: '#F8FAFC' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Predictive Analytics Chart */}
          <PredictiveChart />

          {/* AI Model Cost Breakdown */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">AI Model Cost Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modelCostData.map((model, index) => (
                <ModelCostCard key={index} {...model} />
              ))}
            </div>
          </div>

          {/* Product-wise Cost & Accuracy Table */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Product Performance & Cost Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Product</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Total Cost</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">AI Cost</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">AWS Cost</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Calls</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">General Accuracy</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productCostData.map((product, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{product.product}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800">
                        ${product.totalCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-blue-600">
                        ${product.aiCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-purple-600">
                        ${product.awsCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {product.calls.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.accuracy >= 95 ? 'bg-green-100 text-green-800' :
                          product.accuracy >= 90 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.accuracy}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="outline" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AWS Services Cost Breakdown */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">AWS Services Cost Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {awsServiceData.map((service, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-slate-800">{service.service}</h4>
                    <span className="text-lg font-bold text-slate-800">${service.cost}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600">{service.percentage}% of AWS costs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostAnalyticsDashboard;

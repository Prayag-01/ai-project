import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ControlBar from './components/ControlBar';
import RealTimeChart from './components/RealTimeChart';
import AlertPanel from './components/AlertPanel';
import ActivityLogTable from './components/ActivityLogTable';

const RealTimeOperationsMonitoringDashboard = () => {
  const [environment, setEnvironment] = useState('production');
  const [refreshInterval, setRefreshInterval] = useState(15);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [systemHealth, setSystemHealth] = useState('healthy');
  const [isLoading, setIsLoading] = useState(false);

  // Mock real-time data
  const [metricsData, setMetricsData] = useState({
    callVolume: { value: 2847, change: '+12.5%', changeType: 'positive' },
    accuracy: { value: 98.7, change: '-0.3%', changeType: 'negative', status: 'warning' },
    responseTime: { value: 245, change: '+8ms', changeType: 'negative' },
    errorRate: { value: 1.3, change: '-0.2%', changeType: 'positive' },
    uptime: { value: 99.98, change: '+0.01%', changeType: 'positive', status: 'success' },
    capacity: { value: 67, change: '+5%', changeType: 'positive' }
  });

  // Mock chart data
  const generateChartData = () => {
    const now = new Date();
    const data = [];
    for (let i = 14; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000); // 1 minute intervals
      data.push({
        timestamp,
        callVolume: Math.floor(Math.random() * 100) + 150 + (i * 2),
        responseTime: Math.floor(Math.random() * 50) + 200 + (Math.sin(i) * 20),
        successRate: Math.floor(Math.random() * 5) + 95,
        errorRate: Math.random() * 2 + 0.5
      });
    }
    return data;
  };

  const [chartData, setChartData] = useState(generateChartData());

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      title: "High Response Time Detected",
      description: "Average response time exceeded 300ms threshold for Wrapportal API endpoints",
      severity: "warning",
      source: "Wrapportal",
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      title: "Database Connection Pool Full",
      description: "Connection pool utilization reached 95% capacity. Consider scaling database resources",
      severity: "critical",
      source: "Database",
      timestamp: new Date(Date.now() - 600000) // 10 minutes ago
    },
    {
      id: 3,
      title: "API Rate Limit Approaching",
      description: "Kinetic API approaching rate limit threshold (85% of daily quota used)",
      severity: "info",
      source: "Kinetic",
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 4,
      title: "Memory Usage Spike",
      description: "Server memory usage increased to 88% on production instance prod-web-03",
      severity: "warning",
      source: "Infrastructure",
      timestamp: new Date(Date.now() - 1200000) // 20 minutes ago
    }
  ];

  // Mock activity log data
  const mockActivities = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 30000),
      product: "wrapportal",
      endpoint: "/api/v1/analyze-document",
      status: "success",
      duration: 245,
      requestId: "req_7x9k2m4n8p"
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 45000),
      product: "kinetic",
      endpoint: "/api/v1/risk-assessment",
      status: "success",
      duration: 189,
      requestId: "req_3h5j7k9m2q"
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 60000),
      product: "asureify",
      endpoint: "/api/v1/policy-validation",
      status: "error",
      duration: 5000,
      requestId: "req_8n4m6k2j9p"
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 75000),
      product: "riskguru",
      endpoint: "/api/v1/fraud-detection",
      status: "success",
      duration: 156,
      requestId: "req_2k8j5m9n7q"
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 90000),
      product: "anzenn",
      endpoint: "/api/v1/compliance-check",
      status: "pending",
      duration: 0,
      requestId: "req_9m7k4j2n8p"
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 105000),
      product: "prequaligy",
      endpoint: "/api/v1/underwriting-score",
      status: "success",
      duration: 298,
      requestId: "req_5j3k8m6n4q"
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 120000),
      product: "wrapportal",
      endpoint: "/api/v1/document-extract",
      status: "timeout",
      duration: 30000,
      requestId: "req_4k9j7m2n5p"
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 135000),
      product: "kinetic",
      endpoint: "/api/v1/claim-processing",
      status: "success",
      duration: 412,
      requestId: "req_7m2k5j8n9q"
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      // Update metrics with small random changes
      setMetricsData(prev => ({
        callVolume: {
          ...prev.callVolume,
          value: prev.callVolume.value + Math.floor(Math.random() * 10) - 5
        },
        accuracy: {
          ...prev.accuracy,
          value: Math.max(95, Math.min(100, prev.accuracy.value + (Math.random() - 0.5) * 0.2))
        },
        responseTime: {
          ...prev.responseTime,
          value: Math.max(150, prev.responseTime.value + Math.floor(Math.random() * 20) - 10)
        },
        errorRate: {
          ...prev.errorRate,
          value: Math.max(0, Math.min(5, prev.errorRate.value + (Math.random() - 0.5) * 0.1))
        },
        uptime: prev.uptime,
        capacity: {
          ...prev.capacity,
          value: Math.max(50, Math.min(90, prev.capacity.value + Math.floor(Math.random() * 6) - 3))
        }
      }));

      // Update chart data
      setChartData(prev => {
        const newData = [...prev.slice(1)];
        const lastPoint = prev[prev.length - 1];
        newData.push({
          timestamp: new Date(),
          callVolume: Math.max(100, lastPoint.callVolume + Math.floor(Math.random() * 20) - 10),
          responseTime: Math.max(150, lastPoint.responseTime + Math.floor(Math.random() * 30) - 15),
          successRate: Math.max(90, Math.min(100, lastPoint.successRate + (Math.random() - 0.5) * 2)),
          errorRate: Math.max(0, Math.min(5, lastPoint.errorRate + (Math.random() - 0.5) * 0.5))
        });
        return newData;
      });
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, refreshInterval]);

  const handleDismissAlert = (alertId) => {
    // In real app, this would make an API call
    console.log('Dismissing alert:', alertId);
  };

  const handleViewAlertDetails = (alert) => {
    // In real app, this would open a modal or navigate to details page
    console.log('Viewing alert details:', alert);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Real-Time Operations</h1>
              <p className="text-muted-foreground mt-1">
                Monitor system health and performance across all AI products
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>

          {/* Control Bar */}
          <ControlBar
            environment={environment}
            onEnvironmentChange={setEnvironment}
            refreshInterval={refreshInterval}
            onRefreshIntervalChange={setRefreshInterval}
            isAutoRefresh={isAutoRefresh}
            onAutoRefreshToggle={() => setIsAutoRefresh(!isAutoRefresh)}
            systemHealth={systemHealth}
          />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <MetricCard
              title="AI Call Volume"
              value={metricsData.callVolume.value.toLocaleString()}
              unit="/hour"
              change={metricsData.callVolume.change}
              changeType={metricsData.callVolume.changeType}
              icon="Activity"
              isLoading={isLoading}
            />
            <MetricCard
              title="Accuracy Rate"
              value={metricsData.accuracy.value}
              unit="%"
              change={metricsData.accuracy.change}
              changeType={metricsData.accuracy.changeType}
              icon="Target"
              status={metricsData.accuracy.status}
              isLoading={isLoading}
            />
            <MetricCard
              title="Response Time"
              value={metricsData.responseTime.value}
              unit="ms"
              change={metricsData.responseTime.change}
              changeType={metricsData.responseTime.changeType}
              icon="Zap"
              isLoading={isLoading}
            />
            <MetricCard
              title="Error Rate"
              value={metricsData.errorRate.value}
              unit="%"
              change={metricsData.errorRate.change}
              changeType={metricsData.errorRate.changeType}
              icon="AlertTriangle"
              isLoading={isLoading}
            />
            <MetricCard
              title="API Uptime"
              value={metricsData.uptime.value}
              unit="%"
              change={metricsData.uptime.change}
              changeType={metricsData.uptime.changeType}
              icon="Shield"
              status={metricsData.uptime.status}
              isLoading={isLoading}
            />
            <MetricCard
              title="Capacity Usage"
              value={metricsData.capacity.value}
              unit="%"
              change={metricsData.capacity.change}
              changeType={metricsData.capacity.changeType}
              icon="Server"
              isLoading={isLoading}
            />
          </div>

          {/* Charts and Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Charts Area */}
            <div className="xl:col-span-2 space-y-6">
              <RealTimeChart
                title="AI Call Volume Trend"
                data={chartData}
                dataKey="callVolume"
                color="#8B5CF6"
                type="area"
                height={300}
                unit=" calls"
                isLoading={isLoading}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RealTimeChart
                  title="Response Time Distribution"
                  data={chartData}
                  dataKey="responseTime"
                  color="#06B6D4"
                  type="line"
                  height={250}
                  unit="ms"
                  isLoading={isLoading}
                />
                
                <RealTimeChart
                  title="Success Rate Monitoring"
                  data={chartData}
                  dataKey="successRate"
                  color="#10B981"
                  type="area"
                  height={250}
                  unit="%"
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Alert Panel */}
            <div className="xl:col-span-1">
              <AlertPanel
                alerts={mockAlerts}
                onDismissAlert={handleDismissAlert}
                onViewDetails={handleViewAlertDetails}
              />
            </div>
          </div>

          {/* Activity Log */}
          <ActivityLogTable
            activities={mockActivities}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default RealTimeOperationsMonitoringDashboard;
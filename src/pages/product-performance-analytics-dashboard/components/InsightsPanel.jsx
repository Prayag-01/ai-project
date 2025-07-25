import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = ({ selectedProducts, filters }) => {
  const [activeInsightTab, setActiveInsightTab] = useState('patterns');

  const insightTabs = [
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' },
    { id: 'anomalies', label: 'Anomalies', icon: 'AlertTriangle' },
    { id: 'forecasts', label: 'Forecasts', icon: 'Crystal' }
  ];

  const patternInsights = [
    {
      id: 1,
      type: 'trend',
      severity: 'high',
      title: 'Accuracy Decline Pattern',
      description: `Wrapportal showing 3.2% accuracy decline over last 48 hours during peak traffic periods (2-4 PM EST).`,
      confidence: 94,
      impact: 'High',
      recommendation: 'Scale infrastructure during peak hours',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'correlation',
      severity: 'medium',
      title: 'Volume-Response Time Correlation',
      description: `Strong negative correlation (-0.73) between call volume and response time across all products.`,
      confidence: 87,
      impact: 'Medium',
      recommendation: 'Implement load balancing optimization',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'seasonal',
      severity: 'low',
      title: 'Weekly Usage Pattern',
      description: `Consistent 40% traffic increase on Mondays and Fridays across Asureify and Riskguru.`,
      confidence: 91,
      impact: 'Low',
      recommendation: 'Adjust capacity planning for weekdays',
      timestamp: '6 hours ago'
    }
  ];

  const anomalyInsights = [
    {
      id: 1,
      type: 'spike',
      severity: 'critical',
      title: 'Response Time Spike',
      description: `Kinetic experienced 340% response time increase at 14:23 EST, affecting 1,247 requests.`,
      confidence: 98,
      impact: 'Critical',
      recommendation: 'Investigate database connection pool',
      timestamp: '23 minutes ago',
      affected: 1247
    },
    {
      id: 2,
      type: 'drop',
      severity: 'high',
      title: 'Accuracy Drop',
      description: `Anzenn accuracy dropped to 78.3% (below 95% threshold) for insurance claim processing.`,
      confidence: 96,
      impact: 'High',
      recommendation: 'Review model training data',
      timestamp: '1 hour ago',
      affected: 892
    },
    {
      id: 3,
      type: 'outlier',
      severity: 'medium',
      title: 'Volume Outlier',
      description: `Prequaligy received 3x normal traffic volume from single client (ID: CLI_7829).`,
      confidence: 89,
      impact: 'Medium',
      recommendation: 'Implement rate limiting for client',
      timestamp: '3 hours ago',
      affected: 2156
    }
  ];

  const forecastInsights = [
    {
      id: 1,
      metric: 'accuracy',
      product: 'wrapportal',
      prediction: 'Declining',
      value: '92.1%',
      change: -2.8,
      confidence: [89, 95],
      timeframe: 'Next 24 hours',
      description: `Based on current trend, Wrapportal accuracy expected to drop to 92.1% by tomorrow.`
    },
    {
      id: 2,
      metric: 'volume',
      product: 'asureify',
      prediction: 'Increasing',
      value: '12,400',
      change: +18.5,
      confidence: [85, 92],
      timeframe: 'Next 7 days',
      description: `Asureify call volume projected to increase 18.5% based on seasonal patterns.`
    },
    {
      id: 3,
      metric: 'responseTime',
      product: 'riskguru',
      prediction: 'Stable',
      value: '127ms',
      change: +2.1,
      confidence: [91, 97],
      timeframe: 'Next 48 hours',
      description: `Riskguru response times expected to remain stable with slight 2.1ms increase.`
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertOctagon';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  const renderPatterns = () => (
    <div className="space-y-4">
      {patternInsights.map((insight) => (
        <div key={insight.id} className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg border ${getSeverityColor(insight.severity)}`}>
                <Icon name={getSeverityIcon(insight.severity)} size={14} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
                <p className="text-xs text-muted-foreground">{insight.timestamp}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Confidence</p>
              <p className="text-sm font-medium text-foreground">{insight.confidence}%</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-xs">
                <span className="text-muted-foreground">Impact: </span>
                <span className="font-medium text-foreground">{insight.impact}</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Type: </span>
                <span className="font-medium text-foreground capitalize">{insight.type}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
              View Details
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Icon name="Lightbulb" size={14} className="text-warning" />
              <p className="text-xs text-muted-foreground">{insight.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnomalies = () => (
    <div className="space-y-4">
      {anomalyInsights.map((anomaly) => (
        <div key={anomaly.id} className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg border ${getSeverityColor(anomaly.severity)}`}>
                <Icon name={getSeverityIcon(anomaly.severity)} size={14} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">{anomaly.title}</h4>
                <p className="text-xs text-muted-foreground">{anomaly.timestamp}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Affected</p>
              <p className="text-sm font-medium text-foreground">{anomaly.affected?.toLocaleString()}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{anomaly.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-xs">
                <span className="text-muted-foreground">Confidence: </span>
                <span className="font-medium text-foreground">{anomaly.confidence}%</span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Type: </span>
                <span className="font-medium text-foreground capitalize">{anomaly.type}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
              Investigate
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Icon name="Wrench" size={14} className="text-primary" />
              <p className="text-xs text-muted-foreground">{anomaly.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderForecasts = () => (
    <div className="space-y-4">
      {forecastInsights.map((forecast) => (
        <div key={forecast.id} className="bg-muted/20 rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Icon name="Crystal" size={14} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground capitalize">
                  {forecast.product} - {forecast.metric}
                </h4>
                <p className="text-xs text-muted-foreground">{forecast.timeframe}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">{forecast.value}</p>
              <div className={`flex items-center space-x-1 text-xs ${
                forecast.change >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon name={forecast.change >= 0 ? 'TrendingUp' : 'TrendingDown'} size={12} />
                <span>{forecast.change >= 0 ? '+' : ''}{forecast.change}%</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{forecast.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-xs">
                <span className="text-muted-foreground">Confidence Range: </span>
                <span className="font-medium text-foreground">
                  {forecast.confidence[0]}% - {forecast.confidence[1]}%
                </span>
              </div>
              <div className="text-xs">
                <span className="text-muted-foreground">Trend: </span>
                <span className="font-medium text-foreground">{forecast.prediction}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="BarChart3" iconPosition="right">
              View Model
            </Button>
          </div>
          
          {/* Confidence Interval Visualization */}
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Low Confidence</span>
              <span>High Confidence</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-warning/50 to-success"
                style={{ width: `${((forecast.confidence[1] - forecast.confidence[0]) / 100) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeInsightTab) {
      case 'patterns': return renderPatterns();
      case 'anomalies': return renderAnomalies();
      case 'forecasts': return renderForecasts();
      default: return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Brain" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings" />
        </div>

        {/* Insight Tabs */}
        <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
          {insightTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveInsightTab(tab.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all flex-1
                ${activeInsightTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {renderTabContent()}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>Real-time analysis active</span>
          </div>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;
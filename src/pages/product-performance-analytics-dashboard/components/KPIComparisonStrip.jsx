import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIComparisonStrip = ({ selectedProducts, kpiData }) => {
  const getProductColor = (product) => {
    const colors = {
      wrapportal: 'text-violet-400',
      kinetic: 'text-blue-400',
      asureify: 'text-emerald-400',
      riskguru: 'text-amber-400',
      anzenn: 'text-pink-400',
      prequaligy: 'text-cyan-400'
    };
    return colors[product] || 'text-gray-400';
  };

  const getProductBgColor = (product) => {
    const colors = {
      wrapportal: 'bg-violet-500/10 border-violet-500/20',
      kinetic: 'bg-blue-500/10 border-blue-500/20',
      asureify: 'bg-emerald-500/10 border-emerald-500/20',
      riskguru: 'bg-amber-500/10 border-amber-500/20',
      anzenn: 'bg-pink-500/10 border-pink-500/20',
      prequaligy: 'bg-cyan-500/10 border-cyan-500/20'
    };
    return colors[product] || 'bg-gray-500/10 border-gray-500/20';
  };

  const formatChange = (change) => {
    const isPositive = change >= 0;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive,
      icon: isPositive ? 'TrendingUp' : 'TrendingDown',
      color: isPositive ? 'text-success' : 'text-error'
    };
  };

  const getSignificanceIndicator = (significance) => {
    if (significance >= 0.95) return { icon: 'CheckCircle2', color: 'text-success', label: 'Highly Significant' };
    if (significance >= 0.8) return { icon: 'AlertCircle', color: 'text-warning', label: 'Moderately Significant' };
    return { icon: 'XCircle', color: 'text-muted-foreground', label: 'Not Significant' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">KPI Comparison</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>vs. previous period</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {selectedProducts.map((productId) => {
          const product = kpiData.find(p => p.id === productId);
          if (!product) return null;

          const accuracyChange = formatChange(product.accuracyChange);
          const responseTimeChange = formatChange(product.responseTimeChange);
          const volumeChange = formatChange(product.volumeChange);
          const significance = getSignificanceIndicator(product.significance);

          return (
            <div
              key={productId}
              className={`border rounded-lg p-4 ${getProductBgColor(productId)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getProductColor(productId).replace('text-', 'bg-')}`} />
                  <h3 className="font-semibold text-foreground capitalize">{productId}</h3>
                </div>
                <div className="flex items-center space-x-1" title={significance.label}>
                  <Icon name={significance.icon} size={16} className={significance.color} />
                </div>
              </div>

              <div className="space-y-4">
                {/* Accuracy */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-xl font-bold text-foreground">{product.accuracy}%</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${accuracyChange.color}`}>
                    <Icon name={accuracyChange.icon} size={16} />
                    <span className="text-sm font-medium">{accuracyChange.value}%</span>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="text-xl font-bold text-foreground">{product.responseTime}ms</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${responseTimeChange.color}`}>
                    <Icon name={responseTimeChange.icon} size={16} />
                    <span className="text-sm font-medium">{responseTimeChange.value}ms</span>
                  </div>
                </div>

                {/* Volume */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Volume</p>
                    <p className="text-xl font-bold text-foreground">{product.volume.toLocaleString()}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${volumeChange.color}`}>
                    <Icon name={volumeChange.icon} size={16} />
                    <span className="text-sm font-medium">{volumeChange.value}%</span>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium text-foreground">{product.successRate}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${getProductColor(productId).replace('text-', 'bg-')}`}
                      style={{ width: `${product.successRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KPIComparisonStrip;
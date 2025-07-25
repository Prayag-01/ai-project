import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductComparisonMatrix = ({ products, selectedProducts, onProductToggle }) => {
  const getRankingBadge = (rank) => {
    const badges = {
      1: { color: 'bg-yellow-500', icon: 'Trophy', text: '#1' },
      2: { color: 'bg-gray-400', icon: 'Medal', text: '#2' },
      3: { color: 'bg-amber-600', icon: 'Award', text: '#3' }
    };
    
    return badges[rank] || { color: 'bg-muted', icon: 'Hash', text: `#${rank}` };
  };

  const getPerformanceColor = (value, threshold = 90) => {
    if (value >= threshold) return 'text-success';
    if (value >= threshold - 10) return 'text-warning';
    return 'text-error';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {products.map((product) => {
        const isSelected = selectedProducts.includes(product.id);
        const badge = getRankingBadge(product.rank);
        const changeInfo = getChangeIcon(product.accuracyChange);

        return (
          <div
            key={product.id}
            onClick={() => onProductToggle(product.id)}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer
              hover:shadow-elevation-2 hover:scale-102
              ${isSelected 
                ? 'border-primary bg-primary/5 shadow-elevation-1' 
                : 'border-border bg-card/50 hover:border-primary/50'
              }
            `}
          >
            {/* Selection Indicator */}
            <div className="absolute top-4 right-4">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${isSelected 
                  ? 'border-primary bg-primary' :'border-muted-foreground/30'
                }
              `}>
                {isSelected && (
                  <Icon name="Check" size={14} color="white" strokeWidth={3} />
                )}
              </div>
            </div>

            {/* Ranking Badge */}
            <div className="absolute top-4 left-4">
              <div className={`
                flex items-center space-x-1 px-2 py-1 rounded-full text-white text-xs font-bold
                ${badge.color}
              `}>
                <Icon name={badge.icon} size={12} color="white" />
                <span>{badge.text}</span>
              </div>
            </div>

            {/* Product Header */}
            <div className="mt-8 mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${product.color}`}>
                  <Icon name={product.icon} size={20} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-4">
              {/* Accuracy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${getPerformanceColor(product.accuracy)}`}>
                    {product.accuracy}%
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={changeInfo.icon} 
                      size={12} 
                      className={changeInfo.color} 
                    />
                    <span className={`text-xs ${changeInfo.color}`}>
                      {Math.abs(product.accuracyChange)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground">
                    {product.responseTime}ms
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    product.responseTime < 1000 ? 'bg-success' : 
                    product.responseTime < 2000 ? 'bg-warning' : 'bg-error'
                  }`} />
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Volume</span>
                </div>
                <span className="font-semibold text-foreground">
                  {product.volume.toLocaleString()}
                </span>
              </div>

              {/* Success Rate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Success</span>
                </div>
                <span className={`font-semibold ${getPerformanceColor(product.successRate, 95)}`}>
                  {product.successRate}%
                </span>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Overall Score</span>
                <span className="text-xs font-medium text-foreground">
                  {product.overallScore}/100
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    product.overallScore >= 90 ? 'bg-success' :
                    product.overallScore >= 70 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${product.overallScore}%` }}
                />
              </div>
            </div>

            {/* Market Share */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Market Share</span>
              <span className="text-xs font-medium text-secondary">
                {product.marketShare}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductComparisonMatrix;
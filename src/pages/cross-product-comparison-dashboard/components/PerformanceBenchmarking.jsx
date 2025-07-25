import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceBenchmarking = ({ benchmarkData }) => {
  const getPercentileColor = (percentile) => {
    if (percentile >= 90) return 'text-success';
    if (percentile >= 75) return 'text-warning';
    if (percentile >= 50) return 'text-secondary';
    return 'text-error';
  };

  const getPercentileBackground = (percentile) => {
    if (percentile >= 90) return 'bg-success/10 border-success/20';
    if (percentile >= 75) return 'bg-warning/10 border-warning/20';
    if (percentile >= 50) return 'bg-secondary/10 border-secondary/20';
    return 'bg-error/10 border-error/20';
  };

  const getTrafficLightColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success';
      case 'good': return 'bg-warning';
      case 'poor': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getGoalAchievementIcon = (achievement) => {
    if (achievement >= 100) return { icon: 'Trophy', color: 'text-success' };
    if (achievement >= 80) return { icon: 'Target', color: 'text-warning' };
    return { icon: 'AlertCircle', color: 'text-error' };
  };

  return (
    <div className="bg-card/50 glass border border-border rounded-xl p-6 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Performance Benchmarking
          </h2>
          <p className="text-sm text-muted-foreground">
            Industry standards and goal achievement tracking
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Updated 5 min ago</span>
        </div>
      </div>

      {/* Percentile Rankings */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-foreground mb-4">Industry Percentile Rankings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benchmarkData.percentileRankings.map((item) => (
            <div 
              key={item.product}
              className={`p-4 rounded-lg border ${getPercentileBackground(item.percentile)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <Icon name={item.icon} size={16} color="white" strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-foreground">{item.product}</span>
                </div>
                <div className={`text-lg font-bold ${getPercentileColor(item.percentile)}`}>
                  {item.percentile}th
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Industry Rank</span>
                  <span className="font-medium text-foreground">#{item.rank} of {item.totalCompetitors}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-medium text-foreground">{item.score}/100</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-muted/30 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      item.percentile >= 90 ? 'bg-success' :
                      item.percentile >= 75 ? 'bg-warning' :
                      item.percentile >= 50 ? 'bg-secondary' : 'bg-error'
                    }`}
                    style={{ width: `${item.percentile}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Peer Comparisons */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-foreground mb-4">Peer Comparisons</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Our Score</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Industry Avg</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Best in Class</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Gap Analysis</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkData.peerComparisons.map((item, index) => (
                <tr key={item.product} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${item.color}`}>
                        <Icon name={item.icon} size={12} color="white" strokeWidth={2.5} />
                      </div>
                      <span className="font-medium text-foreground">{item.product}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-semibold text-foreground">{item.ourScore}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-muted-foreground">{item.industryAvg}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-success font-medium">{item.bestInClass}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Icon 
                        name={item.gapTrend === 'positive' ? 'TrendingUp' : item.gapTrend === 'negative' ? 'TrendingDown' : 'Minus'} 
                        size={14} 
                        className={
                          item.gapTrend === 'positive' ? 'text-success' : 
                          item.gapTrend === 'negative' ? 'text-error' : 'text-muted-foreground'
                        } 
                      />
                      <span className={`text-sm font-medium ${
                        item.gapTrend === 'positive' ? 'text-success' : 
                        item.gapTrend === 'negative' ? 'text-error' : 'text-muted-foreground'
                      }`}>
                        {item.gap}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto ${getTrafficLightColor(item.status)}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Goal Achievement Indicators */}
      <div>
        <h3 className="text-md font-medium text-foreground mb-4">Goal Achievement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benchmarkData.goalAchievement.map((goal) => {
            const achievementIcon = getGoalAchievementIcon(goal.achievement);
            
            return (
              <div key={goal.metric} className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={achievementIcon.icon} size={20} className={achievementIcon.color} />
                    <div>
                      <h4 className="font-medium text-foreground">{goal.metric}</h4>
                      <p className="text-xs text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${achievementIcon.color}`}>
                      {goal.achievement}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {goal.current} / {goal.target}
                    </div>
                  </div>
                </div>
                
                {/* Achievement Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-muted-foreground">Target: {goal.target}</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.achievement >= 100 ? 'bg-success' :
                        goal.achievement >= 80 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${Math.min(goal.achievement, 100)}%` }}
                    />
                  </div>
                  
                  {/* Time to Goal */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Time to goal: {goal.timeToGoal}</span>
                    <span className={goal.onTrack ? 'text-success' : 'text-warning'}>
                      {goal.onTrack ? 'On track' : 'Behind schedule'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceBenchmarking;
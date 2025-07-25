import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetricCard from './components/MetricCard';
import ActionButton from './components/ActionButton';

const HomeLandingPage = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      value: '50K+',
      label: 'Daily AI Calls'
    },
    {
      value: '98.5%',
      label: 'Avg Accuracy'
    },
    {
      value: '147ms',
      label: 'Response Time'
    },
    {
      value: '6',
      label: 'AI Products'
    }
  ];

  const handleExploreAnalytics = () => {
    navigate('/executive-performance-overview-dashboard');
  };

  const handleLearnMore = () => {
    // Navigate to more information or documentation page
    console.log('Learn More clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-lavender-50 to-purple-50 flex items-center justify-center p-6" style={{ backgroundColor: '#F3E8FF' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-lg font-semibold text-purple-800">
            Real-time AI Analytics
          </h1>
        </div>

        {/* Main Headline with Gradient */}
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
          Unifying AI Analytics
          <br />
          Across Insurtech
        </h2>

        {/* Descriptive Text */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Monitor performance, track accuracy, and optimize AI-powered insurance solutions across our complete suite of specialized products.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <ActionButton 
            variant="primary" 
            onClick={handleExploreAnalytics}
          >
            Explore Analytics
          </ActionButton>
          <ActionButton 
            variant="secondary" 
            onClick={handleLearnMore}
          >
            Learn More
          </ActionButton>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeLandingPage;
import React from 'react';

const MetricCard = ({ value, label, icon: Icon }) => {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
};

export default MetricCard;
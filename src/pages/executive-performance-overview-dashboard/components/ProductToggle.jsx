import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductToggle = ({ selectedView, onViewChange }) => {
  const views = [
    { 
      value: 'all', 
      label: 'All Products', 
      icon: 'Grid3X3',
      description: 'Unified portfolio view'
    },
    { 
      value: 'individual', 
      label: 'Individual', 
      icon: 'Layers',
      description: 'Product-specific analysis'
    }
  ];

  return (
    <div className="flex items-center bg-muted/30 rounded-lg p-1 border border-border">
      {views.map((view) => (
        <button
          key={view.value}
          onClick={() => onViewChange(view.value)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${selectedView === view.value
              ? 'bg-card text-foreground shadow-elevation-1'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }
          `}
          title={view.description}
        >
          <Icon name={view.icon} size={16} />
          <span>{view.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ProductToggle;
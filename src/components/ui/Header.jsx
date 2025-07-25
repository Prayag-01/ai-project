import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ setSelectedProduct }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const productDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target)) {
        setIsProductMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const products = [
    { id: 'wrapportal', name: 'Wrapportal', description: 'AI-powered content wrapping and optimization', color: 'text-blue-500' },
    { id: 'anzenn', name: 'Anzenn', description: 'Advanced neural network analytics', color: 'text-green-500' },
    { id: 'prequaligy', name: 'Prequaligy', description: 'Pre-qualification and quality assessment', color: 'text-purple-500' },
    { id: 'asuretify', name: 'Asuretify', description: 'Assurance and verification platform', color: 'text-yellow-500' },
    { id: 'riskguru', name: 'Riskguru', description: 'Risk assessment and management', color: 'text-red-500' },
    { id: 'kinetic', name: 'Kinetic', description: 'Dynamic process optimization', color: 'text-cyan-500' },
  ];

  const navigationItems = [
    {
      label: 'Executive Overview',
      path: '/executive-performance-overview-dashboard',
      icon: 'BarChart3',
      description: 'Strategic performance insights and KPI summaries'
    },
    {
      label: 'Live Operations',
      path: '/real-time-operations-monitoring-dashboard',
      icon: 'Activity',
      description: 'Real-time monitoring and system operations'
    },
    {
      label: 'Cost Analytics',
      path: '/cost-analytics-dashboard',
      icon: 'DollarSign',
      description: 'AI, AWS, and infrastructure cost breakdown'
    },
    {
      label: 'Product Analytics',
      path: '/product-performance-analytics-dashboard',
      icon: 'TrendingUp',
      description: 'Deep dive analytics and performance insights'
    },
    {
      label: 'Cross-Product',
      path: '/cross-product-comparison-dashboard',
      icon: 'GitCompare',
      description: 'Comparative analysis across all AI products'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 glass border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation('/')}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-none">
                InjalaOne
              </h1>
              <span className="text-xs text-muted-foreground font-caption">
                Analytics
              </span>
            </div>
          </div>

          {/* Products Dropdown */}
          <div className="relative" ref={productDropdownRef}>
            <button
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Products</span>
              <Icon name="ChevronDown" size={16} />
            </button>
            {isProductMenuOpen && (
              <div className="absolute top-full mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-10 p-2">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                    onClick={() => {
                      handleNavigation(`/product/${product.id}`);
                      setIsProductMenuOpen(false);
                    }}
                  >
                    <div className={`mt-1 w-2 h-2 rounded-full ${product.color.replace('text-', 'bg-')}`}></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" role="tablist">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out
                hover:bg-muted/50 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-ring
                ${isActivePath(item.path) 
                  ? 'text-primary bg-primary/10 shadow-elevation-1' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              role="tab"
              aria-selected={isActivePath(item.path)}
              title={item.description}
            >
              <div className="flex items-center space-x-2">
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </div>
              {isActivePath(item.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-muted/30 rounded-lg border border-border">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground font-data">
              Last 7 days
            </span>
            <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
          </div>

          {/* Real-time Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-lg border border-success/20">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-success font-medium">Live</span>
          </div>

          {/* Export Menu */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            className="hidden sm:flex"
          >
            Export
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-card/98 glass border-b border-border animate-slide-down">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                  hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring
                  ${isActivePath(item.path) 
                    ? 'text-primary bg-primary/10 shadow-elevation-1' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={item.icon} size={18} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                </div>
                {isActivePath(item.path) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Icon name="Calendar" size={18} />
                <span>Date Range</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Icon name="Download" size={18} />
                <span>Export Data</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
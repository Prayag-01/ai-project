import React from 'react';

const ActionButton = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseClasses = "px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
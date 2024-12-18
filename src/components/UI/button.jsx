import React from 'react';

// Button Component
export const Button = ({ children, className, variant = 'solid', size = 'md', onClick }) => {
  const buttonStyles = {
    solid: "bg-primary text-white hover:bg-primary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-2.5 px-6 text-base",
    lg: "py-3 px-8 text-lg",
    icon: "p-2"
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition-all ${buttonStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

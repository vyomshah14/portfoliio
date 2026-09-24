import React from 'react';

export default function CyberCard({ children, className = '', hoverEffect = true, ...props }) {
  const baseClass = 'cyber-card';
  const hoverClass = hoverEffect ? 'cyber-card-hover' : '';
  const finalClass = `${baseClass} ${hoverClass} ${className}`;

  return (
    <div className={finalClass} {...props}>
      <div className="cyber-card-inner">
        {children}
      </div>
    </div>
  );
}

import React from 'react';

export default function CyberButton({ children, href, variant = 'primary', className = '', ...props }) {
  const baseClass = 'cyber-btn';
  const variantClass = `cyber-btn-${variant}`;
  const finalClass = `${baseClass} ${variantClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
}

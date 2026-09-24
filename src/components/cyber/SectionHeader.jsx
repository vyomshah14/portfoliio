import React from 'react';

export default function SectionHeader({ number, title, className = '' }) {
  return (
    <div className={`cyber-section-header ${className}`}>
      <div className="cyber-section-number">{number}</div>
      <div className="cyber-section-title-wrap">
        <h2 className="cyber-section-title">{title}</h2>
        <div className="cyber-section-divider"></div>
      </div>
    </div>
  );
}

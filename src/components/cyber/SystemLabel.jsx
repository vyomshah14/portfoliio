import React from 'react';

export default function SystemLabel({ text, icon, className = '' }) {
  return (
    <div className={`system-label ${className}`}>
      {icon && <span className="system-label-icon">{icon}</span>}
      <span className="system-label-text">{text}</span>
    </div>
  );
}

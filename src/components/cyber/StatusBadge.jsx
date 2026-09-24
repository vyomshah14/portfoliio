import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  let statusColorClass = 'status-default';
  
  const s = status.toUpperCase();
  if (s === 'ACTIVE' || s === 'ONLINE') {
    statusColorClass = 'status-active';
  } else if (s === 'IN DEVELOPMENT' || s === 'BUILDING') {
    statusColorClass = 'status-warning';
  } else if (s === 'ARCHIVED' || s === 'OFFLINE') {
    statusColorClass = 'status-danger';
  }

  return (
    <div className={`status-badge ${statusColorClass} ${className}`}>
      <span className="status-dot"></span>
      <span className="status-text">{s}</span>
    </div>
  );
}

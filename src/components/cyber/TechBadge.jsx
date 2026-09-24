import React from 'react';

export default function TechBadge({ tech, className = '' }) {
  return (
    <span className={`tech-badge ${className}`}>
      {tech}
    </span>
  );
}

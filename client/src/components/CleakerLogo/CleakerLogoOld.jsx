import React from 'react';

const CleakerLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    {/* Cuadrado */}
    <rect x="2" y="12" width="10" height="10" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
    {/* Círculo */}
    <circle cx="20" cy="10" r="5" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8" />
    {/* Triángulo */}
    <polygon points="30,20 25,30 35,30" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
    {/* New Red Shape - Hexagon */}
    <polygon points="10,30 15,35 10,40 5,35" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
  </svg>
);

export default CleakerLogo;
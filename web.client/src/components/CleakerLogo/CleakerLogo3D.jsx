import React from 'react';

const CleakerLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    {/* Square */}
    <rect
      x="6" y="18"
      width="8" height="8"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
      opacity="0.8"
      style={{
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))',
        transform: 'rotateX(10deg) rotateY(10deg)',
        transformOrigin: 'center',
        animation: 'pulse 2s infinite'
      }}
    />

    {/* Circle */}
    <circle
      cx="20" cy="15"
      r="4"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      opacity="0.8"
      style={{
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))',
        transform: 'rotateX(15deg)',
        transformOrigin: 'center',
        animation: 'fade 3s infinite'
      }}
    />

    {/* Triangle */}
    <polygon
      points="28,21 24,28 32,28"
      fill="none"
      stroke="#fbbf24"
      strokeWidth="2"
      opacity="0.8"
      style={{
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))',
        transform: 'rotateX(8deg) rotateY(-5deg)',
        transformOrigin: 'center',
        animation: 'rotate 10s infinite linear',  // Slower animation for a more subtle effect
      }}
    />

    {/* Hexagon */}
    <polygon
      points="10,27 13,30 10,33 7,30"
      fill="none"
      stroke="#ef4444"
      strokeWidth="2"
      opacity="0.8"
      style={{
        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2))',
        transform: 'rotateX(10deg) rotateY(10deg)',
        transformOrigin: 'center',
        animation: 'pulse 1.5s infinite'
      }}
    />

    {/* Animation styles */}
    <style>
      {`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1) rotateX(10deg) rotateY(10deg);
          }
          50% {
            transform: scale(1.05) rotateX(10deg) rotateY(10deg);
          }
        }
        @keyframes fade {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg) rotateX(8deg) rotateY(-5deg);
          }
          100% {
            transform: rotate(360deg) rotateX(8deg) rotateY(-5deg);
          }
        }
      `}
    </style>
  </svg>
);

export default CleakerLogo;
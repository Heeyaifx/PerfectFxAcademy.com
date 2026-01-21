import React from 'react';

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', className = '' }) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width, height, borderRadius }}
        >
            <style jsx="true">{`
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
        </div>
    );
}

import React from 'react';

export default function LoadingSpinner({ size = 'medium', text = '' }) {
    const sizes = {
        small: '24px',
        medium: '40px',
        large: '60px'
    };

    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner" style={{ width: sizes[size], height: sizes[size] }}></div>
            {text && <p className="loading-text">{text}</p>}

            <style jsx="true">{`
        .loading-spinner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .loading-spinner {
          border: 3px solid rgba(212, 175, 55, 0.2);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .loading-text {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin: 0;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

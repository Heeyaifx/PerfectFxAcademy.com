import React, { useState } from 'react';
import { X, Maximize, ZoomIn, ZoomOut, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const PDFViewer = ({ pdf, onClose }) => {
  const [zoom, setZoom] = useState(100);

  // Convert Google Drive preview URL to embedded viewer URL
  const getEmbedUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([^\/]+)/);
      if (fileIdMatch) {
        // Use Google Drive's embedded viewer
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
      }
    }
    return url;
  };

  const toggleFullscreen = () => {
    const modal = document.querySelector('.pdf-modal');
    if (modal) {
      if (!document.fullscreenElement) {
        modal.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleFitWidth = () => setZoom(100);

  const embedUrl = getEmbedUrl(pdf.url);

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="pdf-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed Height */}
        <div className="pdf-header">
          <h3>{pdf.title}</h3>
          <div className="pdf-header-controls">
            <div className="zoom-controls">
              <button onClick={handleZoomOut} className="pdf-control-btn" title="Zoom Out">
                <ZoomOut size={18} />
              </button>
              <span className="zoom-level">{zoom}%</span>
              <button onClick={handleZoomIn} className="pdf-control-btn" title="Zoom In">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleFitWidth} className="pdf-control-btn" title="Fit to Width">
                <Monitor size={18} />
              </button>
            </div>
            <div className="divider"></div>
            <button onClick={toggleFullscreen} className="pdf-control-btn" title="Fullscreen">
              <Maximize size={20} />
            </button>
            <button onClick={onClose} className="pdf-control-btn" title="Close">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div
          className="pdf-content-container"
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          {/* Zoom is applied here by changing width */}
          <div className="pdf-iframe-wrapper" style={{ width: `${zoom}%` }}>
            <iframe
              key={embedUrl}
              src={embedUrl}
              className="pdf-iframe"
              title={pdf.title}
              allow="fullscreen"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-footer">
          <p className="text-xs text-muted text-center italic">
            Digital Copy Protected. Use the scrollbar inside the viewer to navigate.
          </p>
        </div>
      </motion.div>

      <style jsx="true">{`
        .pdf-modal-overlay {
          position: fixed;
          inset: 0;
          background: #1a1a1a;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .pdf-modal {
          width: 100%;
          height: 100%;
          max-width: none;
          background: #1a1a1a;
          border-radius: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: none;
          box-shadow: none;
        }

        .pdf-header {
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
          background: rgba(212, 175, 55, 0.05);
          flex-shrink: 0;
        }

        .pdf-header h3 {
          color: var(--primary);
          margin: 0;
          font-size: 1.1rem;
        }

        .pdf-header-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .zoom-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 12px;
        }

        .zoom-level {
            color: #ccc;
            font-size: 0.85rem;
            min-width: 40px;
            text-align: center;
        }

        .divider {
            width: 1px;
            height: 24px;
            background: rgba(255,255,255,0.1);
            margin: 0 4px;
        }

        .pdf-control-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .pdf-control-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-1px);
        }

        .pdf-content-container {
          flex: 1; 
          position: relative; 
          background: #222;
          overflow: auto; /* Allow both horizontal and vertical scroll */
          -webkit-overflow-scrolling: touch;
          display: flex;
          justify-content: center; /* Center content when not overflowing */
        }

        .pdf-iframe-wrapper {
          width: 100%; /* Default width, overridden by inline style for zoom */
          min-height: 10000px;
          background: white;
          transform-origin: top center;
          transition: width 0.3s ease;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .pdf-footer {
          padding: 12px;
          text-align: center;
          background: #000;
          border-top: 1px solid #333;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default PDFViewer;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DetailsPanel.css';
import { toast } from 'react-toastify';

const DetayPanel = ({ isOpen, onClose, title = 'Feature Details', data }) => {
  const [animationClass, setAnimationClass] = useState('');
  const DetayPanelRef = useRef(null);

  // Handle panel open/close animation
  useEffect(() => {
    if (isOpen) {
      setAnimationClass('panel-open');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('panel-close');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Close panel handler
  const handlePanelClose = () => {
    onClose(); // Trigger the parent close function
    toast.warning("Details panel closed!");
  };

  // Handle clicks outside the panel to close
  const handleClickOutside = useCallback(
    (event) => {
      if (
        DetayPanelRef.current &&
        !DetayPanelRef.current.contains(event.target) &&
        isOpen
      ) {
        handlePanelClose();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen && animationClass !== 'panel-open') return null;

  return (
    <div className={`panel-overlay ${animationClass}`}>
      <div
        className={`panel-container ${animationClass}`}
        ref={DetayPanelRef}
        aria-labelledby="panel-title"
        aria-describedby="panel-description"
      >
        <div className="panel-header">
          <h2 id="panel-title">{title}</h2>
          <button
            className="panel-close-btn"
            onClick={handlePanelClose}
            aria-label="Close Panel"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="panel-body">
          {data ? (
            <div className="details-content">
              {Object.keys(data).map((key) => (
                <div key={key} className="detail-row">
                  <span className="detail-key">{key}:</span>
                  <span className="detail-value">{data[key]}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetayPanel;

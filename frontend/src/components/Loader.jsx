import React from 'react';

export default function Loader({ ticker, progressMessage }) {
  return (
    <div className="loader-container">
      <div className="loader-card glass-panel">
        <div className="loader-header">
          <div className="pulse-loader"></div>
          <h3>Analyzing financial records and news for <span className="ticker-highlight">{ticker}</span></h3>
          <p className="loader-progress-text">{progressMessage || "Fetching records..."}</p>
          <p className="loader-subtext">Live connection to Alpha Vantage & Gemini AI</p>
        </div>
        
        <div className="skeleton-grid">
          <div className="skeleton-row header-skeleton">
            <div className="skeleton-block title"></div>
            <div className="skeleton-block text"></div>
          </div>
          
          <div className="skeleton-metrics">
            <div className="skeleton-block card"></div>
            <div className="skeleton-block card"></div>
            <div className="skeleton-block card"></div>
            <div className="skeleton-block card"></div>
          </div>

          <div className="skeleton-block large-analysis"></div>
        </div>
      </div>
    </div>
  );
}

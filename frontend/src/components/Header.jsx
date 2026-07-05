import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export default function Header({ isDemoMode, setDemoMode }) {
  return (
    <header className="main-header">
      <div className="header-logo">
        <div className="logo-icon-wrapper">
          <TrendingUp className="logo-icon" size={24} />
        </div>
        <div className="logo-text">
          <span className="brand-insight">Insight</span>
          <span className="brand-vest">Vest</span>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="status-indicator">
          <span className="status-dot online"></span>
          <span className="status-label">API Connected</span>
        </div>

        <button 
          className={`demo-toggle-btn ${isDemoMode ? 'active' : ''}`}
          onClick={() => setDemoMode(!isDemoMode)}
          title="Toggle Mock/Demo data if API rate limits are hit"
        >
          <Activity size={16} />
          <span>{isDemoMode ? "Mock Data: ON" : "Use Mock Data"}</span>
        </button>
      </div>
    </header>
  );
}

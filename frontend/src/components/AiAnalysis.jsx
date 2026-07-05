import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';

export default function AiAnalysis({ analysis }) {
  if (!analysis) return null;

  const {
    recommendation = "HOLD",
    confidence = 50,
    summary = "",
    strengths = [],
    weaknesses = [],
    risks = [],
    bullCase = "",
    bearCase = ""
  } = analysis;

  const recUpper = recommendation.toUpperCase();
  let recThemeClass = "theme-hold";
  if (recUpper.includes("BUY")) recThemeClass = "theme-buy";
  else if (recUpper.includes("SELL")) recThemeClass = "theme-sell";

  return (
    <div className={`ai-analysis-container ${recThemeClass}`}>
      {/* Recommendation Panel */}
      <div className="analysis-header-card glass-panel border-glow">
        <div className="sparkle-title-row">
          <Sparkles className="sparkle-icon animated" size={24} />
          <h2>Gemini AI Expert Rating</h2>
        </div>

        <div className="rating-showcase-row">
          <div className="recommendation-badge-large">
            <span className="rec-text">{recUpper}</span>
          </div>

          <div className="confidence-meter-container">
            <div className="confidence-label">
              <span>Confidence Score</span>
              <span className="confidence-percentage">{confidence}%</span>
            </div>
            <div className="confidence-bar-track">
              <div 
                className="confidence-bar-fill" 
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="summary-block">
          <p className="summary-text">
            {summary}
          </p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="side-by-side-grid">
        <div className="glass-panel strengths-card">
          <div className="section-title">
            <CheckCircle2 className="text-buy" size={18} />
            <h3>Operational Strengths</h3>
          </div>
          <ul className="analysis-list">
            {strengths.length > 0 ? (
              strengths.map((str, idx) => (
                <li key={idx}>
                  <Zap size={14} className="list-bullet text-buy" />
                  <span>{str}</span>
                </li>
              ))
            ) : (
              <li>No key strengths identified.</li>
            )}
          </ul>
        </div>

        <div className="glass-panel weaknesses-card">
          <div className="section-title">
            <XCircle className="text-sell" size={18} />
            <h3>Valuation & Operational Weaknesses</h3>
          </div>
          <ul className="analysis-list">
            {weaknesses.length > 0 ? (
              weaknesses.map((weak, idx) => (
                <li key={idx}>
                  <Zap size={14} className="list-bullet text-sell" />
                  <span>{weak}</span>
                </li>
              ))
            ) : (
              <li>No key weaknesses identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Risks Overview */}
      <div className="glass-panel risks-card">
        <div className="section-title">
          <AlertTriangle className="text-hold" size={18} />
          <h3>Macro, Industry & Ticker-Specific Risks</h3>
        </div>
        <div className="risks-grid">
          {risks.length > 0 ? (
            risks.map((risk, idx) => (
              <div key={idx} className="risk-item">
                <span className="risk-number">0{idx + 1}</span>
                <p className="risk-text">{risk}</p>
              </div>
            ))
          ) : (
            <p className="no-risks">No critical risks flagged by the analyst.</p>
          )}
        </div>
      </div>

      {/* Case Narratives (Bull vs Bear) */}
      <div className="cases-grid">
        <div className="case-card bull-case glass-panel">
          <div className="case-header">
            <ArrowUpRight className="text-buy" size={20} />
            <h3>Bull Case (Upside Narrative)</h3>
          </div>
          <p className="case-body">{bullCase}</p>
        </div>

        <div className="case-card bear-case glass-panel">
          <div className="case-header">
            <ArrowDownRight className="text-sell" size={20} />
            <h3>Bear Case (Downside Narrative)</h3>
          </div>
          <p className="case-body">{bearCase}</p>
        </div>
      </div>
    </div>
  );
}

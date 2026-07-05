import React from 'react';
import { 
  Building2, 
  Globe, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Target, 
  ThumbsUp, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function Dashboard({ data }) {
  if (!data) return null;

  // Format analyst ratings for simple visual gauge
  const ratings = data.analystRatings || {};
  const strongBuy = parseInt(ratings.strongBuy) || 0;
  const buy = parseInt(ratings.buy) || 0;
  const hold = parseInt(ratings.hold) || 0;
  const sell = parseInt(ratings.sell) || 0;
  const strongSell = parseInt(ratings.strongSell) || 0;
  
  const totalRatings = strongBuy + buy + hold + sell + strongSell;
  
  // Calculate FCF if metrics are available
  // E.g., operatingCashFlow = "3.2B", capitalExpenditure = "500M"
  const getFcfEstimate = () => {
    try {
      const parseVal = (str) => {
        if (!str || str === 'N/A') return 0;
        const num = parseFloat(str.replace(/[^0-9.-]/g, ''));
        const multiplier = str.endsWith('T') ? 1e12 : str.endsWith('B') ? 1e9 : str.endsWith('M') ? 1e6 : 1;
        return num * multiplier;
      };

      const ocf = parseVal(data.cashFlow?.operatingCashFlow);
      const capex = parseVal(data.cashFlow?.capitalExpenditure);
      const fcf = ocf - capex;

      if (isNaN(fcf) || fcf === 0) return "N/A";
      
      // format back
      if (Math.abs(fcf) >= 1e12) return (fcf / 1e12).toFixed(2) + "T";
      if (Math.abs(fcf) >= 1e9) return (fcf / 1e9).toFixed(2) + "B";
      if (Math.abs(fcf) >= 1e6) return (fcf / 1e6).toFixed(2) + "M";
      return fcf.toLocaleString();
    } catch (e) {
      return "N/A";
    }
  };

  const freeCashFlow = getFcfEstimate();

  return (
    <div className="dashboard-grid">
      {/* Overview Card */}
      <div className="dashboard-card company-profile-card glass-panel col-span-2">
        <div className="card-header">
          <Building2 className="card-icon" size={20} />
          <h2>Company Overview</h2>
        </div>
        <div className="profile-details">
          <div className="company-main-info">
            <h1 className="company-title">{data.company}</h1>
            <span className="ticker-badge">{data.symbol}</span>
          </div>
          <div className="sector-tags">
            <span className="meta-tag"><strong>Sector:</strong> {data.sector || "N/A"}</span>
            <span className="meta-tag"><strong>Industry:</strong> {data.industry || "N/A"}</span>
          </div>
          <p className="company-description">{data.description || "No description available."}</p>
        </div>
      </div>

      {/* Analyst Expectations & Target Price */}
      <div className="dashboard-card analyst-consensus-card glass-panel">
        <div className="card-header">
          <Target className="card-icon" size={20} />
          <h2>Analyst Consensus</h2>
        </div>
        <div className="analyst-content">
          <div className="target-price-section">
            <span className="label">Target Price</span>
            <span className="target-price">${data.analystTargetPrice || "N/A"}</span>
          </div>
          
          <div className="ratings-distribution">
            <span className="label">Ratings Breakdown</span>
            {totalRatings > 0 ? (
              <div className="bar-stack">
                <div className="bar-segment strong-buy" style={{ width: `${(strongBuy / totalRatings) * 100}%` }} title={`Strong Buy: ${strongBuy}`}></div>
                <div className="bar-segment buy" style={{ width: `${(buy / totalRatings) * 100}%` }} title={`Buy: ${buy}`}></div>
                <div className="bar-segment hold" style={{ width: `${(hold / totalRatings) * 100}%` }} title={`Hold: ${hold}`}></div>
                <div className="bar-segment sell" style={{ width: `${(sell / totalRatings) * 100}%` }} title={`Sell: ${sell}`}></div>
                <div className="bar-segment strong-sell" style={{ width: `${(strongSell / totalRatings) * 100}%` }} title={`Strong Sell: ${strongSell}`}></div>
              </div>
            ) : (
              <div className="no-ratings-bar">No rating breakdown available</div>
            )}
            
            <div className="ratings-legend">
              <div className="legend-item"><span className="legend-dot strong-buy"></span> Buy/S.Buy ({strongBuy + buy})</div>
              <div className="legend-item"><span className="legend-dot hold"></span> Hold ({hold})</div>
              <div className="legend-item"><span className="legend-dot sell"></span> Sell/S.Sell ({sell + strongSell})</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="dashboard-card col-span-3 glass-panel">
        <div className="card-header">
          <TrendingUp className="card-icon" size={20} />
          <h2>Key Financial Metrics</h2>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-label">Market Capitalization</span>
            <span className="metric-value">{data.marketCap || "N/A"}</span>
          </div>
          
          <div className="metric-box">
            <span className="metric-label">P/E Ratio (Valuation)</span>
            <span className="metric-value">{data.peRatio || "N/A"}</span>
          </div>
          
          <div className="metric-box">
            <span className="metric-label">EPS (Earnings Per Share)</span>
            <span className="metric-value">${data.eps || "N/A"}</span>
          </div>
          
          <div className="metric-box">
            <span className="metric-label">Revenue (TTM)</span>
            <span className="metric-value">${data.revenue || "N/A"}</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Operating Margin</span>
            <span className="metric-value">{data.operatingMargin || "N/A"}</span>
          </div>

          <div className="metric-box">
            <span className="metric-label">Profit Margin</span>
            <span className="metric-value">{data.profitMargin || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Cash Flow Statement Info */}
      <div className="dashboard-card cash-flow-card glass-panel col-span-3">
        <div className="card-header">
          <DollarSign className="card-icon" size={20} />
          <h2>Annual Cash Flow Summary</h2>
        </div>
        
        <div className="cashflow-grid">
          <div className="cashflow-column">
            <div className="cf-metric">
              <span className="cf-label">Operating Cash Flow</span>
              <span className="cf-value positive">{data.cashFlow?.operatingCashFlow || "N/A"}</span>
            </div>
            <div className="cf-metric">
              <span className="cf-label">Capital Expenditures (CapEx)</span>
              <span className="cf-value negative">-{data.cashFlow?.capitalExpenditure || "N/A"}</span>
            </div>
          </div>

          <div className="fcf-divider"></div>

          <div className="cashflow-column fcf-highlight">
            <div className="cf-metric">
              <span className="cf-label">Calculated Free Cash Flow (FCF)</span>
              <span className="cf-value glow-fcf">{freeCashFlow}</span>
              <span className="cf-note">Operating Cash Flow - Capital Expenditures</span>
            </div>
            <div className="cf-metric">
              <span className="cf-label">Net Income (GAAP)</span>
              <span className="cf-value">{data.cashFlow?.netIncome || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

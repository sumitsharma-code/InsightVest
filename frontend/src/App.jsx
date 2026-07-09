import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import AiAnalysis from './components/AiAnalysis';
import './App.css';

// Rich Mock data to fall back on if API limits are hit or when in Demo mode
const MOCK_DATA = {
  AAPL: {
    company: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    industry: "Consumer Electronics",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company's key product is the iPhone, alongside the Mac, iPad, and Wearables, Home, and Accessories segment. Apple also provides services such as Apple Pay, Apple Music, and the App Store. Renowned for its vertical integration and ecosystem stickiness, Apple commands premium margins and deep customer loyalty.",
    marketCap: "3.24T",
    peRatio: "32.14",
    eps: "6.57",
    revenue: "385.60B",
    profitMargin: "26.31%",
    operatingMargin: "30.13%",
    analystTargetPrice: "235.00",
    analystRatings: {
      strongBuy: "18",
      buy: "24",
      hold: "8",
      sell: "1",
      strongSell: "0"
    },
    cashFlow: {
      operatingCashFlow: "110.50B",
      capitalExpenditure: "10.12B",
      netIncome: "97.00B"
    },
    aiAnalysis: {
      recommendation: "BUY",
      confidence: 88,
      summary: "Apple remains a premium compounder with an unparalleled consumer ecosystem. Its expanding services high-margin revenue and strong operating efficiency offset minor hardware cyclicality. While its high P/E multiple suggests standard valuation premium, Apple's capital returns and free cash flow generation represent the highest standard of safety in tech.",
      strengths: [
        "Ecosystem lock-in and high customer retention rates on iPhone and Mac.",
        "Rapidly growing Services segment (App Store, iCloud, Music) commanding ~70% gross margins.",
        "Industry-leading balance sheet with massive share buybacks ($110B authorized) and dividends.",
        "Strong pricing power allowing the pass-through of inflationary hardware costs."
      ],
      weaknesses: [
        "Moderate revenue growth saturation in core smartphone hardware markets.",
        "Regulatory headwinds surrounding App Store fees in EU and USA antitrust lawsuits.",
        "Supply chain concentration risks in East Asia and geopolitical exposure."
      ],
      risks: [
        "Antitrust crackdowns leading to forced reduction in ecosystem commission rates.",
        "Consumer spending slowdown affecting high-end device upgrade cycles."
      ],
      bullCase: "Strong adoption of AI features ('Apple Intelligence') sparks a massive multi-year iPhone upgrade cycle, driving double-digit hardware growth while Services reach 30% of total revenue mix.",
      bearCase: "Antitrust rulings disrupt key profit pools (e.g., Google search default payments and App Store commissions), forcing compression of margins and stalling multiple expansion."
    }
  },
  MSFT: {
    company: "Microsoft Corporation",
    symbol: "MSFT",
    sector: "Technology",
    industry: "Services-Prepackaged Software",
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment includes Office, Exchange, SharePoint, Microsoft Teams, and LinkedIn. Its Intelligent Cloud segment consists of Azure, SQL Server, and enterprise support. The More Personal Computing segment offers Windows, Xbox, and Surface. Microsoft is currently leading the global enterprise AI wave through its partnerships with OpenAI.",
    marketCap: "3.18T",
    peRatio: "35.50",
    eps: "11.80",
    revenue: "245.12B",
    profitMargin: "36.27%",
    operatingMargin: "44.60%",
    analystTargetPrice: "490.00",
    analystRatings: {
      strongBuy: "22",
      buy: "28",
      hold: "3",
      sell: "0",
      strongSell: "0"
    },
    cashFlow: {
      operatingCashFlow: "118.50B",
      capitalExpenditure: "42.10B",
      netIncome: "88.10B"
    },
    aiAnalysis: {
      recommendation: "BUY",
      confidence: 94,
      summary: "Microsoft is the premier enterprise software monopoly, uniquely positioned to capture the largest share of corporate AI spend. Azure growth remains robust, and Copilot integrations are driving higher average revenue per user (ARPU) across Office suites. Extremely high profit margins and strong cash flows justify a premium multiple.",
      strengths: [
        "Dominant position in Enterprise Cloud with Azure gaining market share against AWS.",
        "First-mover advantage in commercial AI integration via OpenAI partnership.",
        "Highly defensive recurring SaaS revenue model across Office 365, Windows, and LinkedIn.",
        "Unbelievable operating margin of 44.6% driven by massive operating leverage."
      ],
      weaknesses: [
        "Substantial CapEx acceleration ($40B+) required to build out AI data centers.",
        "Slow hardware and personal computing upgrade cycles (Surface, Xbox console sales).",
        "Integration challenges of large acquisitions like Activision Blizzard."
      ],
      risks: [
        "Slower-than-expected commercial monetization of generative AI features compared to massive CapEx deployment.",
        "Regulatory friction for AI models and potential safety liabilities."
      ],
      bullCase: "Azure AI services and Copilot adoption scale exponentially, cementing Microsoft as the operating system of the AI era, accelerating revenue growth back above 15% with stable margins.",
      bearCase: "A glut in AI computing capacity leads to price wars, compressing Azure margins, while standard corporate IT budgets contract, slowing Office upgrade adoption rates."
    }
  },
  TSLA: {
    company: "Tesla, Inc.",
    symbol: "TSLA",
    sector: "Consumer Cyclical",
    industry: "Auto Manufacturers",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments: Automotive, and Energy Generation and Storage. It is widely considered a pioneer in electric mobility and is actively developing Full Self-Driving (FSD) software, robotaxi platforms, and humanoid robotics (Optimus).",
    marketCap: "680.50B",
    peRatio: "58.20",
    eps: "3.75",
    revenue: "96.75B",
    profitMargin: "14.20%",
    operatingMargin: "8.50%",
    analystTargetPrice: "215.00",
    analystRatings: {
      strongBuy: "7",
      buy: "12",
      hold: "20",
      sell: "8",
      strongSell: "5"
    },
    cashFlow: {
      operatingCashFlow: "13.20B",
      capitalExpenditure: "8.90B",
      netIncome: "15.00B"
    },
    aiAnalysis: {
      recommendation: "HOLD",
      confidence: 65,
      summary: "Tesla is undergoing a transitional phase between its mass-market EV line-up and its next-generation autonomous platforms (Robotaxi/FSD). Vehicle margin compression due to global pricing pressure restricts near-term earnings growth. While the long-term AI option value remains massive, the current valuation reflects high execution risk.",
      strengths: [
        "Unrivaled brand equity and vertical integration in EV manufacturing and battery procurement.",
        "Fast-growing Energy storage business (Megapack deployments growing >100% y/y).",
        "Leading consumer vehicle fleet generating real-world autonomous driving data.",
        "Debt-free balance sheet with high cash buffers."
      ],
      weaknesses: [
        "Automotive gross margins compressed significantly from peak levels due to global pricing wars.",
        "Ageing vehicle model line-up with delayed Cybertruck ramp and next-gen model timelines.",
        "Erratic marketing and CEO attention split across multiple business ventures."
      ],
      risks: [
        "Increasingly fierce competition from low-cost Chinese EV manufacturers in European and Asian markets.",
        "Delayed regulatory approvals or technical roadblocks in achieving true Level 4/5 autonomy."
      ],
      bullCase: "FSD software licensing succeeds and Tesla launches a commercial Robotaxi network, shifting the business model from low-margin hardware manufacturing to a high-margin software network.",
      bearCase: "EV demand continues to stagnate globally, forcing further price cuts that drive auto margins to low single digits, while autonomous robotics projects stall in developer stages.",
    }
  },
  NVDA: {
    company: "NVIDIA Corporation",
    symbol: "NVDA",
    sector: "Technology",
    industry: "Semiconductors",
    description: "NVIDIA Corporation designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units for the mobile computing and automotive market. Its primary focus is on GPU architectures, CUDA software platforms, and networking systems (Mellanox) optimized for Artificial Intelligence, High-Performance Computing (HPC), and cloud data centers.",
    marketCap: "3.11T",
    peRatio: "68.40",
    eps: "2.12",
    revenue: "96.31B",
    profitMargin: "53.25%",
    operatingMargin: "58.12%",
    analystTargetPrice: "145.00",
    analystRatings: {
      strongBuy: "25",
      buy: "22",
      hold: "2",
      sell: "0",
      strongSell: "0"
    },
    cashFlow: {
      operatingCashFlow: "40.50B",
      capitalExpenditure: "1.25B",
      netIncome: "51.28B"
    },
    aiAnalysis: {
      recommendation: "BUY",
      confidence: 82,
      summary: "Nvidia commands a near-monopolistic position in the AI semiconductor layer, protected by its extensive CUDA software ecosystem. Growth rates are unprecedented, with datacenter revenues growing triple digits. Profit margins of 53% are historically unique for a hardware business. Despite the high valuation, its PEG ratio remains reasonable.",
      strengths: [
        "Virtually uncontested standard for AI training and inference hardware (H100/H200/Blackwell architectures).",
        "Massive software moat via CUDA, which has over 4 million developers locked in.",
        "Incredible gross margins (>75%) and net profit margins (>50%) indicating extreme pricing power.",
        "Strategic relationships with all hyperscalers (Microsoft, AWS, Google Cloud, Meta)."
      ],
      weaknesses: [
        "Highly concentrated customer base where top 4 hyperscalers represent 40% of revenue.",
        "Susceptibility to semiconductor cyclicality once hyperscaler AI infrastructure builds mature.",
        "Export restrictions to China and geopolitical sensitivity surrounding TSMC wafer production."
      ],
      risks: [
        "Custom silicon development by major tech customers (Google TPU, Amazon Trainium, MSFT Maia).",
        "Supply constraints on advanced packaging (CoWoS) from TSMC slowing delivery timelines."
      ],
      bullCase: "Generative AI applications proliferate globally, creating a secondary wave of computing infrastructure demands from sovereign states and smaller enterprise markets, keeping GPU demand high for years.",
      bearCase: "Hyperscalers experience a digestion period and pause chip orders, exposing Nvidia's valuation to sudden cyclical hardware corrections, similar to historical GPU mining crashes."
    }
  }
};

export default function App() {
  const [ticker, setTicker] = useState('AAPL');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setDemoMode] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  // Simulate progress steps for Demo/Mock Mode to keep styling uniform
  const simulateMockProgress = (cleanSymbol, targetData) => {
    const stages = [
      `Initiating simulation connection for ${cleanSymbol}...`,
      `Fetching company overview profile for ${cleanSymbol}...`,
      `Retrieving annual balance sheet and income statements...`,
      `Fetching key market quotes and news sentiments...`,
      `Generating Google Gemini AI expert stock analysis...`
    ];

    let currentStageIdx = 0;
    
    const runNextStage = () => {
      if (currentStageIdx < stages.length) {
        setProgressMessage(stages[currentStageIdx]);
        currentStageIdx++;
        setTimeout(runNextStage, 600);
      } else {
        setData(targetData);
        setLoading(false);
      }
    };
    
    runNextStage();
  };

  // Fetch company research from backend or fallback to mock
  const fetchCompanyData = async (symbolToFetch) => {
    const cleanSymbol = symbolToFetch.toUpperCase().trim();
    if (!cleanSymbol) return;

    setLoading(true);
    setError(null);
    setProgressMessage(`Connecting to server for ${cleanSymbol}...`);

    // If demo mode is explicitly enabled, use mock data right away
    if (isDemoMode) {
      const targetData = MOCK_DATA[cleanSymbol] || generateGenericMock(cleanSymbol);
      simulateMockProgress(cleanSymbol, targetData);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/company/${cleanSymbol}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      // Read response body as a stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let finalData = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Parse individual SSE lines separated by double newlines
        const parts = buffer.split("\n\n");
        buffer = parts.pop(); // Keep incomplete line in buffer

        for (const part of parts) {
          const line = part.trim();
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            let payload;
            try {
              payload = JSON.parse(jsonStr);
            } catch (jsonErr) {
              console.error("Error parsing streaming packet:", jsonErr);
              continue;
            }

            if (payload.stage === 'ERROR') {
              throw new Error(payload.message);
            } else if (payload.stage === 'COMPLETE') {
              finalData = payload.message;
            } else {
              setProgressMessage(payload.message);
            }
          }
        }
      }

      if (finalData) {
        setData(finalData);
      } else {
        throw new Error("Data stream interrupted or incomplete.");
      }
    } catch (err) {
      console.warn("API Error, quietly falling back to mock data:", err.message);
      
      const mockPayload = MOCK_DATA[cleanSymbol] || generateGenericMock(cleanSymbol);
      setData(mockPayload);
      setDemoMode(true);
      setError(null);
    } finally {
      if (!isDemoMode) {
        setLoading(false);
      }
    }
  };


  // Generate generic mock data for custom tickers
  const generateGenericMock = (symbol) => {
    return {
      company: `${symbol} Corporation`,
      symbol: symbol,
      sector: "Financial/Commercial",
      industry: "Business Services",
      description: `Simulated company details for ${symbol}. This is dynamic placeholder research compiled to demonstrate the dashboard features when live Alpha Vantage APIs are restricted or rate-limited.`,
      marketCap: "45.20B",
      peRatio: "18.40",
      eps: "4.15",
      revenue: "12.80B",
      profitMargin: "12.50%",
      operatingMargin: "16.80%",
      analystTargetPrice: "120.00",
      analystRatings: {
        strongBuy: "5",
        buy: "10",
        hold: "8",
        sell: "2",
        strongSell: "1"
      },
      cashFlow: {
        operatingCashFlow: "2.10B",
        capitalExpenditure: "450M",
        netIncome: "1.60B"
      },
      aiAnalysis: {
        recommendation: "HOLD",
        confidence: 72,
        summary: `AI consensus is HOLD for ${symbol}. While the top-line TTM revenue is stable at $12.80B and cash flow conversion is healthy ($1.65B free cash flow generated from $2.10B operating cash flow), operating margins of 16.80% trail primary industry competitors, suggesting valuation risks at the current P/E multiple of 18.40.`,
        strengths: [
          "Robust operating cash flow of $2.10B easily covers the $450M CapEx program, representing a 78% free cash flow conversion rate.",
          "Defensive recurring contract revenue makes up 65% of the total $12.80B top-line, outperforming tier-2 competitors."
        ],
        weaknesses: [
          "Operating margin of 16.80% lags key industry peers, who maintain a sector-average operating margin of 22.50%.",
          "EPS of $4.15 shows flat year-over-year expansion, highlighting organic revenue growth stagnation."
        ],
        risks: [
          "Macroeconomic headwinds causing client contract compression, directly threatening top-line revenue margins.",
          "Market share dilution risks from low-cost competitors entering the commercial business services space."
        ],
        bullCase: "Successful integration of automated SaaS platforms expands the operating margin from 16.80% to 21.00%, driving a major EPS breakout and valuation multiple expansion.",
        bearCase: "Persistent enterprise budget cuts contract the recurring revenue base by 10%, reducing free cash flow and forcing a discount relative to peer competitors."
      }
    };
  };

  // Trigger search on mount for AAPL
  useEffect(() => {
    fetchCompanyData(ticker);
  }, [isDemoMode]); // Refetch if toggle demo mode

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchSymbol = searchQuery.toUpperCase().trim();
      setTicker(searchSymbol);
      fetchCompanyData(searchSymbol);
    }
  };

  const handlePresetClick = (symbol) => {
    setSearchQuery(symbol);
    setTicker(symbol);
    fetchCompanyData(symbol);
  };

  return (
    <div className="app-container">
      <Header isDemoMode={isDemoMode} setDemoMode={setDemoMode} />

      <main className="main-content">
        <section className="hero-section">

          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Enter stock ticker (e.g. AAPL, MSFT, TSLA, NVDA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              <span>Analyze Ticker</span>
            </button>
          </form>

          <div className="preset-tickers-container">
            <span className="preset-label">Quick Suggestions:</span>
            {['AAPL', 'MSFT', 'TSLA', 'NVDA'].map((symbol) => (
              <button
                key={symbol}
                className="preset-btn"
                onClick={() => handlePresetClick(symbol)}
              >
                {symbol}
              </button>
            ))}
          </div>
        </section>

        {error && (
          <div className="error-panel glass-panel">
            <div className="error-title-row">
              <h3>System Notification</h3>
            </div>
            <p className="error-message">{error}</p>
            {!isDemoMode && (
              <div className="demo-action-box">
                <p>Alpha Vantage API limits might have been reached. Switch on Mock Data to explore with zero limits.</p>
                <button className="error-demo-btn" onClick={() => setDemoMode(true)}>
                  Enable Demo Mock Mode
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <Loader ticker={ticker} progressMessage={progressMessage} />
        ) : (
          data && (
            <>
              {/* Financial Dashboard */}
              <Dashboard data={data} />
              
              {/* AI Expert Rating */}
              <AiAnalysis analysis={data.aiAnalysis} />
            </>
          )
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} InsightVest Inc. All data sourced from Alpha Vantage. Analysis generated via Gemini AI.</p>
        <p style={{ marginTop: '0.5rem' }}>
          Disclaimer: This is an AI-powered simulation tool and does not constitute official financial advice.
        </p>
      </footer>
    </div>
  );
}

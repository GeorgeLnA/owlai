import React, { useState, useEffect, useRef } from "react";

export const PortfolioSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const companies = [
    { id: 1, name: "Apple Inc.", ticker: "AAPL" },
    { id: 2, name: "Microsoft Corporation", ticker: "MSFT" },
    { id: 3, name: "Amazon.com Inc.", ticker: "AMZN" },
    { id: 4, name: "Alphabet Inc.", ticker: "GOOGL" },
    { id: 5, name: "Meta Platforms Inc.", ticker: "META" },
    { id: 6, name: "Tesla Inc.", ticker: "TSLA" },
    { id: 7, name: "NVIDIA Corporation", ticker: "NVDA" },
    { id: 8, name: "JPMorgan Chase & Co.", ticker: "JPM" },
    { id: 9, name: "Johnson & Johnson", ticker: "JNJ" },
    { id: 10, name: "Visa Inc.", ticker: "V" },
    { id: 11, name: "Walmart Inc.", ticker: "WMT" },
    { id: 12, name: "Procter & Gamble Co.", ticker: "PG" },
    { id: 13, name: "Mastercard Inc.", ticker: "MA" },
    { id: 14, name: "UnitedHealth Group Inc.", ticker: "UNH" },
    { id: 15, name: "Home Depot Inc.", ticker: "HD" },
  ];

  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [activeView, setActiveView] = useState<'peerGroups' | 'researchTool'>('peerGroups');
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [groupName, setGroupName] = useState('');
  const [peerGroups, setPeerGroups] = useState<Array<{ id: string; name: string; companyIds: number[] }>>([]);
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [showQuestionExamples, setShowQuestionExamples] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState<number | null>(null);
  const [showPeerGroupSuccess, setShowPeerGroupSuccess] = useState(false);

  // Map questions to results (same index = matching question/result pair)
  const handleQuestionSelect = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
    setShowQuestionExamples(false);
  };

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Check if year and peer group are selected
    if (!selectedYear) {
      setCurrentResultIndex(null);
      return;
    }
    
    if (!selectedPeerGroup && peerGroups.length > 0) {
      setCurrentResultIndex(null);
      return;
    }
    
    if (peerGroups.length === 0) {
      setCurrentResultIndex(null);
      return;
    }
    
    // Find the index of the selected question
    const questionIndex = exampleQuestions.findIndex(q => q === question);
    if (questionIndex !== -1) {
      setCurrentResultIndex(questionIndex);
    } else {
      // If question doesn't match exactly, show first result
      setCurrentResultIndex(0);
    }
  };

  const exampleQuestions = [
    "What are the key financial metrics for companies in this peer group?",
    "How does revenue growth compare across the peer group?",
    "What are the main risk factors affecting companies in this peer group?",
    "What are the ESG scores and breakdowns for the peer group?",
    "How has profitability trended over the past 5 years for these companies?",
    "What are the main revenue segments across the peer group?",
    "How do debt-to-equity ratios compare across the peer group?",
    "What are the key management changes in the past year for these companies?"
  ];

  const getPeerGroupCompanies = () => {
    if (peerGroups.length === 0) return [];
    const activeGroup = peerGroups.find(g => g.id === selectedPeerGroup) || peerGroups[0];
    return companies.filter(c => activeGroup.companyIds.includes(c.id));
  };

  const exampleResults = [
    {
      title: "Key Financial Metrics - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see financial metrics comparison.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Average Revenue: $285B | Average Net Income: $68B | Average P/E: 32.4 | Average Market Cap: $1.8T | Average ROE: 42.3% | Strongest: Apple (ROE 147%) | Most Profitable: Microsoft (Net Margin 36%)`;
      }
    },
    {
      title: "Revenue Growth Comparison - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see revenue growth comparison.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Average Growth: 8.2% YoY | Top Performer: Amazon (12.4% YoY) | Median: 7.1% | Range: 5.8% - 12.4% | 3-Year CAGR Average: 9.1% | All companies showing positive growth trajectory`;
      }
    },
    {
      title: "Main Risk Factors - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see risk factors.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Common Risks: 1. Regulatory scrutiny (High - Tech) | 2. Market volatility (Medium) | 3. Supply chain dependencies (Medium) | 4. Competition (Medium) | 5. Currency exposure (Low-Medium) | Highest Risk: Amazon (Regulatory), Lowest Risk: Microsoft (Diversified)`;
      }
    },
    {
      title: "ESG Score Breakdown - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see ESG scores.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Average ESG: 71/100 | Top ESG: Microsoft (82/100) | Environmental Avg: 69/100 | Social Avg: 73/100 | Governance Avg: 72/100 | All companies above industry average (65/100) | Best Practice: Microsoft (Carbon Neutral)`;
      }
    },
    {
      title: "Profitability Trend (5 Years) - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see profitability trends.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Average Margin 2024: 23.8% | 5-Year Trend: Stable to Improving | Top Margin: Microsoft (36.2%) | Most Improved: Amazon (+4.2% since 2020) | Peer Median: 24.1% | All companies maintaining strong profitability`;
      }
    },
    {
      title: "Revenue Segments - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see revenue segments.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Common Segments: Cloud Services (Avg 28%), Hardware/Products (Avg 35%), Software/Licensing (Avg 22%), Advertising (Avg 15%) | Fastest Growing: Cloud Services (+18% YoY avg) | Most Diversified: Amazon (5 segments) | Most Focused: Apple (Hardware dominant)`;
      }
    },
    {
      title: "Debt-to-Equity Ratio - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see debt-to-equity ratios.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Average Ratio: 1.52 | Lowest: Apple (1.73) | Highest: Amazon (2.1) | Peer Median: 1.58 | All within healthy range | Average Total Debt: $95B | Average Equity: $62B | Strong balance sheets across group`;
      }
    },
    {
      title: "Management Changes (Past Year) - Peer Group",
      getContent: () => {
        const peerCompanies = getPeerGroupCompanies();
        if (peerCompanies.length === 0) {
          return "Create a peer group first to see management changes.";
        }
        const names = peerCompanies.map(c => c.name).join(", ");
        return `Peer Group: ${names} | Key Changes: Apple (New VP Operations Q3 2024) | Microsoft (CFO transition Q2 2024) | Amazon (New CTO Q1 2024) | Alphabet (Board expansion Q4 2023) | Meta (Head of AI Research promoted Q2 2024) | Tesla (New VP Manufacturing Q1 2024) | Average Board Changes: 1.2 per company | Leadership Stability: High across group`;
      }
    }
  ];

  // Generate years from 2010 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => currentYear - i);

  const handleToggleCompany = (companyId: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const selectedCompaniesList = companies.filter((company) =>
    selectedCompanies.includes(company.id)
  );

  const handleCreatePeerGroup = () => {
    if (groupName.trim() && selectedCompanies.length > 0) {
      const newPeerGroup = {
        id: Date.now().toString(),
        name: groupName.trim(),
        companyIds: [...selectedCompanies],
      };
      setPeerGroups((prev) => [...prev, newPeerGroup]);
      setGroupName('');
      setSelectedCompanies([]);
      setShowPeerGroupSuccess(true);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowPeerGroupSuccess(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Reset button selection when section is out of view
            setActiveView('peerGroups');
            setIsHovering(false);
            setHasInteracted(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when less than 10% of the section is visible
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="platform" className="w-full flex flex-col">
      {/* Header content */}
      <div className="flex flex-col w-full items-start mb-4 md:mb-6">
        {/* Label and Title Section */}
        <div className="flex flex-col w-full items-start mb-3 md:mb-4">
          <div className="flex items-center mb-2 md:mb-3">
            <div className="flex flex-col w-6 h-2 items-start pr-4">
              <div className="w-2 h-2 bg-white rounded" />
            </div>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-white text-xs md:text-[13px] leading-4">
              THE PLATFORM
            </span>
          </div>
          <h2 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl sm:text-3xl md:text-5xl lg:text-[56px] tracking-[-2px] sm:tracking-[-3px] leading-tight w-full">
            Built for Scale. Designed for Analysts.
          </h2>
        </div>

        {/* Bullet points */}
        <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 text-white/80 text-xs sm:text-sm md:text-base [font-family:'Manrope',Helvetica]">
          <li>- Pick your company</li>
          <li>- Pick your questions</li>
          <li>- Instantly receive structured, sourced answers</li>
        </ul>
      </div>

      {/* Large Platform UI preview box - Hero style */}
      <div className="w-full h-[85vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] rounded-xl border border-[#afafaf80] bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 backdrop-blur-md flex flex-col sm:flex-row shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden relative">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#553194]/5 via-transparent to-[#553194]/5 pointer-events-none" />
        
        {/* Left side with buttons */}
        <div 
          className="flex flex-row sm:flex-col items-center sm:items-center justify-center sm:justify-center gap-3 sm:gap-3 md:gap-4 px-3 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5 relative z-10 border-b sm:border-b-0 sm:border-r border-[#afafaf40] bg-white sm:w-[160px] md:w-[170px] flex-shrink-0"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button 
            onClick={() => {
              setActiveView('peerGroups');
              setHasInteracted(true);
            }}
            className={`w-auto sm:w-full min-w-[120px] sm:min-w-0 px-3 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-semibold text-xs sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 shadow-md border [font-family:'Manrope',Helvetica] ${
              activeView === 'peerGroups' 
                ? 'bg-[#246193] text-white border-[#246193]' 
                : 'bg-white text-black border border-[#afafaf40] hover:bg-gray-100'
            }`}
          >
            1. Peer Groups
          </button>
          <button 
            onClick={() => {
              setActiveView('researchTool');
              setHasInteracted(true);
            }}
            className={`w-auto sm:w-full min-w-[120px] sm:min-w-0 px-3 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-xl font-semibold text-xs sm:text-xs md:text-sm whitespace-nowrap transition-all duration-300 shadow-md border [font-family:'Manrope',Helvetica] ${
              activeView === 'researchTool' 
                ? 'bg-[#246193] text-white border-[#246193]' 
                : 'bg-white text-black border border-[#afafaf40] hover:bg-gray-100'
            }`}
          >
            2. Research Tool
          </button>
        </div>

        {/* Right side - Dynamic Content */}
        <div 
          className="flex-1 relative z-10 overflow-hidden cursor-auto bg-white min-h-0"
          onMouseEnter={() => {
            setIsHovering(true);
            setHasInteracted(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Preview Screen */}
          <div 
            className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 transition-all duration-500 ease-in-out ${
              'opacity-0 pointer-events-none translate-y-2'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight [font-family:'Manrope',Helvetica]">
                Platform UI preview
              </div>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed [font-family:'Manrope',Helvetica]">
                Interactive dashboard and analytics interface
              </p>
            </div>
          </div>

          {/* Content Screen */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              'opacity-100 pointer-events-auto translate-y-0'
            }`}
          >
            {/* Peer Groups View */}
            <div 
              className={`absolute inset-0 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto transition-all duration-500 ease-in-out ${
                activeView === 'peerGroups'
                  ? 'opacity-100 pointer-events-auto translate-x-0' 
                  : 'opacity-0 pointer-events-none translate-x-4'
              }`}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6 tracking-tight [font-family:'Manrope',Helvetica]">
                Create New Peer Group
              </h3>
              
              {/* Success Message */}
              {showPeerGroupSuccess && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-[#246193] text-white [font-family:'Manrope',Helvetica]">
                  <div className="font-semibold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2">
                    Peer group created successfully!
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-white/90">
                    Now go to <button onClick={() => setActiveView('researchTool')} className="underline font-semibold hover:text-white">Research Tool</button> to ask questions about your peer group.
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-h-0">
                {/* Group Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs sm:text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                    Group Name
                  </label>
                  <input 
                    type="text" 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="cursor-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
                  />
                </div>

                {/* Add Companies */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <label className="text-xs sm:text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                    Add Companies: <span className="text-gray-500 font-normal text-xs sm:text-sm">(list of 14700 companies)</span>
                  </label>
                  
                  {/* Selected Companies Display */}
                  {selectedCompaniesList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl border border-[#afafaf40] bg-gray-50/50 min-h-[50px] sm:min-h-[60px]">
                      {selectedCompaniesList.map((company) => (
                        <div
                          key={company.id}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white border border-[#afafaf80] text-xs sm:text-sm text-black [font-family:'Manrope',Helvetica]"
                        >
                          <span className="truncate max-w-[120px] sm:max-w-none">{company.name} ({company.ticker})</span>
                          <button
                            onClick={() => handleToggleCompany(company.id)}
                            className="ml-0.5 sm:ml-1 text-gray-400 hover:text-black transition-colors text-base sm:text-lg"
                            aria-label={`Remove ${company.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Companies List */}
                  <div className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#afafaf80] bg-white max-h-[150px] sm:max-h-[200px] overflow-y-auto">
                    <div className="flex flex-col gap-2 text-xs sm:text-sm md:text-base [font-family:'Manrope',Helvetica]">
                      {companies.map((company) => (
                        <label
                          key={company.id}
                          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCompanies.includes(company.id)}
                            onChange={() => handleToggleCompany(company.id)}
                            className="w-4 h-4 text-black border border-[#afafaf80] rounded focus:ring-2 focus:ring-black cursor-pointer"
                          />
                          <span className="text-gray-700">
                            {company.name} ({company.ticker})
                          </span>
                        </label>
                      ))}
                      <div className="text-gray-500 text-xs mt-2 pl-7">... and 14,685 more companies</div>
                    </div>
                  </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={handleCreatePeerGroup}
                  disabled={!groupName.trim() || selectedCompanies.length === 0}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-transparent text-black border border-[#afafaf80] font-semibold text-sm sm:text-base md:text-lg hover:bg-gray-50/50 hover:border-black disabled:bg-transparent disabled:text-gray-400 disabled:border disabled:border-[#afafaf60] disabled:cursor-not-allowed transition-colors [font-family:'Manrope',Helvetica]"
                >
                  Create Peer Group
                </button>
              </div>
            </div>

            {/* Research Tool View */}
            <div 
              className={`absolute inset-0 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto transition-all duration-500 ease-in-out ${
                activeView === 'researchTool'
                  ? 'opacity-100 pointer-events-auto translate-x-0' 
                  : 'opacity-0 pointer-events-none translate-x-4'
              }`}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4 tracking-tight [font-family:'Manrope',Helvetica]">
                AI Financial Research Assistant
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 [font-family:'Manrope',Helvetica]">
                Get the information you need quickly and efficiently.
              </p>
              
              <div className="flex flex-col gap-4 sm:gap-6 flex-1 min-h-0">
                {/* Results Display Area */}
                <div className="w-full px-3 sm:px-4 py-4 sm:py-6 rounded-xl border border-[#afafaf80] bg-white min-h-[80px] sm:min-h-[96px] text-black text-xs sm:text-sm md:text-base [font-family:'Manrope',Helvetica] relative">
                  {!selectedYear ? (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="text-gray-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Please select a year to see results</div>
                      <div className="text-xs sm:text-sm text-gray-500">Select a year from the dropdown below to analyze your peer group data.</div>
                    </div>
                  ) : !selectedPeerGroup && peerGroups.length > 0 ? (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="text-gray-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Please select a peer group to see results</div>
                      <div className="text-xs sm:text-sm text-gray-500">Select a peer group from the dropdown below to analyze your data. If you haven't created a peer group yet, go to "1. Peer Groups" to create one.</div>
                    </div>
                  ) : peerGroups.length === 0 ? (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="text-gray-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">No peer groups available</div>
                      <div className="text-xs sm:text-sm text-gray-500">Go to "1. Peer Groups" to create a peer group first, then come back here to ask questions.</div>
                    </div>
                  ) : currentResultIndex !== null ? (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div className="font-semibold text-black text-sm sm:text-base md:text-lg [font-family:'Manrope',Helvetica] flex-1">
                          {exampleResults[currentResultIndex].title}
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentResultIndex(null)}
                          className="cursor-target flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
                          aria-label="Close result"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                          >
                            <path
                              d="M12 4L4 12M4 4L12 12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base [font-family:'Manrope',Helvetica]">
                        {typeof exampleResults[currentResultIndex].getContent === 'function' 
                          ? exampleResults[currentResultIndex].getContent()
                          : exampleResults[currentResultIndex].content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 sm:gap-3">
                      <div className="text-gray-400 text-xs sm:text-sm">Results will appear here when you ask a question...</div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={question}
                    readOnly
                    onFocus={() => setShowQuestionExamples(true)}
                    onBlur={() => setTimeout(() => setShowQuestionExamples(false), 200)}
                    onClick={() => setShowQuestionExamples(true)}
                    placeholder="Choose a question"
                    className="cursor-target w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-14 sm:pr-20 rounded-xl border border-[#afafaf80] bg-white text-black text-sm sm:text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 placeholder:text-xs sm:placeholder:text-sm cursor-pointer [font-family:'Manrope',Helvetica]"
                  />
                  <button
                    type="button"
                    onClick={handleSendQuestion}
                    disabled={!question.trim() || !selectedYear || (!selectedPeerGroup && peerGroups.length > 0)}
                    className="absolute right-1 sm:right-1.5 md:right-2 top-1/2 -translate-y-1/2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#246193] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 [font-family:'Manrope',Helvetica]"
                    title={!selectedYear ? "Please select a year" : (!selectedPeerGroup && peerGroups.length > 0) ? "Please select a peer group" : ""}
                  >
                    Send
                  </button>
                  
                  {/* Example Questions Dropdown */}
                  {showQuestionExamples && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#afafaf80] rounded-xl shadow-lg z-50 max-h-[250px] sm:max-h-[300px] overflow-y-auto">
                      <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 px-2 sm:px-3 py-1.5 sm:py-2 [font-family:'Manrope',Helvetica]">
                          Example Questions:
                        </div>
                        {exampleQuestions.map((example, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleQuestionSelect(example)}
                            className="w-full text-left px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base text-black [font-family:'Manrope',Helvetica]"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Year and Peer Group Fields */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Year Field */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs sm:text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="cursor-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-xs sm:text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
                    >
                      <option value="">Select year</option>
                      {years.map((year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Peer Group Field */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs sm:text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                      Peer Group
                    </label>
                    <select
                      value={selectedPeerGroup}
                      onChange={(e) => setSelectedPeerGroup(e.target.value)}
                      className="cursor-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-xs sm:text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
                    >
                      <option value="">Select peer group</option>
                      {peerGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="w-full flex justify-center mt-8 md:mt-10">
        <a
          href="/demo"
          className="cursor-target inline-flex items-center justify-center h-12 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 rounded-xl bg-white text-black font-semibold text-base sm:text-lg md:text-xl hover:bg-black hover:text-white hover:border hover:border-black hover:scale-105 transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
        >
          Test Lampost Beta for Free
        </a>
      </div>
    </section>
  );
};

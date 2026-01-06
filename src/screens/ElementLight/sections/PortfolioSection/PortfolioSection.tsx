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
  const [hasInteracted, setHasInteracted] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [peerGroups, setPeerGroups] = useState<Array<{ id: string; name: string; companyIds: number[] }>>([]);
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [showQuestionExamples, setShowQuestionExamples] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState<number | null>(null);

  const exampleQuestions = [
    "What are the key financial metrics for this company?",
    "How does this company's revenue growth compare to its peers?",
    "What are the main risk factors affecting this company?",
    "What is the company's ESG score and breakdown?",
    "How has the company's profitability trended over the past 5 years?",
    "What are the company's main revenue segments?",
    "How does the company's debt-to-equity ratio compare to industry average?",
    "What are the key management changes in the past year?"
  ];

  const exampleResults = [
    {
      title: "Key Financial Metrics",
      content: "Revenue: $394.3B | Net Income: $97.0B | EPS: $6.11 | P/E Ratio: 28.5 | Market Cap: $2.8T | ROE: 147.3% | Current Ratio: 1.07 | Debt-to-Equity: 1.73"
    },
    {
      title: "Revenue Growth Comparison",
      content: "Company Growth: 7.8% YoY | Industry Average: 5.2% | Peer Median: 6.1% | Rank: Top 25% | 3-Year CAGR: 8.4% vs Industry 4.9%"
    },
    {
      title: "Main Risk Factors",
      content: "1. Regulatory changes in key markets (High) | 2. Supply chain disruptions (Medium) | 3. Currency fluctuations (Medium) | 4. Competitive pressure (Low) | 5. Technology disruption (Low)"
    },
    {
      title: "ESG Score Breakdown",
      content: "Overall ESG Score: 72/100 | Environmental: 68/100 | Social: 75/100 | Governance: 73/100 | Industry Rank: 8/50 | Carbon Intensity: 0.15 tCO2e/$M revenue"
    },
    {
      title: "Profitability Trend (5 Years)",
      content: "2024: 24.6% | 2023: 25.3% | 2022: 25.9% | 2021: 23.8% | 2020: 20.9% | Trend: Stable with slight decline | Industry Average: 18.2%"
    },
    {
      title: "Revenue Segments",
      content: "Product Sales: 62% ($244.5B) | Services: 28% ($110.4B) | Licensing: 7% ($27.6B) | Other: 3% ($11.8B) | Top Segment Growth: Services +15.3% YoY"
    },
    {
      title: "Debt-to-Equity Ratio",
      content: "Company Ratio: 1.73 | Industry Average: 1.45 | Peer Median: 1.52 | Status: Above Average | Total Debt: $110.2B | Equity: $63.7B"
    },
    {
      title: "Management Changes (Past Year)",
      content: "New CFO appointed (Q2 2024) | CTO transitioned to advisory role (Q3 2024) | Head of International Operations promoted (Q1 2024) | Board added 2 independent directors (Q4 2023)"
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
              <div className="w-2 h-2 bg-wezomcomblack rounded" />
            </div>
            <span className="[font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
              THE PLATFORM
            </span>
          </div>
          <h2 className="[font-family:'Manrope',Helvetica] font-bold text-black text-3xl md:text-5xl lg:text-[56px] tracking-[-3px] leading-tight w-full">
            Built for Scale. Designed for Analysts.
          </h2>
        </div>

        {/* Bullet points */}
        <ul className="space-y-1.5 md:space-y-2 text-gray-500 text-sm md:text-base [font-family:'Manrope',Helvetica]">
          <li>- Pick your company</li>
          <li>- Pick your questions</li>
          <li>- Instantly receive structured, sourced answers</li>
        </ul>
      </div>

      {/* Large Platform UI preview box - Hero style */}
      <div className="w-full h-[45vh] md:h-[50vh] lg:h-[55vh] rounded-3xl md:rounded-[40px] border border-[#afafaf80] bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 backdrop-blur-md flex shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden relative">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#553194]/5 via-transparent to-[#553194]/5 pointer-events-none" />
        
        {/* Left side with buttons */}
        <div 
          className="flex flex-col items-center justify-center gap-4 px-6 md:px-8 py-6 md:py-8 relative z-10 border-r border-[#afafaf40]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <button 
            onClick={() => {
              setActiveView('peerGroups');
              setHasInteracted(true);
            }}
            className={`w-full min-w-[120px] md:min-w-[140px] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 shadow-lg border [font-family:'Manrope',Helvetica] ${
              activeView === 'peerGroups' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border border-[#afafaf40] hover:bg-gray-100'
            }`}
          >
            Peer Groups
          </button>
          <button 
            onClick={() => {
              setActiveView('researchTool');
              setHasInteracted(true);
            }}
            className={`w-full min-w-[120px] md:min-w-[140px] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 shadow-lg border [font-family:'Manrope',Helvetica] ${
              activeView === 'researchTool' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border border-[#afafaf40] hover:bg-gray-100'
            }`}
          >
            Research Tool
          </button>
        </div>

        {/* Right side - Dynamic Content */}
        <div 
          className="flex-1 relative z-10 overflow-hidden cursor-auto"
          onMouseEnter={() => {
            setIsHovering(true);
            setHasInteracted(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Preview Screen */}
          <div 
            className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 transition-all duration-500 ease-in-out ${
              !hasInteracted && !isHovering ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 tracking-tight [font-family:'Manrope',Helvetica]">
                Platform UI preview
              </div>
              <p className="text-wezomcomdove-gray text-base md:text-lg max-w-2xl mx-auto leading-relaxed [font-family:'Manrope',Helvetica]">
                Interactive dashboard and analytics interface
              </p>
            </div>
          </div>

          {/* Content Screen */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              hasInteracted || isHovering ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'
            }`}
          >
            {/* Peer Groups View */}
            <div 
              className={`absolute inset-0 flex flex-col p-6 md:p-8 overflow-y-auto transition-all duration-500 ease-in-out ${
                activeView === 'peerGroups' && (hasInteracted || isHovering)
                  ? 'opacity-100 pointer-events-auto translate-x-0' 
                  : 'opacity-0 pointer-events-none translate-x-4'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6 tracking-tight [font-family:'Manrope',Helvetica]">
                Create New Peer Group
              </h3>
              
              <div className="flex flex-col gap-6">
                {/* Group Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                    Group Name
                  </label>
                  <input 
                    type="text" 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
                  />
                </div>

                {/* Add Companies */}
                <div className="flex flex-col gap-4">
                  <label className="text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                    Add Companies: <span className="text-gray-500 font-normal">(list of 14700 companies)</span>
                  </label>
                  
                  {/* Selected Companies Display */}
                  {selectedCompaniesList.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-[#afafaf40] bg-gray-50/50 min-h-[60px]">
                      {selectedCompaniesList.map((company) => (
                        <div
                          key={company.id}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#afafaf80] text-sm text-black [font-family:'Manrope',Helvetica]"
                        >
                          <span>{company.name} ({company.ticker})</span>
                          <button
                            onClick={() => handleToggleCompany(company.id)}
                            className="ml-1 text-gray-400 hover:text-black transition-colors"
                            aria-label={`Remove ${company.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Companies List */}
                  <div className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white max-h-[200px] overflow-y-auto">
                    <div className="flex flex-col gap-2 text-sm md:text-base [font-family:'Manrope',Helvetica]">
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
                  className="w-full px-6 py-3 rounded-xl bg-transparent text-black border border-[#afafaf80] font-semibold text-base md:text-lg hover:bg-gray-50/50 hover:border-black disabled:bg-transparent disabled:text-gray-400 disabled:border disabled:border-[#afafaf60] disabled:cursor-not-allowed transition-colors [font-family:'Manrope',Helvetica]"
                >
                  Create Peer Group
                </button>
              </div>
            </div>

            {/* Research Tool View */}
            <div 
              className={`absolute inset-0 flex flex-col p-6 md:p-8 overflow-y-auto transition-all duration-500 ease-in-out ${
                activeView === 'researchTool' && (hasInteracted || isHovering)
                  ? 'opacity-100 pointer-events-auto translate-x-0' 
                  : 'opacity-0 pointer-events-none translate-x-4'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tight [font-family:'Manrope',Helvetica]">
                AI Financial Research Assistant
              </h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 [font-family:'Manrope',Helvetica]">
                Get the information you need quickly and efficiently.
              </p>
              
              <div className="flex flex-col gap-6">
                {/* Results Display Area */}
                <div className="w-full px-4 py-6 rounded-xl border border-[#afafaf80] bg-white min-h-[96px] text-black text-sm md:text-base [font-family:'Manrope',Helvetica] relative">
                  {currentResultIndex !== null ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="font-semibold text-wezomcomblack text-base md:text-lg [font-family:'Manrope',Helvetica] flex-1">
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
                      <div className="text-wezomcomdove-gray leading-relaxed [font-family:'Manrope',Helvetica]">
                        {exampleResults[currentResultIndex].content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="text-gray-400 mb-2">Results will appear here...</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500 [font-family:'Manrope',Helvetica]">Example results:</span>
                        {exampleResults.map((result, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentResultIndex(index)}
                            className="cursor-target px-3 py-1.5 text-xs rounded-lg border border-[#afafaf60] bg-white hover:bg-gray-50 hover:border-[#afafaf80] transition-colors text-wezomcomblack [font-family:'Manrope',Helvetica]"
                          >
                            {result.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onFocus={() => setShowQuestionExamples(true)}
                    onBlur={() => setTimeout(() => setShowQuestionExamples(false), 200)}
                    placeholder="Ask a question or choose from previous questions ..."
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-[#afafaf80] bg-white text-black text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 [font-family:'Manrope',Helvetica]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path 
                        d="M5.5 2.5C5.22386 2.5 5 2.72386 5 3V17C5 17.2761 5.22386 17.5 5.5 17.5H14.5C14.7761 17.5 15 17.2761 15 17V6.5L10.5 2.5H5.5Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M10 2.5V6.5H15" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  
                  {/* Example Questions Dropdown */}
                  {showQuestionExamples && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#afafaf80] rounded-xl shadow-lg z-50 max-h-[300px] overflow-y-auto">
                      <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 px-3 py-2 [font-family:'Manrope',Helvetica]">
                          Example Questions:
                        </div>
                        {exampleQuestions.map((example, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setQuestion(example);
                              setShowQuestionExamples(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base text-wezomcomblack [font-family:'Manrope',Helvetica]"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Year and Peer Group Fields */}
                <div className="flex flex-row gap-4">
                  {/* Year Field */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
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
                    <label className="text-sm md:text-base font-semibold text-black [font-family:'Manrope',Helvetica]">
                      Peer Group
                    </label>
                    <select
                      value={selectedPeerGroup}
                      onChange={(e) => setSelectedPeerGroup(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#afafaf80] bg-white text-black text-sm md:text-base hover:border-black focus:outline-none focus:border-black transition-colors [font-family:'Manrope',Helvetica]"
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
          href="#final-cta" 
          className="cursor-target inline-flex items-center justify-center h-12 sm:h-14 md:h-16 px-8 sm:px-10 md:px-12 rounded-[40px] bg-black text-white font-semibold text-base sm:text-lg md:text-xl hover:bg-transparent hover:text-black hover:border hover:border-[#afafaf80] hover:scale-105 transition-all duration-300 focus:outline-none shadow-lg [font-family:'Manrope',Helvetica]"
        >
          Request a Demo
        </a>
      </div>
    </section>
  );
};

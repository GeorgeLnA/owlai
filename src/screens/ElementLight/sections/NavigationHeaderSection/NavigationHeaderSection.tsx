import { Building2, TrendingUp, ChevronDown, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";

export const NavigationHeaderSection = (): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const icpButtons = [
    { 
      name: "Institutional Investment Firms", 
      icon: TrendingUp,
      description: "Hedge funds, asset managers, pension funds",
      href: "/"
    },
    { 
      name: "Banks & Financial Institutions", 
      icon: Building2,
      description: "Commercial banks, investment banks, credit unions",
      href: "/?icp=banks"
    },
  ];

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* ICPs Navigation - Top Left */}
      <header className="fixed top-4 left-4 z-50">
        <nav
          className={`bg-black/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/60 hover:bg-black/70 transition-all duration-500 ease-out ${
            isExpanded ? 'p-3 sm:p-4' : 'px-3 py-2'
          }`}
          role="navigation"
          aria-label="ICP Navigation"
        >
        {!isExpanded ? (
          /* Collapsed State - Small Button */
          <div
            onClick={toggleExpanded}
            className="cursor-pointer flex items-center gap-1.5"
          >
            <div className="text-white text-xs">
              ICPs
            </div>
            <ChevronDown className="w-3 h-3 text-white transition-transform duration-300" />
          </div>
        ) : (
          /* Expanded State - Grid Menu */
          <div className="space-y-2">
            {/* Header with close button */}
            <div className="flex items-center justify-between gap-2" style={{ animation: 'fadeInUp 0.3s ease-out' }}>
              <span className="font-semibold text-xs text-white flex-1 text-center">Institutional Client Profiles</span>
              <Button
                onClick={toggleExpanded}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full w-5 h-5 flex-shrink-0"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </div>

            {/* ICP Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {icpButtons.map((icp, index) => {
                const Icon = icp.icon;
                return (
                  <Button
                    key={index}
                    asChild
                    className="group relative px-2 py-1.5 rounded-xl bg-transparent hover:bg-white/10 text-white border-0 transition-all duration-300 hover:scale-105 w-full justify-center"
                    style={{ 
                      animation: `fadeInUp 0.4s ease-out forwards`,
                      animationDelay: `${150 + index * 50}ms`,
                      opacity: 0
                    }}
                    onClick={() => {
                      setIsExpanded(false);
                      window.location.href = icp.href;
                    }}
                  >
                    <a href={icp.href} onClick={(e) => e.preventDefault()}>
                      <div className="flex flex-col items-center justify-center space-y-1 w-full">
                        <Icon className="w-3 h-3 group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0" />
                        <div className="font-semibold text-[9px] sm:text-[10px] leading-tight text-center">{icp.name}</div>
                      </div>
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        </nav>
      </header>

    </>
  );
};

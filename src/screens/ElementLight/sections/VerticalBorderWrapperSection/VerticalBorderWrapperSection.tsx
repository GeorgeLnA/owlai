import React from "react";

export const VerticalBorderWrapperSection = (): JSX.Element => {
  // Navigation categories data
  const categories = [
    { name: "Web Platform", isActive: true },
    { name: "Database", isActive: false },
    { name: "Cloud & DevOps", isActive: false },
    { name: "Mobile apps", isActive: false },
  ];

  return (
    <nav className="flex flex-col w-full lg:w-[340px] items-start pl-0 pr-0 lg:pr-[41px] pt-8 lg:pt-16 pb-8 lg:pb-0 border-r-0 lg:border-r border-wezomcomsilver-chalice-50 border-b lg:border-b-0 relative self-stretch">
      <div className="flex flex-col items-start relative self-stretch w-full">
        <ul className="flex flex-row lg:flex-col items-start gap-2 lg:gap-2 relative self-stretch w-full overflow-x-auto lg:overflow-x-visible">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`flex py-1 relative self-stretch w-full ${
                category.isActive
                  ? "pl-0 lg:pl-[18px] border-l-0 lg:border-l-4 border-b-2 lg:border-b-0 border-[#553194]"
                  : "px-0"
              } whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink lg:w-full`}
            >
              <button className="flex relative self-stretch w-full flex-col items-start">
                <span
                  className={`self-stretch text-sm lg:text-base tracking-[0] leading-[22.4px] relative mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold ${
                    category.isActive
                      ? "text-wezomcomblack"
                      : "text-wezomcomdove-gray"
                  }`}
                >
                  {category.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

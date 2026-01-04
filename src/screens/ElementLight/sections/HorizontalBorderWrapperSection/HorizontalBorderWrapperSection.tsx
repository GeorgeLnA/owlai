import React from "react";

export const HorizontalBorderWrapperSection = (): JSX.Element => {
  // Data for the three columns
  const columns = [
    {
      leftContent: {
        title: "REVIEWED ON",
        logoSrc: "/vector-7.svg",
        logoWidth: "19px",
        logoHeight: "22px",
        secondaryLogoSrc: "/vector-4.svg",
        dotSrc: "/vector-2.svg",
        stars: [
          { src: "/mask-group-9.svg", bgSrc: "/mask-group-4.svg" },
          { src: "/mask-group-2.svg", bgSrc: "/mask-group-5.svg" },
          { src: "/mask-group-8.svg", bgSrc: "/mask-group-6.svg" },
          { src: "/mask-group-7.svg", bgSrc: "/mask-group-3.svg" },
          { src: "/mask-group-10.svg", bgSrc: "/mask-group-11.svg" },
        ],
        reviewCount: "44 REVIEWS",
      },
      rightContent: {
        title: "Top Rated",
        description: "The highest quality results and\nclient satisfaction",
      },
    },
    {
      leftContent: {
        logoSrc: "/component-3-22.svg",
        logoWidth: "150px",
        logoHeight: "38px",
      },
      rightContent: {
        title: "Excellent mobile",
        description: "Top App Development Companies\nin Ukraine 2021",
      },
    },
    {
      leftContent: {
        logoSrc: "/component-3-17.svg",
        logoWidth: "160px",
        logoHeight: "32px",
      },
      rightContent: {
        title: "Top Rated",
        description: "The highest quality results and\nclient satisfaction",
      },
    },
  ];

  return (
    <section className="flex flex-col items-start w-full border-t border-[#afafaf80]">
      <div className="flex flex-col lg:flex-row w-full">
        {columns.map((column, index) => (
          <div key={`column-${index}`} className="flex-1 min-w-0 mb-6 lg:mb-0">
            <div
              className={`flex flex-col ${index < columns.length - 1 ? "lg:border-r border-[#afafaf80] border-b lg:border-b-0 pb-6 lg:pb-0" : ""}`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side of the column */}
                <div className="flex-1 p-4 md:p-6">
                  {column.leftContent.title && (
                    <div className="h-auto md:h-10 flex items-center overflow-hidden">
                      <div className="flex flex-col">
                        <div className="min-w-0 md:min-w-56">
                          <div className="flex">
                            <div className="flex flex-col gap-[5px]">
                              <div className="font-wezom-com-roboto-regular-upper text-wezomcomabbey tracking-[var(--wezom-com-roboto-regular-upper-letter-spacing)] leading-[var(--wezom-com-roboto-regular-upper-line-height)] text-xs md:text-base">
                                {column.leftContent.title}
                              </div>

                              <div className="flex flex-col w-[70px] md:w-[82px] h-[20px] md:h-[23px]">
                                <div className="flex flex-col w-[70px] md:w-[82px] h-[20px] md:h-[23px] items-center justify-center px-[0.58px]">
                                  <div className="relative w-[68px] md:w-[80.83px] h-[20px] md:h-[23px] overflow-hidden">
                                    <div className="absolute w-[50px] md:w-[60px] h-[20px] md:h-[23px] top-0 left-[18px] md:left-[21px] bg-[url(/vector-4.svg)] bg-[100%_100%]">
                                      <img
                                        className="absolute w-[4px] md:w-[5px] h-[4px] md:h-[5px] top-2 md:top-3 left-7 md:left-9"
                                        alt="Vector"
                                        src="/vector-2.svg"
                                      />
                                    </div>

                                    <img
                                      className="absolute w-[16px] md:w-[19px] h-[19px] md:h-[22px] top-px left-0"
                                      alt="Vector"
                                      src="/vector-7.svg"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {column.leftContent.stars && (
                              <div className="flex flex-col justify-center pl-2 md:pl-[13px]">
                                <div className="flex flex-col gap-[7px] py-px">
                                  <div className="flex h-[16px] md:h-[19px]">
                                    {column.leftContent.stars.map(
                                      (star, starIndex) => (
                                        <div
                                          key={`star-${starIndex}`}
                                          className="flex flex-col w-[14px] md:w-[17px] h-[12px] md:h-[15px] pr-0.5"
                                        >
                                          <div
                                            className={`relative w-[12px] md:w-[15px] h-[12px] md:h-[15px] bg-[url(${star.bgSrc})] bg-[100%_100%]`}
                                          >
                                            <img
                                              className="absolute w-[12px] md:w-[15px] h-[12px] md:h-[15px] top-0 left-0"
                                              alt="Star rating"
                                              src={star.src}
                                            />
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>

                                  <div className="flex">
                                    <div className="font-['Roboto',Helvetica] font-normal text-wezomcomabbey text-xs md:text-sm tracking-[1.00px] leading-normal">
                                      {column.leftContent.reviewCount}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {column.leftContent.logoSrc && !column.leftContent.title && (
                    <div className="pb-[5.39px] flex justify-center md:justify-start">
                      <img
                        className="cursor-target logo w-[120px] md:w-[150px] h-auto max-h-[30px] md:max-h-[38px] object-contain"
                        alt="Company logo"
                        src={column.leftContent.logoSrc}
                      />
                    </div>
                  )}
                </div>

                {/* Right side of the column */}
                <div className="flex-1 p-4 md:p-6 flex flex-col gap-[2.89px]">
                  <div>
                    <h3 className="font-['Manrope',Helvetica] font-semibold text-wezomcomblack text-lg md:text-xl tracking-[-0.40px] leading-7">
                      {column.rightContent.title}
                    </h3>
                  </div>

                  <div className="pb-[0.69px]">
                    <p className="font-['Manrope',Helvetica] font-medium text-wezomcomdove-gray text-xs md:text-sm tracking-0 leading-[16.8px] whitespace-pre-line">
                      {column.rightContent.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import { ClockIcon, StarIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";

// Testimonial articles (unchanged data)
const articles = [
  {
    id: 1,
    category: "SOFTWARE",
    date: "28.03.2025",
    title: "12 Top Financial Analysis Software in 2025",
    author: "Serge Guzenko",
    rating: "4.3 (3)",
    hasRating: true,
    readTime: undefined as string | undefined,
  },
  {
    id: 2,
    category: "SOFTWARE",
    date: "06.08.2025",
    title: "MVP Software Development: How to Launch Faster and Smarter",
    author: "Victoria",
    hasRating: false,
    readTime: "8 min",
  },
  {
    id: 3,
    category: "SOFTWARE",
    date: "06.08.2025",
    title: "Software Outstaffing Explained: How It Works and When It Makes Sense",
    author: "Serge Guzenko",
    hasRating: false,
    readTime: "10 min",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full">
      {/* Heading */}
      <div className="flex items-center mb-6">
        <div className="flex flex-col w-6 h-2 items-start pr-4">
          <div className="w-2 h-2 bg-wezomcomblack rounded" />
        </div>
        <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-wezomcomblack text-xs md:text-[13px] leading-4">
          What clients say
        </span>
      </div>

      {/* Text list */}
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id} className="border-b border-black/10 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center gap-2">
              <Badge className="bg-wezomcomrolling-stone hover:bg-wezomcomrolling-stone text-white rounded-[40px] px-3 py-1.5">
                <span className="[font-family:'IBM_Plex_Mono',Helvetica] font-semibold text-[13px] leading-[15.6px]">
                  {article.category}
                </span>
              </Badge>
              <span className="[font-family:'Manrope',Helvetica] text-sm text-wezomcomdove-gray leading-5">
                {article.date}
              </span>
            </div>
            <h3 className="mt-2 [font-family:'Manrope',Helvetica] font-semibold text-wezomcomblack text-xl md:text-2xl leading-tight underline">
              {article.title}
            </h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-wezomcomdove-gray [font-family:'Manrope',Helvetica]">
              <span>By {article.author}</span>
              {article.hasRating && (
                <span className="inline-flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  {article.rating}
                </span>
              )}
              {article.readTime && (
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {article.readTime}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

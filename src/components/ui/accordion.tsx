"use client";

import { useState } from "react";

export type AccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
};

export default function Accordion({ data }: { data: AccordionItem[] }) {
  const [activeQuestions, setActiveQuestions] = useState<number[]>([]);

  const handleQuestionToggle = (idx: number) => {
    if (activeQuestions.includes(idx)) {
      setActiveQuestions(activeQuestions.filter((q) => q !== idx));
    } else {
      setActiveQuestions([...activeQuestions, idx]);
    }
  };

  return (
    <div className="w-full">
      {data.map((item, index) => {
        const isOpen = activeQuestions.includes(index);
        return (
          <div
            className="border-b border-gray-200 last:border-b-0"
            key={`faq-${index}`}
          >
            <button
              className="flex w-full items-start justify-between gap-4 py-4 text-left font-medium transition-colors focus:outline-none"
              onClick={() => handleQuestionToggle(index)}
              aria-expanded={isOpen}
            >
              <span className="hover:text-dosasce-red flex-1 text-lg underline-offset-4 transition-colors hover:underline">
                {item.title}
              </span>
              <svg
                className={`text-dosasce-red h-5 w-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pt-0 pb-4 text-base leading-relaxed text-gray-600">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

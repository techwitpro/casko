"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { JournalMoment } from "@/data/journal";

interface LightboxModalProps {
  moments: JournalMoment[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function LightboxModal({
  moments,
  currentIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onSelectIndex((currentIndex + 1) % moments.length);
      } else if (e.key === "ArrowLeft") {
        onSelectIndex((currentIndex - 1 + moments.length) % moments.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, moments.length, onClose, onSelectIndex]);

  if (currentIndex === null || !moments[currentIndex]) return null;

  const current = moments[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + moments.length) % moments.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % moments.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/92 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-[#191E1B]/80 text-[#F1EAD9] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        aria-label="Previous Moment"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#191E1B]/80 text-[#F1EAD9] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        aria-label="Next Moment"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#191E1B]/80 text-[#F1EAD9] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal Container */}
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[55vh] sm:h-[68vh] rounded-sm overflow-hidden bg-[#191E1B]">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Caption */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-baseline justify-between gap-2 px-2 text-[#F1EAD9]">
          <div className="flex items-baseline gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-[#D4B879] font-medium">
              {current.time}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl">
              {current.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#F1EAD9]/70 max-w-md">
            {current.description}
          </p>
        </div>

        <div className="mt-2 text-[11px] text-[#F1EAD9]/40">
          Moment {currentIndex + 1} of {moments.length} · Use arrow keys to navigate
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { JOURNAL_MOMENTS, JournalMoment } from "@/data/journal";
import { gsap } from "@/lib/gsap";

interface PhotoJournalProps {
  onSelectMoment: (index: number) => void;
}

export default function PhotoJournal({ onSelectMoment }: PhotoJournalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1 = JOURNAL_MOMENTS.slice(0, 4);
  const row2 = JOURNAL_MOMENTS.slice(4, 8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header sequence
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleLine1Ref.current,
          start: "top 88%",
          once: true,
        },
      });

      headerTl.fromTo(
        tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      headerTl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out" },
        "-=0.5"
      );

      headerTl.fromTo(
        noteRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      // 2. Row 1 Cards Reveal: Clean, immediate clarity, zero sluggish low-opacity
      if (row1Ref.current) {
        const cards = row1Ref.current.querySelectorAll(".journal-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 3. Row 2 Cards Reveal
      if (row2Ref.current) {
        const cards = row2Ref.current.querySelectorAll(".journal-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 4. Subtle parallax on 64px offset cards
      const offsetCards = sectionRef.current?.querySelectorAll(".journal-card-offset") || [];
      offsetCards.forEach((card) => {
        gsap.to(card, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCard = (moment: JournalMoment, globalIndex: number) => (
    <div
      key={moment.id}
      className={`journal-card w-full flex-1 flex flex-col cursor-pointer group will-animate ${
        moment.offset ? "journal-card-offset pt-0 md:pt-[64px]" : ""
      }`}
      onClick={() => onSelectMoment(globalIndex)}
    >
      {/* Frame matching Figma EL-d8a3e5e9: gap: 16px */}
      <div className="flex flex-col gap-[16px]">
        {/* Photo Container matching Figma layout_97c09b80: height: 300px */}
        <div className="relative w-full h-[260px] sm:h-[280px] lg:h-[300px] overflow-hidden bg-[#232B25] rounded-none">
          <div className="relative w-full h-full will-animate">
            <Image
              src={moment.image}
              alt={`${moment.time} — ${moment.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Hover indicator */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white bg-black/70 px-3.5 py-1.5 backdrop-blur-xs border border-white/20">
              View Moment ↗
            </span>
          </div>
        </div>

        {/* Caption Row matching Figma EL-ccee8811: gap: 18px */}
        <div className="flex items-baseline gap-[18px]">
          {/* Time: Manrope 12px, line-height 1.5em */}
          <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 font-mono shrink-0">
            {moment.time}
          </span>
          {/* Label: Manrope 13px, line-height 1.5em */}
          <span className="text-[13px] font-normal leading-[1.5em] text-[#F1EAD9] group-hover:text-[#D4B879] transition-colors truncate">
            {moment.title}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[64px] py-16 sm:py-20 lg:py-[104px] flex flex-col gap-[64px]"
    >
      {/* Section Header & Day Introduction matching Figma #6703:21931 */}
      <div className="flex flex-col gap-4">
        <span
          ref={tagRef}
          className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 uppercase tracking-[0.14em]"
        >
          One day at MORNI
        </span>

        {/* Day introduction row matching Figma #6703:21933: gap 64px, align-items: flex-end */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-[64px]">
          {/* Heading Mask Reveal: Cormorant Garamond 90px with descender clearance */}
          <div className="flex flex-col">
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine1Ref}
                className="font-editorial text-[56px] sm:text-[76px] lg:text-[90px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                It’s 3 pm. Order
              </div>
            </div>
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine2Ref}
                className="font-editorial text-[56px] sm:text-[76px] lg:text-[90px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                the pancakes.
              </div>
            </div>
          </div>

          {/* Day Note matching Figma #6703:21935: width 280px, Manrope 17px */}
          <div ref={noteRef} className="w-full lg:w-[280px] shrink-0">
            <p className="text-[15px] sm:text-[17px] font-normal leading-[1.5em] text-[#F1EAD9]/90 text-pretty">
              Left to right, open to close. The menu doesn’t change when the clock does.
            </p>
          </div>
        </div>
      </div>

      {/* Photo Journal Grid: 2 rows of 4 photos matching Figma #6703:21937: gap 48px */}
      <div className="flex flex-col gap-[48px]">
        {/* Row 1 matching Figma #6703:21938: gap 24px */}
        <div
          ref={row1Ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[24px] items-start"
        >
          {row1.map((item, idx) => renderCard(item, idx))}
        </div>

        {/* Row 2 matching Figma #6703:21963: gap 24px */}
        <div
          ref={row2Ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[24px] items-start"
        >
          {row2.map((item, idx) => renderCard(item, idx + 4))}
        </div>
      </div>
    </section>
  );
}

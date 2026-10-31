"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FEATURED_MENU_ITEMS, MenuItem } from "@/data/menu";
import { gsap } from "@/lib/gsap";

interface MenuProps {
  onOpenFullMenu: () => void;
}

export default function Menu({ onOpenFullMenu }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Sweet", "Savoury", "Bakery", "Coffee"];

  const filteredItems =
    activeCategory === "All"
      ? FEATURED_MENU_ITEMS
      : FEATURED_MENU_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Intro sequence
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 88%",
          once: true,
        },
      });

      introTl.fromTo(
        tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      introTl.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.5"
      );

      introTl.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      introTl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );

      // 2. Cascade for dishes: deliberate, graceful pace
      if (itemsContainerRef.current) {
        const dishRows = itemsContainerRef.current.querySelectorAll(".dish-item-row");
        gsap.fromTo(
          dishRows,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: itemsContainerRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="w-full bg-[#232B25] text-[#F1EAD9]"
    >
      {/* Outer padding matching Figma #6703:21849: padding 112px 80px */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] py-16 sm:py-20 lg:py-[112px]">
        {/* Row layout: gap 80px */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[80px] items-start">
          {/* Left Column: Menu Introduction (Width 350px, gap 32px) */}
          <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-[32px]">
            <span
              ref={tagRef}
              className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 uppercase tracking-[0.14em]"
            >
              Menu
            </span>

            {/* Heading Mask Reveal: Cormorant Garamond 72px, with clearance for descenders */}
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <h2
                ref={titleRef}
                className="font-editorial text-[48px] sm:text-[62px] lg:text-[72px] font-medium leading-[1.02em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                Same at menu 7 am and 4 pm.
              </h2>
            </div>

            <p
              ref={descRef}
              className="text-[15px] sm:text-[17px] font-normal leading-[1.5em] text-[#F1EAD9]/90 text-pretty"
            >
              Everything on this page, from open to close. No cut-off, no brunch surcharge, no judgement.
            </p>

            {/* Action Button matching Figma EL-66f82825: padding 16px 24px, bg #D4B879, gap 24px */}
            <button
              ref={buttonRef}
              onClick={onOpenFullMenu}
              className="inline-flex items-center gap-[24px] px-[24px] py-[16px] bg-[#D4B879] text-[#191E1B] text-[15px] font-bold rounded-none transition-colors duration-200 hover:bg-[#e4cb93] hover:shadow-xl hover:shadow-[#D4B879]/20 cursor-pointer self-start group"
            >
              <span>See the full menu</span>
              <div className="relative w-[23.29px] h-[23.29px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Image
                  src="/images/arrow-up-right.svg"
                  alt=""
                  width={23}
                  height={23}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          </div>

          {/* Right Column: Menu List matching Figma EL-51794897 */}
          <div className="w-full flex-1 flex flex-col">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
              <span className="text-[11px] uppercase tracking-wider text-[#D4B879]/70 mr-2 shrink-0">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs tracking-wider uppercase transition-colors duration-200 rounded-sm cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#D4B879] text-[#191E1B] font-semibold shadow-sm"
                      : "bg-[#191E1B]/50 text-[#F1EAD9]/70 hover:text-[#F1EAD9] hover:bg-[#191E1B]/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dish Rows matching Figma EL-03c5f635: padding 22px 0px, gap 14px */}
            <div
              ref={itemsContainerRef}
              className="divide-y divide-[rgba(212,184,121,0.4)] border-b border-[rgba(212,184,121,0.4)]"
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="dish-item-row py-[22px] flex flex-col gap-[14px] group hover:bg-[#191E1B]/30 transition-colors duration-200 -mx-4 px-4 rounded-sm cursor-pointer will-animate"
                  onClick={onOpenFullMenu}
                >
                  {/* Dish and Price Row matching Figma EL-c343e999: align-items: baseline, gap: 20px */}
                  <div className="w-full flex items-baseline justify-between gap-[20px]">
                    <h3 className="font-editorial text-[26px] sm:text-[30px] font-medium leading-[1.05em] text-[#F1EAD9] group-hover:text-[#D4B879] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <span className="text-[20px] sm:text-[24px] font-normal leading-[1.5em] text-[#F1EAD9] font-sans shrink-0 group-hover:text-[#D4B879] transition-colors duration-200">
                      {item.price}
                    </span>
                  </div>

                  {/* Description and Category Row matching Figma EL-bff1719b: gap: 20px */}
                  <div className="w-full flex items-baseline justify-between gap-[20px]">
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.5em] text-[#F1EAD9]/80 max-w-xl group-hover:text-[#F1EAD9] transition-colors duration-200">
                      {item.description}
                    </p>
                    {/* Category text: Manrope 11px, right-aligned, width: 80px (layout_862c7c5f) */}
                    <span className="w-[80px] text-right text-[11px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-wider shrink-0 group-hover:text-[#D4B879]/90 transition-colors duration-200">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom editorial hint */}
            <div className="pt-6 flex flex-col sm:flex-row items-baseline justify-between text-xs text-[#F1EAD9]/60">
              <p>Specialty single-origin beans roasted down the road in Batu Bolong.</p>
              <button
                onClick={onOpenFullMenu}
                className="mt-2 sm:mt-0 text-[#D4B879] hover:underline cursor-pointer"
              >
                Open complete dietary & allergen guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Greeting reveal: smooth upward glide
      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      );

      // 2. Large Display Title Reveal ("All day"): zero clipping, majestic rise
      tl.fromTo(
        titleRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.6"
      );

      // 3. Opening note
      tl.fromTo(
        noteRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      // 4. Hero image: crisp, instant clarity with gentle scale settle
      tl.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        "-=0.7"
      );

      tl.fromTo(
        imageInnerRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1.0"
      );

      // 5. Hero caption bar reveal
      tl.fromTo(
        captionRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      );

      // Subtle scroll parallax
      gsap.to(imageInnerRef.current, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[64px] pt-8 sm:pt-12 pb-[72px] flex flex-col gap-[40px]"
    >
      {/* Hero Headline Row matching Figma #6703:21822: gap 80px, align-items: flex-end */}
      <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-[80px]">
        {/* Left Column: Greeting + "All day" */}
        <div className="flex flex-col gap-[8px]">
          <span
            ref={greetingRef}
            className="text-[24px] sm:text-[28px] font-normal leading-[1.5em] text-[#F1EAD9] tracking-normal inline-block"
          >
            Good morning,
          </span>

          {/* Mask container with generous clearance so descenders (letter 'y') are NEVER cut off */}
          <div className="overflow-hidden pb-6 sm:pb-10 -mb-6 sm:-mb-10 pt-2 -mt-2 px-2 sm:px-4 -mx-2 sm:-mx-4">
            <h1
              ref={titleRef}
              className="font-editorial text-[90px] sm:text-[140px] md:text-[165px] lg:text-[180px] font-medium leading-[1.08em] tracking-[-0.02em] text-[#F1EAD9] -ml-1 sm:-ml-2 inline-block will-animate"
            >
              All day
            </h1>
          </div>
        </div>

        {/* Right Column: Opening note matching Figma #6703:21826: width 345px, padding 0 0 20px */}
        <div
          ref={noteRef}
          className="w-full lg:w-[345px] lg:pb-[20px] shrink-0"
        >
          <p className="text-[17px] sm:text-[19px] font-normal leading-[1.5em] text-[#F1EAD9] text-pretty">
            Breakfast from open to close, with specialty coffee roasted down the road. Come hungry, come whenever.
          </p>
        </div>
      </div>

      {/* Hero Image: The Peach Stack at the counter matching Figma #6703:21828: height 620px */}
      <div
        ref={imageWrapperRef}
        className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[620px] overflow-hidden bg-[#232B25] group cursor-pointer"
      >
        <div ref={imageInnerRef} className="relative w-full h-full will-animate">
          <Image
            src="/images/hero-peach-stack.png"
            alt="The Peach Stack at the counter — Ricotta pancakes with grilled peach and palm-sugar syrup"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Decorative badge */}
        <div className="absolute top-5 right-5 z-20 bg-[#191E1B]/85 backdrop-blur-sm px-4 py-1.5 border border-[#D4B879]/30 text-[11px] uppercase tracking-[0.16em] text-[#D4B879] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Featured Daily
        </div>
      </div>

      {/* Hero Caption Row matching Figma #6703:21829: gap 80px, align-items: center */}
      <div
        ref={captionRef}
        className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-[80px]"
      >
        {/* Left Column: Featured Dish Details (width 560px, gap 10px) */}
        <div className="w-full md:max-w-[560px] flex flex-col gap-[10px]">
          <h2 className="font-editorial text-[28px] sm:text-[34px] font-medium leading-[1.05em] text-[#F1EAD9]">
            The Peach Stack
          </h2>
          <p className="text-[14px] sm:text-[15px] font-normal leading-[1.5em] text-[#F1EAD9]/90">
            Ricotta pancakes, grilled peach, blueberries, palm-sugar syrup · 85k
          </p>
        </div>

        {/* Right Column: Location & Timings Badge (#6703:21833, Manrope 12px, text-align right) */}
        <div className="text-left md:text-right shrink-0">
          <p className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/90 tracking-wide">
            Canggu, Bali &#9670; Open daily 7:00 – 17:00
          </p>
        </div>
      </div>
    </section>
  );
}

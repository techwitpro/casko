"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Coffee() {
  const [selectedMethod, setSelectedMethod] = useState<"espresso" | "filter" | "moka">("espresso");
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  const brewNotes = {
    espresso: "Double shot extraction. Rich dark cocoa, roasted macadamia, and caramelized cane sugar finish.",
    filter: "Single origin Kintamani washed. Crisp green apple, jasmine floral aromatics, and bright honey sweetness.",
    moka: "Traditional Italian stovetop served bubbling to your table with brown palm-sugar cubes.",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image reveal
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 85%",
          once: true,
        },
      });

      imgTl.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
      );

      imgTl.fromTo(
        imageInnerRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: "power2.out" },
        "-=1.0"
      );

      // Subtle parallax on coffee beans
      gsap.to(imageInnerRef.current, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 2. Story sequence
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleLine1Ref.current,
          start: "top 85%",
          once: true,
        },
      });

      storyTl.fromTo(
        tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      storyTl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out" },
        "-=0.5"
      );

      storyTl.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      // 3. Divider expand
      storyTl.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        "-=0.6"
      );

      // 4. Facts Stagger
      if (factsRef.current) {
        storyTl.fromTo(
          factsRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] py-16 sm:py-20 lg:py-[112px]"
    >
      {/* Row layout matching Figma #6703:21914: gap 96px, align-items: center */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[96px]">
        {/* Left Column: House Blend Image matching Figma #6703:21915: width 570px, height 544px */}
        <div
          ref={imageWrapperRef}
          className="relative w-full lg:w-[570px] h-[380px] sm:h-[480px] lg:h-[544px] shrink-0 overflow-hidden bg-[#232B25] group cursor-pointer will-animate"
        >
          <div ref={imageInnerRef} className="relative w-full h-[115%] -top-[7%] will-animate">
            <Image
              src="/images/coffee-blend.png"
              alt="MORNI House Blend roasted two kilometres away in Canggu"
              fill
              sizes="(max-width: 1024px) 100vw, 570px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Roast Info Overlay */}
          <div className="absolute bottom-5 left-5 right-5 z-20 bg-[#191E1B]/85 backdrop-blur-sm p-3.5 border border-[#D4B879]/30 text-xs text-[#F1EAD9] flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
            <div>
              <span className="text-[#D4B879] uppercase tracking-wider text-[10px] block font-semibold">
                Origins
              </span>
              <span>Bali Kintamani &amp; Flores Bajawa</span>
            </div>
            <div className="text-right">
              <span className="text-[#D4B879] uppercase tracking-wider text-[10px] block font-semibold">
                Profile
              </span>
              <span>Medium roast · 10 days rested</span>
            </div>
          </div>
        </div>

        {/* Right Column: Coffee Story matching Figma #6703:21916: gap 36px */}
        <div className="w-full flex-1 flex flex-col gap-[36px]">
          <div className="flex flex-col gap-3">
            <span
              ref={tagRef}
              className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 uppercase tracking-[0.14em]"
            >
              Coffee · house blend
            </span>

            {/* Mask container for 88px Cormorant Garamond heading with ample descender clearance */}
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine1Ref}
                className="font-editorial text-[56px] sm:text-[74px] lg:text-[88px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                Slow pour.
              </div>
            </div>
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine2Ref}
                className="font-editorial text-[56px] sm:text-[74px] lg:text-[88px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                Loud plates.
              </div>
            </div>
          </div>

          {/* Story Paragraph: Manrope 18px, line-height 1.5em */}
          <p
            ref={descRef}
            className="text-[16px] sm:text-[18px] font-normal leading-[1.5em] text-[#F1EAD9]/90 text-pretty"
          >
            Our beans are roasted two kilometres from the counter and rested for ten days before they meet water. Espresso, filter or a stovetop moka for the table. Made the patient way, next to the brightest breakfast in Canggu.
          </p>

          {/* Interactive Method Tasting Pill Switcher */}
          <div className="flex flex-col gap-2 p-3 bg-[#232B25] border border-[#D4B879]/20 rounded-sm">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#D4B879] uppercase tracking-wider mr-1 font-semibold">
                Tasting Notes:
              </span>
              <button
                onClick={() => setSelectedMethod("espresso")}
                className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedMethod === "espresso"
                    ? "bg-[#D4B879] text-[#191E1B] font-semibold"
                    : "text-[#F1EAD9]/70 hover:text-white"
                }`}
              >
                Espresso
              </button>
              <button
                onClick={() => setSelectedMethod("filter")}
                className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedMethod === "filter"
                    ? "bg-[#D4B879] text-[#191E1B] font-semibold"
                    : "text-[#F1EAD9]/70 hover:text-white"
                }`}
              >
                V60 Filter
              </button>
              <button
                onClick={() => setSelectedMethod("moka")}
                className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedMethod === "moka"
                    ? "bg-[#D4B879] text-[#191E1B] font-semibold"
                    : "text-[#F1EAD9]/70 hover:text-white"
                }`}
              >
                Table Moka
              </button>
            </div>
            <p className="text-xs text-[#F1EAD9]/80 italic pl-1">
              &ldquo;{brewNotes[selectedMethod]}&rdquo;
            </p>
          </div>

          {/* Section Rule matching Figma EL-e972c88e: height 1px, fill rgba(212,184,121,0.4) */}
          <div ref={dividerRef} className="w-full h-[1px] bg-[rgba(212,184,121,0.4)] will-animate" />

          {/* Coffee Facts matching Figma EL-4848f3c9: gap 24px */}
          <div
            ref={factsRef}
            className="grid grid-cols-3 gap-6 sm:gap-[24px]"
          >
            {/* Fact 1: 2 km */}
            <div className="flex flex-col gap-[12px] group">
              <span className="font-editorial text-[26px] sm:text-[32px] font-medium leading-[1.05em] text-[#F1EAD9] group-hover:text-[#D4B879] transition-colors">
                2 km
              </span>
              <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70">
                From roaster to counter
              </span>
            </div>

            {/* Fact 2: 10 days */}
            <div className="flex flex-col gap-[12px] group">
              <span className="font-editorial text-[26px] sm:text-[32px] font-medium leading-[1.05em] text-[#F1EAD9] group-hover:text-[#D4B879] transition-colors">
                10 days
              </span>
              <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70">
                Rested before brewing
              </span>
            </div>

            {/* Fact 3: 7:00 */}
            <div className="flex flex-col gap-[12px] group">
              <span className="font-editorial text-[26px] sm:text-[32px] font-medium leading-[1.05em] text-[#F1EAD9] group-hover:text-[#D4B879] transition-colors">
                7:00
              </span>
              <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70">
                First pour, every day
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

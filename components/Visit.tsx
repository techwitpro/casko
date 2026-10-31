"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface VisitProps {
  onOpenDirections: () => void;
}

export default function Visit({ onOpenDirections }: VisitProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@morni.cafe");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Mask Reveal
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleLine1Ref.current,
          start: "top 88%",
          once: true,
        },
      });

      titleTl.fromTo(
        tagRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      titleTl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 105 },
        { yPercent: 0, duration: 1.3, stagger: 0.14, ease: "power4.out" },
        "-=0.5"
      );

      // 2. Divider line scale-X
      titleTl.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
        "-=0.6"
      );

      // 3. Details cascade in
      if (detailsRef.current) {
        titleTl.fromTo(
          detailsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.6"
        );
      }

      // 4. Counter image direct reveal
      gsap.fromTo(
        imageInnerRef.current,
        { opacity: 0, y: 24, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageInnerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Subtle parallax on counter photo
      gsap.to(imageInnerRef.current, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="w-full bg-[#232B25] text-[#F1EAD9]"
    >
      {/* Outer padding matching Figma #6703:21988: padding 112px 80px */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] py-16 sm:py-20 lg:py-[112px]">
        {/* Row layout: gap 80px, align-items: center */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-[80px]">
          {/* Left Column: Visit Story matching Figma #6703:21989: width 560px, gap 36px */}
          <div className="w-full lg:w-[560px] shrink-0 flex flex-col gap-[36px]">
            <div className="flex flex-col gap-3">
              <span
                ref={tagRef}
                className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 uppercase tracking-[0.14em]"
              >
                Visit
              </span>

              {/* Heading Mask Reveal: Cormorant Garamond 86px with descender clearance */}
              <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
                <div
                  ref={titleLine1Ref}
                  className="font-editorial text-[56px] sm:text-[72px] lg:text-[86px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
                >
                  Come hungry.
                </div>
              </div>
              <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
                <div
                  ref={titleLine2Ref}
                  className="font-editorial text-[56px] sm:text-[72px] lg:text-[86px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
                >
                  Come whenever.
                </div>
              </div>
            </div>

            {/* Visit Details Frame matching Figma #6703:21992: gap 28px */}
            <div className="flex flex-col gap-[28px]">
              {/* Section Rule matching Figma EL-e972c88e */}
              <div
                ref={dividerRef}
                className="w-full h-[1px] bg-[rgba(212,184,121,0.4)] will-animate"
              />

              {/* Address and Hours Row matching Figma #6703:21994: gap 32px */}
              <div ref={detailsRef} className="flex flex-col gap-[24px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
                  {/* Where Column matching Figma #6703:21995 */}
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-[0.14em]">
                      Where
                    </span>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.5em] text-[#F1EAD9]">
                      Jl. Pantai Batu Bolong 56<br />
                      Canggu, Bali 80361
                    </p>
                  </div>

                  {/* When Column matching Figma #6703:21998 */}
                  <div className="flex flex-col gap-[10px]">
                    <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-[0.14em]">
                      When
                    </span>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.5em] text-[#F1EAD9]">
                      Every day, 7:00 – 17:00<br />
                      Kitchen open until close
                    </p>
                  </div>
                </div>

                {/* Email Frame matching Figma #6703:22001: gap 10px */}
                <div className="flex flex-col gap-[6px]">
                  <span className="text-[11px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-[0.14em]">
                    Say hi
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href="mailto:hello@morni.cafe"
                      className="text-[14px] sm:text-[15px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors underline-offset-4 hover:underline"
                    >
                      hello@morni.cafe
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#191E1B]/50 text-[#D4B879] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
                    >
                      {emailCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Action Button: Get Directions matching Figma EL-66f82825: padding 16px 24px, bg #D4B879, gap 24px */}
                <div className="pt-2">
                  <button
                    onClick={onOpenDirections}
                    className="inline-flex items-center gap-[24px] px-[24px] py-[16px] bg-[#D4B879] text-[#191E1B] text-[15px] font-bold rounded-none transition-all duration-300 hover:bg-[#e4cb93] hover:shadow-xl hover:shadow-[#D4B879]/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer self-start group"
                  >
                    <span>Get directions</span>
                    <div className="relative w-[23.29px] h-[23.29px] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <Image
                        src="/images/arrow-up-right-2.svg"
                        alt=""
                        width={23}
                        height={23}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: MORNI Counter Image matching Figma #6703:22007: height 492px */}
          <div
            className="w-full flex-1 relative h-[360px] sm:h-[420px] lg:h-[492px] overflow-hidden bg-[#191E1B] group cursor-pointer"
            onClick={onOpenDirections}
          >
            <div ref={imageInnerRef} className="relative w-full h-[115%] -top-[7%] will-animate">
              <Image
                src="/images/visit-counter.png"
                alt="MORNI Counter at Jl. Pantai Batu Bolong, Canggu, Bali"
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            {/* Ambient vignette badge */}
            <div className="absolute bottom-5 right-5 z-20 bg-[#191E1B]/85 backdrop-blur-sm px-3.5 py-1.5 border border-[#D4B879]/30 text-[11px] text-[#F1EAD9]/90 tracking-wide">
              No reservations needed · Walk-ins always welcome
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

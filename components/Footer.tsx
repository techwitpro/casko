"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("hello@morni.cafe");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Mask Reveal
      gsap.fromTo(
        titleRef.current,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // 2. Links stagger reveal
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 3. Giant Wordmark Reveal: Monumental, calm, and grand
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 28, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // 4. Bottom divider sweep
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#191E1B] text-[#F1EAD9]"
    >
      {/* Outer container matching Figma #6703:22008: padding 72px 80px, gap 56px */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] pt-16 sm:pt-[72px] pb-10 flex flex-col gap-[56px]">
        {/* Footer Top Row matching Figma #6703:22009: gap 96px */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-[96px] items-start">
          {/* Headline: Cormorant Garamond 54px with descender clearance */}
          <div className="flex-1 max-w-xl overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
            <h2
              ref={titleRef}
              className="font-editorial text-[36px] sm:text-[46px] lg:text-[54px] font-medium leading-[1.08em] text-[#F1EAD9] will-animate"
            >
              Still serving sunrise.
            </h2>
          </div>

          {/* Nav & Contact Links matching Figma dimensions */}
          <div
            ref={linksRef}
            className="flex flex-col sm:flex-row gap-12 sm:gap-[80px]"
          >
            {/* Explore Column matching Figma #6703:22011: width 180px, gap 14px */}
            <div className="w-full sm:w-[180px] flex flex-col gap-[14px]">
              <span className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-[0.14em]">
                Explore
              </span>
              <a
                href="#menu"
                className="text-[16px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors"
              >
                Menu
              </a>
              <a
                href="#about"
                className="text-[16px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors"
              >
                About
              </a>
              <a
                href="#visit"
                className="text-[16px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors"
              >
                Visit
              </a>
            </div>

            {/* Contact Column matching Figma #6703:22016: width 240px, gap 14px */}
            <div className="w-full sm:w-[240px] flex flex-col gap-[14px]">
              <span className="text-[11px] font-normal leading-[1.5em] text-[#F1EAD9]/70 uppercase tracking-[0.14em]">
                Say hi
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors flex items-center justify-between group"
              >
                <span>Instagram</span>
                <span className="text-xs text-[#D4B879] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <div className="flex items-center justify-between">
                <a
                  href="mailto:hello@morni.cafe"
                  className="text-[16px] font-normal leading-[1.5em] text-[#F1EAD9] hover:text-[#D4B879] transition-colors"
                >
                  hello@morni.cafe
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="text-[11px] px-2 py-0.5 rounded bg-[#232B25] text-[#D4B879] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Display Wordmark matching Figma #6829:1398 (1280x305) */}
        <div
          ref={wordmarkRef}
          className="w-full py-4 overflow-hidden flex items-center justify-center will-animate"
        >
          <div className="relative w-full max-w-[1280px] h-[140px] sm:h-[220px] md:h-[280px] lg:h-[305px]">
            <Image
              src="/images/footer-wordmark.svg"
              alt="MORNI Display Logo"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>

        {/* Small Print matching Figma #6703:22021: padding 24px 0px 0px, border-top 1px solid rgba(241, 234, 217, 0.4) */}
        <div
          ref={dividerRef}
          className="w-full pt-[24px] border-t border-[rgba(241,234,217,0.4)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F1EAD9]/80 font-normal will-animate"
        >
          <p className="text-center sm:text-left">
            © 2026 MORNI. All-day breakfast and specialty coffee.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-center sm:text-right">
              Canggu, Bali &#9670; Open daily 7:00 – 17:00
            </p>

            <button
              onClick={scrollToTop}
              className="hidden md:inline-flex items-center gap-1.5 text-[#D4B879] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

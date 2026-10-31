"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface NavbarProps {
  onOpenDirections: () => void;
}

export default function Navbar({ onOpenDirections }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [baliTimeStr, setBaliTimeStr] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // Calculate Bali time (WITA UTC+8)
    const updateBaliTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const baliDate = new Date(utc + 3600000 * 8);
      const hours = baliDate.getHours();
      const minutes = baliDate.getMinutes().toString().padStart(2, "0");
      setBaliTimeStr(`${hours}:${minutes} WITA`);
      setIsOpenNow(hours >= 7 && hours < 17);
    };

    updateBaliTime();
    const timer = setInterval(updateBaliTime, 30000);

    // Luxurious graceful entrance for Navigation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }, navRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-[#191E1B]/95 backdrop-blur-md border-b border-[#D4B879]/20 shadow-xl shadow-black/30 py-4 sm:py-5"
          : "bg-transparent py-6 sm:py-8 lg:py-[35px]"
      }`}
    >
      {/* Exact Figma Container: width up to 1238px on desktop, max-width 1440px */}
      <div className="max-w-[1238px] mx-auto px-6 sm:px-8 xl:px-0 flex items-center justify-between">
        {/* Brand Logo matching Figma #6829:1469 (209x50) */}
        <Link
          href="/"
          className="relative block w-[170px] sm:w-[209px] h-[40px] sm:h-[50px] transition-transform duration-300 hover:scale-[1.02]"
          aria-label="MORNI Home"
        >
          <Image
            src="/images/logo-nav.svg"
            alt="MORNI Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation matching Figma #6829:1455: gap: 24px, #FFFFFF, 17px medium */}
        <nav
          ref={linksRef}
          className="hidden md:flex items-center gap-6 lg:gap-[24px]"
        >
          <a
            href="#menu"
            className="text-[17px] font-medium text-white hover:text-[#D4B879] transition-colors relative group py-1"
          >
            Menu
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4B879] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#about"
            className="text-[17px] font-medium text-white hover:text-[#D4B879] transition-colors relative group py-1"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4B879] transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="#visit"
            className="text-[17px] font-medium text-white hover:text-[#D4B879] transition-colors relative group py-1"
          >
            Visit
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4B879] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Button matching Figma #6829:1463: padding: 14px 20px, fill: #FFFFFF, text: #010D23, 17px Medium */}
          <button
            onClick={onOpenDirections}
            className="px-[20px] py-[14px] bg-white text-[#010D23] text-[17px] font-medium rounded-none hover:bg-[#F1EAD9] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/10 active:scale-[0.98]"
          >
            Find us ↗
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-white focus:outline-none"
          aria-label="Toggle navigation"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-opacity ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[88px] bg-[#191E1B] border-b border-[#D4B879]/20 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-editorial text-white hover:text-[#D4B879]"
          >
            Menu
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-editorial text-white hover:text-[#D4B879]"
          >
            About
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-editorial text-white hover:text-[#D4B879]"
          >
            Visit
          </a>

          <div className="pt-4 border-t border-[#D4B879]/20 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-[#F1EAD9]/80">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpenNow ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span>{isOpenNow ? "Open daily 7:00 – 17:00" : "Opens at 7:00"}</span>
              <span className="text-[#F1EAD9]/50">({baliTimeStr})</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDirections();
              }}
              className="w-full py-3.5 bg-white text-[#010D23] text-center font-medium text-base hover:bg-[#F1EAD9] transition-colors"
            >
              Find us ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

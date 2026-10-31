"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface AboutProps {
  onImageClick?: (imageSrc: string, caption: string) => void;
}

export default function About({ onImageClick }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const roomWrapperRef = useRef<HTMLDivElement>(null);
  const roomImageRef = useRef<HTMLDivElement>(null);
  const tableImageRef = useRef<HTMLDivElement>(null);
  const guestImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Editorial Headline Mask Reveal on Scroll
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleLine1Ref.current,
          start: "top 88%",
          once: true,
        },
      });

      titleTl.fromTo(
        tagRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      titleTl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power4.out" },
        "-=0.5"
      );

      // 2. Room Portrait smooth reveal and subtle parallax
      const roomTl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 85%",
          once: true,
        },
      });

      roomTl.fromTo(
        roomWrapperRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
      );

      roomTl.fromTo(
        roomImageRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.4, ease: "power2.out" },
        "-=1.0"
      );

      roomTl.fromTo(
        leftColRef.current?.querySelector(".room-text-block") || [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      );

      // Subtle parallax on room image
      gsap.to(roomImageRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // 3. Staggered reveal for Life at MORNI photos
      const photosTl = gsap.timeline({
        scrollTrigger: {
          trigger: tableImageRef.current,
          start: "top 85%",
          once: true,
        },
      });

      photosTl.fromTo(
        tableImageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
      );

      photosTl.fromTo(
        guestImageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.7"
      );

      // Parallax on the taller guest photo
      gsap.to(guestImageRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: guestImageRef.current,
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
      id="about"
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[80px] py-16 sm:py-20 lg:py-[100px]"
    >
      {/* Row layout matching Figma #6703:21834: padding 100px 80px, gap 80px */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[80px] items-start">
        {/* Left Column: Room Portrait (Width 450px, gap 28px) */}
        <div
          ref={leftColRef}
          className="w-full lg:w-[450px] shrink-0 flex flex-col gap-[28px]"
        >
          {/* Sunlit MORNI room image: height 590px */}
          <div
            ref={roomWrapperRef}
            className="relative w-full h-[440px] sm:h-[520px] lg:h-[590px] overflow-hidden bg-[#232B25] group cursor-pointer"
            onClick={() =>
              onImageClick?.(
                "/images/about-room.png",
                "Sunlit MORNI Room on Jl. Batu Bolong"
              )
            }
          >
            <div ref={roomImageRef} className="relative w-full h-[115%] -top-[7%] will-animate">
              <Image
                src="/images/about-room.png"
                alt="Sunlit MORNI breakfast room on the road to Batu Bolong, Canggu"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Subtext and description */}
          <div className="room-text-block flex flex-col gap-[12px]">
            <h3 className="font-editorial text-[28px] sm:text-[32px] font-medium leading-[1.05em] text-[#F1EAD9]">
              Serious coffee, unserious hours.
            </h3>
            <p className="text-[15px] sm:text-[17px] font-normal leading-[1.5em] text-[#F1EAD9]/90">
              A breakfast room in a former surf-repair shop on the road to Batu Bolong. Big windows, one long table, and pancakes until close.
            </p>
          </div>
        </div>

        {/* Right Column: About Editorial matching Figma #6703:21839: gap 40px */}
        <div className="w-full flex-1 flex flex-col gap-[40px]">
          {/* Label & Headline */}
          <div className="flex flex-col gap-3">
            <span
              ref={tagRef}
              className="text-[12px] font-normal leading-[1.5em] text-[#F1EAD9]/80 uppercase tracking-[0.14em]"
            >
              About MORNI
            </span>

            {/* Mask container with generous clearance so text is NEVER cut off */}
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine1Ref}
                className="font-editorial text-[56px] sm:text-[76px] lg:text-[94px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                We don’t do
              </div>
            </div>
            <div className="overflow-hidden pb-4 sm:pb-6 -mb-4 sm:-mb-6 pt-1 -mt-1 px-2 -mx-2">
              <div
                ref={titleLine2Ref}
                className="font-editorial text-[56px] sm:text-[76px] lg:text-[94px] font-medium leading-[0.98em] tracking-[-0.02em] text-[#F1EAD9] will-animate"
              >
                breakfast hours.
              </div>
            </div>
          </div>

          {/* Life at MORNI: Staggered Stills (align-items: flex-end, gap: 24px) */}
          <div className="w-full flex flex-col sm:flex-row items-end gap-[24px] pt-4">
            {/* Breakfast table scene (height 401px) */}
            <div
              ref={tableImageRef}
              className="relative w-full sm:flex-1 h-[280px] sm:h-[350px] lg:h-[401px] overflow-hidden bg-[#232B25] group cursor-pointer will-animate"
              onClick={() =>
                onImageClick?.(
                  "/images/about-table.png",
                  "Breakfast table gatherings at MORNI"
                )
              }
            >
              <Image
                src="/images/about-table.png"
                alt="Breakfast table at MORNI Canggu"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Guests at MORNI (width 250px, height 440px) */}
            <div
              ref={guestImageRef}
              className="relative w-full sm:w-[220px] lg:w-[250px] h-[340px] sm:h-[400px] lg:h-[440px] shrink-0 overflow-hidden bg-[#232B25] group cursor-pointer will-animate"
              onClick={() =>
                onImageClick?.(
                  "/images/about-guests.png",
                  "Guests and friends enjoying MORNI"
                )
              }
            >
              <Image
                src="/images/about-guests.png"
                alt="Guests enjoying breakfast at MORNI"
                fill
                sizes="250px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

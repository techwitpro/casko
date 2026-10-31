"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Coffee from "@/components/Coffee";
import PhotoJournal from "@/components/PhotoJournal";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import DirectionsModal from "@/components/DirectionsModal";
import FullMenuModal from "@/components/FullMenuModal";
import LightboxModal from "@/components/LightboxModal";
import { JOURNAL_MOMENTS } from "@/data/journal";

export default function Home() {
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenDirections = () => {
    setIsDirectionsOpen(true);
  };

  const handleCloseDirections = () => {
    setIsDirectionsOpen(false);
  };

  const handleOpenFullMenu = () => {
    setIsFullMenuOpen(true);
  };

  const handleCloseFullMenu = () => {
    setIsFullMenuOpen(false);
  };

  const handleSelectMoment = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#191E1B] text-[#F1EAD9] flex flex-col relative selection:bg-[#D4B879] selection:text-[#191E1B]">
        {/* Editorial Navigation */}
        <Navbar onOpenDirections={handleOpenDirections} />

        {/* Hero Section: Good morning, All day */}
        <Hero />

        {/* About Section: Serious coffee, unserious hours */}
        <About
          onImageClick={() => {
            setLightboxIndex(0);
          }}
        />

        {/* Menu Section: Same at menu 7 am and 4 pm */}
        <Menu onOpenFullMenu={handleOpenFullMenu} />

        {/* Coffee Section: Slow pour. Loud plates */}
        <Coffee />

        {/* Photo Journal Section: One day at MORNI */}
        <PhotoJournal onSelectMoment={handleSelectMoment} />

        {/* Visit Section: Come hungry. Come whenever */}
        <Visit onOpenDirections={handleOpenDirections} />

        {/* Editorial Footer */}
        <Footer />

        {/* Interactive Modals */}
        <DirectionsModal
          isOpen={isDirectionsOpen}
          onClose={handleCloseDirections}
        />

        <FullMenuModal
          isOpen={isFullMenuOpen}
          onClose={handleCloseFullMenu}
        />

        <LightboxModal
          moments={JOURNAL_MOMENTS}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onSelectIndex={setLightboxIndex}
        />
      </main>
    </SmoothScroll>
  );
}

"use client";

import React, { useState } from "react";

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectionsModal({ isOpen, onClose }: DirectionsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const address = "Jl. Pantai Batu Bolong 56, Canggu, Bali 80361";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Jl.+Pantai+Batu+Bolong+No.56,+Canggu,+Bali";
  const appleMapsUrl = "https://maps.apple.com/?q=Jl.+Pantai+Batu+Bolong+56,+Canggu,+Bali";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#232B25] border border-[#D4B879]/30 text-[#F1EAD9] rounded-sm p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-[#191E1B]/60 text-[#F1EAD9] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[#D4B879] mb-1">Find MORNI</p>
          <h3 className="font-editorial text-3xl sm:text-4xl text-[#F1EAD9]">
            Jl. Pantai Batu Bolong 56
          </h3>
          <p className="text-sm text-[#F1EAD9]/80 mt-1">Canggu, Bali 80361 · Open daily 7:00 – 17:00</p>
        </div>

        {/* Embedded Map */}
        <div className="relative w-full h-56 sm:h-64 rounded-sm overflow-hidden border border-[#D4B879]/20 mb-6 bg-[#191E1B]">
          <iframe
            title="MORNI Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=115.1250%2C-8.6550%2C115.1450%2C-8.6400&amp;layer=mapnik&amp;marker=-8.6480%2C115.1345"
            className="w-full h-full border-0 filter brightness-90 contrast-110"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-[#191E1B]/90 text-[10px] text-[#F1EAD9]/70 px-2 py-0.5 rounded pointer-events-none">
            Canggu, Bali
          </div>
        </div>

        {/* Details and Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#191E1B]/60 rounded-sm border border-[#D4B879]/20">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#D4B879]/90">Street Address</p>
              <p className="text-sm text-[#F1EAD9] font-medium">{address}</p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#D4B879] text-[#191E1B] hover:bg-[#e4cb93] transition-colors self-start sm:self-auto cursor-pointer"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Quick distances */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs py-2 border-y border-[#D4B879]/20">
            <div className="p-2 bg-[#191E1B]/30 rounded">
              <span className="text-[#D4B879] font-medium block">3 min</span>
              <span className="text-[#F1EAD9]/70 text-[11px]">Batu Bolong Beach</span>
            </div>
            <div className="p-2 bg-[#191E1B]/30 rounded">
              <span className="text-[#D4B879] font-medium block">6 min</span>
              <span className="text-[#F1EAD9]/70 text-[11px]">Echo Beach</span>
            </div>
            <div className="p-2 bg-[#191E1B]/30 rounded">
              <span className="text-[#D4B879] font-medium block">25 min</span>
              <span className="text-[#F1EAD9]/70 text-[11px]">Seminyak</span>
            </div>
            <div className="p-2 bg-[#191E1B]/30 rounded">
              <span className="text-[#D4B879] font-medium block">50 min</span>
              <span className="text-[#F1EAD9]/70 text-[11px]">Ngurah Rai Airport</span>
            </div>
          </div>

          {/* External Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#D4B879] text-[#191E1B] font-medium text-sm rounded-sm hover:bg-[#e2ca90] transition-colors"
            >
              <span>Open in Google Maps</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#191E1B] border border-[#D4B879]/40 text-[#F1EAD9] font-medium text-sm rounded-sm hover:border-[#D4B879] transition-colors"
            >
              <span>Open in Apple Maps</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

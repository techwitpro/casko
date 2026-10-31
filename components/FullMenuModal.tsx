"use client";

import React, { useState, useMemo } from "react";
import { EXTENDED_MENU_ITEMS, MenuItem } from "@/data/menu";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullMenuModal({ isOpen, onClose }: FullMenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderItems, setOrderItems] = useState<{ [id: string]: number }>({});
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const categories = ["All", "Sweet", "Savoury", "Bakery", "Coffee"];

  const filteredItems = useMemo(() => {
    return EXTENDED_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.dietary &&
          item.dietary.some((d) =>
            d.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToOrder = (id: string) => {
    setOrderItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromOrder = (id: string) => {
    setOrderItems((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const totalBillK = useMemo(() => {
    return Object.entries(orderItems).reduce((sum, [id, qty]) => {
      const item = EXTENDED_MENU_ITEMS.find((m) => m.id === id);
      return sum + (item ? item.priceNum * qty : 0);
    }, 0);
  }, [orderItems]);

  const totalCount = useMemo(() => {
    return Object.values(orderItems).reduce((sum, q) => sum + q, 0);
  }, [orderItems]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#232B25] border border-[#D4B879]/30 text-[#F1EAD9] rounded-sm p-6 sm:p-10 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#D4B879]/30 shrink-0">
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[#D4B879]">
              MORNI · Complete Editorial Menu
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F1EAD9] mt-1">
              Served Open to Close
            </h2>
            <p className="text-sm text-[#F1EAD9]/80 mt-1">
              No brunch cut-off. No surcharges. Specialty roasted coffee and house-made breakfast.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#191E1B]/80 text-[#F1EAD9] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors shrink-0 ml-4 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#D4B879]/20 shrink-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#D4B879] text-[#191E1B] font-semibold"
                    : "bg-[#191E1B]/60 text-[#F1EAD9]/80 hover:bg-[#191E1B] hover:text-[#F1EAD9]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full sm:w-60 bg-[#191E1B]/80 border border-[#D4B879]/30 rounded-sm px-3 py-1.5 text-xs text-[#F1EAD9] placeholder-[#F1EAD9]/40 focus:outline-none focus:border-[#D4B879]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#F1EAD9]/60 hover:text-[#F1EAD9]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 divide-y divide-[#D4B879]/20 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#F1EAD9]/60 text-sm">
              No items match &quot;{searchQuery}&quot;. Try clearing filters.
            </div>
          ) : (
            filteredItems.map((item) => {
              const qty = orderItems[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="pt-4 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:bg-[#191E1B]/20 px-2 rounded transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-editorial text-2xl text-[#F1EAD9]">
                        {item.name}
                      </h4>
                      <span className="text-sm font-semibold text-[#D4B879]">
                        {item.price}
                      </span>
                      {item.isPopular && (
                        <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#D4B879]/20 text-[#D4B879]">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#F1EAD9]/80 mt-1 max-w-xl">
                      {item.description}
                    </p>
                    {item.dietary && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.dietary.map((d, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase tracking-wider text-[#F1EAD9]/60 bg-[#191E1B]/50 px-2 py-0.5 rounded"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-[11px] text-[#F1EAD9]/60 uppercase tracking-wider hidden sm:inline mr-2">
                      {item.category}
                    </span>
                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-[#191E1B] border border-[#D4B879]/40 rounded px-2 py-1">
                        <button
                          onClick={() => removeFromOrder(item.id)}
                          className="w-5 h-5 flex items-center justify-center text-sm font-bold text-[#D4B879] hover:text-white"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold px-1">{qty}</span>
                        <button
                          onClick={() => addToOrder(item.id)}
                          className="w-5 h-5 flex items-center justify-center text-sm font-bold text-[#D4B879] hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToOrder(item.id)}
                        className="px-2.5 py-1 text-xs border border-[#D4B879]/40 rounded text-[#D4B879] hover:bg-[#D4B879] hover:text-[#191E1B] transition-colors cursor-pointer"
                      >
                        + Add to Table Note
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Order Note Summary */}
        {totalCount > 0 && (
          <div className="pt-4 border-t border-[#D4B879]/30 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#191E1B]/70 p-4 rounded-sm">
            <div>
              <p className="text-xs text-[#F1EAD9]/70">
                Your Table Note: <span className="text-[#F1EAD9] font-medium">{totalCount} items</span>
              </p>
              <p className="font-editorial text-2xl text-[#D4B879]">
                Estimated Total: {totalBillK}k IDR{" "}
                <span className="text-xs text-[#F1EAD9]/60 font-sans font-normal">(approx. ${(totalBillK / 15.5).toFixed(1)} USD)</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setOrderItems({})}
                className="px-3 py-2 text-xs text-[#F1EAD9]/60 hover:text-[#F1EAD9] transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  alert(`Table note created! ${totalCount} items saved. Show this to your server when you sit down at Jl. Batu Bolong 56.`);
                }}
                className="px-5 py-2 bg-[#D4B879] text-[#191E1B] font-semibold text-xs rounded-sm hover:bg-[#e0c78e] transition-colors cursor-pointer"
              >
                Save for My Visit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

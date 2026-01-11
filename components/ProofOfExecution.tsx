"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getTranslations, type Locale } from "@/lib/i18n";

interface ProofOfExecutionProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function ProofOfExecution({ locale, projectType }: ProofOfExecutionProps) {
  const t = getTranslations(locale);
  const allCards = t.sections.proofOfExecution.cards;
  
  // Filter cards by projectType
  const filteredCards = allCards.filter((card, index) => {
    if (projectType === "b2c") {
      // B2C: Residential first, optionally 1-2 more relevant
      const titleLower = card.title.toLowerCase();
      return titleLower.includes("stambeni") || 
             titleLower.includes("residential") ||
             (index === 0 && titleLower.includes("hotel"));
    } else {
      // B2B: Retail, Office, Hotel, Exterior (not Residential)
      const titleLower = card.title.toLowerCase();
      return !titleLower.includes("stambeni") && 
             !titleLower.includes("residential");
    }
  });

  // Sort: B2C should have Residential first
  const sortedCards = projectType === "b2c"
    ? [...filteredCards].sort((a, b) => {
        const aIsResidential = a.title.toLowerCase().includes("stambeni") || a.title.toLowerCase().includes("residential");
        const bIsResidential = b.title.toLowerCase().includes("stambeni") || b.title.toLowerCase().includes("residential");
        if (aIsResidential && !bIsResidential) return -1;
        if (!aIsResidential && bIsResidential) return 1;
        return 0;
      })
    : filteredCards;

  // Find default card index based on projectType
  const getDefaultIndex = () => {
    if (projectType === "b2c") {
      // Find "Stambeni prostor" (Residential) index
      const residentialIndex = sortedCards.findIndex(card => 
        card.title.toLowerCase().includes("stambeni") || 
        card.title.toLowerCase().includes("residential")
      );
      return residentialIndex >= 0 ? residentialIndex : 0;
    } else {
      // Find "Kancelarijski prostor" (Office) or "Prodajni prostor" (Retail) index
      const officeIndex = sortedCards.findIndex(card => 
        card.title.toLowerCase().includes("kancelarijski") ||
        card.title.toLowerCase().includes("office")
      );
      if (officeIndex >= 0) return officeIndex;
      const retailIndex = sortedCards.findIndex(card => 
        card.title.toLowerCase().includes("prodajni") ||
        card.title.toLowerCase().includes("retail")
      );
      return retailIndex >= 0 ? retailIndex : 0;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(getDefaultIndex());

  // Update selected index when projectType changes
  useEffect(() => {
    const newIndex = getDefaultIndex();
    if (newIndex >= 0 && newIndex < sortedCards.length) {
      setSelectedIndex(newIndex);
    } else if (sortedCards.length > 0) {
      setSelectedIndex(0);
    }
  }, [projectType]);

  // Ensure selectedIndex is always valid
  const safeSelectedIndex = selectedIndex >= 0 && selectedIndex < sortedCards.length ? selectedIndex : 0;
  const selectedCard = sortedCards[safeSelectedIndex];

  // Get image for card (use first image from images array if available, or single image)
  const getCardImage = (card: (typeof allCards)[number]) => {
    if ((card as any).images && Array.isArray((card as any).images) && (card as any).images.length > 0) {
      return (card as any).images[0];
    }
    return (card as any).image || null;
  };

  return (
    <section id="proof" className="bg-[#0a0c0a] py-16 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
            {t.sections.proofOfExecution.title}
          </h2>
          {t.sections.proofOfExecution.subtitle && (
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.sections.proofOfExecution.subtitle}
            </p>
          )}
        </motion.div>

        {/* Selector Cards Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sortedCards.map((card, index) => {
            const isSelected = selectedIndex === index;
            const cardImage = getCardImage(card);

            return (
              <motion.button
                key={index}
                onClick={() => setSelectedIndex(index)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-sm border bg-[#0a0c0a] p-3 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-[#ededed]/30 shadow-[0_0_30px_rgba(57,255,20,0.15)]"
                    : "border-[#ededed]/10 hover:border-[#ededed]/20 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
                }`}
              >
                {/* Gradient Background on Hover/Active */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-[#39FF14]/0 transition-opacity duration-300 ${
                    isSelected ? "opacity-[0.06]" : "opacity-0 group-hover:opacity-5"
                  }`}
                />

                {/* Thumbnail Image (optional) */}
                {cardImage && (
                  <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900">
                    <Image
                      src={cardImage}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                )}

                {/* Content */}
                <h3 className={`mb-1 text-xs font-bold uppercase tracking-tight transition-colors duration-300 line-clamp-1 ${
                  isSelected ? "text-[#39FF14]" : "text-[#ededed] group-hover:text-[#39FF14]"
                }`}>
                  {card.title}
                </h3>
                <p className="text-[10px] leading-tight text-[#ededed]/70 line-clamp-1">
                  {card.goal}
                </p>

                {/* Accent Line */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#39FF14] to-[#8A2BE2] transition-all duration-300 ${
                  isSelected ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </motion.button>
            );
          })}
        </div>

        {/* Selected Card Content */}
        {selectedCard && (
          <motion.div
            key={safeSelectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-zinc-800 bg-zinc-950/40"
          >
            {/* Image */}
            <div className="relative aspect-[21/9] bg-zinc-900 border-b border-zinc-800 overflow-hidden">
              {(() => {
                const images = (selectedCard as any).images || ((selectedCard as any).image ? [(selectedCard as any).image] : []);
                if (images.length > 0) {
                  return (
                    <Image
                      src={images[0]}
                      alt={selectedCard.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  );
                }
                return (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-xs font-mono text-zinc-700 uppercase tracking-wider">
                      {selectedCard.title}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Content */}
            <div className="p-4 md:p-5 space-y-3">
              {/* Title */}
              <h3 className="text-base font-bold text-white md:text-lg">
                {selectedCard.title}
              </h3>

              {/* Goal */}
              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {t.sections.proofOfExecution.goal}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedCard.goal}
                </p>
              </div>

              {/* Execution */}
              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {t.sections.proofOfExecution.execution}
                </p>
                <ul className="space-y-0.5 text-xs text-zinc-400 leading-relaxed">
                  {selectedCard.execution.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1.5 text-zinc-600 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational proof */}
              <div>
                <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {t.sections.proofOfExecution.operationalProof}
                </p>
                <ul className="space-y-0.5 text-xs text-zinc-400 leading-relaxed">
                  {selectedCard.operationalProof.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-1.5 text-zinc-600 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="pt-2 border-t border-zinc-800">
                <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                  {t.sections.proofOfExecution.result}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {selectedCard.result}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

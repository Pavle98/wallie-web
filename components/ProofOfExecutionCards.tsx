"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface ProofOfExecutionCardsProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function ProofOfExecutionCards({ locale, projectType }: ProofOfExecutionCardsProps) {
  const t = getTranslations(locale);
  const allCards = t.sections.proofOfExecution.cards;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalCard, setModalCard] = useState<(typeof allCards)[number] | null>(null);

  // Filter cards by projectType
  const filteredCards = allCards.filter((card, index) => {
    if (projectType === "b2c") {
      // B2C: Residential first, optionally 1-2 more relevant
      const titleLower = card.title.toLowerCase();
      return titleLower.includes("stambeni") || 
             titleLower.includes("residential") ||
             (index === 0 && titleLower.includes("hotel")); // Optional: hotel can be relevant for B2C
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

  // Get image for card (use first image from images array if available, or single image)
  const getCardImage = (card: (typeof allCards)[number]) => {
    if ((card as any).images && Array.isArray((card as any).images) && (card as any).images.length > 0) {
      return (card as any).images[0];
    }
    return (card as any).image || null;
  };

  const handleCardClick = (card: (typeof allCards)[number]) => {
    setModalCard(card);
  };

  const closeModal = () => {
    setModalCard(null);
  };

  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalCard) {
        closeModal();
      }
    };
    if (modalCard) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [modalCard]);

  return (
    <>
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

          {/* Card Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {sortedCards.map((card, index) => {
              const cardImage = getCardImage(card);
              const combinedBullets = [...card.execution.slice(0, 1), ...card.operationalProof.slice(0, 1)].slice(0, 2);

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleCardClick(card)}
                  className="group relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/40 p-4 text-left transition-all duration-300 hover:border-[#39FF14]/30 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)]"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 to-[#39FF14]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Accent Line on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative flex gap-3">
                    {/* Thumbnail Image */}
                    {cardImage && (
                      <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative border border-zinc-800 bg-zinc-900 overflow-hidden rounded-sm">
                        <Image
                          src={cardImage}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      </div>
                    )}

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1.5 text-sm font-bold text-white md:text-base line-clamp-2">
                        {card.title}
                      </h3>
                      
                      <p className="mb-2 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                        {card.goal}
                      </p>

                      {/* Bullets */}
                      <ul className="space-y-0.5">
                        {combinedBullets.map((bullet, i) => (
                          <li key={i} className="flex items-start text-xs text-zinc-500 line-clamp-1">
                            <span className="mr-1.5 text-[#39FF14]/50 flex-shrink-0">•</span>
                            <span className="truncate">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 z-[61] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-3xl md:w-full md:max-h-[90vh] bg-[#0a0c0a] border border-zinc-800 rounded-sm overflow-hidden flex flex-col focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    closeModal();
                  }
                }}
                className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/80 rounded-sm border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50"
                aria-label={locale === "sr" ? "Zatvori" : locale === "en" ? "Close" : "Закрыть"}
              >
                <X className="h-4 w-4" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Images */}
                {(() => {
                  const images = (modalCard as any).images || ((modalCard as any).image ? [(modalCard as any).image] : []);
                  if (images.length > 0) {
                    return (
                      <div className="relative aspect-[4/3] bg-zinc-900 border-b border-zinc-800">
                        <Image
                          src={images[0]}
                          alt={modalCard.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                        />
                        {images.length > 1 && (
                          <div className="absolute bottom-4 right-4 text-xs font-mono text-zinc-400 bg-zinc-900/80 px-2 py-1 rounded-sm border border-zinc-800">
                            {images.length} {locale === "sr" ? "slika" : locale === "en" ? "images" : "изображения"}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 id="modal-title" className="text-xl font-bold text-white md:text-2xl">
                    {modalCard.title}
                  </h3>

                  {/* Goal */}
                  <div>
                    <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                      {t.sections.proofOfExecution.goal}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {modalCard.goal}
                    </p>
                  </div>

                  {/* Execution */}
                  <div>
                    <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                      {t.sections.proofOfExecution.execution}
                    </p>
                    <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                      {modalCard.execution.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-zinc-600">•</span>
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
                    <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                      {modalCard.operationalProof.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-zinc-600">•</span>
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
                      {modalCard.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

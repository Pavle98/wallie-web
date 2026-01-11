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
  const cards = t.sections.proofOfExecution.cards;
  
  // Find default card index based on projectType
  const getDefaultIndex = () => {
    if (projectType === "b2c") {
      // Find "Stambeni prostor" (Residential) index
      const residentialIndex = cards.findIndex(card => 
        card.title.toLowerCase().includes("stambeni") || 
        card.title.toLowerCase().includes("residential")
      );
      return residentialIndex >= 0 ? residentialIndex : 0;
    } else {
      // Find "Kancelarijski prostor" (Office) or "Prodajni prostor" (Retail) index
      const officeIndex = cards.findIndex(card => 
        card.title.toLowerCase().includes("kancelarijski") ||
        card.title.toLowerCase().includes("office")
      );
      if (officeIndex >= 0) return officeIndex;
      const retailIndex = cards.findIndex(card => 
        card.title.toLowerCase().includes("prodajni") ||
        card.title.toLowerCase().includes("retail")
      );
      return retailIndex >= 0 ? retailIndex : 0;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(getDefaultIndex());

  // Update selected index when projectType changes
  useEffect(() => {
    setSelectedIndex(getDefaultIndex());
  }, [projectType]);

  const selectedCard = cards[selectedIndex];

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

        {/* Tab Selector */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                selectedIndex === index
                  ? "bg-white text-black border border-white"
                  : "bg-transparent text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>

        {/* Selected Card Content */}
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-zinc-800 bg-zinc-950/40"
        >
          {/* Image placeholder */}
          <div className="relative aspect-[4/3] bg-zinc-900 border-b border-zinc-800 overflow-hidden">
            {selectedCard.image ? (
              <Image
                src={selectedCard.image}
                alt={selectedCard.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-xs font-mono text-zinc-700 uppercase tracking-wider">
                  {selectedCard.title}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
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
              <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                {selectedCard.execution.map((item, i) => (
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
                {selectedCard.operationalProof.map((item, i) => (
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
                {selectedCard.result}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import CTAModal from "@/components/CTAModal";

interface StickyCTAProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function StickyCTA({ locale, projectType }: StickyCTAProps) {
  const t = getTranslations(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0c0a]/95 backdrop-blur-sm border-t border-white/10 md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full group inline-flex items-center justify-center gap-3 rounded-sm bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200"
          >
            <span>{projectType === "b2b" ? ((t.hero as any).ctaB2B ?? t.hero.cta) : ((t.hero as any).ctaB2C ?? t.hero.cta)}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      <CTAModal locale={locale} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} projectType={projectType} />
    </>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import CTAModal from "@/components/CTAModal";

interface CTAResetProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function CTAReset({ locale, projectType }: CTAResetProps) {
  const t = getTranslations(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const ctaReset = (t.sections as any)?.ctaReset || {};
  const headline = projectType === "b2b" 
    ? (ctaReset.headlineB2B || ctaReset.headline || "Zatražite procenu projekta")
    : (ctaReset.headlineB2C || ctaReset.headline || "Zatražite procenu projekta");
  const helperText = projectType === "b2b"
    ? (ctaReset.helperB2B || ctaReset.helper)
    : (ctaReset.helperB2C || ctaReset.helper);

  return (
    <>
      <section className="bg-[#0a0c0a] py-12 px-4">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <h2 className="mb-4 text-lg md:text-xl font-bold text-white">
            {headline}
          </h2>
          {helperText && (
            <p className="mb-6 text-sm text-zinc-400">
              {helperText}
            </p>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200"
          >
            <span>{projectType === "b2b" ? ((t.hero as any).ctaB2B ?? t.hero.cta) : ((t.hero as any).ctaB2C ?? t.hero.cta)}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
      <CTAModal locale={locale} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} projectType={projectType} />
    </>
  );
}

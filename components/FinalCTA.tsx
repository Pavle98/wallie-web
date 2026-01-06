"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";
import CTAModal from "@/components/CTAModal";

export default function FinalCTA({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-[#0a0c0a] py-24 px-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200"
            >
              <span>{t.sections.finalCta.title}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="mailto:contact@wallie.com"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t.sections.finalCta.emailUs}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href="https://wa.me/381605030043"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t.sections.finalCta.whatsapp}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <p className="text-xs text-white/50">
                {t.sections.finalCta.replyTime}
              </p>
            </div>
            <p className="text-xs text-white/50">
              {t.sections.finalCta.phone}
            </p>
            <p className="text-sm text-white/60">
              {t.sections.finalCta.microcopy}
            </p>
          </div>
        </div>
      </section>
      <CTAModal locale={locale} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

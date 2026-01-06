"use client";

import { motion } from "framer-motion";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function TechnicalTrust({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  return (
    <section className="bg-[#0a0c0a] py-12 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {t.sections.technicalTrust.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3 text-sm text-zinc-400 leading-relaxed"
        >
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.suitableSurfaces.label}:</span>{" "}
            {t.sections.technicalTrust.suitableSurfaces.value}
          </div>
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.notSuitable.label}:</span>{" "}
            {t.sections.technicalTrust.notSuitable.value}
          </div>
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.surfacePrep.label}:</span>{" "}
            {t.sections.technicalTrust.surfacePrep.value}
          </div>
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.maintenance.label}:</span>{" "}
            {t.sections.technicalTrust.maintenance.value}
          </div>
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.durability.label}:</span>{" "}
            {t.sections.technicalTrust.durability.value}
          </div>
          <div>
            <span className="font-mono text-zinc-300">{t.sections.technicalTrust.executionConstraints.label}:</span>{" "}
            {t.sections.technicalTrust.executionConstraints.value}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function ExecutionPartner({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  return (
    <section className="bg-[#0a0c0a] py-8 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono text-zinc-400 leading-relaxed max-w-3xl"
        >
          {t.sections.executionPartner}
        </motion.p>
      </div>
    </section>
  );
}

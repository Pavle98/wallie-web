"use client";

import { motion } from "framer-motion";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function CollaborationProcess({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const steps = t.sections.collaborationProcess.steps.map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: step.title,
    description: step.description,
  }));

  return (
    <section id="how-it-works" className="bg-[#0a0c0a] py-16 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {t.sections.collaborationProcess.title}
        </motion.h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex gap-4 border-b border-zinc-800 pb-6 last:border-0"
            >
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-zinc-600 md:text-3xl">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold text-white md:text-lg">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

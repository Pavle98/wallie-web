"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function FAQ({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const faqs = t.faq.questions.map((question, index) => ({
    question,
    answer: t.faq.answers[index],
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0a0c0a] py-16 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {t.sections.faq}
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-zinc-800 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between gap-4 py-2 text-left transition-colors hover:text-white/90"
              >
                <h3 className="text-sm font-medium uppercase tracking-wide text-white">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-zinc-500 text-lg">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 px-0 text-sm leading-relaxed text-zinc-400 sm:px-0">
                  {faq.answer}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

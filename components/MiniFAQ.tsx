"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function MiniFAQ({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Select 3 key questions: durability, wall surface requirements, pricing
  const keyQuestionIndexes = [0, 6, 5]; // durability, wall surface requirements, pricing
  const keyQuestions = keyQuestionIndexes.map((i) => ({
    question: t.faq.questions[i],
    answer: t.faq.answers[i],
  }));

  const labels = {
    sr: {
      title: "Najčešća pitanja",
      viewAll: "Pogledaj sva pitanja →",
    },
    en: {
      title: "Common questions",
      viewAll: "View all questions →",
    },
    ru: {
      title: "Частые вопросы",
      viewAll: "Все вопросы →",
    },
  };

  const label = labels[locale];

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
          {label.title}
        </motion.h2>

        <div className="space-y-2">
          {keyQuestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-zinc-800 last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm text-white/90 pr-4">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-xs leading-relaxed text-zinc-400">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <Link
            href={`/${locale}/faq`}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {label.viewAll}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

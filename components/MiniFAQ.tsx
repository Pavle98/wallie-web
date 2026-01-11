"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function MiniFAQ({ locale, projectType }: { locale: Locale; projectType: "b2b" | "b2c" }) {
  const t = getTranslations(locale);

  // Get B2B or B2C specific FAQ teaser
  const teaserData = projectType === "b2c" 
    ? (t.faq.teaser as any)?.b2c 
    : (t.faq.teaser as any)?.b2b;

  interface FAQItem {
    question: string;
    answer: string;
  }

  const keyQuestions: FAQItem[] = teaserData 
    ? teaserData.questions.map((q: string, i: number) => ({
        question: q,
        answer: teaserData.answers[i] || "",
      }))
    : [];

  const title = projectType === "b2c" 
    ? (t.faq.teaser as any)?.titleB2C || "Česta pitanja za stan i kuću"
    : (t.faq.teaser as any)?.titleB2B || "Česta pitanja za poslovne prostore";

  const viewAllText = (t.faq.teaser as any)?.viewAll || (locale === "sr" ? "Vidi sva pitanja →" : locale === "en" ? "View all questions →" : "Все вопросы →");

  return (
    <section id="faq" className="bg-[#0a0c0a] py-12 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {title}
        </motion.h2>

        <div className="space-y-4">
          {keyQuestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
            >
              <h3 className="mb-2 text-sm font-medium text-white/90">
                {item.question}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                {item.answer}
              </p>
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
            {viewAllText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function ProofOfExecution({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const cards = t.sections.proofOfExecution.cards;

  return (
    <section className="bg-[#0a0c0a] py-16 px-4">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-zinc-800 bg-zinc-950/40"
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] bg-zinc-900 border-b border-zinc-800 overflow-hidden">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-xs font-mono text-zinc-700 uppercase tracking-wider">
                      {card.title}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-base font-bold text-white md:text-lg">
                  {card.title}
                </h3>

                {/* Goal */}
                <div>
                  <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                    {t.sections.proofOfExecution.goal}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {card.goal}
                  </p>
                </div>

                {/* Execution */}
                <div>
                  <p className="mb-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                    {t.sections.proofOfExecution.execution}
                  </p>
                  <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                    {card.execution.map((item, i) => (
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
                    {card.operationalProof.map((item, i) => (
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
                    {card.result}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function TrustStack({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const metrics = [
    { label: t.trust.completedProjects, value: "47+" },
    { label: t.trust.printedArea, value: "1,240 m²" },
    { label: t.trust.operationalSince, value: "2022" },
    { label: t.trust.responseTime, value: "< 8h" },
  ];
  return (
    <section className="bg-[#0a0c0a] py-16 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {t.sections.trust}
        </motion.h2>

        {/* Metrics Grid */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="text-3xl font-bold text-white md:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2">
          {t.trust.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="border-l border-zinc-800 pl-4"
            >
              <p className="mb-3 text-sm leading-relaxed text-zinc-300">
                "{testimonial.quote}"
              </p>
              <div className="text-xs font-mono text-zinc-500">
                {testimonial.author} · {testimonial.role} · {testimonial.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

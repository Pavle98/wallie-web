"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Will the print fade, peel, or degrade outdoors?",
    answer: "UV-cured ink is permanent and weather-resistant. No fading or peeling under normal conditions. Outdoor applications require stable, non-porous surfaces. We assess surface suitability during site visit.",
  },
  {
    question: "How long will the print last, and can it be damaged by cleaning or wear?",
    answer: "Prints are permanent and withstand standard commercial cleaning. Expected lifespan: 10+ years indoors, 5–7 years outdoors (depending on exposure). Use mild detergents; avoid abrasive cleaners on matte finishes.",
  },
  {
    question: "Who handles wall repairs or preparation work before printing?",
    answer: "We assess surface condition during site visit. Wallie handles minor surface preparation. Major repairs (cracks, moisture, structural issues) are client responsibility or coordinated with your contractor. We provide clear scope before starting.",
  },
  {
    question: "Is there a minimum project size, or will small jobs be too expensive?",
    answer: "No strict minimum. Projects range from 5–200 m². Smaller areas (under 10 m²) use adjusted pricing due to setup costs. Typical range: €80–150 per m². Final quote provided after site assessment.",
  },
  {
    question: "What file format and resolution do I need to provide?",
    answer: "Vector files (AI, PDF) preferred. High-resolution raster (300+ DPI, minimum 2000px width) acceptable. We provide template guidance and can optimize files if needed. Low-resolution files may result in visible pixelation.",
  },
  {
    question: "How much will this cost, and what factors affect pricing?",
    answer: "Pricing depends on area, design complexity, surface type, and location. Typical range: €80–150 per m². Complex designs, difficult access, or special surface prep may increase cost. Final quote provided after site assessment—no hidden fees.",
  },
  {
    question: "What wall conditions or situations make this unsuitable?",
    answer: "Not suitable for powdery, flaking, or extremely uneven surfaces. Moisture issues must be resolved before printing. We cannot print on surfaces with active water damage or structural instability. We evaluate all conditions during consultation and will decline if unsuitable.",
  },
  {
    question: "How long from approval to completion, and can it be rushed?",
    answer: "Standard timeline: 2–4 weeks from approved design (depends on project size and scheduling). Rush orders possible with 30–50% surcharge and subject to availability. We provide timeline estimate during consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0a0a0a] py-16 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          FAQ
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
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <h3 className="text-sm font-medium uppercase tracking-wide text-white">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-zinc-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
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

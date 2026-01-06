"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function VisualImpact({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  return (
    <section className="bg-[#0a0c0a] py-12 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          {t.sections.applicationExamples || "Primeri primene i vizuelnog efekta"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="relative aspect-[4/3] border border-white/10 bg-zinc-950">
            <Image
              src="/examples/wall-printer-robot-in-action.jpg"
              alt="Robotic UV printing system in operation"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] border border-white/10 bg-zinc-950">
            <Image
              src="/examples/wall-printing-3d-effect.jpg"
              alt="3D visual depth effect in architectural wall printing"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="relative aspect-[4/3] border border-white/10 bg-zinc-950">
            <Image
              src="/examples/wall-printing-brick-facade-outdoor.jpg"
              alt="Brick facade with architectural wall printing"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
          >
            {t.sections.viewPortfolio || "View Portfolio"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

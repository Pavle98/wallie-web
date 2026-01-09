"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import CTAModal from "@/components/CTAModal";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative flex min-h-[100svh] items-end justify-center overflow-hidden pb-24 pt-24 md:items-center md:justify-start md:pb-0 md:pt-20">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/wallpenhehe.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl ml-0 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-3xl font-bold uppercase tracking-tighter text-white text-left leading-tight sm:text-3xl md:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t.hero.headline}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base text-white/90 sm:text-lg leading-tight"
          >
            {t.hero.subheadline.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < t.hero.subheadline.split("\n").length - 1 && <br />}
              </span>
            ))}
          </motion.p>

          {/* Audience Line (B2B + B2C) */}
          {t.hero.audienceLine && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="text-sm text-white/80 sm:text-base leading-relaxed"
            >
              {t.hero.audienceLine}
            </motion.p>
          )}

          {/* Outcome Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-sm text-white/75 sm:text-base leading-relaxed"
          >
            {t.hero.outcome}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <CTAModal locale={locale} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <p className="text-xs text-white/50">
              {t.hero.phone} · {t.hero.replyTime}
            </p>
            <p className="text-xs text-white/60">
              {t.hero.microcopy}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

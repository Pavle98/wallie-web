"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import Image from "next/image";

export default function Hero({ 
  locale, 
  projectType, 
  setProjectType 
}: { 
  locale: Locale;
  projectType: "b2b" | "b2c" | null;
  setProjectType: (type: "b2b" | "b2c") => void;
}) {
  const t = getTranslations(locale);
  const helperText = (t.hero as any)?.pathSelectionHelper || (locale === "sr" 
    ? "Izaberite tip prostora da bismo prikazali relevantne primere i proces."
    : locale === "en"
    ? "Choose space type to see relevant examples and process."
    : "Выберите тип помещения, чтобы увидеть соответствующие примеры и процесс.");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [posterError, setPosterError] = useState(false);

  // Progressive video loading: optimized for LCP stability
  // Strategy: Wait for first paint + idle, then start video loading
  useEffect(() => {
    if (typeof window === "undefined") return;

    const startVideo = () => {
      if (videoRef.current) {
        videoRef.current.load();
        setShouldLoadVideo(true);
      }
    };

    // Use requestAnimationFrame to wait for first paint
    requestAnimationFrame(() => {
      // Then use requestIdleCallback for optimal timing (doesn't block LCP)
      if ("requestIdleCallback" in window) {
        requestIdleCallback(startVideo, { timeout: 300 });
      } else {
        // Fallback: small delay after paint (allows LCP to complete)
        setTimeout(startVideo, 200);
      }
    });
  }, []);

  const handlePathSelection = (type: "b2b" | "b2c") => {
    setProjectType(type);
    // Scroll to first section (Verifikacija izvršenja) after a brief delay
    setTimeout(() => {
      const firstSection = document.getElementById("verification");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end justify-center overflow-hidden pb-24 pt-24 md:items-center md:justify-start md:pb-0 md:pt-20">
      {/* Video Background with Progressive Loading */}
      <div className="absolute inset-0 h-full w-full bg-[#0a0c0a]">
        {/* Poster Image - Shows immediately, replaced by video when ready */}
        {/* Note: Add /public/hero-poster.jpg (or .webp/.avif) - should be a single frame from the video */}
        {!posterError && (
          <div className="absolute inset-0 h-full w-full">
            <Image
              src="/hero-poster.jpg"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{ opacity: shouldLoadVideo ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
              onError={() => setPosterError(true)}
            />
          </div>
        )}
        
        {/* Video - Loads progressively after first paint (doesn't block LCP) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: shouldLoadVideo ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {
                // Autoplay may fail, that's okay
              });
            }
          }}
        >
          <source
            src="/wallpenhehe.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl ml-0 px-6 md:px-12">
        <div className="flex flex-col gap-6">
          {/* Headline - Immediately visible, never wrapped in opacity animations for stable LCP */}
          <h1
            className="text-3xl font-bold uppercase tracking-tighter text-white text-left leading-tight sm:text-3xl md:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t.hero.headline}
          </h1>

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

          {/* Path Selection Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handlePathSelection("b2b")}
                className="group flex-1 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200 text-center"
              >
                {t.hero.toggleB2B}
              </button>
              <button
                onClick={() => handlePathSelection("b2c")}
                className="group flex-1 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200 text-center"
              >
                {t.hero.toggleB2C}
              </button>
            </div>
            <p className="text-xs text-white/60 text-center">
              {helperText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

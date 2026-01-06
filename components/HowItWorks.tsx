"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function HowItWorks({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const steps = t.howItWorks.steps.map((step, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: step.title,
    description: step.description,
  }));
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 53%", "end 95%"],
  });

  // Direct linear mapping: scroll progress (0-1) → beam height (0%-100%)
  // No easing, 1:1 relationship with scroll speed
  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Constant relative trigger logic - simple fractions based on 3 steps
  // Step 1: Active immediately on start (beamProgress > 0)
  const step1Progress = useTransform(scrollYProgress, [0, 0.2], [0.3, 1], { clamp: true });
  // Step 2: Active after 1/3 down (beamProgress > 0.33)
  const step2Progress = useTransform(scrollYProgress, [0.33, 0.53], [0.3, 1], { clamp: true });
  // Step 3: Active after 2/3 down (beamProgress > 0.66)
  const step3Progress = useTransform(scrollYProgress, [0.66, 0.86], [0.3, 1], { clamp: true });

  // Number color transforms - smooth transition from gray to green
  const step1Color = useTransform(step1Progress, [0.3, 1], ["#6b7280", "#39FF14"]);
  const step2Color = useTransform(step2Progress, [0.3, 1], ["#6b7280", "#39FF14"]);
  const step3Color = useTransform(step3Progress, [0.3, 1], ["#6b7280", "#39FF14"]);

  // Glow opacity transforms
  const step1Glow = useTransform(step1Progress, [0.3, 1], [0, 1]);
  const step2Glow = useTransform(step2Progress, [0.3, 1], [0, 1]);
  const step3Glow = useTransform(step3Progress, [0.3, 1], [0, 1]);

  // Text slide animations - sync with step activation
  const step1Slide = useTransform(scrollYProgress, [0, 0.2], [20, 0], { clamp: true });
  const step2Slide = useTransform(scrollYProgress, [0.33, 0.53], [20, 0], { clamp: true });
  const step3Slide = useTransform(scrollYProgress, [0.66, 0.86], [20, 0], { clamp: true });

  return (
    <section ref={sectionRef} className="relative bg-[#0a0c0a] py-24 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Intro */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400"
          >
            {t.sections.operationalProcedure}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold uppercase tracking-tighter text-[#ededed] sm:text-5xl md:text-6xl"
          >
            {t.sections.howItWorks}
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Timeline Rail - Gray Background Line */}
          <div className="absolute left-6 top-0 h-full w-px bg-zinc-800 md:left-8 md:w-0.5" />

          {/* Glowing Green Beam - Scroll Progress */}
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-[#39FF14] via-[#39FF14] to-[#39FF14]/50 shadow-[0_0_20px_rgba(57,255,20,0.6)] md:left-8 md:w-0.5"
          />

          {/* Steps */}
          <div className="relative">
            {steps.map((step, index) => {
              let stepOpacity, numberColor, textSlide, glowOpacity;
              
              if (index === 0) {
                stepOpacity = step1Progress;
                numberColor = step1Color;
                textSlide = step1Slide;
                glowOpacity = step1Glow;
              } else if (index === 1) {
                stepOpacity = step2Progress;
                numberColor = step2Color;
                textSlide = step2Slide;
                glowOpacity = step2Glow;
              } else {
                stepOpacity = step3Progress;
                numberColor = step3Color;
                textSlide = step3Slide;
                glowOpacity = step3Glow;
              }

              return (
                <motion.div
                  key={step.number}
                  style={{
                    opacity: stepOpacity,
                    x: textSlide,
                  }}
                  className={`relative flex gap-8 py-12 pl-12 ${
                    index < steps.length - 1 ? "border-b border-zinc-800" : ""
                  }`}
                >
                  {/* Number with Glow when Active */}
                  <div className="flex-shrink-0 relative">
                    <motion.span
                      style={{
                        color: numberColor,
                      }}
                      className="relative z-10 text-5xl font-bold md:text-6xl"
                    >
                      {step.number}
                    </motion.span>
                    {/* Animated glow overlay */}
                    <motion.div
                      style={{
                        opacity: glowOpacity,
                      }}
                      className="absolute inset-0 pointer-events-none z-0"
                    >
                      <span className="text-5xl font-bold md:text-6xl text-[#39FF14] blur-sm">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

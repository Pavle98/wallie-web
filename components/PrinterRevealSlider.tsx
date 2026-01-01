"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function PrinterRevealSlider() {
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, sliderWidth], [0, 100]);
  const clipPath = useTransform(progress, (p) => `inset(0 ${100 - p}% 0 0)`);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setSliderWidth(width);
      // Set initial position to 50%
      x.set(width * 0.5);
    }

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setSliderWidth(width);
        // Maintain current percentage on resize
        const currentProgress = progress.get();
        x.set((width * currentProgress) / 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x, progress]);

  return (
    <section id="technology" className="relative bg-[#0a0a0a] py-24 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-4xl font-bold uppercase tracking-tighter text-[#ededed] sm:text-5xl md:text-6xl"
        >
          Don't Paint. Print.
        </motion.h2>

        {/* Frame Container with Dark Mat Background */}
        <div className="bg-[#0b0b0b] p-4 md:p-6 rounded-lg border border-white/10 shadow-2xl">
          {/* Slider Container - Full Viewport Height */}
          <div
            ref={containerRef}
            className="relative w-full h-screen max-h-[900px] overflow-hidden rounded-md border border-white/20 shadow-inner"
            style={{ height: '100svh', maxHeight: '900px' }}
          >
            {/* Before Image (Plain concrete wall) - Bottom layer */}
            <div className="absolute inset-0">
              <Image
                src="/noprint.png"
                alt="Plain concrete wall"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* After Image (Colorful mural) - Top revealed layer */}
            <motion.div
              style={{ clipPath }}
              className="absolute inset-0"
            >
              <Image
                src="/afterprint.png"
                alt="Colorful wall mural"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>

            {/* Simple Drag Handle */}
            <motion.div
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0}
              style={{ x }}
              className="absolute top-0 z-20 flex h-full cursor-grab items-center active:cursor-grabbing"
            >
              {/* White Line with Arrows */}
              <div className="relative flex h-full items-center">
                {/* Vertical White Line */}
                <div className="h-full w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                {/* Arrow Handle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-3 py-2">
                  <ChevronLeft className="h-5 w-5 text-white" />
                  <ChevronRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-[#ededed]/60 sm:text-base"
        >
          Drag to compare before and after
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function PrinterRevealSlider({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage: 0-100
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // Convert percentage to pixel position
  const pixelPosition = (sliderPosition / 100) * sliderWidth;
  const clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;

  useEffect(() => {
    if (containerRef.current && !isInitialized) {
      const width = containerRef.current.offsetWidth;
      setSliderWidth(width);
      setIsInitialized(true);
    }

    const handleResize = () => {
      if (containerRef.current && isInitialized) {
        const width = containerRef.current.offsetWidth;
        setSliderWidth(width);
        // Maintain current percentage on resize
        // Position is already in percentage, so no recalculation needed
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInitialized]);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current || !isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    updatePosition(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    updatePosition(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    // DO NOT reset position - it stays where user left it
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      handleStart(touch.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Global mouse/touch move handlers when dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleMove(touch.clientX);
      }
    };

    const handleGlobalTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });
    window.addEventListener("touchend", handleGlobalTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, sliderWidth]);

  return (
    <section id="technology" className="relative bg-[#0a0a0a] py-24 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Intro */}
        <div className="mb-12">
          <h2 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
            {t.sections.executionVerification}
          </h2>
          <p className="text-sm text-zinc-500">
            {t.sections.executionVerificationDesc}
          </p>
        </div>

        {/* Frame Container with Dark Mat Background */}
        <div className="bg-[#0b0b0b] p-4 md:p-6 rounded-lg border border-white/10 shadow-2xl">
          {/* Slider Container - Responsive Height */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] min-h-[500px] md:h-screen md:max-h-[900px] md:aspect-auto overflow-hidden rounded-md border border-white/20 shadow-inner select-none"
            style={{ touchAction: isDragging ? "none" : "pan-y" }}
          >
            {/* Before Image (Plain concrete wall) - Bottom layer */}
            <div className="absolute inset-0">
              <Image
                src="/noprint.png"
                alt="Plain concrete wall"
                fill
                className="object-contain md:object-cover"
                priority
                unoptimized
              />
            </div>

            {/* After Image (Colorful mural) - Top revealed layer */}
            <div
              style={{ clipPath }}
              className="absolute inset-0"
            >
              <Image
                src="/afterprint.png"
                alt="Colorful wall mural"
                fill
                className="object-contain md:object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Simple Drag Handle */}
            <div
              ref={handleRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: `translateX(calc(${pixelPosition}px - 0.5px))`,
                touchAction: "none",
              }}
              className="absolute top-0 z-20 flex h-full cursor-grab items-center active:cursor-grabbing touch-none select-none"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

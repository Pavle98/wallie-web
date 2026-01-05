"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end justify-center overflow-hidden pb-24 md:items-center md:justify-start md:pb-0">
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
            ARCHITECTURAL WALL PRINTING. EXECUTED BY ROBOT.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base text-white/90 sm:text-lg leading-tight"
          >
            Permanent UV printing directly into the surface.
            <br />
            No vinyl. No decals. No manual work.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <button className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200">
              <span>REQUEST A PROJECT CONSULTATION</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="mailto:contact@wallie.com"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                EMAIL US
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href="https://wa.me/381605030043"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                WHATSAPP
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <p className="text-xs text-white/50">
                Reply within 8 hours
              </p>
            </div>
            <p className="text-xs text-white/50">
              +381 60 503 0043
            </p>
            <p className="text-sm text-white/60">
              For architects, designers, and commercial projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

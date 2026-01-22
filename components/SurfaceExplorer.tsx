"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface SurfaceExplorerProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function SurfaceExplorer({ locale, projectType }: SurfaceExplorerProps) {
  const t = getTranslations(locale);
  const [showMore, setShowMore] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Merged: 5 best examples showing materials + applications
  const allItems = [
    { name: t.materials.concrete.name, image: "/textures/concrete.png", label: t.materials.concrete.application, notes: t.materials.concrete.notes },
    { name: t.materials.brick.name, image: "/textures/brick.png", label: t.materials.brick.application, notes: t.materials.brick.notes },
    { name: t.materials.wood.name, image: "/textures/wood.png", label: t.materials.wood.application, notes: t.materials.wood.notes },
    { name: t.materials.glass.name, image: "/textures/glass.png", label: t.materials.glass.application, notes: t.materials.glass.notes },
    { name: t.materials.wall.name, image: "/textures/wall.png", label: t.materials.wall.application, notes: t.materials.wall.notes },
  ];

  // Mobile: accordion (1 open at a time), Desktop: grid
  const initialLimit = projectType === "b2b" ? 6 : 4;
  const itemsToShow = showMore ? allItems : allItems.slice(0, Math.min(initialLimit, allItems.length));
  const hasMore = allItems.length > initialLimit;
  
  return (
    <section id="materials" className="relative bg-[#0a0c0a] py-12 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="mb-6 text-sm font-mono uppercase tracking-wider text-zinc-400">
            {t.sections.applicationsAndMaterials}
          </h2>

          {/* Mobile: Accordion */}
          <div className="md:hidden space-y-2">
            {itemsToShow.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-zinc-800 bg-zinc-950/40"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 text-left"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wide text-zinc-300">
                    {item.name}
                  </h3>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3">
                        <div className="relative aspect-[4/3] border border-zinc-900 bg-zinc-950 overflow-hidden mb-2">
                          <Image
                            src={item.image}
                            alt={`${item.name} - ${item.label}`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            loading="lazy"
                          />
                        </div>
                        <p className="mb-2 text-[10px] font-mono text-zinc-500">
                          {item.label}
                        </p>
                        {item.notes && (
                          <p className="text-[9px] font-mono leading-tight text-zinc-600">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {hasMore && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                >
                  <span>{showMore 
                    ? (locale === "sr" ? "Prikaži manje" : locale === "en" ? "Show less" : "Показать меньше")
                    : (locale === "sr" ? "Prikaži više" : locale === "en" ? "Show more" : "Показать больше")}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {itemsToShow.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-zinc-800 bg-zinc-950/40"
              >
                <div className="p-3">
                  <div className="relative aspect-[4/3] border border-zinc-900 bg-zinc-950 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.name} - ${item.label}`}
                      fill
                      className="object-cover"
                      style={{ objectPosition: index === 1 ? "center top" : "center" }}
                      priority={index < 2}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading={index < 2 ? undefined : "lazy"}
                    />
                  </div>
                </div>

                <div className="px-3 pb-3">
                  <h3 className="mb-0.5 text-xs font-mono uppercase tracking-wide text-zinc-300">
                    {item.name}
                  </h3>
                  <p className="mb-2 text-[10px] font-mono text-zinc-500">
                    {item.label}
                  </p>
                  {item.notes && (
                    <p className="text-[9px] font-mono leading-tight text-zinc-600">
                      {item.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="hidden md:block mt-8 text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
              >
                <span>{showMore 
                  ? (locale === "sr" ? "Prikaži manje" : locale === "en" ? "Show less" : "Показать меньше")
                  : (locale === "sr" ? "Prikaži više" : locale === "en" ? "Show more" : "Показать больше")}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}

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
              {t.sections.viewPortfolio}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

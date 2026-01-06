"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function SurfaceExplorer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  // Merged: 4 best examples showing materials + applications
  const items = [
    { name: t.materials.concrete.name, image: "/textures/concrete.png", label: t.materials.concrete.application },
    { name: t.materials.brick.name, image: "/examples/wall-printing-brick-facade-outdoor.jpg", label: t.materials.brick.application },
    { name: t.materials.wood.name, image: "/examples/wall-printing-wood-panel.jpg", label: t.materials.wood.application },
    { name: t.materials.glass.name, image: "/examples/wall-printing-glass-uv.jpg", label: t.materials.glass.application },
  ];
  
  return (
    <section className="relative bg-[#0a0c0a] py-12 px-4 md:px-8">
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

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={item.name}
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
                    />
                  </div>
                </div>

                <div className="px-3 pb-3">
                  <h3 className="mb-0.5 text-xs font-mono uppercase tracking-wide text-zinc-300">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
        </motion.div>
      </div>
    </section>
  );
}

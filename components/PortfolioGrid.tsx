"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function PortfolioGrid({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const projects = t.portfolio.captions.map((caption, index) => {
    const textures = ["/textures/concrete.png", "/textures/brick.png", "/textures/wood.png", "/textures/glass.png"];
    return {
      image: textures[index % textures.length],
      caption,
    };
  });
  return (
    <section className="bg-[#0a0c0a] py-16 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400"
          >
            {t.sections.selectedWork}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs text-zinc-500"
          >
            {t.portfolio.context}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative overflow-hidden border border-zinc-800 bg-zinc-950"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-3">
                <p className="text-xs font-mono text-zinc-400">
                  {project.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

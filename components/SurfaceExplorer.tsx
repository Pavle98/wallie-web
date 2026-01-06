"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function SurfaceExplorer({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  
  const surfaces = [
    { name: t.materials.concrete.name, texture: "/textures/concrete.png", label: t.materials.concrete.label },
    { name: t.materials.brick.name, texture: "/textures/brick.png", label: t.materials.brick.label },
    { name: t.materials.wood.name, texture: "/textures/wood.png", label: t.materials.wood.label },
    { name: t.materials.glass.name, texture: "/textures/glass.png", label: t.materials.glass.label },
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
            {t.sections.supportedMaterials}
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {surfaces.map((surface, index) => (
              <div
                key={surface.name}
                className="border border-zinc-800 bg-zinc-950/40"
              >
                {/* Outer panel with inner framed image window */}
                <div className="p-3">
                  {/* Inner image frame */}
                  <div className="relative aspect-[4/3] border border-zinc-900 bg-zinc-950">
                    <Image
                      src={surface.texture}
                      alt={surface.name}
                      fill
                      className="object-cover"
                      priority={index < 2}
                    />
                  </div>
                </div>

                {/* Text below image */}
                <div className="px-3 pb-3">
                  <h3 className="mb-0.5 text-xs font-mono uppercase tracking-wide text-zinc-300">
                    {surface.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500">
                    {surface.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

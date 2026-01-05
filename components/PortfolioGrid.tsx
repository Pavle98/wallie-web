"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    image: "/textures/concrete.png",
    caption: "Café interior · 12 m² · 2h execution",
  },
  {
    image: "/textures/brick.png",
    caption: "Office lobby · concrete · indoor",
  },
  {
    image: "/textures/wood.png",
    caption: "Gym wall · brick · washable finish",
  },
  {
    image: "/textures/glass.png",
    caption: "Retail space · 28 m² · 4h execution",
  },
  {
    image: "/textures/concrete.png",
    caption: "Restaurant · concrete · outdoor",
  },
  {
    image: "/textures/brick.png",
    caption: "Hotel corridor · brick · 18 m²",
  },
];

export default function PortfolioGrid() {
  return (
    <section className="bg-[#0a0a0a] py-16 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-sm font-mono uppercase tracking-wider text-zinc-400"
        >
          SELECTED WORK
        </motion.h2>

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

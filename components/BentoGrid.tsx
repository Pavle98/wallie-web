"use client";

import { motion } from "framer-motion";
import { Droplets, Shield, Layers, Maximize2 } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Eco-Friendly Ink",
    description: "Sustainable, non-toxic UV-curable inks that protect both your walls and the environment.",
    color: "from-[#39FF14] to-[#39FF14]/50",
  },
  {
    icon: Shield,
    title: "Waterproof",
    description: "UV-cured prints resist water, weather, and wear. Perfect for indoor and outdoor applications.",
    color: "from-[#8A2BE2] to-[#8A2BE2]/50",
  },
  {
    icon: Layers,
    title: "Any Surface",
    description: "Concrete, brick, metal, wood—our technology adheres to virtually any vertical surface.",
    color: "from-[#39FF14] to-[#8A2BE2]",
  },
  {
    icon: Maximize2,
    title: "Up to 4m Height",
    description: "Vertical printing capability reaching heights of 4 meters. Scale your vision without limits.",
    color: "from-[#8A2BE2] to-[#39FF14]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function BentoGrid() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-4xl font-bold uppercase tracking-tighter text-[#ededed] sm:text-5xl md:text-6xl"
        >
          Technology That Transforms
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 2; // Third item spans 2 columns

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-sm border border-[#ededed]/10 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-[#ededed]/20 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] ${
                  isLarge ? "sm:col-span-2" : ""
                }`}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#39FF14]/20 to-[#8A2BE2]/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative rounded-sm border border-[#ededed]/10 bg-[#0a0a0a] p-4 transition-all duration-300 group-hover:border-[#39FF14]/30">
                    <Icon className="h-8 w-8 text-[#ededed] transition-colors duration-300 group-hover:text-[#39FF14]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold uppercase tracking-tight text-[#ededed] transition-colors duration-300 group-hover:text-[#39FF14]">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#ededed]/70">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#39FF14] to-[#8A2BE2] transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}


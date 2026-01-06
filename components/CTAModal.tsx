"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface CTAModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
}

export default function CTAModal({ locale, isOpen, onClose }: CTAModalProps) {
  const t = getTranslations(locale);
  const [formData, setFormData] = useState({
    spaceType: "",
    surfaceType: "",
    size: "",
    location: "",
    timeline: "",
    wallPhoto: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl bg-[#0a0c0a] border border-white/10 p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-6 text-2xl font-bold uppercase tracking-tighter text-white">
                {t.sections.ctaModal.title}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.spaceType}
                  </label>
                  <input
                    type="text"
                    value={formData.spaceType}
                    onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.surfaceType}
                  </label>
                  <input
                    type="text"
                    value={formData.surfaceType}
                    onChange={(e) => setFormData({ ...formData, surfaceType: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.size}
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="m²"
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.location}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.timeline}
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.wallPhoto} <span className="text-zinc-600">({t.sections.ctaModal.optional})</span>
                  </label>
                  <input
                    type="url"
                    value={formData.wallPhoto}
                    onChange={(e) => setFormData({ ...formData, wallPhoto: e.target.value })}
                    placeholder="URL or link"
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {t.sections.ctaModal.contact}
                  </label>
                  <input
                    type="email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-white text-black text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gray-200"
                  >
                    {t.sections.ctaModal.submit}
                  </button>
                </div>

                <p className="mt-4 text-xs text-center text-zinc-400">
                  {t.sections.ctaModal.promise}
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

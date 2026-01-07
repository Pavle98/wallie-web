"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface CTAModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function CTAModal({ locale, isOpen, onClose }: CTAModalProps) {
  const t = getTranslations(locale);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    contact: "",
    projectType: "",
    size: "",
    location: "",
    note: "",
  });

  // Validate contact field (email or phone)
  const validateContact = (value: string): boolean => {
    if (!value.trim()) return false;
    // Check if it's an email or phone (rough validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return emailRegex.test(value) || (phoneRegex.test(value) && value.replace(/\D/g, "").length >= 7);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateContact(formData.contact)) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    try {
      // Formspree integration
      // Replace with your Formspree endpoint ID
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "your-formspree-id";
      
      const response = await fetch(`https://formspree.io/f/${formspreeEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          contact: formData.contact,
          projectType: formData.projectType,
          size: formData.size,
          location: formData.location,
          note: formData.note,
          locale: locale,
          _subject: `New Project Inquiry from Wallie - ${formData.projectType}`,
        }),
      });

      if (response.ok) {
        setFormState("success");
        // Reset form
        setFormData({
          contact: "",
          projectType: "",
          size: "",
          location: "",
          note: "",
        });
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setFormState("idle");
        }, 3000);
      } else {
        setFormState("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState("error");
    }
  };

  const handleClose = () => {
    if (formState !== "submitting") {
      onClose();
      // Reset form state after a delay to allow animation
      setTimeout(() => {
        setFormState("idle");
        setFormData({
          contact: "",
          projectType: "",
          size: "",
          location: "",
          note: "",
        });
      }, 300);
    }
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
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-[#0a0c0a] border border-white/10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleClose}
                disabled={formState === "submitting"}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t.sections.ctaModal.success}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {t.hero.phone}
                  </p>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t.sections.ctaModal.error}
                  </h3>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-4 px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    {t.sections.ctaModal.submit}
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="mb-6 text-xl md:text-2xl font-bold uppercase tracking-tighter text-white pr-8">
                    {t.sections.ctaModal.title}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Contact (email or phone) */}
                    <div>
                      <label htmlFor="contact" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.contact} *
                      </label>
                      <input
                        id="contact"
                        type="text"
                        inputMode="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder={t.sections.ctaModal.contactPlaceholder}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
                        required
                        autoFocus
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.projectType} *
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer"
                        required
                      >
                        <option value="">—</option>
                        <option value="residential">{t.sections.ctaModal.projectTypeOptions.residential}</option>
                        <option value="commercial">{t.sections.ctaModal.projectTypeOptions.commercial}</option>
                        <option value="facade">{t.sections.ctaModal.projectTypeOptions.facade}</option>
                        <option value="other">{t.sections.ctaModal.projectTypeOptions.other}</option>
                      </select>
                    </div>

                    {/* Size / Scope */}
                    <div>
                      <label htmlFor="size" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.size} *
                      </label>
                      <input
                        id="size"
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder={t.sections.ctaModal.sizePlaceholder}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
                        required
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.location} *
                      </label>
                      <input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder={t.sections.ctaModal.locationPlaceholder}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
                        required
                      />
                    </div>

                    {/* Optional Note */}
                    <div>
                      <label htmlFor="note" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.note} <span className="text-zinc-600">({t.sections.ctaModal.optional})</span>
                      </label>
                      <textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder={t.sections.ctaModal.notePlaceholder}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full px-8 py-4 bg-white text-black text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formState === "submitting" ? t.sections.ctaModal.submitting : t.sections.ctaModal.submit}
                      </button>
                    </div>

                    {/* Promise / Microcopy */}
                    <p className="text-xs text-center text-zinc-400 leading-relaxed">
                      {t.sections.ctaModal.promise}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

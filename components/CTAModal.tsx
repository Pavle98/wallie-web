"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface CTAModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
  projectType?: "b2b" | "b2c";
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function CTAModal({ locale, isOpen, onClose, projectType = "b2b" }: CTAModalProps) {
  const t = getTranslations(locale);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    contact: "",
    message: "",
    location: "",
    roomType: "",
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
    
    if (!validateContact(formData.contact) || !formData.message.trim() || !formData.location.trim()) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    // Combine room type into message if B2C and room type selected
    let finalMessage = formData.message;
    if (projectType === "b2c" && formData.roomType) {
      const roomTypes = (t.sections.ctaModal as any).roomTypes;
      const roomTypeQuestion = (t.sections.ctaModal as any).roomTypeQuestion;
      if (roomTypes && roomTypeQuestion) {
        const roomTypeText = roomTypes[formData.roomType] || formData.roomType;
        finalMessage = `${roomTypeQuestion}: ${roomTypeText}\n\n${formData.message}`;
      }
    }

    try {
      // Formspree integration
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "your-formspree-id";
      
      const response = await fetch(`https://formspree.io/f/${formspreeEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          contact: formData.contact,
          message: finalMessage,
          location: formData.location,
          projectType: projectType === "b2b" ? "Poslovni prostor" : "Stan / kuća",
          locale: locale,
          _subject: projectType === "b2b" ? `[B2B] Wallie upit` : `[B2C] Wallie upit`,
        }),
      });

      if (response.ok) {
        setFormState("success");
        // Reset form
        setFormData({
          contact: "",
          message: "",
          location: "",
          roomType: "",
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
          message: "",
          location: "",
          roomType: "",
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
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[61] flex items-start justify-center pt-20 pb-4 px-4 md:items-center md:pt-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0c0a] border border-white/10 p-6 md:p-8 max-h-[calc(90vh-5rem)] md:max-h-[90vh] overflow-y-auto pointer-events-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                disabled={formState === "submitting"}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors disabled:opacity-50 z-30"
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
                    {t.sections.ctaModal.successTitle}
                  </h3>
                  <p className="text-sm text-zinc-400 whitespace-pre-line mb-2">
                    {t.sections.ctaModal.success}
                  </p>
                  <p className="text-xs text-zinc-500">
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
                  <h2 className="mb-2 text-xl md:text-2xl font-bold uppercase tracking-tighter text-white pr-8">
                    {projectType === "b2c" && (t.sections.ctaModal as any).titleB2C ? (t.sections.ctaModal as any).titleB2C : t.sections.ctaModal.title}
                  </h2>
                  <p className="mb-6 text-xs text-zinc-400 leading-relaxed pr-8">
                    {projectType === "b2c" 
                      ? ((t.sections.ctaModal as any).subtextB2C ?? t.sections.ctaModal.subtext)
                      : ((t.sections.ctaModal as any).subtextB2B ?? t.sections.ctaModal.subtext)
                    }
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Contact (email or phone) - Required */}
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

                    {/* Location - Required */}
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

                    {/* B2C: Room Type Quick Select - Optional */}
                    {projectType === "b2c" && (t.sections.ctaModal as any).roomTypes && (
                      <div>
                        <p className="block mb-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                          {(t.sections.ctaModal as any).roomTypeQuestion} <span className="text-zinc-600 font-normal lowercase">({t.sections.ctaModal.optional})</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries((t.sections.ctaModal as any).roomTypes).map(([key, label]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setFormData({ ...formData, roomType: formData.roomType === key ? "" : key })}
                              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                                formData.roomType === key
                                  ? "bg-white text-black border-white"
                                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                              }`}
                            >
                              {String(label)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* B2B: Optional helper suggestions */}
                    {projectType === "b2b" && (t.sections.ctaModal as any).wallSizeHelperB2B && (
                      <div>
                        <p className="text-xs text-zinc-500 mb-2">
                          {(t.sections.ctaModal as any).wallSizeHelperB2B}
                        </p>
                      </div>
                    )}

                    {/* Message - Required */}
                    <div>
                      <label htmlFor="message" className="block mb-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {t.sections.ctaModal.message} *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={projectType === "b2c" 
                          ? ((t.sections.ctaModal as any).messagePlaceholderB2C ?? t.sections.ctaModal.messagePlaceholder)
                          : t.sections.ctaModal.messagePlaceholder
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full px-8 py-4 bg-white text-black text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {formState === "submitting" ? t.sections.ctaModal.submitting : t.sections.ctaModal.submit}
                      </button>
                    </div>

                    {/* Microcopy below submit */}
                    <p className="text-xs text-center text-zinc-400 leading-relaxed pt-1">
                      {projectType === "b2c" 
                        ? ((t.sections.ctaModal as any).microcopyB2C ?? t.sections.ctaModal.microcopy)
                        : ((t.sections.ctaModal as any).microcopyB2B ?? t.sections.ctaModal.microcopy)
                      }
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

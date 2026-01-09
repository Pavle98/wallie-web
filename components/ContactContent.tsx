"use client";

import { useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import CTAModal from "@/components/CTAModal";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactContent({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <h1 className="mb-4 text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white">
          {t.footer.contact}
        </h1>
        <p className="mb-12 text-sm text-zinc-400 leading-relaxed">
          {locale === "sr" 
            ? "Kontaktirajte nas za procenu vašeg projekta. Odgovaramo u roku od 8 sati."
            : locale === "en"
            ? "Contact us for project assessment. We respond within 8 hours."
            : "Свяжитесь с нами для оценки вашего проекта. Отвечаем в течение 8 часов."}
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
          {/* Email */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6">
            <Mail className="h-6 w-6 text-zinc-400 mb-4" />
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
              {locale === "sr" ? "Email" : locale === "en" ? "Email" : "Email"}
            </h3>
            <a
              href="mailto:contact@wallie.rs"
              className="text-base text-white hover:text-zinc-300 transition-colors"
            >
              contact@wallie.rs
            </a>
          </div>

          {/* Phone */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6">
            <Phone className="h-6 w-6 text-zinc-400 mb-4" />
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
              {locale === "sr" ? "Telefon" : locale === "en" ? "Phone" : "Телефон"}
            </h3>
            <a
              href="tel:+381605030043"
              className="text-base text-white hover:text-zinc-300 transition-colors"
            >
              +381 60 503 0043
            </a>
            <p className="mt-1 text-xs text-zinc-500">
              {t.footer.whatsappViber}
            </p>
          </div>

          {/* Location */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6">
            <MapPin className="h-6 w-6 text-zinc-400 mb-4" />
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
              {locale === "sr" ? "Lokacija" : locale === "en" ? "Location" : "Местоположение"}
            </h3>
            <p className="text-base text-white">
              Belgrade (Zemun), Serbia
            </p>
          </div>

          {/* Company */}
          <div className="border border-zinc-800 bg-zinc-950/40 p-6">
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
              {t.footer.companyName}
            </h3>
            <p className="text-sm text-white mb-2">
              Wallie is a brand of Cruderly DOO.
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              PIB: 114546952
            </p>
            <p className="text-xs text-zinc-500 font-mono">
              MB: 22037757
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-zinc-800 pt-12">
          <h2 className="mb-4 text-xl font-bold text-white">
            {locale === "sr" 
              ? "Zatražite procenu projekta"
              : locale === "en"
              ? "Request project assessment"
              : "Запросить оценку проекта"}
          </h2>
          <p className="mb-6 text-sm text-zinc-400 leading-relaxed">
            {locale === "sr"
              ? "Dovoljan je kratak opis prostora ili fotografija zida — javljamo se sa sledećim koracima u roku od 8h."
              : locale === "en"
              ? "A short description of the space or a wall photo is enough — we'll contact you with next steps within 8h."
              : "Достаточно краткого описания помещения или фотографии стены — мы свяжемся с вами со следующими шагами в течение 8 часов."}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200"
          >
            {t.hero.cta}
          </button>
          <CTAModal locale={locale} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
}

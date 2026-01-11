"use client";

import { getTranslations, type Locale } from "@/lib/i18n";

interface MidPageContactProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function MidPageContact({ locale, projectType }: MidPageContactProps) {
  const t = getTranslations(locale);

  return (
    <section id="contact" className="bg-[#0a0c0a] py-16 px-4 border-t border-zinc-800">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <h2 className="mb-4 text-xl md:text-2xl font-bold text-white">
          {t.footer.contact}
        </h2>
        <p className="mb-8 text-sm text-zinc-400 leading-relaxed">
          {locale === "sr" 
            ? "Kontaktirajte nas za procenu vašeg projekta. Odgovaramo u roku od 8 sati."
            : locale === "en"
            ? "Contact us for project assessment. We respond within 8 hours."
            : "Свяжитесь с нами для оценки вашего проекта. Отвечаем в течение 8 часов."}
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
              {locale === "sr" ? "Email" : locale === "en" ? "Email" : "Email"}
            </p>
            <a
              href="mailto:contact@wallie.rs"
              className="text-base text-white hover:text-zinc-300 transition-colors"
            >
              contact@wallie.rs
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
              {locale === "sr" ? "Telefon" : locale === "en" ? "Phone" : "Телефон"}
            </p>
            <a
              href="tel:+381605030043"
              className="text-base text-white hover:text-zinc-300 transition-colors"
            >
              +381 60 503 0043
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

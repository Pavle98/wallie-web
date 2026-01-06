import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import HowItWorks from "@/components/HowItWorks";
import BentoGrid from "@/components/BentoGrid";
import FAQ from "@/components/FAQ";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import { getTranslations, type Locale, locales, defaultLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Validate locale at runtime - redirect invalid locales to default locale
  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}`);
  }

  // Cast to Locale after validation
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  const langMap: Record<Locale, string> = {
    sr: "sr",
    en: "en",
    ru: "ru",
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wallie.com";

  return {
    title: validLocale === "sr" 
      ? "Wallie - Vertikalno Štampanje Zidova | Beograd, Srbija"
      : validLocale === "en"
      ? "Wallie - Vertical Wall Printing | Belgrade, Serbia"
      : "Wallie - Вертикальная Печать на Стенах | Белград, Сербия",
    description: validLocale === "sr"
      ? "Tehnologija direktnog vertikalnog štampanja na zidove u Beogradu. Transformišite bilo koju površinu UV-otvrdnjivom bojom. Do 4m visine. Vodootporno. Ekološki prihvatljivo."
      : validLocale === "en"
      ? "Direct-to-wall vertical printing technology in Belgrade. Transform any surface with UV-curable ink. Up to 4m height. Waterproof. Eco-friendly."
      : "Технология прямой вертикальной печати на стены в Белграде. Преобразуйте любую поверхность УФ-отверждаемыми чернилами. До 4м высоты. Водостойкость. Экологично.",
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        "sr": `${baseUrl}/sr`,
        "en": `${baseUrl}/en`,
        "ru": `${baseUrl}/ru`,
        "x-default": `${baseUrl}/${defaultLocale}`,
      },
    },
  };
}

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale at runtime - redirect invalid locales to default locale
  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}`);
  }

  // Cast to Locale after validation
  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <main className="min-h-screen bg-[#0a0c0a]">
      <Navbar locale={validLocale} />
      <Hero locale={validLocale} />
      <SurfaceExplorer locale={validLocale} />
      <PrinterRevealSlider locale={validLocale} />
      <TrustStack locale={validLocale} />
      <HowItWorks locale={validLocale} />
      <BentoGrid locale={validLocale} />
      <FAQ locale={validLocale} />
      
      {/* Final CTA */}
      <section className="bg-[#0a0c0a] py-24 px-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <button className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200">
              <span>{t.sections.finalCta.title}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="mailto:contact@wallie.com"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t.sections.finalCta.emailUs}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href="https://wa.me/381605030043"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                {t.sections.finalCta.whatsapp}
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <p className="text-xs text-white/50">
                {t.sections.finalCta.replyTime}
              </p>
            </div>
            <p className="text-xs text-white/50">
              {t.sections.finalCta.phone}
            </p>
            <p className="text-sm text-white/60">
              {t.sections.finalCta.microcopy}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ededed]/10 bg-[#0a0c0a] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                {t.footer.companyName}
              </h3>
              <div className="space-y-1 text-sm text-[#ededed]/60">
                <p>Joze Šćurle 36</p>
                <p>Belgrade (Zemun), Serbia</p>
                <p className="mt-2 font-mono text-xs text-zinc-500">
                  PIB: 114546952
                </p>
                <p className="font-mono text-xs text-zinc-500">MB: 22037757</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                {t.footer.contact}
              </h3>
              <div className="space-y-2 text-sm text-[#ededed]/60">
                <div>
                  <a
                    href="mailto:contact@wallie.com"
                    className="block transition-colors hover:text-white"
                  >
                    contact@wallie.com
                  </a>
                </div>
                <div>
                  <a
                    href="tel:+381605030043"
                    className="block transition-colors hover:text-white"
                  >
                    +381 60 503 0043
                  </a>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {t.footer.whatsappViber}
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Legal */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                {t.footer.follow}
              </h3>
              <div className="mb-4 flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                  aria-label="TikTok"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <div className="text-xs text-[#ededed]/60">
                <a
                  href={`/${validLocale}/privacy`}
                  className="transition-colors hover:text-white"
                >
                  {t.footer.privacyPolicy}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
            <p className="text-sm text-[#ededed]/60">
              {t.footer.copyright}
            </p>
            <p className="mt-1 text-xs text-[#ededed]/40">
              {t.footer.operating}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

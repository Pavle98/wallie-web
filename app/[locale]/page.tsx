import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import ExecutionPartner from "@/components/ExecutionPartner";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import CollaborationProcess from "@/components/CollaborationProcess";
import MiniFAQ from "@/components/MiniFAQ";
import { Instagram, Linkedin } from "lucide-react";
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
      <ExecutionPartner locale={validLocale} />
      <SurfaceExplorer locale={validLocale} />
      <PrinterRevealSlider locale={validLocale} />
      <TrustStack locale={validLocale} />
      <CollaborationProcess locale={validLocale} />
      <MiniFAQ locale={validLocale} />

      <footer className="border-t border-[#ededed]/10 bg-[#0a0c0a] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                {t.footer.companyName}
              </h3>
              <div className="space-y-1 text-sm text-[#ededed]/60">
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

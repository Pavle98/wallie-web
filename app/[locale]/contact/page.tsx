import { redirect } from "next/navigation";
import { getTranslations, locales, type Locale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactContent from "@/components/ContactContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return {
    title: validLocale === "sr" 
      ? "Kontakt - Wallie"
      : validLocale === "en"
      ? "Contact - Wallie"
      : "Контакты - Wallie",
    description: validLocale === "sr"
      ? "Kontaktirajte Wallie za procenu vašeg projekta. Email, telefon, lokacija."
      : validLocale === "en"
      ? "Contact Wallie for project assessment. Email, phone, location."
      : "Свяжитесь с Wallie для оценки вашего проекта. Email, телефон, местоположение.",
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}/contact`);
  }

  const validLocale = locale as Locale;

  return (
    <main className="min-h-screen bg-[#0a0c0a]">
      <Navbar locale={validLocale} />
      <ContactContent locale={validLocale} />
      <div className="border-t border-zinc-800 py-12 px-4">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <Link
            href={`/${validLocale}`}
            className="text-sm font-mono uppercase tracking-wider text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
          >
            ← {validLocale === "sr" ? "Nazad na početnu" : validLocale === "en" ? "Back to Home" : "Вернуться на главную"}
          </Link>
        </div>
      </div>
    </main>
  );
}

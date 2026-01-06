import { redirect } from "next/navigation";
import { getTranslations, locales, type Locale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";

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
    title: t.sections.viewPortfolio || "Portfolio",
    description: "Portfolio of architectural wall printing projects",
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale at runtime
  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}/portfolio`);
  }

  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <main className="min-h-screen bg-[#0a0c0a] py-24 px-4">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <h1 className="mb-4 text-3xl font-bold uppercase tracking-tighter text-white">
          {t.sections.viewPortfolio || "Portfolio"}
        </h1>
        
        <p className="mb-12 text-sm text-zinc-400">
          {validLocale === "sr" 
            ? "Izabrani radovi uskoro."
            : validLocale === "ru"
            ? "Выбранные работы скоро."
            : "Selected works coming soon."}
        </p>

        <div className="mt-12">
          <Link
            href={`/${validLocale}`}
            className="text-sm font-mono uppercase tracking-wider text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
          >
            ← {validLocale === "sr" ? "Nazad na početnu" : validLocale === "ru" ? "Вернуться на главную" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";
import { getTranslations, locales, type Locale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";

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
    title: t.sections.faq || "FAQ",
    description: "Frequently asked questions about UV wall printing",
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}/faq`);
  }

  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <main className="min-h-screen bg-[#0a0c0a]">
      <Navbar locale={validLocale} />
      <div className="pt-24">
        <FAQ locale={validLocale} />
      </div>
      <div className="border-t border-zinc-800 py-12 px-4">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
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

import { locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }> | { locale: Locale };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;

  if (!locales.includes(locale)) {
    notFound();
  }

  const langMap: Record<Locale, string> = {
    sr: "sr",
    en: "en",
    ru: "ru",
  };

  return (
    <html lang={langMap[locale]} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

import { locales, type Locale, defaultLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: [
      { url: "/logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale at runtime - redirect invalid locales to default locale
  // This preserves the middleware behavior of redirecting paths without valid locale
  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}`);
  }

  // Cast to Locale after validation
  const validLocale = locale as Locale;

  const langMap: Record<Locale, string> = {
    sr: "sr",
    en: "en",
    ru: "ru",
  };

  return (
    <html lang={langMap[validLocale]} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}

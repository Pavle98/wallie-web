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
    title: t.footer.privacyPolicy,
    description: "Privacy Policy",
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale at runtime
  if (!locales.includes(locale as Locale)) {
    redirect(`/${defaultLocale}/privacy`);
  }

  const validLocale = locale as Locale;
  const t = getTranslations(validLocale);

  return (
    <main className="min-h-screen bg-[#0a0c0a] py-24 px-4">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-tighter text-white">
          {t.footer.privacyPolicy}
        </h1>
        
        <div className="space-y-6 text-sm leading-relaxed text-zinc-400">
          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.privacy.whoWeAre}
            </h2>
            <p>
              {t.privacy.whoWeAreDesc}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.privacy.dataCollection}
            </h2>
            <p>
              {t.privacy.dataCollectionDesc}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.privacy.dataUsage}
            </h2>
            <p>
              {t.privacy.dataUsageDesc}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.privacy.dataRetention}
            </h2>
            <p>
              {t.privacy.dataRetentionDesc}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.privacy.yourRights}
            </h2>
            <p>
              {t.privacy.yourRightsDesc}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold uppercase tracking-wide text-white">
              {t.footer.contact}
            </h2>
            <p>
              <a
                href="mailto:contact@wallie.com"
                className="text-white underline underline-offset-4 transition-colors hover:text-zinc-300"
              >
                contact@wallie.com
              </a>
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {t.privacy.lastUpdated}
            </p>
          </section>
        </div>

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

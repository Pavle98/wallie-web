"use client";

import { ArrowLeft } from "lucide-react";
import { getTranslations, type Locale } from "@/lib/i18n";

interface PathChangeLinkProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
}

export default function PathChangeLink({ locale, projectType }: PathChangeLinkProps) {
  const t = getTranslations(locale);
  const pathChangeText = (t.hero as any)?.pathChangeLink || (locale === "sr" ? "Promeni tip prostora" : locale === "en" ? "Change space type" : "Изменить тип помещения");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#0a0c0a] py-4 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <a
          href="#hero"
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          {pathChangeText}
        </a>
      </div>
    </div>
  );
}

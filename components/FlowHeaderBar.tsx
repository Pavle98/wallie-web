"use client";

import { getTranslations, type Locale } from "@/lib/i18n";

interface FlowHeaderBarProps {
  locale: Locale;
  projectType: "b2b" | "b2c";
  onChangeFlow: () => void;
}

export default function FlowHeaderBar({ locale, projectType, onChangeFlow }: FlowHeaderBarProps) {
  const t = getTranslations(locale);
  
  const flowLabel = projectType === "b2b" ? t.hero.toggleB2B : t.hero.toggleB2C;
  const changeFlowText = locale === "sr" 
    ? "Promeni tok" 
    : locale === "en" 
    ? "Change flow" 
    : "Изменить поток";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onChangeFlow();
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#0a0c0a] border-b border-zinc-800 py-3 px-4">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
          {locale === "sr" ? "Tok:" : locale === "en" ? "Flow:" : "Поток:"} <span className="text-white">{flowLabel}</span>
        </span>
        <button
          onClick={handleClick}
          className="text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
        >
          {changeFlowText}
        </button>
      </div>
    </div>
  );
}

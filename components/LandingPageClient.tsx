"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ExecutionPartner from "@/components/ExecutionPartner";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import ProofOfExecution from "@/components/ProofOfExecution";
import CollaborationProcess from "@/components/CollaborationProcess";
import MiniFAQ from "@/components/MiniFAQ";
import type { Locale } from "@/lib/i18n";

export default function LandingPageClient({ locale }: { locale: Locale }) {
  const [projectType, setProjectType] = useState<"b2b" | "b2c">("b2b");

  return (
    <>
      <Hero locale={locale} projectType={projectType} setProjectType={setProjectType} />
      <ExecutionPartner locale={locale} />
      <SurfaceExplorer locale={locale} />
      <PrinterRevealSlider locale={locale} />
      <TrustStack locale={locale} />
      <ProofOfExecution locale={locale} />
      <CollaborationProcess locale={locale} />
      <MiniFAQ locale={locale} projectType={projectType} />
    </>
  );
}

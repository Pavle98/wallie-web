"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import ProofOfExecution from "@/components/ProofOfExecution";
import CollaborationProcess from "@/components/CollaborationProcess";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import MiniFAQ from "@/components/MiniFAQ";
import CTAReset from "@/components/CTAReset";
import PathChangeLink from "@/components/PathChangeLink";
import MidPageContact from "@/components/MidPageContact";
import type { Locale } from "@/lib/i18n";

// Section type definition
type SectionComponent = React.ReactElement;

export default function LandingPageClient({ locale }: { locale: Locale }) {
  const [projectType, setProjectType] = useState<"b2b" | "b2c" | null>(null);

  // If no path selected, show only Hero
  if (!projectType) {
    return <Hero locale={locale} projectType={null} setProjectType={setProjectType} />;
  }

  // Shared section (always visible after path selection)
  const sharedSections: SectionComponent[] = [
    <PrinterRevealSlider key="verification" locale={locale} />,
  ];

  // B2B Flow Sections
  const b2bSections: SectionComponent[] = [
    <PathChangeLink key="path-change" locale={locale} projectType={projectType} />,
    <TrustStack key="trust" locale={locale} />,
    <ProofOfExecution key="proof" locale={locale} projectType={projectType} />,
    <CTAReset key="cta1" locale={locale} projectType={projectType} />,
    <CollaborationProcess key="collab" locale={locale} />,
    <SurfaceExplorer key="materials" locale={locale} projectType={projectType} />,
    <CTAReset key="cta2" locale={locale} projectType={projectType} />,
    <MiniFAQ key="faq" locale={locale} projectType={projectType} />,
    <MidPageContact key="contact" locale={locale} projectType={projectType} />,
  ];

  // B2C Flow Sections
  const b2cSections: SectionComponent[] = [
    <PathChangeLink key="path-change" locale={locale} projectType={projectType} />,
    <ProofOfExecution key="proof" locale={locale} projectType={projectType} />,
    <CTAReset key="cta1" locale={locale} projectType={projectType} />,
    <CollaborationProcess key="collab" locale={locale} />,
    <SurfaceExplorer key="materials" locale={locale} projectType={projectType} />,
    <TrustStack key="trust" locale={locale} />,
    <CTAReset key="cta2" locale={locale} projectType={projectType} />,
    <MiniFAQ key="faq" locale={locale} projectType={projectType} />,
    <MidPageContact key="contact" locale={locale} projectType={projectType} />,
  ];

  const flowSections = projectType === "b2b" ? b2bSections : b2cSections;

  return (
    <>
      <Hero locale={locale} projectType={projectType} setProjectType={setProjectType} />
      {sharedSections}
      {flowSections}
    </>
  );
}

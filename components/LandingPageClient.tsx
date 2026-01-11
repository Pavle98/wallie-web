"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import ProofOfExecution from "@/components/ProofOfExecution";
import CollaborationProcess from "@/components/CollaborationProcess";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import MiniFAQ from "@/components/MiniFAQ";
import CTAReset from "@/components/CTAReset";
import FlowHeaderBar from "@/components/FlowHeaderBar";
import MidPageContact from "@/components/MidPageContact";
import type { Locale } from "@/lib/i18n";

type SectionComponent = React.ReactElement;

function LandingPageContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [projectType, setProjectTypeState] = useState<"b2b" | "b2c" | null>(() => {
    const typeParam = searchParams?.get("t");
    if (typeParam === "b2b" || typeParam === "b2c") {
      return typeParam;
    }
    return null;
  });

  const setProjectType = (type: "b2b" | "b2c") => {
    setProjectTypeState(type);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("t", type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Sync with query param changes
  useEffect(() => {
    const typeParam = searchParams?.get("t");
    if (typeParam === "b2b" || typeParam === "b2c") {
      setProjectTypeState(typeParam);
    }
  }, [searchParams]);

  // If no path selected, show only Hero
  if (!projectType) {
    return <Hero locale={locale} projectType={null} setProjectType={setProjectType} />;
  }

  const handleFlowChange = () => {
    const newType = projectType === "b2b" ? "b2c" : "b2b";
    setProjectType(newType);
  };

  // Shared section (always visible after path selection)
  const sharedSections: SectionComponent[] = [
    <PrinterRevealSlider key="verification" locale={locale} />,
    <FlowHeaderBar key="flow-header" locale={locale} projectType={projectType} onChangeFlow={handleFlowChange} />,
  ];

  // B2B Flow Sections
  const b2bSections: SectionComponent[] = [
    <TrustStack key="trust" locale={locale} />,
    <ProofOfExecution key="proof" locale={locale} projectType={projectType} />,
    <CollaborationProcess key="collab" locale={locale} />,
    <SurfaceExplorer key="materials" locale={locale} projectType={projectType} />,
    <CTAReset key="cta2" locale={locale} projectType={projectType} />,
    <MiniFAQ key="faq" locale={locale} projectType={projectType} />,
    <MidPageContact key="contact" locale={locale} projectType={projectType} />,
  ];

  // B2C Flow Sections
  const b2cSections: SectionComponent[] = [
    <ProofOfExecution key="proof" locale={locale} projectType={projectType} />,
    <CollaborationProcess key="collab" locale={locale} />,
    <TrustStack key="trust" locale={locale} />,
    <SurfaceExplorer key="materials" locale={locale} projectType={projectType} />,
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

export default function LandingPageClient({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<Hero locale={locale} projectType={null} setProjectType={() => {}} />}>
      <LandingPageContent locale={locale} />
    </Suspense>
  );
}

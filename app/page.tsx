import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import HowItWorks from "@/components/HowItWorks";
import BentoGrid from "@/components/BentoGrid";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <SurfaceExplorer />
      <PrinterRevealSlider />
      <HowItWorks />
      <BentoGrid />
      
      {/* Final CTA */}
      <section className="bg-[#0a0a0a] py-24 px-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <button className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200">
              <span>REQUEST A PROJECT CONSULTATION</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-sm text-white/60">
              For architects, designers, and commercial projects.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ededed]/10 bg-[#0a0a0a] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ededed]/40 transition-colors hover:text-[#ededed]/60"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-[#ededed]/60">
                © 2026 CRUDERLY DOO. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-[#ededed]/40">
                Operating from Belgrade. Projects across Europe.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

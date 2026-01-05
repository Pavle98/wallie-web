import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SurfaceExplorer from "@/components/SurfaceExplorer";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import TrustStack from "@/components/TrustStack";
import PortfolioGrid from "@/components/PortfolioGrid";
import HowItWorks from "@/components/HowItWorks";
import BentoGrid from "@/components/BentoGrid";
import FAQ from "@/components/FAQ";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <SurfaceExplorer />
      <PrinterRevealSlider />
      <TrustStack />
      <PortfolioGrid />
      <HowItWorks />
      <BentoGrid />
      <FAQ />
      
      {/* Final CTA */}
      <section className="bg-[#0a0a0a] py-24 px-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <button className="group inline-flex items-center gap-3 rounded-sm bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200">
              <span>REQUEST A PROJECT CONSULTATION</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="mailto:contact@wallie.com"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                EMAIL US
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <a
                href="https://wa.me/381605030043"
                className="text-sm font-mono uppercase tracking-wider text-white/80 underline underline-offset-4 transition-colors hover:text-white"
              >
                WHATSAPP
              </a>
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <p className="text-xs text-white/50">
                Reply within 8 hours
              </p>
            </div>
            <p className="text-xs text-white/50">
              +381 60 503 0043
            </p>
            <p className="text-sm text-white/60">
              For architects, designers, and commercial projects.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#ededed]/10 bg-[#0a0a0a] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                CRUDERLY DOO BEОGRAD-ZEMUN
              </h3>
              <div className="space-y-1 text-sm text-[#ededed]/60">
                <p>Joze Šćurle 36</p>
                <p>Belgrade (Zemun), Serbia</p>
                <p className="mt-2 font-mono text-xs text-zinc-500">
                  PIB: 114546952
                </p>
                <p className="font-mono text-xs text-zinc-500">MB: 22037757</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                CONTACT
              </h3>
              <div className="space-y-1 text-sm text-[#ededed]/60">
                <a
                  href="mailto:contact@wallie.com"
                  className="block transition-colors hover:text-white"
                >
                  contact@wallie.com
                </a>
                <a
                  href="tel:+381605030043"
                  className="block transition-colors hover:text-white"
                >
                  +381 60 503 0043
                </a>
                <p className="mt-1 text-xs text-zinc-500">
                  WhatsApp / Viber
                </p>
              </div>
            </div>

            {/* Social & Legal */}
            <div>
              <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">
                FOLLOW
              </h3>
              <div className="mb-4 flex items-center gap-4">
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
              <div className="text-xs text-[#ededed]/60">
                <a
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
            <p className="text-sm text-[#ededed]/60">
              © 2026 Cruderly doo Beograd-Zemun. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-[#ededed]/40">
              Operating from Belgrade. Projects across Europe.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

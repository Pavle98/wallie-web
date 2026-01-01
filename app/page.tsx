import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PrinterRevealSlider from "@/components/PrinterRevealSlider";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <PrinterRevealSlider />
      <BentoGrid />
      <footer className="border-t border-[#ededed]/10 bg-[#0a0a0a] py-12 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-[#ededed]/60">
            © 2026 CRUDERLY DOO. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

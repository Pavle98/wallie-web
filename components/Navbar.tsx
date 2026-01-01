"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Technology", href: "#technology" },
    { name: "Portfolio", href: "#portfolio" },
  ];
  
  const contactLink = { name: "Contact", href: "#contact" };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="h-20">
        <div className="w-full max-w-7xl mx-auto px-10 flex justify-between items-center h-full">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 text-2xl font-bold text-white transition-opacity hover:opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="h-8 w-8 text-white" />
            WALLIE
          </motion.a>

          {/* Navigation Links - Hidden on mobile, visible on desktop */}
          <div className="hidden items-center gap-8 md:flex !pr-[16px] lg:!pr-[24px]">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Contact Link - Visible on all screens */}
          <motion.a
            href={contactLink.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {contactLink.name}
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Bot, Menu, X, ChevronDown } from "lucide-react";
import { getTranslations, type Locale, locales } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";

const localeNames: Record<Locale, string> = {
  sr: "Serbian",
  en: "English",
  ru: "Русский",
};

// Language code display (flags removed)
const LanguageCode = ({ locale }: { locale: Locale }) => {
  const codes: Record<Locale, string> = {
    sr: "SR",
    en: "EN",
    ru: "RU",
  };
  
  return (
    <span className="text-xs font-mono text-white/60 uppercase">
      {codes[locale]}
    </span>
  );
};

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close menu on scroll
  useEffect(() => {
    const handleScrollClose = () => {
      if (isOpen) {
        setIsOpen(false);
      }
      if (isLangDropdownOpen) {
        setIsLangDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScrollClose);
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [isOpen, isLangDropdownOpen]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: t.nav.home, href: "#" },
    { name: t.nav.technology, href: "#technology" },
    { name: t.nav.portfolio, href: "#portfolio" },
  ];
  
  const contactLink = { name: t.nav.contact, href: "#contact" };

  const getLocalePath = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}`;
    return pathname.replace(`/${locale}`, `/${newLocale}`);
  };

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
        <div className="w-full max-w-7xl mx-auto px-10 flex items-center justify-between h-full">
          {/* Logo - Left Side */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 text-2xl font-bold text-white transition-opacity hover:opacity-80"
            >
              <Bot className="h-8 w-8 text-white" />
              WALLIE
            </Link>
          </motion.div>

          {/* Right Side: Navigation Links + Language Switcher + Contact Button (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Language Switcher - Desktop */}
            <div className="hidden md:block relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                aria-label="Change language"
              >
                <LanguageCode locale={locale} />
                <ChevronDown className="h-2.5 w-2.5 text-white/40" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 bg-zinc-950/98 backdrop-blur-sm min-w-[160px]"
                  >
                    {locales.map((loc) => (
                      <Link
                        key={loc}
                        href={getLocalePath(loc)}
                        onClick={() => setIsLangDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          locale === loc
                            ? "text-white bg-white/5"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <LanguageCode locale={loc} />
                        <span>{localeNames[loc]}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white whitespace-nowrap"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Desktop Contact Link - Hidden on mobile */}
            <motion.a
              href={contactLink.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:block text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {contactLink.name}
            </motion.a>

            {/* Mobile Hamburger Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white/90 hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-zinc-950/80 backdrop-blur-lg overflow-hidden md:hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-12"
            >
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-2xl font-medium text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                {/* Mobile Language Switcher */}
                <div className="border-t border-zinc-800 pt-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                    <LanguageCode locale={locale} />
                    <span>{localeNames[locale]}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {locales
                      .filter((loc) => loc !== locale)
                      .map((loc) => (
                        <Link
                          key={loc}
                          href={getLocalePath(loc)}
                          onClick={closeMenu}
                          className="flex items-center gap-2 text-lg text-white/80 hover:text-white transition-colors"
                        >
                          <LanguageCode locale={loc} />
                          <span>{localeNames[loc]}</span>
                        </Link>
                      ))}
                  </div>
                </div>
                
                {/* Mobile Contact Button */}
                <motion.a
                  href={contactLink.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  className="text-2xl font-medium text-white/90 transition-colors hover:text-white border-t border-zinc-800 pt-10 mt-2"
                >
                  {contactLink.name}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

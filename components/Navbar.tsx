"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    };
    window.addEventListener("scroll", handleScrollClose);
    return () => window.removeEventListener("scroll", handleScrollClose);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

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
        <div className="w-full max-w-7xl mx-auto px-10 flex items-center justify-between h-full">
          {/* Logo - Left Side */}
          <motion.a
            href="#"
            className="flex items-center gap-3 text-2xl font-bold text-white transition-opacity hover:opacity-80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="h-8 w-8 text-white" />
            WALLIE
          </motion.a>

          {/* Right Side: Navigation Links + Contact Button (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center gap-6 lg:gap-8">
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

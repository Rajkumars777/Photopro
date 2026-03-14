"use client";

import { Camera, Menu, X, ArrowRight, Zap, Sun, Moon, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { language, setLanguage, dict } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial theme check
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en');
  };

  const scrollTo = (href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "py-3 glass-strong border-b border-white/[0.07] shadow-[0_1px_60px_rgba(0,0,0,0.6)]"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between w-full">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-500 to-violet-600 p-2.5 rounded-xl text-white shadow-lg">
                <Camera size={22} strokeWidth={2.5} />
              </div>
            </div>
            <span className="font-black text-xl tracking-tight text-foreground">
              PHOTO<span className="gradient-text">PRO</span>
            </span>
          </motion.button>

          {/* Desktop CTA - Pushed to right via flex-1 on links container */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-200 group relative overflow-hidden"
              aria-label="Toggle Language"
            >
              <div className="relative z-10 flex items-center gap-1.5 text-slate-300 group-hover:text-white transition-colors text-sm font-semibold">
                <Globe size={16} />
                <span className="w-5 text-center">{language === 'en' ? 'EN' : 'JA'}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-200 group relative overflow-hidden"
              aria-label="Toggle Theme"
            >
              <div className="relative z-10">
                {theme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-slate-600" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <div className="flex items-center gap-1.5 badge badge-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online
            </div>
            <motion.button
              onClick={() => scrollTo("#automation-section")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
            >
              <Zap size={15} />
              {dict.nav.getStarted}
              <ArrowRight size={14} />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-xl glass text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              aria-label="Toggle Language"
            >
               <Globe size={18} />
               <span className="text-xs font-bold">{language === 'en' ? 'EN' : 'JA'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl glass text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-2xl p-4 border border-white/[0.1] shadow-2xl"
          >
            <div className="flex flex-col gap-1">
              <div className="border-t border-white/[0.07] my-2" />
              <button
                onClick={() => scrollTo("#automation-section")}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold text-center cursor-pointer flex items-center justify-center gap-2"
              >
                {dict.nav.getStarted} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

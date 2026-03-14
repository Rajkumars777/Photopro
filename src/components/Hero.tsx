"use client";

import { Play, ChevronRight, ArrowDown, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroFeatureBar from "./HeroFeatureBar";
import { useLanguage } from "@/i18n/LanguageContext";



export default function Hero() {
  const { dict } = useLanguage();

  const scrollToAutomation = () => {
    document.getElementById("automation-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-x-hidden pt-16 lg:pt-0">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 -left-64 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full bg-violet-600/8 blur-[140px] pointer-events-none" />

      {/* Main content — padded top to clear the fixed navbar */}
      <div className="relative max-w-[1280px] mx-auto px-8 pt-32 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ─── Left Column ─── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-7 flex-wrap"
            >
              <span className="badge badge-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {dict.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-foreground leading-[1.05] mb-6 tracking-tight xl:tracking-[-0.04em]">
              {dict.hero.title1}
              <br />
              <span className="gradient-text">{dict.hero.title2}</span>
              <br />
              {dict.hero.title3}
            </h1>

            <p className="text-base md:text-lg text-secondary max-w-lg mb-10 leading-relaxed font-medium">
              {dict.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.button
                onClick={scrollToAutomation}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden group flex items-center gap-2.5 px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-black text-base shadow-[0_20px_50px_-15px_rgba(59,130,246,0.5),0_10px_30px_-10px_rgba(139,92,246,0.3)] hover:shadow-[0_32px_70px_-15px_rgba(59,130,246,0.6)] transition-all cursor-pointer border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {dict.hero.ctaPrimary}
                <ChevronRight size={18} strokeWidth={3} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 text-secondary font-bold hover:text-foreground transition-all px-5 py-4 rounded-2xl glass border border-border group text-sm cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-surface flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                  <Play size={12} fill="currentColor" className="ml-0.5 text-foreground" />
                </span>
                {dict.hero.ctaSecondary}
              </motion.button>
            </div>


          </motion.div>

          {/* ─── Right Column — Hero Visual ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Ambient glow behind card */}
            <div className="absolute inset-12 bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent rounded-[3rem] blur-[70px]" />

            {/* Main image card — floating cards are INSIDE this wrapper */}
            <div className="relative w-full rounded-[2.5rem] overflow-hidden border-gradient card shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-violet-900/10 z-10" />

              {/* Image */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/hero_visual_premium_1773481923993.png"
                  alt="Photography Framing Interface"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#04061a]/70 to-transparent z-10" />
              </div>

              {/* Floating card — Pipeline Status (bottom-left inside image) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 z-20 glass-jewel rounded-2xl px-5 py-4 border border-white/20 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">Pipeline Status</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)] animate-pulse" />
                  <span className="text-sm font-black text-white tracking-tight">Active Engine</span>
                </div>
              </motion.div>

              {/* Floating card — Accuracy (top-right inside image) */}
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-6 right-6 z-20 glass-jewel rounded-2xl px-5 py-4 border border-white/20 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1.5">Accuracy</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black gradient-text">99.8%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">precision</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature Bar */}
        <HeroFeatureBar />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 text-slate-600 mt-14"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

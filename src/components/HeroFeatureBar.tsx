"use client";

import { UserRound, FileJson, LayoutTemplate, Layers, Users2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroFeatureBar() {
  const { dict } = useLanguage();

  const features = [
    { icon: UserRound, label: dict.features.pills.sorting, color: "from-blue-500/20 to-blue-600/10", text: "text-blue-400", border: "hover:border-blue-500/30" },
    { icon: FileJson, label: dict.features.pills.roster, color: "from-violet-500/20 to-violet-600/10", text: "text-violet-400", border: "hover:border-violet-500/30" },
    { icon: LayoutTemplate, label: dict.features.pills.layout, color: "from-cyan-500/20 to-cyan-600/10", text: "text-cyan-400", border: "hover:border-cyan-500/30" },
    { icon: Layers, label: dict.features.pills.batch, color: "from-indigo-500/20 to-indigo-600/10", text: "text-indigo-400", border: "hover:border-indigo-500/30" },
    { icon: Users2, label: dict.features.pills.grouping, color: "from-fuchsia-500/20 to-fuchsia-600/10", text: "text-fuchsia-400", border: "hover:border-fuchsia-500/30" },

  ];

  return (
    <div id="features" className="relative mt-20 pt-16 border-t border-border/40">
      {/* Background glow decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Centered Precision Features Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center gap-6 mb-12"
      >
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-blue-500/30 max-w-[100px]" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500/60 whitespace-nowrap">
          Precision Features
        </p>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-blue-500/30 max-w-[100px]" />
      </motion.div>

      <div className="flex flex-nowrap lg:justify-center overflow-x-auto pb-8 -mb-4 gap-3 lg:gap-5 w-full no-scrollbar snap-x scroll-smooth px-8 lg:px-0">
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.1 * index + 0.5,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className={`relative shrink-0 snap-start flex items-center gap-3.5 px-5 lg:px-7 py-4.5 rounded-2xl cursor-pointer
              glass-jewel border-border/30 hover:border-blue-500/40
              shadow-lg hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]
              group transition-all duration-500`}
          >
            {/* Ambient inner glow on hover */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 bg-gradient-to-br ${feature.color}`} />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 animate-shimmer" />
            </div>

            <div className={`relative p-2.5 rounded-xl bg-surface/50 ${feature.text} shadow-sm border border-white/5 group-hover:scale-110 group-hover:glow-blue transition-all duration-500`}>
              <feature.icon size={16} strokeWidth={2.5} />
            </div>
            
            <span className={`relative text-[13px] font-bold ${feature.text} opacity-80 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap tracking-wide`}>
              {feature.label}
            </span>

            {/* Bottom highlight streak */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
          </motion.div>
        ))}
        {/* Spacer for mobile scroll */}
        <div className="w-8 shrink-0 lg:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}

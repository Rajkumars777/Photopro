"use client";

import { UserRound, FileJson, LayoutTemplate, Layers, Users2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: UserRound,     label: "Student Sorting",  color: "from-blue-500/20 to-blue-600/10",   text: "text-blue-400",   border: "hover:border-blue-500/30" },
  { icon: FileJson,      label: "Roster Logic",     color: "from-violet-500/20 to-violet-600/10", text: "text-violet-400", border: "hover:border-violet-500/30" },
  { icon: LayoutTemplate,label: "Frame Layouts",   color: "from-cyan-500/20 to-cyan-600/10",    text: "text-cyan-400",   border: "hover:border-cyan-500/30" },
  { icon: Layers,        label: "Batch Framing",    color: "from-indigo-500/20 to-indigo-600/10", text: "text-indigo-400", border: "hover:border-indigo-500/30" },
  { icon: Users2,        label: "Smart Grouping",   color: "from-fuchsia-500/20 to-fuchsia-600/10", text: "text-fuchsia-400", border: "hover:border-fuchsia-500/30" },
  { icon: Sparkles,      label: "Auto Branding",    color: "from-amber-500/20 to-amber-600/10",  text: "text-amber-400",  border: "hover:border-amber-500/30" },
];

export default function HeroFeatureBar() {
  return (
    <div id="features" className="mt-20 pt-10 border-t border-border/40">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="w-8 h-[1px] bg-gradient-to-r from-blue-500 to-transparent" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/80">
          Precision Features
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-4">
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
            className={`relative flex items-center gap-3.5 px-6 py-4 rounded-2xl cursor-pointer
              glass-jewel border-border/30 hover:border-blue-500/40
              shadow-lg hover:shadow-2xl
              group transition-all duration-500 overflow-hidden`}
          >
            {/* Ambient inner glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${feature.color}`} />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 animate-shimmer" />
            </div>

            <div className={`relative p-2 rounded-xl bg-surface/50 ${feature.text} shadow-sm group-hover:scale-110 group-hover:glow-blue transition-all duration-500`}>
              <feature.icon size={15} strokeWidth={2.5} />
            </div>
            
            <span className={`relative text-[13px] font-bold ${feature.text} opacity-70 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap tracking-wide`}>
              {feature.label}
            </span>

            {/* Bottom highlight streak */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

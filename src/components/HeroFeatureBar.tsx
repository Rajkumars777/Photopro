"use client";

import { UserRound, FileJson, LayoutTemplate, Layers, Users2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: UserRound, label: "Student Sorting" },
  { icon: FileJson, label: "Roster Logic" },
  { icon: LayoutTemplate, label: "Frame Layouts" },
  { icon: Layers, label: "Batch Framing" },
  { icon: Users2, label: "Smart Grouping" },
  { icon: Sparkles, label: "Auto Branding" },
];

export default function HeroFeatureBar() {
  return (
    <div className="mt-16">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6 ml-1">Discover popular features</p>
      <div className="flex flex-wrap gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 px-5 py-3.5 bg-slate-900/50 border border-slate-800 rounded-2xl card-shadow group cursor-pointer hover:border-blue-900 transition-all duration-300"
          >
            <div className="bg-slate-800 p-2 rounded-xl text-slate-400 group-hover:bg-blue-900/30 group-hover:text-brand-blue transition-all duration-300">
              <feature.icon size={16} />
            </div>
            <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
              {feature.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

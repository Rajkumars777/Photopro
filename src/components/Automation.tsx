"use client";

import { 
  Cpu, Sparkles, Fingerprint, Search, Layers, Download, 
  CheckCircle2, Zap, ArrowRight, ShieldCheck, Camera, Move
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Automation() {
  const { dict } = useLanguage();

  const features = [
    {
      title: "High-Volume Pipeline",
      desc: "Full-cycle automation from raw capture (RGB) to production-ready (CMYK) folders with zero manual touchpoints.",
      icon: Cpu,
      color: "blue",
      tag: "AUTOMATED"
    },
    {
      title: "AI Face Normalization",
      desc: "Intelligent centering, rotation correction, and uniform cropping for perfectly aligned student portraits every time.",
      icon: Move,
      color: "violet",
      tag: "AI CO-PILOT"
    },
    {
      title: "Smart Roster Matching",
      desc: "Advanced biometric and tag detection to seamlessly link student identities with their processed photos.",
      icon: Fingerprint,
      color: "emerald",
      tag: "INSTANT"
    },
    {
      title: "Instant Content Search",
      desc: "Locate specific individuals across PDF yearbooks, large albums, and complex group event photos in seconds.",
      icon: Search,
      color: "orange",
      tag: "POWERFUL"
    },
    {
      title: "Quality Normalization",
      desc: "Machine-learning driven color and brightness equalization for absolute uniformity across entire school batches.",
      icon: Sparkles,
      color: "pink",
      tag: "PRECISION"
    },
    {
      title: "Production Exports",
      desc: "One-click generation of InDesign packages, formatted spreadsheets, and forensic exception reports.",
      icon: Download,
      color: "cyan",
      tag: "READY"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  return (
    <section id="automation-section" className="relative w-full py-24 lg:py-40">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1440px] pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-8 w-full">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Zap size={12} className="fill-current" />
            Core Architecture
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight"
          >
            Engineered for <span className="gradient-text">Absolute Precision</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 font-medium leading-relaxed"
          >
            Our core engine automates the most complex parts of the school photography pipeline, 
            allowing your team to focus on creativity while we handle the data.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card Decoration */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br from-${feature.color}-500/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-500`} />
              
              <div className="relative h-full glass-jewel rounded-[2.5rem] p-9 border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col items-start shadow-2xl overflow-hidden bg-black/40">
                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-${feature.color}-500/20 transition-all duration-500`}>
                  <feature.icon className={`text-${feature.color}-400 group-hover:text-${feature.color}-300`} size={28} strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3 group-hover:text-slate-400 transition-colors">
                    {feature.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-white/5 w-full flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-${feature.color}-500/70 group-hover:text-${feature.color}-400 transition-colors`}>
                    {feature.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <ArrowRight size={14} />
                  </div>
                </div>

                {/* Subtle Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Stats bar - Subtle footer for the section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 py-10 px-12 glass rounded-[3rem] border-white/5 flex flex-wrap items-center justify-center gap-12 lg:gap-24"
        >
          {[
            { label: "Processing Speed", val: "1.2s/image", icon: Zap },
            { label: "Matching Accuracy", val: "99.98%", icon: ShieldCheck },
            { label: "Active Nodes", val: "Global Edge", icon: Camera }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{stat.label}</div>
                <div className="text-lg font-black text-white tracking-tight">{stat.val}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

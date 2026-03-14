"use client";

import { Play, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroFeatureBar from "./HeroFeatureBar";

export default function Hero() {
  const scrollToAutomation = () => {
    const element = document.getElementById("automation-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-8 pt-8 pb-16 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
            Perfecting student <br />
            photo <span className="text-brand-blue">Framing</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
            A high-precision photography pipeline for schools. Scale your workflow with automated student roster matching and AI-powered frame generation.
          </p>
          
          <div className="flex flex-wrap items-center gap-5">
            <button 
              onClick={scrollToAutomation}
              className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-2 shadow-[0_15px_30px_-5px_rgba(0,112,243,0.3)] hover:scale-105 transition-all cursor-pointer active:scale-95"
            >
              Launch Automation <ChevronRight size={18} strokeWidth={2.5} />
            </button>
            
            <button className="flex items-center gap-3 text-slate-400 font-bold hover:text-white transition-all px-4 py-2 group text-sm">
              <span className="bg-slate-800 shadow-sm p-2 rounded-full group-hover:scale-110 transition-all">
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </span>
              Platform workflow
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-300/10 rounded-[3rem] blur-[80px] -z-10"></div>
          <div className="w-full relative rounded-[2.5rem] overflow-hidden card-shadow glass-card p-3 aspect-[4/3]">
            <Image
              src="/hero_visual_premium_1773481923993.png"
              alt="Photography Framing Interface"
              fill
              className="object-cover rounded-[2rem]"
              priority
            />
          </div>
        </motion.div>
      </div>

      <HeroFeatureBar />
    </section>
  );
}

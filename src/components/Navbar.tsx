"use client";

import { Camera, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto w-full relative z-50">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 group cursor-pointer" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="bg-brand-blue p-2.5 rounded-xl text-white shadow-[0_10px_20px_-5px_rgba(0,112,243,0.3)] group-hover:scale-110 transition-transform">
          <Camera size={24} strokeWidth={2.5} />
        </div>
        <span className="font-black text-2xl tracking-tight text-white transition-colors">PHOTOPRO</span>
      </motion.div>
    </nav>
  );
}

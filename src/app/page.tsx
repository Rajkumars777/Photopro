import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Automation from "@/components/Automation";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Automation />

      {/* Premium Footer */}
      <footer className="border-t border-white/[0.06] mt-12">
        <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-2 rounded-xl text-white">
              <Camera size={18} strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg text-white tracking-tight">
              PHOTO<span className="text-blue-400">PRO</span>
            </span>
          </div>
          <p className="text-sm text-slate-600 font-medium">
            © {new Date().getFullYear()} PhotoPro. Built for schools that demand precision.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </footer>
    </main>
  );
}

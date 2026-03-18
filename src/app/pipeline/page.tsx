"use client";

import React, { useState } from "react";
import {
  LayoutDashboard, Settings, Upload, Users, Image as ImageIcon, Sparkles,
  CheckCircle2, Fingerprint, AlertCircle, Download, Search, FileText,
  ChevronRight, Camera, Move, RotateCcw, Palette, Layers, ListChecks,
  Focus, ArrowUp, Maximize
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

type ScreenId =
  | 'flow' | 'setup' | 'upload' | 'roster' | 'evoto'
  | 'quality' | 'bestshot' | 'match' | 'align' | 'exc'
  | 'export' | 'pdfsearch' | 'group' | 'meibo';

export default function PipelinePage() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('flow');

  const SidebarItem = ({ id, icon: Icon, label, badge, dotColor, external }: {
    id: ScreenId, icon: any, label: string, badge?: string, dotColor?: string, external?: boolean
  }) => {
    const isActive = activeScreen === id;

    return (
      <motion.div
        onClick={() => setActiveScreen(id)}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-all relative group ${isActive
          ? "text-blue-400 font-bold bg-blue-500/5"
          : "text-slate-400 hover:text-slate-200"
          }`}
      >
        {isActive && (
          <motion.div
            layoutId="active-pill"
            className="absolute left-0 top-1 bottom-1 w-1 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
          />
        )}

        {dotColor ? (
          <div className="w-2 h-2 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: dotColor }} />
        ) : (
          <Icon size={16} className={`shrink-0 transition-colors ${isActive ? "text-blue-400" : "group-hover:text-slate-200"}`} />
        )}

        <span className="truncate">{label}</span>

        {badge && (
          <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${external ? "badge-violet" : "badge-blue"
            }`}>
            {badge}
          </span>
        )}
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-20 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 glass-strong border-r border-white/5 flex flex-col overflow-y-auto no-scrollbar shrink-0 z-10">
          <div className="p-6 border-b border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30">
              <Camera size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-tight gradient-text">PHOTO ENGINE</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">v2.4.0 <span className="text-[8px] text-emerald-500/50 ml-1">STABLE</span></span>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-1">
            <div className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Overview</div>
            <SidebarItem id="flow" icon={LayoutDashboard} label="Full workflow" dotColor="#888780" />

            <div className="mt-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Setup & upload</div>
            <SidebarItem id="setup" icon={Settings} label="1. Project setup" dotColor="#378ADD" />
            <SidebarItem id="upload" icon={Upload} label="2. Photo upload" dotColor="#378ADD" />
            <SidebarItem id="roster" icon={Users} label="3. Roster import" dotColor="#378ADD" />

            <div className="mt-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Correction</div>
            <SidebarItem id="evoto" icon={Palette} label="4. EVOTO handoff" badge="EXTERNAL" external dotColor="#D4537E" />
            <SidebarItem id="quality" icon={Sparkles} label="5. AI quality correction" dotColor="#D4537E" />
            <SidebarItem id="bestshot" icon={ListChecks} label="6. Best shot selection" dotColor="#D4537E" />

            <div className="mt-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Naming & export</div>
            <SidebarItem id="match" icon={Fingerprint} label="7. Match & auto-name" badge="3" dotColor="#378ADD" />
            <SidebarItem id="align" icon={Move} label="8. Face alignment" dotColor="#378ADD" />
            <SidebarItem id="exc" icon={AlertCircle} label="9. Exceptions" badge="2" dotColor="#378ADD" />
            <SidebarItem id="export" icon={Download} label="10. Export to InDesign" dotColor="#378ADD" />

            <div className="mt-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Additional</div>
            <SidebarItem id="pdfsearch" icon={Search} label="PDF person search" dotColor="#1D9E75" />
            <SidebarItem id="group" icon={ImageIcon} label="Group photo search" dotColor="#D85A30" />


            <SidebarItem id="meibo" icon={FileText} label="Roster Auto-Generation" dotColor="#7F77DD" />
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-12 bg-[#04061a]/60 relative custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderScreen(activeScreen, setActiveScreen)}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}

function renderScreen(screen: ScreenId, setScreen: (s: ScreenId) => void) {
  switch (screen) {
    case 'flow': return <WorkflowOverview setScreen={setScreen} />;
    case 'setup': return <ProjectSetup setScreen={setScreen} />;
    case 'upload': return <PhotoUpload setScreen={setScreen} />;
    case 'roster': return <RosterImport setScreen={setScreen} />;
    case 'evoto': return <EvotoHandoff setScreen={setScreen} />;
    case 'quality': return <QualityCorrection setScreen={setScreen} />;
    case 'bestshot': return <BestShotSelection setScreen={setScreen} />;
    case 'match': return <MatchAndName setScreen={setScreen} />;
    case 'align': return <FaceAlignment setScreen={setScreen} />;
    case 'exc': return <Exceptions setScreen={setScreen} />;
    case 'export': return <ExportToInDesign setScreen={setScreen} />;
    case 'pdfsearch': return <PdfPersonSearch />;
    case 'group': return <GroupPhotoSearch />;
    case 'meibo': return <MeiboGeneration />;
    default: return <WorkflowOverview setScreen={setScreen} />;
  }
}

// Sub-components for each screen follow...

function WorkflowOverview({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  const steps = [
    { id: 'setup', num: 1, title: "Project setup", desc: "Staff enters school name, year, class count, photographer name manually.", tag: "Staff types manually", color: "bg-blue-500" },
    { id: 'upload', num: 2, title: "Photo upload", desc: "Upload all RAW / original RGB photos. AI detects faces and reads number-tags (Tag).", tag: "Original RGB files", color: "bg-blue-500" },
    { id: 'roster', num: 3, title: "Roster import", desc: "Import student name list from Excel, PDF, or scanned sheet. AI extracts attendance number and name.", tag: "Excel / PDF / Scan", color: "bg-blue-500" },
    { id: 'evoto', num: 4, title: "EVOTO — colour correction & RGB→CMYK", desc: "Run EVOTO on network. Resize photos, convert RGB→CMYK and apply tone correction.", tag: "External tool", color: "bg-violet-500", special: true },
    { id: 'quality', num: 5, title: "AI quality correction", desc: "AI corrects brightness and colour uniformity across all CMYK photos in batch.", tag: "Works on CMYK files", color: "bg-pink-500" },
    { id: 'bestshot', num: 6, title: "Best shot selection", desc: "AI selects the best Main cut per student from the corrected CMYK photos.", tag: "Post-EVOTO step", color: "bg-pink-500" },
    { id: 'match', num: 7, title: "Match & auto file naming", desc: "AI matches each student to their corrected, selected photos and renames files.", tag: "Final corrected files", color: "bg-emerald-500" },
    { id: 'align', num: 8, title: "Face alignment & crop", desc: "AI centres face, levels shoulder angle, applies uniform crop.", tag: "Position only", color: "bg-blue-500" },
    { id: 'exc', num: 9, title: "Exceptions", desc: "Review any unresolved cases — missing tags, face mismatches, absent students.", tag: "Manual review", color: "bg-amber-500" },
    { id: 'export', num: 10, title: "Export to InDesign", desc: "Download ZIP package. Files are corrected (CMYK), named, cropped.", tag: "Ready for InDesign", color: "bg-emerald-500" },
  ];

  return (
    <div className="pb-12">
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black mb-3 text-white tracking-tight"
        >
          Full workflow — <span className="gradient-text">corrected order</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-slate-400 font-medium"
        >
          EVOTO and quality correction now run before best shot selection and file naming.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6 relative">
        {/* Animated Connector Line */}
        <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 opacity-20" />

        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            className="relative pl-16 group"
          >
            {/* Number Indicator */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl ${step.color} shadow-lg flex items-center justify-center text-lg font-black border-4 border-[#04061a] z-10 group-hover:scale-110 transition-transform duration-300`}>
              {step.num}
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Step Card */}
            <div className={`glass-jewel p-6 rounded-[2rem] border-white/5 hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-${step.color.split('-')[1]}-500/10 flex items-center gap-6 cursor-pointer group/card`} onClick={() => setScreen(step.id as ScreenId)}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover/card:text-blue-400 transition-colors">{step.title}</h3>
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] ${step.special ? "badge-violet" : "badge-blue"
                    }`}>
                    {step.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-2">{step.desc}</p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover/card:bg-blue-500 group-hover/card:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectSetup({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 1 — <span className="text-blue-400">Project setup</span></h2>
        <p className="text-sm text-slate-400 font-medium">Define school details to automate folder and file naming across the pipeline.</p>
      </div>

      <div className="glass-jewel rounded-[2.5rem] p-10 border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />

        <div className="grid grid-cols-2 gap-8 mb-10">
          {[
            { label: "School name", value: "Greenwood JS", icon: Camera },
            { label: "School year", value: "2026", icon: Layers },
            { label: "Grade", value: "Grade 9", icon: Users },
            { label: "Classes", value: "3A · 3B · 3C", icon: LayoutDashboard },
            { label: "Photographer", value: "Yamamoto", icon: Camera },
          ].map(field => (
            <div key={field.label} className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                <field.icon size={12} className="text-blue-500/50" />
                {field.label}
              </label>
              <input
                type="text"
                defaultValue={field.value}
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-semibold hover:bg-white/[0.07]"
              />
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Sparkles size={12} className="text-blue-500/50" />
              Album type
            </label>
            <div className="relative group/select">
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-semibold appearance-none hover:bg-white/[0.07] cursor-pointer">
                <option>Individual + Club</option>
                <option>Individual only</option>
              </select>
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-hover/select:text-white transition-colors rotate-90" size={16} />
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-3xl p-6 flex gap-5 items-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-blue-400 mb-1">Intelligent naming system online</div>
            <p className="text-xs text-blue-400/60 leading-relaxed font-semibold">GreenwoodJS_2026_3A / 3B / 3C · 01_Tanaka_Main_1.jpg</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('upload')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Continue to Upload <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function PhotoUpload({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 2 — <span className="text-amber-400">Photo upload</span></h2>
        <p className="text-sm text-slate-400 font-medium">Ingest original high-resolution RGB photos for initial processing.</p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2rem] p-6 flex gap-6 items-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
          <AlertCircle className="text-white" size={28} />
        </div>
        <div>
          <div className="text-base font-bold text-amber-500 mb-1">Original RGB source files required</div>
          <p className="text-sm text-amber-500/60 leading-relaxed font-semibold">Do NOT upload EVOTO-processed files yet. This pipeline expects raw captures for matching.</p>
        </div>
      </div>

      <motion.div
        whileHover={{ borderColor: 'rgba(59,130,246,0.3)', backgroundColor: 'rgba(59,130,246,0.02)' }}
        className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center flex flex-col items-center gap-6 cursor-pointer transition-all group relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
          <Upload className="text-slate-400 group-hover:text-blue-400" size={40} />
        </div>
        <div>
          <div className="text-xl font-black mb-2">Drop photo folder here</div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Supports JPG · TIFF · PNG</p>
        </div>
      </motion.div>

      <div className="glass-jewel rounded-[2rem] overflow-hidden border-white/5 shadow-2xl">
        {[
          { folder: "3A — 98 photos", status: "Done", type: "JPG", color: "text-emerald-400", bg: "badge-emerald" },
          { folder: "3B — 92 photos", status: "Done", type: "JPG", color: "text-emerald-400", bg: "badge-emerald" },
          { folder: "3C — 202 photos", status: "Processing...", type: "JPG", color: "text-amber-400", bg: "badge-blue", progress: 60 },
        ].map((f, i) => (
          <div key={i} className="px-8 py-6 flex items-center gap-6 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-slate-500">
              {f.type}
            </div>
            <div className="flex-1">
              <div className="text-base font-bold mb-1">{f.folder}</div>
              {f.progress ? (
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500" /> Fully indexed
                </div>
              )}
            </div>
            <span className={`badge ${f.bg} font-black`}>
              {f.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('setup')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('roster')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Next: Roster Import <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function RosterImport({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 3 — <span className="text-blue-400">Roster import</span></h2>
        <p className="text-sm text-slate-400 font-medium">Link student identities to the pipeline via automated roster indexing.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[
          { icon: FileText, title: "Excel / CSV", desc: "Structured data", color: "blue" },
          { icon: Layers, title: "PDF / Scanned", desc: "AI-powered OCR", color: "violet" },
        ].map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, borderColor: 'rgba(59,130,246,0.2)' }}
            className="glass-jewel rounded-[2rem] p-8 text-center flex flex-col items-center gap-4 hover:bg-white/[0.04] transition-all cursor-pointer group border-white/5"
          >
            <div className={`w-16 h-16 rounded-2xl bg-${p.color}-500/10 border border-${p.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-all`}>
              <p.icon className={`text-${p.color}-400`} size={32} />
            </div>
            <div className="text-lg font-black">{p.title}</div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-jewel rounded-[2rem] overflow-hidden border-white/5 shadow-2xll">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-8 py-6">No.</th>
                <th className="px-8 py-6">Full Name</th>
                <th className="px-8 py-6">Source Type</th>
                <th className="px-8 py-6 text-right">OCR Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: "01", last: "Tanaka", first: "Hanako", src: "Excel", conf: "Verified", color: "badge-emerald" },
                { id: "02", last: "Sato", first: "Ichiro", src: "Excel", conf: "Verified", color: "badge-emerald" },
                { id: "03", last: "Yamada", first: "Misaki", src: "OCR", conf: "High", color: "badge-blue" },
                { id: "04", last: "Suzuki", first: "Kenta", src: "OCR", conf: "Check", color: "badge-violet" },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-8 py-5 font-mono text-blue-400 font-bold">{r.id}</td>
                  <td className="px-8 py-5 font-bold text-white group-hover:text-blue-400 transition-colors">{r.last} {r.first}</td>
                  <td className="px-8 py-5 text-slate-500 font-semibold">{r.src}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`badge ${r.color} font-black`}>{r.conf}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('upload')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('evoto')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Confirm Roster <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function EvotoHandoff({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 4 — <span className="text-violet-400">EVOTO colour correction</span></h2>
        <p className="text-sm text-slate-400 font-medium">Complete the RGB to CMYK transition and tone adjustment on the local network.</p>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-[2rem] p-8 flex gap-8 items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-3xl -z-10 group-hover:bg-violet-600/20 transition-all duration-700" />
        <div className="w-16 h-16 rounded-2xl bg-violet-600 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center shrink-0 border border-violet-400/30">
          <Palette size={28} className="text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-violet-400 mb-2">Architectural Requirement</div>
          <p className="text-sm text-violet-400/60 leading-relaxed font-semibold max-w-2xl">
            EVOTO transforms the fundamental pixel data (RGB→CMYK). To ensure AI scoring accuracy, best shot selection must target the finalized CMYK output.
          </p>
        </div>
      </div>

      <div className="glass-jewel rounded-[2.5rem] p-10 border-white/5 shadow-2xl">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">EVOTO Network Checklist</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Standardize Resize", desc: "Batch resize to production specs" },
            { title: "CMYK Conversion", desc: "Convert RGB profiles to Fogra39" },
            { title: "Tone Normalization", desc: "Equalize white balance & exposure" },
            { title: "Folder Sync", desc: "Save output to the pipeline sync folder" },
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] cursor-pointer transition-all border border-transparent hover:border-white/10 group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="w-6 h-6 rounded-lg bg-white/5 border-white/20 text-violet-500 focus:ring-violet-500/40 appearance-none border-2 checked:bg-violet-500 transition-all cursor-pointer" />
                <CheckCircle2 size={14} className="absolute text-white pointer-events-none opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{item.title}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('roster')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('quality')}
          className="bg-violet-600 hover:bg-violet-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(139,92,246,0.2)] border border-violet-400/30"
        >
          Confirm Handoff <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function QualityCorrection({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 5 — <span className="text-pink-400">AI quality correction</span></h2>
        <p className="text-sm text-slate-400 font-medium">Synchronize brightness and color uniformity across all production CMYK files.</p>
      </div>

      <div className="bg-pink-500/10 border border-pink-500/20 rounded-[2.5rem] p-8 flex gap-8 items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/10 blur-[100px] -z-10 animate-pulse" />
        <div className="w-16 h-16 rounded-2xl bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)] flex items-center justify-center shrink-0 border border-pink-400/30">
          <Sparkles size={28} className="text-white" />
        </div>
        <div>
          <div className="text-lg font-bold text-pink-400 mb-1">Batch CMYK Normalization</div>
          <p className="text-sm text-pink-400/60 leading-relaxed font-semibold">
            Fine-tunes the output of Step 4. AI detects subtle variations in lighting and white balance that external tools might miss during batch processing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Uniformity OK", val: "79", color: "text-emerald-400", glow: "shadow-emerald-500/20" },
          { label: "Outliers Found", val: "4", color: "text-amber-400", glow: "shadow-amber-500/20" },
          { label: "Total Indexed", val: "83", color: "text-white", glow: "shadow-white/5" },
        ].map(stat => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className={`glass-jewel rounded-[2rem] p-8 text-center border-white/5 shadow-xl ${stat.glow}`}
          >
            <div className={`text-5xl font-black mb-2 tracking-tighter ${stat.color}`}>{stat.val}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Visual Quality Audit</h3>
        <div className="flex gap-2">
          <button className="badge badge-blue">Auto-correct on</button>
          <button className="badge bg-white/5 text-slate-400 border-white/10">Show original</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {[
          { name: "Hanako Tanaka", delta: "+12% brightness", status: "ok" },
          { name: "Ichiro Sato", delta: "Tone balanced", status: "ok" },
          { name: "Misaki Yamada", delta: "+38% deviation", status: "warn" },
          { name: "Kenta Suzuki", delta: "Consistency OK", status: "ok" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            className={`glass-jewel rounded-[2.5rem] overflow-hidden border-white/5 transition-all group ${item.status === 'warn' ? 'ring-2 ring-amber-500/40' : ''}`}
          >
            <div className="flex h-48 border-b border-white/5 relative">
              <div className="flex-1 bg-white/[0.02] flex flex-col items-center justify-center gap-3 border-r border-white/5">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <ImageIcon size={18} className="text-slate-500" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Uncorrected</span>
              </div>
              <div className={`flex-1 flex flex-col items-center justify-center gap-3 relative overlow-hidden ${item.status === 'warn' ? 'bg-amber-500/5' : 'bg-emerald-500/5'}`}>
                {item.status !== 'warn' && <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${item.status === 'warn' ? 'bg-amber-500 shadow-amber-500/40' : 'bg-emerald-500 shadow-emerald-500/40'}`}>
                  {item.status === 'warn' ? <AlertCircle size={22} className="text-white" /> : <Sparkles size={22} className="text-white" />}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'warn' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {item.status === 'warn' ? 'Verify Shift' : 'AI Normalized'}
                </span>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center bg-black/20">
              <div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.name}</div>
                <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${item.status === 'warn' ? 'text-amber-500' : 'text-slate-500'}`}>{item.delta}</div>
              </div>
              <button className="badge badge-blue group-hover:bg-blue-600 group-hover:text-white transition-all">Audit</button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('evoto')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('bestshot')}
          className="bg-pink-600 hover:bg-pink-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] border border-pink-400/30"
        >
          Proceed to Best Shot <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function BestShotSelection({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-black mb-2">Step 6 — Best shot selection</h2>
        <p className="text-sm text-slate-400">AI selects the best Main cut from the corrected CMYK photos. Override any pick by clicking.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h3 className="text-base font-bold mb-6 flex items-center gap-2">
          Hanako Tanaka — No.01 <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">corrected CMYK</span>
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {[
            { tag: "Best", score: 94, label: "Main_1 · AI pick", status: "pick" },
            { tag: null, score: 88, label: "Main_2", status: "ok" },
            { tag: "Eyes closed", score: null, label: "Rejected", status: "rej" },
            { tag: null, score: 76, label: "Main_4", status: "ok" },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white/[0.02] ${s.status === 'pick' ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105' :
              s.status === 'rej' ? 'border-rose-500/30 opacity-60' : 'border-transparent hover:border-white/10'
              }`}>
              <div className={`aspect-[3/4] flex flex-col items-center justify-center gap-2 ${s.status === 'rej' ? 'bg-rose-500/10' : 'bg-white/5'}`}>
                <ImageIcon size={32} className={s.status === 'pick' ? 'text-blue-400' : s.status === 'rej' ? 'text-rose-400' : 'text-slate-600'} />
                {s.tag && <span className={`text-[8px] font-black uppercase tracking-widest ${s.status === 'pick' ? 'text-blue-500' : 'text-rose-500'}`}>{s.tag}</span>}
              </div>
              <div className="p-3">
                {s.score && <div className={`text-xs font-black ${s.status === 'pick' ? 'text-emerald-400' : 'text-slate-400'}`}>Score: {s.score}</div>}
                <div className="text-[9px] text-slate-500 font-bold">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen('quality')} className="text-slate-400 hover:text-white font-bold p-4">← Back</button>
        <button
          onClick={() => setScreen('match')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-blue-500/20"
        >
          Continue to file naming <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function MatchAndName({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-black mb-2">Step 7 — Match & auto file naming</h2>
        <p className="text-sm text-slate-400">AI matches each student to their corrected, selected photos and renames all files. Folders created per class.</p>
      </div>

      <div className="glass rounded-3xl p-6 border-white/10 shadow-xl overflow-hidden">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">File naming preview</h3>
        <div className="flex flex-col gap-px bg-white/5">
          {[
            { old: "IMG_0042.jpg", arrow: "→", new: "01_Tanaka_Tag.jpg" },
            { old: "IMG_0043.jpg", arrow: "→", new: "01_Tanaka_Main_1.jpg", highlight: true },
            { old: "IMG_0044.jpg", arrow: "→", new: "01_Tanaka_Main_2.jpg" },
            { old: "IMG_0051.jpg", arrow: "→", new: "02_Sato_Tag.jpg" },
          ].map((n, i) => (
            <div key={i} className="flex items-center gap-6 px-4 py-3 bg-black/40 hover:bg-white/[0.02] transition-all">
              <span className="text-xs font-mono text-slate-500 flex-1">{n.old}</span>
              <ChevronRight size={12} className="text-slate-700" />
              <span className={`text-xs font-mono flex-1 ${n.highlight ? 'text-blue-400 font-bold' : 'text-emerald-400'}`}>{n.new}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {[
          { name: "Hanako Tanaka", id: "01", status: "ok" },
          { name: "Ichiro Sato", id: "02", status: "ok" },
          { name: "Misaki Yamada", id: "03", status: "warn" },
          { name: "Kenta Suzuki", id: "04", status: "ok" },
          { name: "Sakura Ito", id: "05", status: "warn" },
          { name: "Taro Watanabe", id: "06", status: "ok" },
        ].map((s, i) => (
          <div key={i} className={`glass rounded-2xl p-3 text-center border-white/10 hover:border-white/20 transition-all cursor-pointer ${s.status === 'warn' ? 'ring-1 ring-amber-500/30' : ''}`}>
            <div className={`aspect-square rounded-xl flex items-center justify-center mb-2 relative ${s.status === 'warn' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              <ImageIcon size={20} />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center text-[8px] font-black ${s.status === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'} text-white`}>
                {s.status === 'warn' ? '!' : '✓'}
              </div>
            </div>
            <div className="text-[10px] font-bold truncate">{s.name}</div>
            <div className="text-[8px] text-slate-500">{s.id} · {s.status === 'warn' ? 'check' : 'named'}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setScreen('bestshot')} className="text-slate-400 hover:text-white font-bold p-4">← Back</button>
        <button
          onClick={() => setScreen('align')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-blue-500/20"
        >
          Continue to face alignment <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function FaceAlignment({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 8 — <span className="text-blue-400">Face alignment & crop</span></h2>
        <p className="text-sm text-slate-400 font-medium tracking-tight">Final fine-tuning of face centering, rotation, and chin-to-crown scaling.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="glass-jewel rounded-[2.5rem] bg-black p-4 relative aspect-square border-white/5 shadow-2xl group overflow-hidden">
            {/* Alignment Grid Overlay */}
            <div className="absolute inset-4 border border-blue-500/20 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-px h-full bg-blue-500/20" />
              <div className="w-full h-px bg-blue-500/20 absolute" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-blue-500/30 rounded-full" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/5 transition-all duration-700">
                <Users size={48} className="text-slate-700 group-hover:text-blue-500/50 transition-colors" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Preview Target</div>
            </div>

            <div className="absolute top-8 left-8 flex gap-2">
              <span className="badge badge-blue">Alignment On</span>
              <span className="badge badge-violet">Face Detected</span>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <div className="glass-jewel rounded-[2rem] p-8 border-white/5 shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
              <Move size={12} className="text-blue-500" /> Currently Adjusting
            </h3>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ImageIcon size={24} className="text-slate-400" />
              </div>
              <div>
                <div className="text-xs font-black text-blue-400 tracking-widest mb-1 leading-none">ID #01</div>
                <div className="text-lg font-black text-white tracking-tight leading-none uppercase">Hanako Tanaka</div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {[
                { label: "Vertical Pos", icon: Move, val: "0" },
                { label: "Face Scale", icon: Sparkles, val: "100" },
                { label: "Rotation", icon: RotateCcw, val: "0" },
              ].map((c, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                      <c.icon size={12} className="text-blue-500/50" />
                      {c.label}
                    </label>
                    <span className="text-[10px] font-black text-blue-400">{c.val}%</span>
                  </div>
                  <div className="relative h-6 flex items-center group/slider">
                    <div className="absolute inset-x-0 h-1 bg-white/10 rounded-full" />
                    <div className="absolute inset-y-0 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500 cursor-pointer group-hover/slider:scale-125 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all shadow-lg"
          >
            Apply to All in Class
          </motion.button>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('match')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('exc')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Confirm Alignment <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function Exceptions({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 9 — <span className="text-amber-400">Exception handling</span></h2>
        <p className="text-sm text-slate-400 font-medium tracking-tight">Resolve conflicts between roster data and photo uploads to ensure zero-error export.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {[
          { icon: AlertCircle, label: "Missing photos", count: "2", color: "amber" },
          { icon: Users, label: "Names not in roster", count: "0", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className={`glass-jewel rounded-[2rem] p-8 border-white/5 flex items-center gap-6 shadow-xl`}>
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0`}>
              <stat.icon size={28} className={stat.color === 'amber' ? 'text-amber-500' : 'text-emerald-500'} />
            </div>
            <div>
              <div className="text-3xl font-black text-white leading-none mb-1">{stat.count}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-jewel rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
        {[
          { id: "03", name: "Misaki Yamada", issue: "No photo linked to this ID", action: "Search library" },
          { id: "09", name: "Hiroto Ogawa", issue: "Photo blurred - AI rejected", action: "Manual override" },
        ].map((item, i) => (
          <div key={i} className="px-8 py-8 flex items-center gap-8 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <AlertCircle size={24} className="text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-500 mb-1 flex items-center gap-2 tracking-widest">
                ID #{item.id} <span className="w-1 h-1 rounded-full bg-amber-500" /> ALERT
              </div>
              <div className="text-xl font-bold text-white mb-2">{item.name}</div>
              <p className="text-sm text-slate-500 font-medium leading-tight">{item.issue}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white font-black px-6 py-4 rounded-[1.25rem] text-[10px] uppercase tracking-widest transition-all border border-white/10 shadow-lg"
            >
              {item.action}
            </motion.button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('align')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('export')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Proceed to Export <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}

function ExportToInDesign({ setScreen }: { setScreen: (s: ScreenId) => void }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Step 10 — <span className="text-emerald-400">Export finalized packages</span></h2>
        <p className="text-sm text-slate-400 font-medium">Generate production-ready folders and class-level InDesign assets.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {[
          { label: "Finalized Files", val: "81", color: "text-emerald-400" },
          { label: "Active Exceptions", val: "2", color: "text-amber-400" },
        ].map(stat => (
          <div key={stat.label} className="glass-jewel rounded-[2rem] p-10 text-center border-white/5 shadow-xl">
            <div className={`text-6xl font-black mb-2 tracking-tighter ${stat.color}`}>{stat.val}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {[
          { icon: "ID", color: "bg-emerald-500", text: "InDesign package — per-class folders", sub: "CMYK · corrected · named · cropped" },
          { icon: "XLS", color: "bg-blue-500", text: "Student data spreadsheet", sub: "No. · Name · File names · Exceptions" },
          { icon: "RPT", color: "bg-amber-500", text: "Exception report", sub: "2 unresolved items with recommended actions" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 8 }}
            className="glass-strong rounded-[2.5rem] p-8 border-white/10 flex items-center gap-8 group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-2xl ${item.color} shadow-lg flex items-center justify-center text-white font-black text-xl shrink-0 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.text}</div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{item.sub}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-white/10 group-hover:text-white transition-all">
              <Download size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/5">
        <button onClick={() => setScreen('exc')} className="text-slate-400 hover:text-white font-bold px-6 py-2 transition-colors flex items-center gap-2">
          <RotateCcw size={16} /> Previous
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-12 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-400/30"
        >
          Finalize Production Pipeline <CheckCircle2 size={24} />
        </motion.button>
      </div>
    </div>
  );
}

// Module 2 — PDF Search
function PdfPersonSearch() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Module 2 — <span className="text-emerald-400">PDF person search</span></h2>
        <p className="text-sm text-slate-400 font-medium">Upload a PDF. AI finds every page where a specific person appears.</p>
      </div>

      <motion.div
        whileHover={{ borderColor: 'rgba(59,130,246,0.3)', backgroundColor: 'rgba(59,130,246,0.02)' }}
        className="border-2 border-dashed border-white/10 rounded-[2.5rem] p-16 text-center flex flex-col items-center gap-6 cursor-pointer transition-all group relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
          <Search className="text-slate-400 group-hover:text-blue-400" size={40} />
        </div>
        <div>
          <div className="text-xl font-black mb-2">Upload Album PDF</div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Album proof · Yearbook · Event booklet</p>
        </div>
      </motion.div>

      <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus-within:ring-2 ring-blue-500/20 transition-all">
        <Search size={22} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search by name... e.g. Hanako Tanaka"
          className="bg-transparent border-none outline-none flex-1 text-base font-bold text-white placeholder:text-slate-600"
        />
      </div>

      <div className="glass-jewel rounded-[2.5rem] p-8 border-white/5 shadow-2xl overflow-hidden">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Matches Found on 5 Pages</div>
        <div className="grid grid-cols-4 gap-6">
          {[
            { p: "p.3", label: "Class 3A", hit: true },
            { p: "p.7", label: "not found", hit: false },
            { p: "p.12", label: "Sports day", hit: true },
            { p: "p.19", label: "Club", hit: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl overflow-hidden border transition-all cursor-pointer ${item.hit ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' : 'border-white/5 bg-white/[0.02] opacity-40 grayscale'}`}
            >
              <div className="aspect-[3/4] flex items-center justify-center border-b border-white/5">
                <ImageIcon size={32} className={item.hit ? 'text-blue-400' : 'text-slate-700'} />
              </div>
              <div className="p-4 text-center">
                <div className={`text-xs font-black uppercase tracking-widest ${item.hit ? 'text-blue-400' : 'text-slate-500'}`}>{item.p}</div>
                <div className="text-[10px] font-bold text-slate-600 mt-1 uppercase">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Module 3 — Group Search
function GroupPhotoSearch() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Module 3 — <span className="text-orange-400">Group photo search</span></h2>
        <p className="text-sm text-slate-400 font-medium tracking-tight">Find every group and event photo a specific student appears in using AI clustering.</p>
      </div>

      <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus-within:ring-2 ring-blue-500/20 transition-all">
        <Search size={22} className="text-slate-500" />
        <input
          type="text"
          defaultValue="Hanako Tanaka"
          className="bg-transparent border-none outline-none flex-1 text-base font-bold text-white placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-8">
        {[
          { name: "3A class group", meta: "Front row · Center", color: "blue" },
          { name: "Sports day", meta: "Action shot · Background", color: "amber" },
          { name: "Art club", meta: "Group shot · Right side", color: "violet" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="glass-jewel rounded-[2.5rem] overflow-hidden border-white/5 hover:border-white/10 transition-all cursor-pointer group shadow-xl"
          >
            <div className="aspect-video bg-white/[0.03] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
              <ImageIcon size={48} className="text-slate-700 group-hover:scale-110 group-hover:text-blue-500/40 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <span className={`badge badge-${item.color}`}>Face matched</span>
              </div>
            </div>
            <div className="p-6">
              <div className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight leading-none mb-2">{item.name}</div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-none">{item.meta}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Module 4 — Meibo Generation
function MeiboGeneration() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black mb-2 tracking-tight">Module 4 — <span className="text-blue-400">Roster Auto-Generation</span></h2>
        <p className="text-sm text-slate-400 font-medium">Generate class roster Excel files from extracted student data with Furigana support.</p>
      </div>

      <div className="glass-jewel rounded-[2.5rem] p-10 border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />

        <div className="grid grid-cols-2 gap-8 mb-12">
          {[
            { label: "School name", value: "Greenwood JS", icon: LayoutDashboard },
            { label: "Production Year", value: "2026", icon: Layers },
          ].map(field => (
            <div key={field.label} className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {field.label}
              </label>
              <input
                type="text"
                defaultValue={field.value}
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-semibold hover:bg-white/[0.07]"
              />
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Sort order</label>
            <div className="relative group/select">
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-semibold appearance-none hover:bg-white/[0.07] cursor-pointer">
                <option>By Number</option>
                <option>Alphabetical</option>
              </select>
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-hover/select:text-white transition-colors rotate-90" size={16} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Enable Furigana</label>
            <div className="relative group/select">
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all font-semibold appearance-none hover:bg-white/[0.07] cursor-pointer">
                <option>Automatic (AI)</option>
                <option>None</option>
              </select>
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-hover/select:text-white transition-colors rotate-90" size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 p-6 bg-white/5 border border-white/5 rounded-3xl">
          {["3A (28 students)", "3B (32 students)", "3C (30 students)"].map(tag => (
            <span key={tag} className="text-[10px] px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black uppercase tracking-widest shadow-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-[2rem] flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/30"
        >
          Generate Production Roster <Download size={20} />
        </motion.button>
      </div>
    </div>
  );
}

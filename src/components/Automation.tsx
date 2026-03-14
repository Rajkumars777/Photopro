"use client";

import {
  Folder, FileSpreadsheet, Sparkles, CheckCircle2, Download,
  ChevronRight, Terminal, Cpu,
  Activity, Zap, Globe, Trash2, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Automation() {
  const { dict } = useLanguage();

  const [schoolName,     setSchoolName]     = useState("");
  const [batchYear,      setBatchYear]      = useState("26");
  const [photoFiles,     setPhotoFiles]     = useState<File[]>([]);
  const [rosterFile,     setRosterFile]     = useState<File | null>(null);
  const [lastOutputPath, setLastOutputPath] = useState<string | null>(null);
  const [isProcessing,   setIsProcessing]   = useState(false);
  const [progress,       setProgress]       = useState(0);
  const [logs,           setLogs]           = useState<string[]>([
    "PhotoPro Engine Initialized. Awaiting student dataset.",
  ]);
  const [logFilter,      setLogFilter]      = useState<"all" | "error" | "phase">("all");

  const [metrics, setMetrics] = useState({
    load: 0,
    cadence: 0,
    sync: 24
  });

  const folderInputRef = useRef<HTMLInputElement>(null);
  const rosterInputRef = useRef<HTMLInputElement>(null);

  const handleFolderClick = () => folderInputRef.current?.click();
  const handleRosterClick = () => rosterInputRef.current?.click();

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(
        (f) => f.type.startsWith("image/") || f.name.match(/\.(jpe?g|png|bmp|tiff?)$/i)
      );
      setPhotoFiles(files);
      addLog(`Dataset directory selected: ${files.length} images detected.`);
    }
  };

  const handleRosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRosterFile(e.target.files[0]);
      addLog(`Roster file "${e.target.files[0].name}" selected.`);
    }
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setLogs((prev) => [...prev.slice(-100), `${time} - ${msg}`]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        setMetrics({
          load: Math.floor(Math.random() * 40) + 60,
          cadence: Math.floor(Math.random() * 5) + 8,
          sync: Math.floor(Math.random() * 10) + 15
        });
      }, 1000);
    } else {
      setMetrics({ load: 0, cadence: 0, sync: 24 });
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const filteredLogs = logs.filter(log => {
    if (logFilter === "all") return true;
    if (logFilter === "error") return log.includes("ERROR") || log.includes("FATAL");
    if (logFilter === "phase") return log.includes("PHASE");
    return true;
  });

  const startPipeline = async () => {
    if (photoFiles.length === 0 || !schoolName) {
      addLog("ERROR: Missing datasets. Please select photos and enter school name.");
      return;
    }
    setIsProcessing(true);
    setProgress(0);
    setLogs([]);
    addLog(`Preparing upload for ${schoolName}...`);
    try {
      const formData = new FormData();
      formData.append("schoolName", schoolName);
      formData.append("batchYear", batchYear);
      if (rosterFile) formData.append("rosterFile", rosterFile);
      photoFiles.forEach((file) => {
        // @ts-ignore
        const relativePath = file.webkitRelativePath || file.name;
        formData.append("photoFiles", file, relativePath);
      });
      addLog(`Uploading ${photoFiles.length} files...`);
      const response = await fetch("/api/pipeline", { method: "POST", body: formData });
      if (!response.ok) {
        const err = await response.json();
        addLog(`ERROR: ${err.error || "Failed to start pipeline"}`);
        setIsProcessing(false);
        return;
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) { addLog("ERROR: Failed to initialize results stream."); setIsProcessing(false); return; }
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        decoder.decode(value).split("\n").forEach((line) => {
          if (!line.trim()) return;
          addLog(line.trim());
          if (line.includes("PIPELINE_INIT_COMPLETE")) setProgress(10);
          if (line.includes("PHASE 1")) setProgress(20);
          if (line.includes("PHASE 2")) setProgress(40);
          if (line.includes("PHASE 3")) setProgress(60);
          if (line.includes("PHASE 4")) setProgress(80);
          if (line.includes("Pipeline complete") || line.includes("PIPELINE COMPLETE")) setProgress(100);
          const m = line.match(/FINAL_PATH:\s*(.*)/);
          if (m) setLastOutputPath(m[1]);
        });
      }
      setIsProcessing(false);
    } catch (err: any) {
      addLog(`FATAL ERROR: ${err.message}`);
      setIsProcessing(false);
    }
  };

  const downloadResults = async () => {
    try {
      if (!lastOutputPath) throw new Error("No output path found.");
      addLog("Preparing your download package...");
      const res = await fetch(`/api/download?folder=${encodeURIComponent(lastOutputPath)}`);
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Download failed"); }
      const blob = await res.blob();
      const url  = window.URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = `photography_results_${schoolName || "export"}.zip`;
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(url);
      addLog("✅ Download started successfully.");
    } catch (err: any) { addLog(`ERROR: ${err.message}`); }
  };

  const logColor = (log: string) => {
    if (log.includes("ERROR") || log.includes("FATAL"))           return "text-red-400";
    if (log.includes("✅") || log.includes("complete") || log.includes("COMPLETE")) return "text-emerald-400";
    if (log.includes("PHASE") || log.includes("Upload"))          return "text-blue-400";
    if (log.includes("WARNING"))                                   return "text-amber-400";
    return "text-slate-300";
  };
  const logDot = (log: string) => {
    if (log.includes("ERROR") || log.includes("FATAL"))                            return "bg-red-500";
    if (log.includes("✅") || log.includes("complete") || log.includes("COMPLETE")) return "bg-emerald-500";
    if (log.includes("PHASE"))                                                     return "bg-violet-500";
    return "bg-blue-500";
  };

  return (
    <section
      id="automation-section"
      className="relative w-full py-24"
    >
      {/* Section glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-8 w-full">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-xl"
        >
          <span className="badge badge-violet mb-5 inline-flex">
            <Cpu size={11} />
            Frame Engine v2
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-[1.15] mb-4">
            {dict.automation.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text">{dict.automation.title.split(" ").slice(-1)[0]}</span>
          </h2>
          <p className="text-lg text-secondary leading-relaxed font-medium">
            {dict.automation.subtitle}
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">

          {/* ── Left: Config Panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="card rounded-[2rem] p-7 flex flex-col gap-6 min-w-0"
          >
            {/* Hidden inputs */}
            {/* @ts-ignore */}
            <input type="file" ref={folderInputRef} className="hidden" onChange={handleFolderChange} webkitdirectory="" directory="" />
            <input type="file" ref={rosterInputRef} className="hidden" onChange={handleRosterChange} />

            {/* Upload zones */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                onClick={handleFolderClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden p-6 rounded-[2rem] flex flex-col gap-4 cursor-pointer transition-all duration-500 border ${
                  photoFiles.length > 0
                    ? "bg-blue-500/10 border-blue-500/40 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]"
                    : "glass border-border/40 hover:border-blue-500/30 hover:bg-blue-500/[0.03] shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
                <div className="relative flex justify-between items-start">
                  <div className={`p-2 rounded-xl ${photoFiles.length > 0 ? "bg-blue-500/20" : "bg-white/[0.06]"}`}>
                    <Folder className={photoFiles.length > 0 ? "text-blue-400" : "text-slate-400"} size={18} />
                  </div>
                  {photoFiles.length > 0 && <CheckCircle2 className="text-blue-400" size={16} />}
                </div>
                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{dict.automation.upload.photos.split(" ")[0]}</p>
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {photoFiles.length > 0 ? `${photoFiles.length} ${dict.automation.upload.photosSelected}` : dict.automation.upload.orBrowse}
                  </p>
                </div>
              </motion.div>

              <motion.div
                onClick={handleRosterClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative overflow-hidden p-6 rounded-[2rem] flex flex-col gap-4 cursor-pointer transition-all duration-500 border ${
                  rosterFile
                    ? "bg-amber-500/10 border-amber-500/40 shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)]"
                    : "glass border-border/40 hover:border-amber-500/30 hover:bg-amber-500/[0.03] shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
                <div className="relative flex justify-between items-start">
                  <div className={`p-2 rounded-xl ${rosterFile ? "bg-amber-500/20" : "bg-white/[0.06]"}`}>
                    <FileSpreadsheet className={rosterFile ? "text-amber-400" : "text-slate-400"} size={18} />
                  </div>
                  {rosterFile && <CheckCircle2 className="text-amber-400" size={16} />}
                </div>
                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-1">{dict.automation.upload.roster.split(" ")[0]}</p>
                  <p className="text-sm font-bold text-foreground leading-tight truncate">
                    {rosterFile ? rosterFile.name : dict.automation.upload.orBrowse}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="px-5 py-4 rounded-xl glass border border-border hover:border-blue-500/30 focus-within:border-blue-500/40 focus-within:shadow-[0_0_20px_-6px_rgba(59,130,246,0.35)] transition-all">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">School Name</p>
                <input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="e.g. Greenwood High"
                  className="text-sm text-foreground font-semibold bg-transparent border-none outline-none w-full placeholder:text-slate-500/60"
                />
              </div>
              <div className="px-5 py-4 rounded-xl glass border border-border hover:border-violet-500/30 focus-within:border-violet-500/40 focus-within:shadow-[0_0_20px_-6px_rgba(139,92,246,0.35)] transition-all">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1.5">Batch Year</p>
                <input
                  value={batchYear}
                  onChange={(e) => setBatchYear(e.target.value)}
                  className="text-sm text-foreground font-semibold bg-transparent border-none outline-none w-full"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                disabled={isProcessing}
                onClick={startPipeline}
                whileHover={!isProcessing ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
                  isProcessing
                    ? "bg-surface text-secondary cursor-not-allowed border border-border"
                    : "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_20px_60px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_24px_70px_-10px_rgba(59,130,246,0.65)] cursor-pointer"
                }`}
              >
                {isProcessing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Sparkles size={20} />
                  </motion.div>
                ) : <Sparkles size={20} />}
                {isProcessing ? dict.automation.controls.processing : dict.automation.controls.begin}
                {!isProcessing && <ChevronRight size={18} />}
              </motion.button>

              <AnimatePresence>
                {!isProcessing && progress === 100 && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onClick={downloadResults}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_20px_60px_-10px_rgba(16,185,129,0.4)] hover:shadow-[0_24px_70px_-10px_rgba(16,185,129,0.55)] cursor-pointer transition-all"
                  >
                    <Download size={20} />
                    {dict.automation.controls.downloadBtn}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: System Monitor ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card rounded-[2.5rem] p-8 flex flex-col gap-6 min-w-0 glass border-white/10 dark:border-white/5"
          >
            {/* Monitor header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 border border-border/40">
                  <Terminal size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-foreground">System Monitor</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Real-time diagnostics</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {isProcessing && (
                  <div className="flex items-end gap-1 h-4 px-2 border-r border-border/40 mr-2">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-[2px] bg-blue-400/60 rounded-full"
                      />
                    ))}
                  </div>
                )}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                  isProcessing
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? "bg-blue-400 animate-pulse" : "bg-emerald-400"}`} />
                  {isProcessing ? dict.automation.monitor.status.active : dict.automation.monitor.status.idle}
                </div>
              </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: dict.automation.monitor.metrics.load, value: `${metrics.load}%`, icon: Activity, color: "text-blue-400" },
                { label: dict.automation.monitor.metrics.cadence, value: `${metrics.cadence} Hz`, icon: Zap, color: "text-amber-400" },
                { label: dict.automation.monitor.metrics.sync, value: `${metrics.sync} ms`, icon: Globe, color: "text-violet-400" },
              ].map((metric) => (
                <div key={metric.label} className="glass-jewel p-4 rounded-2xl border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <metric.icon size={10} className={metric.color} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{metric.label}</span>
                  </div>
                  <div className="text-lg font-black text-foreground tracking-tight">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="glass-jewel rounded-[2rem] p-6 border-border/40">
              <div className="flex justify-between items-end mb-5">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 block mb-1">Automation Saturation</span>
                  <span className="text-4xl font-black gradient-text tracking-tighter">{progress}%</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={isProcessing ? { opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-500/40"
                    />
                  ))}
                </div>
              </div>
              {/* Progress bar */}
              <div className="relative w-full bg-surface h-3 rounded-full overflow-hidden shadow-inner border border-border/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
                {isProcessing && (
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                  />
                )}
              </div>
              {/* Phase dots */}
              <div className="flex justify-between mt-3">
                {[
                  dict.automation.monitor.timeline.upload, 
                  dict.automation.monitor.timeline.parse, 
                  dict.automation.monitor.timeline.analyze, 
                  dict.automation.monitor.timeline.export, 
                  "Done"
                ].map((phase, i) => (
                  <div key={phase} className="flex flex-col items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full transition-all ${progress >= i * 25 ? "bg-blue-400" : "bg-surface"}`} />
                    <span className={`text-[8px] font-bold uppercase tracking-wide ${progress >= i * 25 ? "text-blue-400" : "text-slate-600"}`}>{phase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal log */}
            <div className="flex-1 bg-[#020817] rounded-[2rem] overflow-hidden font-mono flex flex-col border border-border/60 shadow-inner min-h-[300px] min-w-0 transition-all duration-500 group">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-slate-900/40">
                <div className="flex items-center gap-3">
                  <Filter size={12} className="text-slate-500" />
                  <div className="flex gap-2">
                    {["all", "phase", "error"].map((f) => {
                      const filterLabels: Record<string, string> = {
                        all: dict.automation.monitor.logs.filterAll,
                        phase: dict.automation.monitor.logs.filterPhase,
                        error: dict.automation.monitor.logs.filterError
                      };
                      return (
                        <button
                          key={f}
                          onClick={() => setLogFilter(f as any)}
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md transition-all ${
                            logFilter === f ? "bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30" : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {filterLabels[f]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setLogs([dict.automation.monitor.logs.empty])}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-red-400 transition-colors"
                    title={dict.automation.monitor.logs.clear}
                  >
                    <Trash2 size={13} />
                  </button>
                  <div className="flex gap-1.5 ml-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-2 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-white/5">
                <AnimatePresence initial={false}>
                  {filteredLogs.map((log, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={log + i}
                      className="flex gap-3 items-start text-[11px] w-full min-w-0"
                    >
                      <span className="text-slate-600 shrink-0 tabular-nums">{log.split(" - ")[0]}</span>
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${logDot(log)}`} />
                      <span className={`${logColor(log)} leading-relaxed break-words min-w-0 flex-1`}>
                        {log.includes(" - ") ? log.split(" - ")[1] : log}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

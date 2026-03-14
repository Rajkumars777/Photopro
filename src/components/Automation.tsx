"use client";

import { Folder, FileSpreadsheet, Sparkles, CheckCircle2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Automation() {
  const [schoolName, setSchoolName] = useState("");
  const [batchYear, setBatchYear] = useState("26");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [rosterFile, setRosterFile] = useState<File | null>(null);
  const [lastOutputPath, setLastOutputPath] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(["PhotoPro Engine Initialized. Awaiting student dataset."]);

  const folderInputRef = useRef<HTMLInputElement>(null);
  const rosterInputRef = useRef<HTMLInputElement>(null);

  const handleFolderClick = () => folderInputRef.current?.click();
  const handleRosterClick = () => rosterInputRef.current?.click();

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/') || f.name.match(/\.(jpe?g|png|bmp|tiff?)$/i));
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
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [...prev.slice(-100), `${time} - ${msg}`]);
  };

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
      formData.append('schoolName', schoolName);
      formData.append('batchYear', batchYear);
      if (rosterFile) formData.append('rosterFile', rosterFile);

      photoFiles.forEach((file) => {
        // We can't easily recreate exact paths in child_process without more metadata, 
        // but browsers provide 'webkitRelativePath'. Let's use that if available.
        // @ts-ignore
        const relativePath = file.webkitRelativePath || file.name;
        formData.append('photoFiles', file, relativePath);
      });

      addLog(`Uploading ${photoFiles.length} files... (this may take a moment)`);

      const response = await fetch('/api/pipeline', {
        method: 'POST',
        body: formData, // Fetch automatically sets multipart/form-data
      });

      if (!response.ok) {
        const errorData = await response.json();
        addLog(`ERROR: ${errorData.error || 'Failed to start pipeline'}`);
        setIsProcessing(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) {
        addLog("ERROR: Failed to initialize results stream.");
        setIsProcessing(false);
        return;
      }

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);

        const lines = chunk.split('\n');
        lines.forEach(line => {
          if (line.trim()) {
            addLog(line.trim());

            if (line.includes("PIPELINE_INIT_COMPLETE")) setProgress(10);
            if (line.includes("PHASE 1")) setProgress(20);
            if (line.includes("PHASE 2")) setProgress(40);
            if (line.includes("PHASE 3")) setProgress(60);
            if (line.includes("PHASE 4")) setProgress(80);
            if (line.includes("Pipeline complete") || line.includes("PIPELINE COMPLETE") || line.includes("PIPELINE COMPLETE")) setProgress(100);
            if (line.includes("FINAL_PATH:")) {
              const pathMatch = line.match(/FINAL_PATH:\s*(.*)/);
              if (pathMatch) setLastOutputPath(pathMatch[1]);
            }
          }
        });
      }

      setIsProcessing(false);
    } catch (error: any) {
      addLog(`FATAL ERROR: ${error.message}`);
      setIsProcessing(false);
    }
  };

  const downloadResults = async () => {
    try {
      if (!lastOutputPath) {
        throw new Error("No output path found. Please run the pipeline first.");
      }
      addLog("Preparing your download package...");
      const response = await fetch(`/api/download?folder=${encodeURIComponent(lastOutputPath)}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `photography_results_${schoolName || 'export'}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      addLog("✅ Download started successfully.");
    } catch (error: any) {
      addLog(`ERROR: ${error.message}`);
    }
  };

  // Removed the useEffect mock simulation as it's now real

  return (
    <section id="automation-section" className="px-8 py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
      <div>
        <h2 className="text-5xl font-black text-white leading-[1.2] mb-6 whitespace-nowrap">
          Automate the <span className="text-brand-blue">Impossible.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-12 font-medium">
          Upload your student folders and roster data. Our engine handles the parsing, photo framing, and school-specific exports automatically.
        </p>

        <div className="glass-card rounded-[2.5rem] p-10 flex flex-col gap-8 shadow-2xl border-slate-800/50">
          <div className="grid grid-cols-2 gap-6">
            {/* Folder selection logic using webkitdirectory */}
            {/* @ts-ignore */}
            <input type="file" ref={folderInputRef} className="hidden" onChange={handleFolderChange} webkitdirectory="" directory="" />
            <div
              onClick={handleFolderClick}
              className={`p-8 rounded-3xl flex flex-col gap-4 cursor-pointer transition-all border ${photoFiles.length > 0 ? "bg-blue-900/20 border-blue-800" : "bg-slate-900/50 border-slate-800 hover:bg-blue-900/10"}`}
            >
              <div className="flex justify-between items-start">
                <Folder className={photoFiles.length > 0 ? "text-blue-600" : "text-blue-500"} size={24} />
                {photoFiles.length > 0 && <CheckCircle2 className="text-blue-600" size={20} />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Students Folder</p>
                <p className="text-sm font-bold text-slate-300 leading-tight">
                  {photoFiles.length > 0 ? `${photoFiles.length} Photos Prepared` : "Select Local Folder"}
                </p>
              </div>
            </div>

            {/* File selection for roster */}
            <input type="file" ref={rosterInputRef} className="hidden" onChange={handleRosterChange} />
            <div
              onClick={handleRosterClick}
              className={`p-8 rounded-3xl flex flex-col gap-4 cursor-pointer transition-all border ${rosterFile ? "bg-amber-900/20 border-amber-800" : "bg-slate-900/50 border-slate-800 hover:bg-amber-900/10"}`}
            >
              <div className="flex justify-between items-start">
                <FileSpreadsheet className={rosterFile ? "text-amber-600" : "text-amber-500"} size={24} />
                {rosterFile && <CheckCircle2 className="text-amber-600" size={20} />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-1">Student Roster</p>
                <p className="text-sm font-bold text-slate-300 leading-tight">
                  {rosterFile ? rosterFile.name : "Select Excel/PDF"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">School Name</p>
              <input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. Greenwood High"
                className="text-sm text-white font-bold bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Batch Year</p>
              <input
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                className="text-sm text-white font-bold bg-transparent border-none outline-none w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              disabled={isProcessing}
              onClick={startPipeline}
              className={`w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all ${isProcessing ? "bg-slate-800 text-slate-400 cursor-not-allowed" : "bg-brand-blue text-white shadow-xl shadow-blue-500/30 hover:scale-[1.02] cursor-pointer"}`}
            >
              {isProcessing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                  <Sparkles size={24} />
                </motion.div>
              ) : <Sparkles size={24} />}
              {isProcessing ? "Processing..." : "Initiate Frame Pipeline"}
            </button>

            {!isProcessing && progress === 100 && (
              <button
                onClick={downloadResults}
                className="w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-[1.02] cursor-pointer transition-all"
              >
                <Download size={24} />
                Download Results
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-12 min-h-[600px] border-slate-200/50 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white transition-colors">System Monitor</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Real-time framing diagnostics</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
            <div className={`w-2 h-2 rounded-full bg-emerald-500 ${isProcessing ? "animate-ping" : "animate-pulse"}`}></div>
            {isProcessing ? "Engine Active" : "Link Active"}
          </div>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 transition-colors uppercase tracking-[0.2em]">Automation Saturation</div>
          <div className="text-7xl font-black text-slate-900 dark:text-white transition-colors">{progress}%</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mb-12 overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-blue"
          />
        </div>

        <div className="flex-1 bg-slate-900 rounded-3xl p-8 overflow-hidden font-mono text-[11px] text-slate-400 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-slate-100 font-bold tracking-widest uppercase">Sequential Event Log</span>
          </div>
          <div className="border-t border-slate-800 mt-2 pt-6 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={log + i}
                  className="flex gap-4"
                >
                  <span className="text-slate-600 shrink-0">{log.split(" - ")[0]}</span>
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.includes("ERROR") ? "bg-red-500" : "bg-brand-blue"}`}></span>
                  <span className={log.includes("ERROR") ? "text-red-400" : "text-slate-300"}>
                    {log.includes(" - ") ? log.split(" - ")[1] : log}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

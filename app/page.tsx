"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera, FolderOpen, ScrollText, Play,
  Loader2, Terminal, School, Calendar,
  Upload, Scissors, Download, Zap, ChevronRight,
  Sun, Moon, ChevronDown, MessageSquare, Image as ImageIcon, Sparkles, Wand2, Layers,
  ChevronUp, MousePointer2, UserSquare2, FileSpreadsheet, Layout
} from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isProcessing, setIsProcessing] = useState(false);
  const [canDownload, setCanDownload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    sourceDir: '',
    rosterPath: '',
    schoolName: '',
    year: '26'
  });
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', msg: 'PhotoPro Engine initialized. Awaiting student dataset.' }
  ]);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const browsePath = async (fieldName: string, mode: 'directory' | 'file' = 'directory') => {
    // Mock functionality since backend is removed
    const mockPath = mode === 'directory' ? 'C:\\Mock\\Data\\Students_2026' : 'C:\\Mock\\Data\\roster_2026.csv';
    setFormData(prev => ({ ...prev, [fieldName]: mockPath }));
  };

  const startProcessing = async () => {
    if (!formData.sourceDir || !formData.schoolName || !formData.year) {
      setLogs(prev => [...prev, { id: Date.now(), type: 'error', msg: 'Data check failed: Core parameters missing.' }]);
      scrollToForm();
      return;
    }

    const outputDir = formData.sourceDir + '\\Frames_Exported';

    setIsProcessing(true);
    setProgress(5);
    setLogs(prev => [...prev, { id: Date.now(), type: 'info', msg: `Initializing student frame export for ${formData.schoolName}...` }]);

    try {
      // Backend removed - simulate processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setProgress(100);
      setCanDownload(true);
      setLogs(prev => [...prev, 
        {
          id: Date.now() + 1,
          type: 'success',
          msg: `Success: Mock batch framing complete. 120 student assets ready.`
        },
        {
          id: Date.now() + 2,
          type: 'info',
          msg: `Generated output files: manifest.json, roster.json`
        }
      ]);
    } catch (error: any) {
      setLogs(prev => [...prev, { id: Date.now(), type: 'error', msg: `Critical Shutdown: ${error.message}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    alert("Backend has been removed. Download functionality is simulated.");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600/30 transition-colors duration-500 overflow-x-hidden antialiased">
      {/* Premium Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[var(--mesh-1)] blur-[140px] rounded-full animate-pulse opacity-[var(--blob-opacity)]"></div>
        <div className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] bg-[var(--mesh-2)] blur-[120px] rounded-full opacity-[var(--blob-opacity)] transition-opacity duration-1000"></div>
        <div className="absolute bottom-[-15%] left-[5%] w-[60%] h-[60%] bg-[var(--mesh-3)] blur-[140px] rounded-full opacity-[var(--blob-opacity)]"></div>
      </div>

      {/* Navigation - Luxury Layout */}
      <nav className="sticky top-0 z-50 bg-[var(--background)]/75 backdrop-blur-3xl border-b border-[var(--border)] transition-all">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-[10px] bg-[var(--primary)] flex items-center justify-center shadow-2xl shadow-blue-600/30 group-hover:scale-105 transition-all duration-300">
                <Camera className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-[-0.04em] uppercase font-sans">
                PhotoPro
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-[var(--muted)] tracking-tight">
              {/* Navigation items removed to keep focus on automation */}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-[var(--border)] hover:bg-[var(--foreground)]/5 transition-all active:scale-95 group"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-90 transition-transform" /> : <Moon className="w-5 h-5 text-blue-600 group-hover:-rotate-12 transition-transform" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="space-y-0">
        {/* Superior Hero Section */}
        <section className="pt-12 pb-8 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-[1.2] text-left animate-reveal">

            <h1 className="text-6xl md:text-7xl font-black tracking-[-0.05em] mb-6 leading-[0.95]">
              Perfecting student <br />
              <span className="text-[var(--primary)] filter drop-shadow-sm">photo</span> <span className="gradient-text">Framing</span>
            </h1>
            <p className="text-xl text-[var(--muted)] font-medium mb-8 max-w-xl leading-snug tracking-tight">
              A high-precision photography pipeline for schools. Scale your workflow with automated student roster matching and AI-powered frame generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={scrollToForm}
                className="px-10 py-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-[20px] font-black text-lg shadow-[0_20px_50px_rgba(0,113,227,0.3)] hover:shadow-[0_25px_60px_rgba(0,113,227,0.4)] transition-all active:scale-[0.97] flex items-center gap-4 group"
              >
                Launch Automation
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 text-[var(--muted)] font-bold text-sm cursor-pointer hover:text-[var(--foreground)] transition-colors">
                <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                Platform workflow
              </div>
            </div>
          </div>
          <div className="flex-1 w-full animate-reveal [animation-delay:200ms]">
            <div className="relative p-3 glass rounded-[48px] shadow-premium group">
              <div className="relative rounded-[40px] overflow-hidden">
                <img
                  src="/student_album_automation.png"
                  alt="Student Photo Frame Automation Showcase"
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-white/10 pointer-events-none"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Row - Compact horizontal style match */}
        <section className="py-2 px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-[12px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">Discover popular features</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: UserSquare2, label: "Student Sorting", color: "text-blue-500" },
              { icon: FileSpreadsheet, label: "Roster Logic", color: "text-amber-500" },
              { icon: Layout, label: "Frame Layouts", color: "text-purple-500" },
              { icon: ImageIcon, label: "Batch Framing", color: "text-green-500" },
              { icon: Layers, label: "Smart Grouping", color: "text-cyan-500" },
            {icon: Sparkles, label: "Auto Branding", color: "text-pink-500"}
            ].map((f, i) => (
              <div key={i} className="flex-1 min-w-[160px] bg-[var(--card-bg)] hover:bg-[var(--foreground)]/[0.05] border border-[var(--border)] hover:border-[var(--primary)]/30 p-4 rounded-3xl flex items-center gap-4 transition-all duration-500 cursor-pointer group shadow-sm hover:translate-y-[-2px]">
                <div className={`w-10 h-10 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-black/5`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <span className="text-[13px] font-bold tracking-tight whitespace-nowrap">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-30 my-6"></section>

        {/* Automated Form - Luxury Re-skin */}
        <section ref={formRef} className="py-12 px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="flex flex-col justify-center space-y-8">
              <div className="animate-reveal [animation-delay:400ms]">
                <h2 className="text-4xl font-black tracking-tight mb-6 leading-[1.05]">
                  Automate the<br /><span className="gradient-text">Impossible.</span>
                </h2>
                <p className="text-base text-[var(--muted)] font-medium max-w-md leading-relaxed">
                  Upload your student folders and roster data. Our engine handles the parsing, photo framing, and school-specific exports automatically.
                </p>
              </div>

              {/* Advanced Form Shell */}
              <div className="glass p-8 md:p-10 rounded-[48px] space-y-8 animate-reveal [animation-delay:600ms] relative overflow-hidden border border-[var(--glass-border)] selection-none">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                  <Wand2 className="w-24 h-24 rotate-12 text-[var(--primary)]" />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        label: "Students Folder", 
                        icon: UserSquare2, 
                        name: "sourceDir", 
                        placeholder: "Click to select students directory", 
                        mode: 'directory' as const,
                        value: formData.sourceDir,
                        color: "from-blue-500/10 to-transparent"
                      },
                      { 
                        label: "Student Roster", 
                        icon: FileSpreadsheet, 
                        name: "rosterPath", 
                        placeholder: "Click to select roster file", 
                        mode: 'file' as const,
                        value: formData.rosterPath,
                        color: "from-amber-500/10 to-transparent"
                      }
                    ].map((field) => (
                      <div 
                        key={field.name}
                        onClick={() => !isProcessing && browsePath(field.name, field.mode)}
                        className={`group relative p-6 rounded-[32px] bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--primary)]/30 transition-all cursor-pointer active:scale-[0.98] overflow-hidden h-full flex flex-col justify-between hover:bg-[var(--primary)]/[0.02]`}
                      >
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] flex items-center gap-3">
                            <field.icon className="w-3.5 h-3.5 text-[var(--primary)]" /> {field.label}
                          </label>
                          <div className={`text-sm font-bold ${field.value ? 'text-[var(--foreground)]' : 'text-[var(--muted)]/40 italic'} line-clamp-2`}>
                            {field.value ? field.value.split('\\').pop() : field.placeholder}
                          </div>
                        </div>
                        
                        {field.value && (
                          <div className="mt-4 text-[9px] font-mono text-[var(--muted)]/50 break-all opacity-0 group-hover:opacity-100 transition-opacity">
                            {field.value}
                          </div>
                        )}

                        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                          <ChevronRight className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-1">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] flex items-center gap-3 ml-2">
                        <School className="w-3.5 h-3.5 text-amber-500/70" /> School Name
                      </label>
                      <input 
                        name="schoolName" 
                        value={formData.schoolName} 
                        onChange={handleChange} 
                        placeholder="e.g. Greenwood High" 
                        className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl px-6 py-4 text-sm font-bold focus:bg-[var(--foreground)]/[0.05] focus:border-[var(--primary)]/50 transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] flex items-center gap-3 ml-2">
                        <Calendar className="w-3.5 h-3.5 text-green-500/70" /> Batch Year
                      </label>
                      <input 
                        name="year" 
                        value={formData.year} 
                        onChange={handleChange} 
                        placeholder="e.g. 26" 
                        className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl px-6 py-4 text-sm font-bold focus:bg-[var(--foreground)]/[0.05] focus:border-[var(--primary)]/50 transition-all outline-none" 
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={startProcessing}
                  disabled={isProcessing}
                  className="btn-glow w-full h-20 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-black text-xl rounded-[32px] shadow-2xl shadow-blue-600/30 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4 relative z-10 overflow-hidden"
                >
                  {isProcessing ? <Loader2 className="w-7 h-7 animate-spin" /> : <Sparkles className="w-7 h-7" />}
                  {isProcessing ? "Processing Student Frames..." : "Initiate Frame Pipeline"}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-8 animate-reveal [animation-delay:800ms]">
              {/* Informational Status Card */}
              <div className="glass p-10 rounded-[48px] flex flex-col justify-between h-full bg-gradient-to-br from-white/10 to-transparent">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tight">System Monitor</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] opacity-60">Real-time diagnostics</p>
                    </div>
                    <div className="px-4 py-2 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] backdrop-blur-md flex items-center gap-3 shadow-sm">
                      <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-blue-500 animate-pulse' : 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]'}`}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">{isProcessing ? 'Exporting...' : 'Link Active'}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Automation Saturation</span>
                      <span className="text-3xl font-black tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-[var(--foreground)]/[0.03] p-1 border border-[var(--border)] overflow-hidden">
                      <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-700 rounded-full shadow-lg shadow-blue-500/30"></div>
                    </div>
                  </div>


                  {canDownload && (
                    <div className="pt-4 animate-in zoom-in-95 duration-500">
                      <button
                        onClick={handleDownload}
                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Download Exported Package (.zip)
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[var(--muted)] text-[10px] font-black uppercase tracking-widest px-2">
                      <Terminal className="w-3.5 h-3.5" /> Sequential Event Log
                    </div>
                    <div className="bg-black/5 dark:bg-black/20 rounded-[32px] p-6 h-[320px] overflow-y-auto font-mono text-[11px] space-y-3 scrollbar-hide border border-[var(--border)] selection-none">
                      {logs.map(log => (
                        <div key={log.id} className="flex gap-4 animate-in slide-in-from-left-4 duration-500 items-start">
                          <span className="opacity-30 shrink-0 text-[9px] mt-0.5 font-bold">{mounted ? new Date().toLocaleTimeString([], { hour12: false }) : '00:00:00'}</span>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.type === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : log.type === 'error' ? 'bg-red-500' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'}`}></div>
                          <span className={`${log.type === 'success' ? 'text-green-500 font-bold' : log.type === 'error' ? 'text-red-500 font-bold' : 'text-[var(--foreground)]/90'} leading-relaxed`}>
                            {log.msg}
                          </span>
                        </div>
                      ))}
                      {isProcessing && <div className="text-blue-500 font-bold ml-12 animate-pulse tracking-tighter opacity-50">ANALYZING_ROSTER...</div>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 text-[var(--muted)] hover:text-[var(--primary)] transition-all cursor-pointer mt-8 py-3 group">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Full Diagnostics</span>
                  <ChevronUp className="w-3.5 h-3.5 opacity-30 group-hover:translate-y-[-2px] transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Footer */}
      <footer className="pt-20 pb-12 px-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center">
              <Camera className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">PhotoPro</span>
          </div>
          <div className="text-[10px] font-black text-[var(--muted)]/40 uppercase tracking-[0.4em]">
            © 2026 PHOTOPRO ENGINE • BUILT FOR PRECISION
          </div>
        </div>
      </footer>
    </div>
  );
}

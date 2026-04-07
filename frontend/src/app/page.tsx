"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, School, Calendar, Key, AlertCircle, Loader2, Download, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [photosZip, setPhotosZip] = useState<File | null>(null);
  const [rosterFile, setRosterFile] = useState<File | null>(null);
  const [schoolName, setSchoolName] = useState('');
  const [year, setYear] = useState('');
  const [apiKey, setApiKey] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photosZip || !schoolName || !year) {
      setError("Please fill in all required fields (Photos Zip, School Name, Year)");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('photos_zip', photosZip);
    if (rosterFile) formData.append('roster_file', rosterFile);
    formData.append('school_name', schoolName);
    formData.append('year', year);
    if (apiKey) formData.append('openai_api_key', apiKey);

    try {
      const response = await axios.post('http://localhost:8000/api/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setJobId(response.data.job_id);
      pollStatus(response.data.job_id);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred submitting the job.");
      setIsSubmitting(false);
    }
  };

  const pollStatus = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/jobs/${id}/status`);
      setJobStatus(response.data);
      
      if (response.data.status === 'done' || response.data.status === 'error') {
        setIsSubmitting(false);
      } else {
        setTimeout(() => pollStatus(id), 2000);
      }
    } catch (err) {
      console.error(err);
      setTimeout(() => pollStatus(id), 2000); // keep polling on temporary errors
    }
  };

  const handleDownload = () => {
    if (jobId && jobStatus?.status === 'done') {
      window.location.href = `http://localhost:8000/api/jobs/${jobId}/download`;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center py-12 px-4 selection:bg-indigo-500/30">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-2">
            <School className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
            Yearbook Photo Pipeline
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Automate student identification, quality scoring, and image standardisation.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/5 blur-[100px] pointer-events-none rounded-full" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* File Uploads */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-400" />
                    Photos Archive (ZIP) <span className="text-red-400">*</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-700 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-2xl cursor-pointer transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-400 group-hover:text-neutral-300">
                      <Upload className="w-6 h-6 mb-2" />
                      <p className="text-sm">
                        {photosZip ? <span className="text-indigo-300 font-medium">{photosZip.name}</span> : <span>Click to upload <span className="font-semibold text-white">ZIP</span> file</span>}
                      </p>
                    </div>
                    <input type="file" className="hidden" accept=".zip" onChange={(e) => setPhotosZip(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Student Roster (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-neutral-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-2xl cursor-pointer transition-colors group">
                    <div className="flex flex-col items-center justify-center text-neutral-500 group-hover:text-neutral-400">
                      <p className="text-sm flex items-center gap-2">
                        {rosterFile ? <span className="text-emerald-400 font-medium">{rosterFile.name}</span> : <>Upload <span className="font-semibold text-white">XLSX</span> or <span className="font-semibold text-white">PDF</span></>}
                      </p>
                    </div>
                    <input type="file" className="hidden" accept=".xlsx,.pdf,.json" onChange={(e) => setRosterFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              </div>

              {/* Text Inputs */}
              <div className="space-y-6">
                <div className="space-y-4 bg-neutral-950/50 p-6 rounded-2xl border border-neutral-800/50 h-full flex flex-col justify-center">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                      <School className="w-4 h-4" /> School Name <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. 千早高" 
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-neutral-100 placeholder:text-neutral-600 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Year <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 26" 
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-neutral-100 placeholder:text-neutral-600 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                      <Key className="w-4 h-4" /> OpenAI API Key (Optional)
                    </label>
                    <input 
                      type="password" 
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..." 
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-neutral-100 placeholder:text-neutral-600 outline-none transition-all"
                    />
                    <p className="text-xs text-neutral-500">Required for advanced portrait scoring.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons & Status */}
            <div className="pt-4 flex flex-col items-center space-y-4">
              {(!jobStatus || (jobStatus.status === 'error' && !isSubmitting)) && (
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>Start Pipeline</>
                  )}
                </button>
              )}

              {/* Status Display */}
              {jobStatus && jobStatus.status !== 'error' && (
                <div className="w-full max-w-md bg-neutral-950/50 border border-neutral-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-300">Status</span>
                    {jobStatus.status === 'done' ? (
                       <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Complete</span>
                    ) : (
                      <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin"/> {jobStatus.status}</span>
                    )}
                  </div>
                  
                  <div className="text-sm text-neutral-400 font-mono bg-neutral-900 border border-neutral-800 p-3 rounded-xl">
                    {jobStatus.message || "Working..."}
                  </div>

                  {jobStatus.status === 'done' && (
                    <button 
                      onClick={handleDownload}
                      type="button"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" /> Download Results (.zip)
                    </button>
                  )}
                </div>
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

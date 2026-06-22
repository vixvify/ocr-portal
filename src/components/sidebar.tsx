"use client";

import React from "react";
import { Layers, History, Database, Sliders, Code, HelpCircle, Activity } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0">
      <div className="flex flex-col gap-6 py-6 px-4">
        <div className="flex flex-col gap-2">
          <span className="px-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Core Applications
          </span>
          <div className="flex flex-col gap-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-blue-600 bg-blue-50/60 border border-blue-100 rounded-xl transition-all cursor-pointer">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Gas Meter OCR</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <History className="w-4 h-4 text-slate-400" />
              <span>History Logs</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <Database className="w-4 h-4 text-slate-400" />
              <span>Database Sync</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="px-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Preferences & Help
          </span>
          <div className="flex flex-col gap-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>OCR Configuration</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <Code className="w-4 h-4 text-slate-400" />
              <span>API Integration</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
            <Activity className="w-4 h-4 text-emerald-500 animate-[pulse-glow_2s_infinite]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-slate-700">OCR AI Engine</p>
            <p className="text-[9px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Online / Active
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

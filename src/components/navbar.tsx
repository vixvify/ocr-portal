"use client";

import { Cpu, Bell, Shield, ChevronDown } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-wider text-slate-800 leading-none">
              OCR PORTAL
            </span>
            <span className="text-[10px] text-slate-400 font-bold tracking-tight mt-0.5">
              GAS METERS v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </button>

          <div className="h-6 w-px bg-slate-200"></div>

          <div className="flex items-center gap-2.5 hover:bg-slate-50/50 p-1.5 rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-sm">
              V
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-700 leading-tight">
                Vixvify
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

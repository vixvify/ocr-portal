"use client";

import React from "react";
import { Cpu } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700 text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-blue-900 uppercase">
              OCR PORTAL
            </span>
          </div>

          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wide">
            <span className="bg-blue-900 text-white rounded-md px-4 py-1.5">
              DASHBOARD
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-900 text-white rounded-md py-1 px-3">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Role: Admin
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">
            U
          </div>
        </div>
      </div>
    </header>
  );
}

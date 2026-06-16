"use client";

import React from "react";
import { Layers } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-4 border-b border-slate-800 bg-slate-950/40">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          METER NAVIGATION
        </span>
      </div>

      <div className="flex-1 py-3 flex flex-col gap-1">
        <div className="px-4 py-2 text-xs font-semibold text-white bg-blue-800/60 border-l-4 border-blue-500 flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Update Meter Readings</span>
        </div>
      </div>
    </aside>
  );
}

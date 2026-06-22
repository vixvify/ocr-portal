"use client";

export function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-base tracking-tight text-blue-900 uppercase">
              OCR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">
            V
          </div>
        </div>
      </div>
    </header>
  );
}

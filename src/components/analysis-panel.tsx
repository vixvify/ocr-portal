"use client";

import React, { useState } from "react";
import { List, Code, CheckCircle2, AlertCircle } from "lucide-react";
import { MeterAnalysisResponse, ExtractedParameter } from "../core/domain/analyze";

interface AnalysisPanelProps {
  result: MeterAnalysisResponse | null;
  isAnalyzing: boolean;
  hasAttempted: boolean;
}

export function AnalysisPanel({
  result,
  isAnalyzing,
  hasAttempted,
}: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState<"parameters" | "json">("parameters");

  // Map fields to display details
  const definitions = [
    { key: "correct_v_scm", name: "CORRECT V. (SCM) / Vb", description: "ค่า Corrected Volume (SCM) หรือ Vb" },
    { key: "line_v_m3", name: "LINE V. (M3)", description: "ค่า Line Volume · Analog = null" },
    { key: "pressure_bar", name: "PRESSURE (Bar)", description: "ความดันแก๊สสะสม (Bar / Baro)" },
    { key: "temperature_c", name: "TEMPERATURE (°C)", description: "อุณหภูมิแก๊สสะสม (°C)" },
    { key: "correction_factor", name: "CORRECTION FACTOR (C)", description: "ค่า Correction Factor (C)" },
    { key: "turbine_v_m3", name: "TURBINE V. (M3)", description: "ปริมาตรแก๊สสะสม M3 (Analog)" },
    { key: "qm_m3_h", name: "Qm (m³/h)", description: "อัตราการไหล Qm" },
    { key: "qb_sm3_h", name: "Qb (Sm³/h)", description: "อัตราการไหล Qb" },
    { key: "pulse_weight", name: "Pulse Weight", description: "ค่า Pulse weight ของอุปกรณ์" },
  ] as const;

  const parameters: ExtractedParameter[] = definitions.map((def) => {
    const val = result ? result[def.key] : null;
    return {
      key: def.key,
      name: def.name,
      description: def.description,
      value: val,
      status: val !== null ? "Found" : "Not found",
    };
  });

  if (isAnalyzing) {
    return <AnalysisSkeleton />;
  }

  if (!hasAttempted || !result) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center min-h-[480px] text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
          <List className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">Awaiting analysis</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-xs leading-relaxed">
            Please upload a meter image or select one of the workspace samples, then click <strong>Analyze Meter Image</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-6">
        <button
          type="button"
          onClick={() => setActiveTab("parameters")}
          className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "parameters"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <List className="w-4 h-4" />
          Extracted Parameters
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("json")}
          className={`flex items-center gap-2 py-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "json"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Code className="w-4 h-4" />
          Raw JSON
        </button>
      </div>

      {/* Tabs Content */}
      <div className="p-6 flex flex-col gap-6 flex-1">
        {activeTab === "parameters" ? (
          <>
            {/* Metadata Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Meter Type
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {result.meter_type || "—"}
                </span>
              </div>
              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Detected Format
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {result.detected_format || "—"}
                </span>
              </div>
            </div>

            {/* Parameters Table */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right sm:text-left">
                      Value
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parameters.map((param) => {
                    const isFound = param.status === "Found";
                    return (
                      <tr key={param.key} className="hover:bg-slate-50/50 transition-colors">
                        {/* Parameter Name & Thai description */}
                        <td className="py-4 px-4">
                          <div className="text-xs font-bold text-slate-800">
                            {param.name}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {param.description}
                          </div>
                        </td>
                        {/* Value */}
                        <td className="py-4 px-4 text-right sm:text-left">
                          <span
                            className={`text-sm font-bold font-mono ${
                              isFound ? "text-blue-600" : "text-slate-400"
                            }`}
                          >
                            {param.value !== null ? param.value : "—"}
                          </span>
                        </td>
                        {/* Status badge */}
                        <td className="py-4 px-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight ${
                              isFound
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-slate-50 text-slate-400 border border-slate-100"
                            }`}
                          >
                            {isFound && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
                            {param.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto border border-slate-850 flex-1 font-mono text-xs text-slate-300 leading-relaxed shadow-inner">
              <pre className="whitespace-pre">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[580px] animate-pulse">
      {/* Tabs Header Skeleton */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 gap-6">
        <div className="py-4 w-32 h-11 border-b-2 border-slate-200 flex items-center justify-center">
          <div className="bg-slate-200 h-4 w-24 rounded"></div>
        </div>
        <div className="py-4 w-24 h-11 flex items-center justify-center">
          <div className="bg-slate-200 h-4 w-16 rounded"></div>
        </div>
      </div>

      {/* Tabs Content Skeleton */}
      <div className="p-6 flex flex-col gap-6 flex-1">
        {/* Metadata Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
            <div className="bg-slate-200 h-2.5 w-16 rounded"></div>
            <div className="bg-slate-350 h-5 w-24 rounded"></div>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
            <div className="bg-slate-200 h-2.5 w-24 rounded"></div>
            <div className="bg-slate-350 h-4 w-40 rounded"></div>
          </div>
        </div>

        {/* Parameters Table Skeleton */}
        <div className="border border-slate-200/80 rounded-xl overflow-hidden">
          <div className="bg-slate-50 h-10 border-b border-slate-200 flex items-center px-4 justify-between">
            <div className="bg-slate-200 h-3 w-20 rounded"></div>
            <div className="bg-slate-200 h-3 w-12 rounded"></div>
            <div className="bg-slate-200 h-3 w-16 rounded"></div>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="py-4 px-4 flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="bg-slate-200 h-3 w-32 rounded"></div>
                  <div className="bg-slate-150 h-2.5 w-48 rounded"></div>
                </div>
                <div className="bg-slate-205 h-4 w-14 rounded"></div>
                <div className="bg-slate-200 h-6 w-16 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

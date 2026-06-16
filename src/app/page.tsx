"use client";

import React, { useState, useEffect } from "react";
import { DashboardStats } from "../components/dashboard-stats";
import { OcrStudio } from "../components/ocr-studio";
import { UploadZone } from "../components/upload-zone";
import { HistoryTable } from "../components/history-table";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { ChevronRight, RefreshCw } from "lucide-react";
import { 
  MeterReading, 
  MeterType, 
  ReadingStatus, 
  INITIAL_MOCK_READINGS 
} from "../lib/data";

export default function Home() {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [activeReadingId, setActiveReadingId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ReadingStatus | "all">(
    "all",
  );
  const [filterType, setFilterType] = useState<MeterType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setReadings(INITIAL_MOCK_READINGS);
    const pending = INITIAL_MOCK_READINGS.find((r) => r.status === "pending");
    if (pending) {
      setActiveReadingId(pending.id);
    } else if (INITIAL_MOCK_READINGS.length > 0) {
      setActiveReadingId(INITIAL_MOCK_READINGS[0].id);
    }
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setReadings(INITIAL_MOCK_READINGS);
      const pending = INITIAL_MOCK_READINGS.find((r) => r.status === "pending");
      setActiveReadingId(
        pending ? pending.id : INITIAL_MOCK_READINGS[0]?.id || null,
      );
      setIsLoading(false);
    }, 500);
  };

  const activeReading = readings.find((r) => r.id === activeReadingId) || null;

  const handleSelectReading = (id: string) => {
    setActiveReadingId(id);
  };

  const handleDeleteReading = (id: string) => {
    const nextReadings = readings.filter((r) => r.id !== id);
    setReadings(nextReadings);
    if (activeReadingId === id) {
      setActiveReadingId(nextReadings.length > 0 ? nextReadings[0].id : null);
    }
  };

  const handleUpdateFields = (
    id: string,
    serialNumber: string,
    currentReading: string,
  ) => {
    setReadings((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;

        const serialChanged = serialNumber !== r.serialNumber;
        const readingChanged = currentReading !== r.currentReading;

        const updated = {
          ...r,
          serialNumber,
          currentReading,
          serialNumberConfidence: serialChanged
            ? 100
            : r.serialNumberConfidence,
          currentReadingConfidence: readingChanged
            ? 100
            : r.currentReadingConfidence,
        };

        updated.boundingBoxes = updated.boundingBoxes.map((bb) => {
          if (bb.label === "serial") {
            return {
              ...bb,
              value: serialNumber,
              confidence: serialChanged ? 1.0 : bb.confidence,
            };
          }
          if (bb.label === "value") {
            return {
              ...bb,
              value: currentReading,
              confidence: readingChanged ? 1.0 : bb.confidence,
            };
          }
          return bb;
        });

        return updated;
      }),
    );
  };

  const selectNextPending = (currentId: string, list: MeterReading[]) => {
    const nextPending = list.find(
      (r) => r.id !== currentId && r.status === "pending",
    );
    if (nextPending) {
      setActiveReadingId(nextPending.id);
    }
  };

  const handleApprove = (id: string) => {
    let nextList: MeterReading[] = [];
    setReadings((prev) => {
      nextList = prev.map((r) =>
        r.id === id ? { ...r, status: "approved" } : r,
      );
      return nextList;
    });
    selectNextPending(id, nextList.length > 0 ? nextList : readings);
  };

  const handleFlag = (id: string) => {
    let nextList: MeterReading[] = [];
    setReadings((prev) => {
      nextList = prev.map((r) =>
        r.id === id ? { ...r, status: "flagged" } : r,
      );
      return nextList;
    });
    selectNextPending(id, nextList.length > 0 ? nextList : readings);
  };

  const handleUploadSimulated = (
    fileName: string,
    meterType: MeterType,
    style: "digital-electric" | "analog-electric" | "water-dial",
  ) => {
    setIsScanning(true);

    setTimeout(() => {
      const id = `READ-2026-${Math.floor(100 + Math.random() * 900)}`;
      const previousReading =
        meterType === "electricity" ? "41200.0" : "00180.2";

      let serialNumber = "";
      let currentReading = "";
      let serialNumberConfidence = 0;
      let currentReadingConfidence = 0;
      let unit: "kWh" | "m³" = "kWh";

      if (style === "digital-electric") {
        serialNumber = `EL-${Math.floor(100000 + Math.random() * 900000)}-D`;
        currentReading = (
          41200 +
          Math.floor(Math.random() * 800) +
          Math.random()
        ).toFixed(1);
        serialNumberConfidence = parseFloat(
          (90 + Math.random() * 9).toFixed(1),
        );
        currentReadingConfidence = parseFloat(
          (88 + Math.random() * 11).toFixed(1),
        );
        unit = "kWh";
      } else if (style === "analog-electric") {
        serialNumber = `EL-${Math.floor(100000 + Math.random() * 900000)}-A`;
        currentReading =
          (41200 + Math.floor(Math.random() * 1500)).toFixed(0) + ".0";
        serialNumberConfidence = parseFloat(
          (85 + Math.random() * 14).toFixed(1),
        );
        currentReadingConfidence = parseFloat(
          (55 + Math.random() * 30).toFixed(1),
        );
        unit = "kWh";
      } else {
        serialNumber = `WT-${Math.floor(10000 + Math.random() * 90000)}-W`;
        currentReading = `00${(180 + Math.floor(Math.random() * 45) + Math.random()).toFixed(1)}`;
        serialNumberConfidence = parseFloat(
          (82 + Math.random() * 15).toFixed(1),
        );
        currentReadingConfidence = parseFloat(
          (75 + Math.random() * 20).toFixed(1),
        );
        unit = "m³";
      }

      const newReading: MeterReading = {
        id,
        fileName,
        meterType,
        serialNumber,
        serialNumberConfidence,
        currentReading,
        currentReadingConfidence,
        previousReading,
        unit,
        status: "pending",
        uploadedAt: new Date().toISOString(),
        uploadedBy: "ทีมงานผู้ใช้งาน",
        mockMeterStyle: style,
        boundingBoxes: [
          {
            id: `bb-${Date.now()}-1`,
            x: 25,
            y: 15,
            width: 50,
            height: 12,
            label: "serial",
            confidence: serialNumberConfidence / 100,
            value: serialNumber,
          },
          {
            id: `bb-${Date.now()}-2`,
            x: 28,
            y: 45,
            width: 44,
            height: 20,
            label: "value",
            confidence: currentReadingConfidence / 100,
            value: currentReading,
          },
        ],
      };

      setReadings((prev) => [newReading, ...prev]);
      setActiveReadingId(newReading.id);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] flex flex-col antialiased">
      <Navbar />

      <div className="flex-1 flex flex-row">
        <Sidebar />

        <main className="flex-1 bg-[#f4f6fc] p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-900">Update Meter Readings</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Update Corrective Action Progress
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                ระบบจัดการและตรวจสอบการนำเข้าค่าน้ำ/ค่าไฟของหัวเครื่องวัดด้วย
                OCR และ AI
              </p>
            </div>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh Readings</span>
            </button>
          </div>

          <DashboardStats
            readings={readings}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <OcrStudio
                activeReading={activeReading}
                onUpdateFields={handleUpdateFields}
                onApprove={handleApprove}
                onFlag={handleFlag}
              />
            </div>

            <div className="lg:col-span-4">
              <UploadZone
                isScanning={isScanning}
                onUploadSimulated={handleUploadSimulated}
              />
            </div>
          </div>

          <HistoryTable
            readings={readings}
            activeReadingId={activeReadingId}
            selectReading={handleSelectReading}
            deleteReading={handleDeleteReading}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterType={filterType}
            setFilterType={setFilterType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </main>
      </div>
    </div>
  );
}

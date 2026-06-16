'use client';

import React from 'react';
import { 
  Zap, 
  Droplet, 
  Search, 
  Trash2, 
  Eye, 
  Filter, 
  Plus, 
  Download 
} from 'lucide-react';
import { MeterReading, MeterType, ReadingStatus } from '../lib/data';

interface HistoryTableProps {
  readings: MeterReading[];
  activeReadingId: string | null;
  selectReading: (id: string) => void;
  deleteReading: (id: string) => void;
  filterStatus: ReadingStatus | 'all';
  setFilterStatus: (status: ReadingStatus | 'all') => void;
  filterType: MeterType | 'all';
  setFilterType: (type: MeterType | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function HistoryTable({
  readings,
  activeReadingId,
  selectReading,
  deleteReading,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  searchQuery,
  setSearchQuery
}: HistoryTableProps) {

  const filteredReadings = readings.filter((reading) => {
    const matchesStatus = filterStatus === 'all' || reading.status === filterStatus;
    const matchesType = filterType === 'all' || reading.meterType === filterType;
    
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      reading.fileName.toLowerCase().includes(term) ||
      reading.serialNumber.toLowerCase().includes(term) ||
      reading.id.toLowerCase().includes(term) ||
      reading.uploadedBy.toLowerCase().includes(term);

    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusBadge = (status: ReadingStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-block px-3 py-0.5 text-[9px] font-bold text-white bg-emerald-600 rounded uppercase tracking-wider text-center min-w-[76px]">
            APPROVED
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-block px-3 py-0.5 text-[9px] font-bold text-white bg-pink-600 rounded uppercase tracking-wider text-center min-w-[76px]">
            FLAGGED
          </span>
        );
      default:
        return (
          <span className="inline-block px-3 py-0.5 text-[9px] font-bold text-white bg-blue-600 rounded uppercase tracking-wider text-center min-w-[76px]">
            PENDING
          </span>
        );
    }
  };

  const getConfidenceLevel = (score: number) => {
    if (score >= 90) return 'text-emerald-600 font-bold';
    if (score >= 70) return 'text-amber-600 font-bold';
    return 'text-rose-600 font-bold';
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-slate-200 bg-white shadow-sm">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-extrabold text-blue-900 flex items-center gap-2 uppercase tracking-wide">
            <Filter className="w-4 h-4 text-blue-700" />
            RESULTS / METER LOGS
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            ประวัติรายการสแกนมิเตอร์และระดับความแม่นยำในการวิเคราะห์ข้อมูล
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาตามซีเรียล, ไฟล์, ผู้ตรวจสอบ..."
            className="w-full bg-white border border-slate-300 rounded py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 rounded p-0.5 border border-slate-200 text-[10px] font-bold text-slate-600">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              ALL TYPES
            </button>
            <button
              onClick={() => setFilterType('electricity')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterType === 'electricity' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              ELECTRICITY
            </button>
            <button
              onClick={() => setFilterType('water')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterType === 'water' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              WATER
            </button>
          </div>

          <div className="flex bg-slate-100 rounded p-0.5 border border-slate-200 text-[10px] font-bold text-slate-600">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterStatus === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              ALL STATUS
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterStatus === 'pending' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-900'}`}
            >
              PENDING
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterStatus === 'approved' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:text-slate-900'}`}
            >
              APPROVED
            </button>
            <button
              onClick={() => setFilterStatus('flagged')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filterStatus === 'flagged' ? 'bg-pink-600 text-white shadow-sm' : 'hover:text-slate-900'}`}
            >
              FLAGGED
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="py-1 px-3 bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Case</span>
          </button>
          <button className="py-1 px-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full border border-slate-200 rounded">
        {filteredReadings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center bg-white">
            <span className="text-slate-400 text-xs font-semibold">ไม่พบข้อมูลตามตัวเลือกตัวกรอง</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-blue-700 border-b border-blue-800 text-white text-[10px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 text-center w-16">SYSTEM</th>
                <th className="py-3 px-4">FILE NAME</th>
                <th className="py-3 px-4">SERIAL NO.</th>
                <th className="py-3 px-4 text-right">Extracted Value</th>
                <th className="py-3 px-4">UPLOADED TIME</th>
                <th className="py-3 px-4">OPERATOR</th>
                <th className="py-3 px-4 text-center">STATUS</th>
                <th className="py-3 px-4 text-center w-24">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
              {filteredReadings.map((reading) => {
                const isActive = activeReadingId === reading.id;
                
                return (
                  <tr 
                    key={reading.id} 
                    onClick={() => selectReading(reading.id)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer odd:bg-slate-50/20 ${
                      isActive ? 'bg-blue-50/60 font-bold text-slate-900 border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        {reading.meterType === 'electricity' ? (
                          <div className="flex items-center justify-center w-6 h-6 rounded bg-amber-50 text-amber-700 border border-amber-200">
                            <Zap className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-6 h-6 rounded bg-sky-50 text-sky-700 border border-sky-200">
                            <Droplet className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-3 px-4 max-w-[150px] truncate">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{reading.fileName}</span>
                        <span className="text-[9px] text-slate-400 font-mono mt-0.5">{reading.id}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <div className="flex flex-col">
                        <span>{reading.serialNumber}</span>
                        <span className={`text-[9px] ${getConfidenceLevel(reading.serialNumberConfidence)}`}>
                          AI Conf: {reading.serialNumberConfidence}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-right text-sm">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-slate-800">{reading.currentReading} <span className="text-[8px] font-sans font-bold text-slate-400">{reading.unit}</span></span>
                        <span className={`text-[9px] font-normal ${getConfidenceLevel(reading.currentReadingConfidence)}`}>
                          AI Conf: {reading.currentReadingConfidence}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-semibold">
                      {new Date(reading.uploadedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-semibold">
                      {reading.uploadedBy}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(reading.status)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => selectReading(reading.id)}
                          className="py-1 px-2 text-[10px] font-bold border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 rounded cursor-pointer"
                        >
                          Verify
                        </button>
                        
                        <button
                          onClick={() => deleteReading(reading.id)}
                          className="p-1 rounded border border-slate-200 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

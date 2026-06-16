'use client';

import React from 'react';
import { FileText, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MeterReading, ReadingStatus } from '../lib/data';

interface DashboardStatsProps {
  readings: MeterReading[];
  filterStatus: ReadingStatus | 'all';
  setFilterStatus: (status: ReadingStatus | 'all') => void;
}

export function DashboardStats({ readings, filterStatus, setFilterStatus }: DashboardStatsProps) {
  const stats = {
    total: readings.length,
    pending: readings.filter((r) => r.status === 'pending').length,
    approved: readings.filter((r) => r.status === 'approved').length,
    flagged: readings.filter((r) => r.status === 'flagged').length,
  };

  const statCards = [
    {
      title: 'รูปภาพทั้งหมด',
      value: stats.total,
      subtext: 'อัพโหลดเข้าระบบ',
      icon: FileText,
      colorClass: 'text-blue-700 bg-blue-50 border-blue-200',
      activeBorderClass: 'border-blue-600 ring-2 ring-blue-100',
      statusValue: 'all' as const
    },
    {
      title: 'รอตรวจสอบ',
      value: stats.pending,
      subtext: 'ต้องยืนยันข้อมูล',
      icon: Clock,
      colorClass: 'text-amber-700 bg-amber-50 border-amber-200',
      activeBorderClass: 'border-amber-500 ring-2 ring-amber-100',
      statusValue: 'pending' as const
    },
    {
      title: 'ตรวจสอบแล้ว',
      value: stats.approved,
      subtext: 'ยืนยันความถูกต้อง',
      icon: CheckCircle2,
      colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      activeBorderClass: 'border-emerald-600 ring-2 ring-emerald-100',
      statusValue: 'approved' as const
    },
    {
      title: 'พบความผิดปกติ',
      value: stats.flagged,
      subtext: 'ค่าอ่านเกินขอบเขต',
      icon: AlertTriangle,
      colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
      activeBorderClass: 'border-rose-600 ring-2 ring-rose-100',
      statusValue: 'flagged' as const
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        const isActive = filterStatus === card.statusValue;

        return (
          <button
            key={card.title}
            onClick={() => setFilterStatus(card.statusValue)}
            className={`flex flex-col items-start justify-between p-5 rounded-lg border bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group cursor-pointer ${
              isActive 
                ? card.activeBorderClass 
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {card.title}
              </span>
              <div className={`p-1.5 rounded border ${card.colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-3">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
                {card.value}
              </span>
              <p className="mt-1.5 text-[10px] font-semibold text-slate-400">
                {card.subtext}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

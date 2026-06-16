'use client';

import React, { useState, useEffect } from 'react';
import { MockMeterSvg } from './mock-meter-svg';
import { 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  Calendar, 
  User, 
  Cpu, 
  Sparkles,
  Info
} from 'lucide-react';
import { MeterReading } from '../lib/data';

interface OcrStudioProps {
  activeReading: MeterReading | null;
  onUpdateFields: (id: string, serial: string, reading: string) => void;
  onApprove: (id: string) => void;
  onFlag: (id: string) => void;
}

export function OcrStudio({ activeReading, onUpdateFields, onApprove, onFlag }: OcrStudioProps) {
  const [focusedField, setFocusedField] = useState<'serial' | 'value' | null>(null);
  const [serialInput, setSerialInput] = useState('');
  const [readingInput, setReadingInput] = useState('');

  useEffect(() => {
    if (activeReading) {
      setSerialInput(activeReading.serialNumber);
      setReadingInput(activeReading.currentReading);
    }
  }, [activeReading?.id, activeReading?.serialNumber, activeReading?.currentReading]);

  if (!activeReading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px] rounded-lg border border-slate-200 bg-white shadow-sm">
        <HelpCircle className="w-10 h-10 text-slate-300 mb-3" />
        <h3 className="text-sm font-bold text-slate-800">โปรดเลือกรายการค่าน้ำ/ค่าไฟมิเตอร์</h3>
        <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">
          เลือกหัวข้อมิเตอร์จากตารางด้านล่าง หรือจำลองการอัพโหลดด้วยกล่องด้านขวาเพื่อเริ่มตรวจสอบข้อมูลค่าน้ำ/ค่าไฟผ่าน AI OCR
        </p>
      </div>
    );
  }

  const handleSerialChange = (val: string) => {
    setSerialInput(val);
    onUpdateFields(activeReading.id, val, readingInput);
  };

  const handleReadingChange = (val: string) => {
    setReadingInput(val);
    onUpdateFields(activeReading.id, serialInput, val);
  };

  const prevNum = parseFloat(activeReading.previousReading) || 0;
  const currentNum = parseFloat(readingInput) || 0;
  const usageDelta = parseFloat((currentNum - prevNum).toFixed(1));
  const isAnomaly = usageDelta < 0 || usageDelta > (activeReading.meterType === 'electricity' ? 800 : 50);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-50' };
    if (score >= 70) return { bg: 'bg-amber-600', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-50' };
    return { bg: 'bg-rose-600', text: 'text-rose-700', border: 'border-rose-200', badge: 'bg-rose-50' };
  };

  const serialConf = getConfidenceColor(activeReading.serialNumberConfidence);
  const readingConf = getConfidenceColor(activeReading.currentReadingConfidence);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-lg border border-slate-200 bg-white shadow-sm">
      
      <div className="lg:col-span-12 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {activeReading.id}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
              activeReading.status === 'approved' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : activeReading.status === 'flagged'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {activeReading.status === 'approved' ? 'อนุมัติแล้ว' : activeReading.status === 'flagged' ? 'พบความผิดปกติ' : 'รอตรวจสอบ'}
            </span>
          </div>
          <h2 className="text-sm font-extrabold text-blue-900 mt-1.5 flex items-center gap-2 uppercase tracking-wide">
            <Cpu className="w-4 h-4 text-blue-700" />
            AI OCR Verification Studio
          </h2>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-semibold">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{new Date(activeReading.uploadedAt).toLocaleString('th-TH')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{activeReading.uploadedBy}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          รูปภาพจากกล้องถ่ายมิเตอร์ (Vector Simulated)
        </span>
        
        <div className="relative w-full aspect-square max-w-[340px] mx-auto rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-zinc-950">
          <MockMeterSvg 
            style={activeReading.mockMeterStyle}
            serialNumber={serialInput}
            currentReading={readingInput}
            highlightedBoxId={focusedField}
          />

          {activeReading.boundingBoxes.map((box) => {
            const isHighlighted = focusedField === box.label;
            const borderColors = box.label === 'serial' ? 'border-sky-400' : 'border-blue-400';
            const bgGlow = box.label === 'serial' ? 'rgba(56,189,248,0.1)' : 'rgba(59,130,246,0.1)';
            
            return (
              <div
                key={box.id}
                onMouseEnter={() => setFocusedField(box.label)}
                onMouseLeave={() => setFocusedField(null)}
                className={`absolute border-2 rounded transition-all duration-200 ${borderColors} ${
                  isHighlighted 
                    ? 'ring-2 ring-blue-500 scale-[1.01] z-20 animate-box-glow' 
                    : 'opacity-60 hover:opacity-100 hover:scale-[1.01] cursor-pointer'
                }`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                  backgroundColor: isHighlighted ? bgGlow : 'rgba(0,0,0,0.1)'
                }}
              >
                <div className="absolute bottom-full left-0 mb-1 pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[8px] text-white flex items-center gap-1 font-mono whitespace-nowrap">
                  <span>{box.label === 'serial' ? 'SN' : 'Val'}:</span>
                  <span className="font-bold">{box.value}</span>
                  <span className="text-sky-300">({Math.round(box.confidence * 100)}%)</span>
                </div>
              </div>
            );
          })}

          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10 pointer-events-none animate-scan"></div>
        </div>
        
        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 mt-1 font-semibold">
          <Info className="w-3.5 h-3.5 text-slate-300" />
          <span>ชี้กล่องที่ภาพเพื่อระบุความสัมพันธ์ หรือพิมพ์ช่องแก้ไขข้อมูลด้านขวา</span>
        </p>
      </div>

      <div className="lg:col-span-6 flex flex-col justify-between gap-5">
        
        <div className="flex flex-col gap-4">
          
          <div 
            className={`p-4 rounded border transition-all duration-200 ${
              focusedField === 'serial' 
                ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-100' 
                : 'border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">เลขซีเรียลมิเตอร์ (Serial Number)</label>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-1 ${serialConf.badge} ${serialConf.text} border ${serialConf.border}`}>
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI มั่นใจ {activeReading.serialNumberConfidence}%</span>
              </span>
            </div>
            
            <input
              type="text"
              value={serialInput}
              onFocus={() => setFocusedField('serial')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => handleSerialChange(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded py-1.5 px-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-colors"
              placeholder="กรอกเลขซีเรียล"
            />
            
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full ${serialConf.bg} transition-all duration-300`}
                style={{ width: `${activeReading.serialNumberConfidence}%` }}
              ></div>
            </div>
          </div>

          <div 
            className={`p-4 rounded border transition-all duration-200 ${
              focusedField === 'value' 
                ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-100' 
                : 'border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">ตัวเลขค่าน้ำ/ค่าไฟ (Meter Reading)</label>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-1 ${readingConf.badge} ${readingConf.text} border ${readingConf.border}`}>
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI มั่นใจ {activeReading.currentReadingConfidence}%</span>
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={readingInput}
                onFocus={() => setFocusedField('value')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handleReadingChange(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded py-1.5 px-2.5 pr-10 text-base font-bold text-slate-800 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-100 transition-colors"
                placeholder="00000.0"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 font-mono">
                {activeReading.unit}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-3 mb-3">
              <div 
                className={`h-full ${readingConf.bg} transition-all duration-300`}
                style={{ width: `${activeReading.currentReadingConfidence}%` }}
              ></div>
            </div>

            <div className="p-3 rounded bg-white border border-slate-200 flex flex-col gap-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold">ค่าอ่านครั้งก่อนหน้า (Previous)</span>
                <span className="font-mono font-bold text-slate-800">
                  {activeReading.previousReading} {activeReading.unit}
                </span>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
                <span className="font-semibold">ปริมาณการใช้งาน (Usage)</span>
                <div className="flex items-center gap-0.5">
                  <span className={`font-mono font-extrabold ${usageDelta < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {usageDelta >= 0 ? `+${usageDelta}` : usageDelta}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{activeReading.unit}</span>
                </div>
              </div>

              {isAnomaly && (
                <div className="flex items-start gap-1.5 bg-rose-50 border border-rose-100 rounded p-2 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-rose-700 leading-normal font-semibold">
                    {usageDelta < 0 
                      ? 'ค่าอ่านปัจจุบันต่ำกว่าค่าเดิม โปรดตรวจสอบมิเตอร์มีการถอยกลับหรือกรอกข้อมูลผิดพลาด' 
                      : 'ปริมาณการใช้งานในรอบนี้เพิ่มขึ้นสูงผิดปกติ คาดว่าข้อมูลการอ่านคลาดเคลื่อน'}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
          <div className="flex gap-2">
            <button
              onClick={() => onFlag(activeReading.id)}
              className="flex-1 py-2 px-3 rounded border border-rose-300 bg-rose-50 hover:bg-rose-100/50 text-rose-700 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>รายงานผิดปกติ</span>
            </button>
            
            <button
              onClick={() => onApprove(activeReading.id)}
              className="flex-1 py-2 px-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>อนุมัติผลตรวจสอบ</span>
            </button>
          </div>

          <div className="text-[9px] font-semibold text-slate-400 text-center">
            การอนุมัติจะส่งข้อมูลยืนยันค่ามิเตอร์เข้าระบบ SAP ERP โดยอัตโนมัติ
          </div>
        </div>

      </div>

    </div>
  );
}

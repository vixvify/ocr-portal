'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Zap, Droplet, Loader2 } from 'lucide-react';
import { MeterType } from '../lib/data';

interface UploadZoneProps {
  isScanning: boolean;
  onUploadSimulated: (
    fileName: string, 
    meterType: MeterType, 
    style: 'digital-electric' | 'analog-electric' | 'water-dial'
  ) => void;
}

export function UploadZone({ isScanning, onUploadSimulated }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processUploadedFile(file.name);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processUploadedFile(file.name);
    }
  };

  const processUploadedFile = (name: string) => {
    setSelectedFileName(name);
    
    const lowerName = name.toLowerCase();
    let type: MeterType = 'electricity';
    let style: 'digital-electric' | 'analog-electric' | 'water-dial' = 'digital-electric';

    if (lowerName.includes('water') || lowerName.includes('น้ำ') || lowerName.includes('wt')) {
      type = 'water';
      style = 'water-dial';
    } else if (lowerName.includes('analog') || lowerName.includes('หมุน') || Math.random() > 0.5) {
      type = 'electricity';
      style = 'analog-electric';
    }

    onUploadSimulated(name, type, style);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handlePresetSelect = (
    name: string,
    type: MeterType,
    style: 'digital-electric' | 'analog-electric' | 'water-dial'
  ) => {
    setSelectedFileName(name);
    onUploadSimulated(name, type, style);
  };

  return (
    <div className="flex flex-col gap-5 p-6 rounded-lg border border-slate-200 bg-white shadow-sm">
      <div>
        <h2 className="text-sm font-extrabold text-blue-900 flex items-center gap-2 uppercase tracking-wide">
          <UploadCloud className="w-4 h-4 text-blue-700" />
          Upload Meter Photo
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          อัพโหลดรูปภาพมิเตอร์ไฟหรือมิเตอร์น้ำเพื่อตรวจสอบค่าด้วย AI OCR
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`relative flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer min-h-[160px] ${
          dragActive
            ? 'border-blue-500 bg-blue-50/50'
            : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
        } ${isScanning ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isScanning}
        />

        {isScanning ? (
          <div className="flex flex-col items-center text-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-700 animate-spin" />
            <div className="mt-1">
              <span className="text-xs font-bold text-slate-800">
                Analyzing meter layout...
              </span>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                {selectedFileName || 'meter_reading.png'}
              </p>
            </div>
            <div className="w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-blue-700 animate-[pulse-glow_1.5s_infinite] w-full origin-left transition-all"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-700">
              Drag & Drop file here or <span className="text-blue-700 hover:underline">Browse</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Supports PNG, JPG, JPEG (Max 10MB)
            </p>
          </div>
        )}
      </div>

      {!isScanning && (
        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Quick Simulation Presets
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handlePresetSelect('sample_digital_electricity.jpg', 'electricity', 'digital-electric')}
              className="flex flex-col items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-700 text-center transition-all duration-150 group cursor-pointer"
            >
              <div className="p-1 rounded bg-blue-50 text-blue-700 group-hover:scale-105 transition-transform">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px]">
                <p className="font-bold text-slate-700">Digital</p>
                <p className="text-slate-400 font-mono text-[9px] mt-0.5">Electric</p>
              </div>
            </button>

            <button
              onClick={() => handlePresetSelect('sample_analog_electricity.jpg', 'electricity', 'analog-electric')}
              className="flex flex-col items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-700 text-center transition-all duration-150 group cursor-pointer"
            >
              <div className="p-1 rounded bg-blue-50 text-blue-700 group-hover:scale-105 transition-transform">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px]">
                <p className="font-bold text-slate-700">Analog</p>
                <p className="text-slate-400 font-mono text-[9px] mt-0.5">Electric</p>
              </div>
            </button>

            <button
              onClick={() => handlePresetSelect('sample_water_meter.jpg', 'water', 'water-dial')}
              className="flex flex-col items-center gap-2 p-2.5 rounded border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-700 text-center transition-all duration-150 group cursor-pointer"
            >
              <div className="p-1 rounded bg-blue-50 text-blue-700 group-hover:scale-105 transition-transform">
                <Droplet className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px]">
                <p className="font-bold text-slate-700">Water</p>
                <p className="text-slate-400 font-mono text-[9px] mt-0.5">Dial</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

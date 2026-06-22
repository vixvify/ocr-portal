"use client";

import React, { useRef } from "react";
import { FileUp, Cpu, X, Image as ImageIcon } from "lucide-react";
import { WorkspaceSample } from "../core/domain/analyze";
import { WORKSPACE_SAMPLES } from "../lib/data";

interface UploadPanelProps {
  selectedImageUrl: string | null;
  selectedFileName: string | null;
  selectedSampleId: string | null;
  isAnalyzing: boolean;
  onSelectSample: (sample: WorkspaceSample) => void;
  onClearImage: () => void;
  onUploadFile: (file: File) => void;
  onAnalyze: () => void;
}

export function UploadPanel({
  selectedImageUrl,
  selectedFileName,
  selectedSampleId,
  isAnalyzing,
  onSelectSample,
  onClearImage,
  onUploadFile,
  onAnalyze,
}: UploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
          <FileUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Upload Meter Image
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Select or drag & drop a gas meter image to analyze
          </p>
        </div>
      </div>

      <hr className="border-slate-100 -mx-6" />

      {/* Upload Zone / Preview */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !selectedImageUrl && fileInputRef.current?.click()}
        className={`relative aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${
          selectedImageUrl
            ? "border-transparent bg-slate-50"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isAnalyzing}
        />

        {selectedImageUrl ? (
          <div className="relative w-full h-full group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImageUrl}
              alt={selectedFileName || "Uploaded Meter"}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClearImage();
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white flex items-center justify-center transition-colors shadow"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scanning Overlay Animation when Analyzing */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-85 animate-[scan_2s_ease-in-out_infinite]"></div>
                <div className="bg-white/95 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                  Analyzing image...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-6 gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <FileUp className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-600">
              Drag & drop or <span className="text-blue-600 hover:underline">browse</span>
            </div>
            <div className="text-xs text-slate-400">
              Supports JPG, JPEG, PNG (max 10MB)
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        type="button"
        disabled={!selectedImageUrl || isAnalyzing}
        onClick={onAnalyze}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all border duration-150 ${
          !selectedImageUrl
            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            : isAnalyzing
              ? "bg-blue-50 border-blue-200 text-blue-600 cursor-wait"
              : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] cursor-pointer"
        }`}
      >
        <Cpu className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`} />
        Analyze Meter Image
      </button>

      <hr className="border-slate-100 -mx-6" />

      {/* Workspace Samples */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Workspace Samples
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {WORKSPACE_SAMPLES.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample)}
                className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all duration-150 group cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className={`w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 border ${
                  isSelected ? "border-blue-200" : "border-slate-200"
                }`}>
                  <ImageIcon className={`w-4 h-4 ${isSelected ? "text-blue-500" : "text-slate-400 group-hover:text-slate-500"}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold truncate ${
                    isSelected ? "text-blue-700" : "text-slate-700 group-hover:text-slate-900"
                  }`}>
                    {sample.fileName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

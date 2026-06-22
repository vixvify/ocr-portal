"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { UploadPanel } from "../components/upload-panel";
import { AnalysisPanel } from "../components/analysis-panel";
import { WorkspaceSample, MeterAnalysisResponse } from "../core/domain/analyze";
import { WORKSPACE_SAMPLES } from "../lib/data";
import { analyzeService } from "../infra/container";

export default function Home() {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MeterAnalysisResponse | null>(null);

  // Set the default sample on page load (test5.jpg is selected by default in screenshot)
  useEffect(() => {
    const defaultSample = WORKSPACE_SAMPLES.find(
      (s) => s.fileName === "test5.jpg"
    );
    if (defaultSample) {
      setSelectedImageUrl(defaultSample.imageUrl);
      setSelectedFileName(defaultSample.fileName);
      setSelectedSampleId(defaultSample.id);
    }
  }, []);

  const handleSelectSample = (sample: WorkspaceSample) => {
    setSelectedImageUrl(sample.imageUrl);
    setSelectedFileName(sample.fileName);
    setSelectedSampleId(sample.id);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleClearImage = () => {
    setSelectedImageUrl(null);
    setSelectedFileName(null);
    setSelectedSampleId(null);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleUploadFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setSelectedImageUrl(objectUrl);
    setSelectedFileName(file.name);
    setSelectedSampleId(null);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleAnalyze = async () => {
    if (!selectedImageUrl) return;

    setIsAnalyzing(true);
    setHasAttempted(true);

    try {
      // Pass file name or actual file to service layer
      const response = await analyzeService.analyzeImage(
        selectedFileName || "custom_uploaded_meter.jpg"
      );
      setAnalysisResult(response);
    } catch (err) {
      console.error("Analysis failed:", err);
      // In case of error, we can fall back to null or handle error state
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] flex flex-col antialiased">
      <Navbar />

      <div className="flex-1 flex flex-row">
        <Sidebar />

        <main className="flex-1 bg-[#f4f6fc] p-8 flex flex-col gap-6 overflow-y-auto">
          {/* Main 2-Column Redesign Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full">
            {/* Left Column: Upload & Samples Panel */}
            <div className="lg:col-span-5 xl:col-span-4 w-full">
              <UploadPanel
                selectedImageUrl={selectedImageUrl}
                selectedFileName={selectedFileName}
                selectedSampleId={selectedSampleId}
                isAnalyzing={isAnalyzing}
                onSelectSample={handleSelectSample}
                onClearImage={handleClearImage}
                onUploadFile={handleUploadFile}
                onAnalyze={handleAnalyze}
              />
            </div>

            {/* Right Column: Parameters Display Panel */}
            <div className="lg:col-span-7 xl:col-span-8 w-full">
              <AnalysisPanel
                result={analysisResult}
                isAnalyzing={isAnalyzing}
                hasAttempted={hasAttempted}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

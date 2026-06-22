"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { UploadPanel } from "../components/upload-panel";
import { AnalysisPanel } from "../components/analysis-panel";
import { WorkspaceImage, MeterAnalysisResponse } from "../core/domain/analyze";
import { WORKSPACE_IMAGES } from "../lib/data";
import { analyzeService } from "../infra/container";

export default function Home() {
  const [images, setImages] = useState<WorkspaceImage[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MeterAnalysisResponse | null>(null);

  useEffect(() => {
    setImages(WORKSPACE_IMAGES);
    const defaultImage = WORKSPACE_IMAGES.find(
      (img) => img.fileName === "test5.jpg"
    );
    if (defaultImage) {
      setSelectedImageUrl(defaultImage.imageUrl);
      setSelectedFileName(defaultImage.fileName);
      setSelectedImageId(defaultImage.id);
    }
  }, []);

  const handleSelectImage = (image: WorkspaceImage) => {
    setSelectedImageUrl(image.imageUrl);
    setSelectedFileName(image.fileName);
    setSelectedImageId(image.id);
    setUploadedFile(null);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleClearImage = () => {
    setSelectedImageUrl(null);
    setSelectedFileName(null);
    setSelectedImageId(null);
    setUploadedFile(null);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleUploadFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const newImage: WorkspaceImage = {
      id: `custom-${Date.now()}`,
      fileName: file.name,
      imageUrl: objectUrl,
      mockResponse: {
        meter_type: "Digital",
        detected_format: "digital screen custom index",
        correct_v_scm: "2,345.1",
        line_v_m3: "2,300.2",
        pressure_bar: "3.245",
        temperature_c: "21.8",
        correction_factor: "1.0084",
        turbine_v_m3: null,
        qm_m3_h: "12.5",
        qb_sm3_h: "12.6",
        pulse_weight: null,
      },
    };

    setImages((prev) => [newImage, ...prev]);
    setSelectedImageUrl(newImage.imageUrl);
    setSelectedFileName(newImage.fileName);
    setSelectedImageId(newImage.id);
    setUploadedFile(file);
    setAnalysisResult(null);
    setHasAttempted(false);
  };

  const handleDeleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    if (selectedImageId === imageId) {
      handleClearImage();
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImageUrl) return;

    setIsAnalyzing(true);
    setHasAttempted(true);

    try {
      const param = uploadedFile || selectedFileName || "custom.jpg";
      const response = await analyzeService.analyzeImage(param);
      setAnalysisResult(response);
    } catch (err) {
      console.error("Analysis failed:", err);
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full">
            <div className="lg:col-span-5 xl:col-span-4 w-full">
              <UploadPanel
                selectedImageUrl={selectedImageUrl}
                selectedFileName={selectedFileName}
                selectedImageId={selectedImageId}
                isAnalyzing={isAnalyzing}
                images={images}
                onSelectImage={handleSelectImage}
                onDeleteImage={handleDeleteImage}
                onClearImage={handleClearImage}
                onUploadFile={handleUploadFile}
                onAnalyze={handleAnalyze}
              />
            </div>

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

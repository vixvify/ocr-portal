import { MeterAnalysisResponse } from "@/core/domain/analyze";
import { AnalyzeRepository } from "@/core/ports/analyze.repository";
import { ApiResponse } from "@/infra/interface/response";
import httpClient from "@/lib/http";

export class AnalyzeRepositoryImpl implements AnalyzeRepository {
  async analyzeImage(formData: FormData): Promise<ApiResponse<MeterAnalysisResponse>> {
    const response = await httpClient.post<MeterAnalysisResponse>("/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }
}

import { MeterAnalysisResponse } from "@/core/domain/analyze";
import { MeterRepository } from "@/core/ports/meter.repository";
import { ApiResponse } from "@/infra/interface/response";
import httpClient from "@/lib/http";

export class MeterRepositoryImpl implements MeterRepository {
  async analyzeImage(formData: FormData): Promise<ApiResponse<MeterAnalysisResponse>> {
    const response = await httpClient.post<MeterAnalysisResponse>("/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }
}

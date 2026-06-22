import { ApiResponse } from "@/infra/interface/response";
import { MeterAnalysisResponse } from "../domain/analyze";

export interface AnalyzeRepository {
  analyzeImage(file: File | string): Promise<ApiResponse<MeterAnalysisResponse>>;
}

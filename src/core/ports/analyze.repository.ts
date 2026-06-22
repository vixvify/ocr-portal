import { ApiResponse } from "@/infra/interface/response";
import { MeterAnalysisResponse } from "../domain/analyze";

export interface AnalyzeRepository {
  analyzeImage(formData: FormData): Promise<ApiResponse<MeterAnalysisResponse>>;
}

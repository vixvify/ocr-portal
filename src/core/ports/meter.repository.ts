import { ApiResponse } from "@/infra/interface/response";
import { MeterAnalysisResponse } from "../domain/analyze";

export interface MeterRepository {
  analyzeImage(formData: FormData): Promise<ApiResponse<MeterAnalysisResponse>>;
}

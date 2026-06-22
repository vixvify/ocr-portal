import { MeterAnalysisResponse } from "../domain/analyze";

export interface IAnalyzeRepository {
  analyzeImage(file: File | string): Promise<MeterAnalysisResponse>;
}

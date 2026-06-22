import { MeterAnalysisResponse } from "../domain/analyze";
import { AnalyzeRepository } from "../ports/analyze.repository";

export class AnalyzeService {
  constructor(private readonly analyzeRepository: AnalyzeRepository) {}

  async analyzeImage(file: File | string): Promise<MeterAnalysisResponse> {
    try {
      const response = await this.analyzeRepository.analyzeImage(file);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    } catch (error) {
      console.error("Error in analyzeImage:", error);
      throw error;
    }
  }
}

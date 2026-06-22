import { MeterAnalysisResponse } from "../domain/analyze";
import { IAnalyzeRepository } from "../ports/analyze.repository";

export class AnalyzeService {
  constructor(private readonly analyzeRepository: IAnalyzeRepository) {}

  async analyzeImage(file: File | string): Promise<MeterAnalysisResponse> {
    return this.analyzeRepository.analyzeImage(file);
  }
}

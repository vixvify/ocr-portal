import { MeterAnalysisResponse } from "../../core/domain/analyze";
import { IAnalyzeRepository } from "../../core/ports/analyze.repository";
import { WORKSPACE_SAMPLES } from "../../lib/data";

export class AnalyzeRepository implements IAnalyzeRepository {
  async analyzeImage(file: File | string): Promise<MeterAnalysisResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fileName = typeof file === "string" ? file : file.name;

    const sample = WORKSPACE_SAMPLES.find(
      (s) => s.fileName.toLowerCase() === fileName.toLowerCase(),
    );

    if (sample) {
      return { ...sample.mockResponse };
    }

    return {
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
    };
  }
}

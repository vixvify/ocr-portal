import { MeterAnalysisResponse } from "../domain/analyze";
import { MeterRepository } from "../ports/meter.repository";
import { WORKSPACE_IMAGES } from "@/lib/data";

export class MeterService {
  constructor(private readonly meterRepository: MeterRepository) {}

  async analyzeImage(file: File | string): Promise<MeterAnalysisResponse> {
    try {
      const isMockMode =
        process.env.NEXT_PUBLIC_APP_MODE === "mock" ||
        process.env.NEXT_PUBLIC_MOCK_MODE === "true";

      if (isMockMode) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const fileName = typeof file === "string" ? file : file.name;
        const image = WORKSPACE_IMAGES.find(
          (img) => img.fileName.toLowerCase() === fileName.toLowerCase(),
        );

        if (image) {
          return image.mockResponse;
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

      const formData = new FormData();
      if (file instanceof File) {
        formData.append("file", file);
      }

      const response = await this.meterRepository.analyzeImage(formData);
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

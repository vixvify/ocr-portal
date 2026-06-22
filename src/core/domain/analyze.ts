export interface MeterAnalysisResponse {
  meter_type: string | null;
  detected_format: string | null;
  correct_v_scm: string | null;
  line_v_m3: string | null;
  pressure_bar: string | null;
  temperature_c: string | null;
  correction_factor: string | null;
  turbine_v_m3: string | null;
  qm_m3_h: string | null;
  qb_sm3_h: string | null;
  pulse_weight: string | null;
}

export type ParameterStatus = "Found" | "Not found";

export interface ExtractedParameter {
  key: keyof Omit<MeterAnalysisResponse, "meter_type" | "detected_format">;
  name: string;
  description: string;
  value: string | null;
  status: ParameterStatus;
}

export interface WorkspaceImage {
  id: string;
  fileName: string;
  imageUrl: string;
  mockResponse: MeterAnalysisResponse;
}

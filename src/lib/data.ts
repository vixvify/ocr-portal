import { WorkspaceImage } from "../core/domain/analyze";

export const WORKSPACE_IMAGES: WorkspaceImage[] = [
  {
    id: "sample-1",
    fileName: "ItronPage3.jpeg",
    imageUrl: "/images/ItronPage3.jpeg",
    mockResponse: {
      meter_type: "Digital",
      detected_format: "itron digital index screen page",
      correct_v_scm: "12,450.3",
      line_v_m3: "12,140.1",
      pressure_bar: "2.415",
      temperature_c: "22.5",
      correction_factor: "1.0256",
      turbine_v_m3: "12,135.8",
      qm_m3_h: "145.2",
      qb_sm3_h: "148.9",
      pulse_weight: "1.0",
    },
  },
  {
    id: "sample-2",
    fileName: "testpic.png",
    imageUrl: "/images/testpic.png",
    mockResponse: {
      meter_type: "Analog",
      detected_format: "analog mechanical drum index",
      correct_v_scm: null,
      line_v_m3: "00,342.8",
      pressure_bar: null,
      temperature_c: null,
      correction_factor: null,
      turbine_v_m3: "00,342.8",
      qm_m3_h: null,
      qb_sm3_h: null,
      pulse_weight: null,
    },
  },
];

import { AnalyzeService } from "../core/service/analyze.service";
import { AnalyzeRepository } from "./repositories/analyze.repository";

const analyzeRepository = new AnalyzeRepository();
export const analyzeService = new AnalyzeService(analyzeRepository);

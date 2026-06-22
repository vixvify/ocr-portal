import { AnalyzeService } from "../core/service/analyze.service";
import { AnalyzeRepositoryImpl } from "./repositories/analyze.repository";

const analyzeRepository = new AnalyzeRepositoryImpl();
export const analyzeService = new AnalyzeService(analyzeRepository);

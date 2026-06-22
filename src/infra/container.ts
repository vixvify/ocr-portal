import { MeterService } from "../core/service/meter.service";
import { MeterRepositoryImpl } from "./repositories/meter.repository";

const meterRepository = new MeterRepositoryImpl();
export const meterService = new MeterService(meterRepository);

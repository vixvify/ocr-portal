export interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: 'serial' | 'value';
  confidence: number;
  value: string;
}

export type MeterType = 'electricity' | 'water';
export type ReadingStatus = 'pending' | 'approved' | 'flagged';

export interface MeterReading {
  id: string;
  fileName: string;
  meterType: MeterType;
  serialNumber: string;
  serialNumberConfidence: number;
  currentReading: string;
  currentReadingConfidence: number;
  previousReading: string;
  unit: 'kWh' | 'm³';
  status: ReadingStatus;
  uploadedAt: string;
  uploadedBy: string;
  boundingBoxes: BoundingBox[];
  mockMeterStyle: 'digital-electric' | 'analog-electric' | 'water-dial';
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  flagged: number;
  avgConfidence: number;
}

export const INITIAL_MOCK_READINGS: MeterReading[] = [
  {
    id: 'READ-2026-001',
    fileName: 'elec_meter_floor2_west.jpg',
    meterType: 'electricity',
    serialNumber: 'EL-982341-A',
    serialNumberConfidence: 98.4,
    currentReading: '12450.3',
    currentReadingConfidence: 96.8,
    previousReading: '12140.1',
    unit: 'kWh',
    status: 'approved',
    uploadedAt: '2026-06-16T06:15:00Z',
    uploadedBy: 'สมชาย รักดี',
    mockMeterStyle: 'digital-electric',
    boundingBoxes: [
      { id: 'bb-1', x: 25, y: 15, width: 50, height: 12, label: 'serial', confidence: 0.98, value: 'EL-982341-A' },
      { id: 'bb-2', x: 30, y: 45, width: 40, height: 18, label: 'value', confidence: 0.97, value: '12450.3' }
    ]
  },
  {
    id: 'READ-2026-002',
    fileName: 'water_meter_front_pump.jpg',
    meterType: 'water',
    serialNumber: 'WT-12490-B',
    serialNumberConfidence: 78.5,
    currentReading: '00342.8',
    currentReadingConfidence: 81.2,
    previousReading: '00310.5',
    unit: 'm³',
    status: 'pending',
    uploadedAt: '2026-06-16T07:45:00Z',
    uploadedBy: 'วิชัย เก่งการค้า',
    mockMeterStyle: 'water-dial',
    boundingBoxes: [
      { id: 'bb-3', x: 35, y: 12, width: 30, height: 10, label: 'serial', confidence: 0.78, value: 'WT-12490-B' },
      { id: 'bb-4', x: 20, y: 38, width: 60, height: 24, label: 'value', confidence: 0.81, value: '00342.8' }
    ]
  },
  {
    id: 'READ-2026-003',
    fileName: 'elec_meter_server_room.jpg',
    meterType: 'electricity',
    serialNumber: 'EL-102948-C',
    serialNumberConfidence: 99.1,
    currentReading: '84920.1',
    currentReadingConfidence: 62.4,
    previousReading: '79040.2',
    unit: 'kWh',
    status: 'flagged',
    uploadedAt: '2026-06-16T08:05:00Z',
    uploadedBy: 'วิภาดา พรหมดี',
    mockMeterStyle: 'analog-electric',
    boundingBoxes: [
      { id: 'bb-5', x: 28, y: 18, width: 44, height: 12, label: 'serial', confidence: 0.99, value: 'EL-102948-C' },
      { id: 'bb-6', x: 22, y: 48, width: 56, height: 20, label: 'value', confidence: 0.62, value: '84920.1' }
    ]
  }
];

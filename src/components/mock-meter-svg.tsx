'use client';

import React from 'react';

interface MockMeterSvgProps {
  style: 'digital-electric' | 'analog-electric' | 'water-dial';
  serialNumber: string;
  currentReading: string;
  highlightedBoxId?: 'serial' | 'value' | null;
}

export function MockMeterSvg({ style, serialNumber, currentReading, highlightedBoxId }: MockMeterSvgProps) {
  const readingVal = currentReading || '00000.0';
  const serialVal = serialNumber || 'UNKNOWN';

  if (style === 'digital-electric') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full bg-[#121214] select-none">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <rect x="50" y="30" width="300" height="340" rx="20" fill="#2d3139" stroke="#1f2229" strokeWidth="6" />
        <rect x="65" y="45" width="270" height="310" rx="12" fill="#1e2127" />
        
        <path d="M 65 80 L 335 80 L 335 48 C 335 48, 200 65, 65 48 Z" fill="rgba(255,255,255,0.03)" />

        <text x="200" y="75" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="bold" letterSpacing="1.5">
          METROPOLITAN ELECTRICITY AUTHORITY
        </text>
        <text x="200" y="90" textAnchor="middle" fill="#6b7280" fontSize="8" fontWeight="medium">
          DIGITAL KWH METER 1-PHASE 2-WIRE
        </text>

        <rect x="85" y="120" width="230" height="90" rx="8" fill="#0d1f14" stroke="#050e09" strokeWidth="4" />
        <rect x="90" y="125" width="220" height="80" rx="6" fill="#122c1d" />
        
        <text 
          x="285" 
          y="180" 
          textAnchor="end" 
          fill="#06b6d4" 
          fontSize="38" 
          fontFamily="Share Tech Mono" 
          fontWeight="bold" 
          letterSpacing="2"
          className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
        >
          {readingVal}
        </text>
        <text x="295" y="180" fill="#06b6d4" fontSize="14" fontFamily="Share Tech Mono" fontWeight="bold">
          kWh
        </text>

        <text x="100" y="145" fill="#068a9c" fontSize="8" fontFamily="Share Tech Mono">T1 TOTAL</text>
        <text x="100" y="195" fill="#068a9c" fontSize="8" fontFamily="Share Tech Mono">220V 5(15)A 50Hz</text>

        <circle cx="100" cy="245" r="7" fill="#111827" stroke="#374151" strokeWidth="1.5" />
        <circle cx="100" cy="245" r="5" fill="#ef4444" className="animate-pulse" />
        <text x="92" y="265" fill="#9ca3af" fontSize="8" fontWeight="bold">ACT</text>

        <circle cx="150" cy="245" r="7" fill="#111827" stroke="#374151" strokeWidth="1.5" />
        <circle cx="150" cy="245" r="5" fill="#f59e0b" />
        <text x="142" y="265" fill="#9ca3af" fontSize="8" fontWeight="bold">REV</text>

        <rect x="180" y="235" width="135" height="35" rx="4" fill="#fafafa" stroke="#e4e4e7" strokeWidth="2" />
        
        <line x1="190" y1="240" x2="190" y2="255" stroke="black" strokeWidth="3" />
        <line x1="195" y1="240" x2="195" y2="255" stroke="black" strokeWidth="1" />
        <line x1="200" y1="240" x2="200" y2="255" stroke="black" strokeWidth="4" />
        <line x1="206" y1="240" x2="206" y2="255" stroke="black" strokeWidth="2" />
        <line x1="210" y1="240" x2="210" y2="255" stroke="black" strokeWidth="1" />
        <line x1="215" y1="240" x2="215" y2="255" stroke="black" strokeWidth="3" />
        <line x1="220" y1="240" x2="220" y2="255" stroke="black" strokeWidth="2" />
        
        <line x1="240" y1="240" x2="240" y2="255" stroke="black" strokeWidth="4" />
        <line x1="246" y1="240" x2="246" y2="255" stroke="black" strokeWidth="2" />
        <line x1="250" y1="240" x2="250" y2="255" stroke="black" strokeWidth="1" />
        <line x1="255" y1="240" x2="255" y2="255" stroke="black" strokeWidth="3" />
        
        <line x1="270" y1="240" x2="270" y2="255" stroke="black" strokeWidth="2" />
        <line x1="275" y1="240" x2="275" y2="255" stroke="black" strokeWidth="4" />
        <line x1="282" y1="240" x2="282" y2="255" stroke="black" strokeWidth="1" />
        <line x1="290" y1="240" x2="290" y2="255" stroke="black" strokeWidth="3" />
        
        <text x="247" y="266" textAnchor="middle" fill="#000000" fontSize="9" fontFamily="Share Tech Mono" fontWeight="bold">
          {serialVal}
        </text>

        <rect x="85" y="295" width="230" height="40" rx="4" fill="none" stroke="#374151" strokeDasharray="3 3" />
        <text x="200" y="318" textAnchor="middle" fill="#4b5563" fontSize="9">
          TERMINAL CONNECTION DIAGRAM
        </text>
      </svg>
    );
  }

  if (style === 'analog-electric') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full bg-[#121214] select-none">
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          </pattern>
          <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a4f5a" />
            <stop offset="50%" stopColor="#8e94a0" />
            <stop offset="100%" stopColor="#2c3038" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />

        <circle cx="200" cy="200" r="170" fill="url(#brass)" stroke="#1a1c23" strokeWidth="8" />
        <circle cx="200" cy="200" r="162" fill="#e2e8f0" />
        <circle cx="200" cy="200" r="150" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

        <path d="M 58 160 A 148 148 0 0 1 342 160 A 148 138 0 0 0 58 160 Z" fill="rgba(255,255,255,0.15)" />

        <text x="200" y="90" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="bold" letterSpacing="1">
          KILOWATTHOURS
        </text>
        <text x="200" y="105" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="bold">
          1-PHASE 2-WIRE WATTHOUR METER
        </text>

        <rect x="100" y="125" width="200" height="42" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        
        <rect x="106" y="130" width="30" height="32" rx="2" fill="#ffffff" />
        <line x1="106" y1="146" x2="136" y2="146" stroke="#f1f5f9" strokeWidth="1" />
        <text x="121" y="152" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {readingVal[0] || '0'}
        </text>

        <rect x="140" y="130" width="30" height="32" rx="2" fill="#ffffff" />
        <line x1="140" y1="146" x2="170" y2="146" stroke="#f1f5f9" strokeWidth="1" />
        <text x="155" y="152" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {readingVal[1] || '0'}
        </text>

        <rect x="174" y="130" width="30" height="32" rx="2" fill="#ffffff" />
        <line x1="174" y1="146" x2="204" y2="146" stroke="#f1f5f9" strokeWidth="1" />
        <text x="189" y="152" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {readingVal[2] || '0'}
        </text>

        <rect x="208" y="130" width="30" height="32" rx="2" fill="#ffffff" />
        <line x1="208" y1="146" x2="238" y2="146" stroke="#f1f5f9" strokeWidth="1" />
        <text x="223" y="152" textAnchor="middle" fill="#000000" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {readingVal[3] || '0'}
        </text>

        <rect x="242" y="130" width="30" height="32" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
        <line x1="242" y1="146" x2="272" y2="146" stroke="#fee2e2" strokeWidth="1" />
        <text x="257" y="152" textAnchor="middle" fill="#dc2626" fontSize="22" fontWeight="bold" fontFamily="monospace">
          {readingVal[5] || '0'}
        </text>

        <circle cx="282" cy="158" r="3" fill="#cbd5e1" />

        <text x="286" y="138" fill="#475569" fontSize="9" fontWeight="bold">10/1</text>
        
        <rect x="80" y="195" width="240" height="18" fill="#94a3b8" rx="2" stroke="#64748b" strokeWidth="1.5" />
        
        <line x1="80" y1="204" x2="320" y2="204" stroke="#475569" strokeWidth="1" />
        
        <rect x="190" y="195" width="12" height="18" fill="#0f172a" className="animate-pulse" />
        <text x="200" y="190" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">ROTATION</text>

        <text x="130" y="245" fill="#475569" fontSize="9" fontWeight="bold">CT 5A 220V</text>
        <text x="270" y="245" textAnchor="end" fill="#475569" fontSize="9" fontWeight="bold">50Hz 1200r/kWh</text>

        <rect x="120" y="270" width="160" height="24" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
        <text x="200" y="286" textAnchor="middle" fill="#0f172a" fontSize="13" fontFamily="Share Tech Mono" fontWeight="bold" letterSpacing="1.5">
          NO. {serialVal}
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full bg-[#121214] select-none">
      <defs>
        <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        </pattern>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="30%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="water-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid3)" />

      <circle cx="200" cy="200" r="170" fill="url(#gold)" stroke="#451a03" strokeWidth="8" />
      <circle cx="90" cy="90" r="10" fill="#78350f" />
      <circle cx="310" cy="90" r="10" fill="#78350f" />
      <circle cx="90" cy="310" r="10" fill="#78350f" />
      <circle cx="310" cy="310" r="10" fill="#78350f" />

      <circle cx="200" cy="200" r="142" fill="url(#water-blue)" stroke="#025a87" strokeWidth="4" />
      <circle cx="200" cy="200" r="132" fill="#ffffff" />

      <text x="200" y="110" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="extrabold" letterSpacing="1">
        SANWA
      </text>
      <text x="200" y="122" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="bold">
        ISO 4064 CLASS B
      </text>

      <rect x="90" y="145" width="220" height="42" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="2.5" />
      
      <g>
        <rect x="96" y="150" width="26" height="32" fill="#000000" rx="1" />
        <text x="109" y="172" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[0] || '0'}
        </text>
        <rect x="125" y="150" width="26" height="32" fill="#000000" rx="1" />
        <text x="138" y="172" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[1] || '0'}
        </text>
        <rect x="154" y="150" width="26" height="32" fill="#000000" rx="1" />
        <text x="167" y="172" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[2] || '0'}
        </text>
        <rect x="183" y="150" width="26" height="32" fill="#000000" rx="1" />
        <text x="196" y="172" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[3] || '0'}
        </text>
        <rect x="212" y="150" width="26" height="32" fill="#000000" rx="1" />
        <text x="225" y="172" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[4] || '0'}
        </text>
      </g>

      <g>
        <rect x="244" y="150" width="26" height="32" fill="#fee2e2" rx="1" stroke="#dc2626" strokeWidth="0.5" />
        <text x="257" y="172" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[6] || '0'}
        </text>
        <rect x="273" y="150" width="26" height="32" fill="#fee2e2" rx="1" stroke="#dc2626" strokeWidth="0.5" />
        <text x="286" y="172" textAnchor="middle" fill="#dc2626" fontSize="20" fontWeight="bold" fontFamily="monospace">
          {readingVal[7] || '0'}
        </text>
      </g>

      <text x="303" y="140" fill="#0369a1" fontSize="10" fontWeight="extrabold">m³</text>

      <circle cx="130" cy="235" r="22" fill="none" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="130" cy="235" r="2" fill="#dc2626" />
      <line x1="130" y1="235" x2="145" y2="223" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <text x="130" y="265" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="bold">x 0.0001</text>

      <circle cx="200" cy="255" r="22" fill="none" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="200" cy="255" r="2" fill="#dc2626" />
      <line x1="200" y1="255" x2="185" y2="248" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <text x="200" y="285" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="bold">x 0.001</text>

      <circle cx="270" cy="235" r="22" fill="none" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="270" cy="235" r="2" fill="#dc2626" />
      <line x1="270" y1="235" x2="278" y2="218" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <text x="270" y="265" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="bold">x 0.01</text>

      <rect x="140" y="300" width="120" height="20" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
      <text x="200" y="314" textAnchor="middle" fill="#334155" fontSize="10" fontFamily="Share Tech Mono" fontWeight="bold">
        {serialVal}
      </text>
    </svg>
  );
}

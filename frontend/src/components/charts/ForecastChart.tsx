import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface ForecastChartProps {
  height?: number;
}

const FORECAST_TIMELINE = [
  { horizon: 'Current', genAI: 0, evAuto: 0, cleanEnergy: 0, cyberSecurity: 0, logistics: 0 },
  { horizon: 'Q1 (3M)', genAI: 24, evAuto: 18, cleanEnergy: 14, cyberSecurity: 12, logistics: 10 },
  { horizon: 'Q2 (6M)', genAI: 48, evAuto: 36, cleanEnergy: 28, cyberSecurity: 24, logistics: 22 },
  { horizon: 'Q3 (9M)', genAI: 62, evAuto: 48, cleanEnergy: 39, cyberSecurity: 31, logistics: 30 },
  { horizon: 'Q4 (12M)', genAI: 78, evAuto: 64, cleanEnergy: 49, cyberSecurity: 42, logistics: 38 },
];

export const ForecastChart: React.FC<ForecastChartProps> = ({ height = 320 }) => {
  return (
    <div className="w-full relative" style={{ height }}>
      <div className="absolute top-0 right-2 z-10 text-[10px] font-bold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
        Prototype Forecast Model
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={FORECAST_TIMELINE} margin={{ top: 25, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="horizon" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <Tooltip 
            formatter={(val) => [`+${val}% Growth`, '']}
            contentStyle={{ backgroundColor: '#071A3D', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Line type="monotone" dataKey="genAI" name="Generative AI & LLMs" stroke="#FF9933" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="evAuto" name="EV Powertrain & BMS" stroke="#000080" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="cleanEnergy" name="Solar & CleanTech" stroke="#138808" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="cyberSecurity" name="Cybersecurity" stroke="#7C3AED" strokeWidth={2} strokeDasharray="4 4" />
          <Line type="monotone" dataKey="logistics" name="Smart Logistics" stroke="#0284C7" strokeWidth={2} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

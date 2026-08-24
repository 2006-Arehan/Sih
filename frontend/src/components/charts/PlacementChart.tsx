import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PlacementChartProps {
  height?: number;
}

const PLACEMENT_BY_SECTOR = [
  { sector: 'IT & Software', rate: 88, salary: '₹6.2 LPA' },
  { sector: 'Automotive / EV', rate: 84, salary: '₹5.4 LPA' },
  { sector: 'Manufacturing', rate: 79, salary: '₹4.2 LPA' },
  { sector: 'Pharma / Biotech', rate: 81, salary: '₹4.8 LPA' },
  { sector: 'BFSI / FinTech', rate: 86, salary: '₹6.8 LPA' },
  { sector: 'Renewables', rate: 74, salary: '₹3.9 LPA' },
  { sector: 'Logistics', rate: 76, salary: '₹4.0 LPA' },
];

export const PlacementChart: React.FC<PlacementChartProps> = ({ height = 300 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={PLACEMENT_BY_SECTOR} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <YAxis dataKey="sector" type="category" tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 500 }} stroke="#CBD5E1" />
          <Tooltip 
            formatter={(val, name, item) => [`${val}% Placement Rate (Avg: ${item.payload.salary})`, 'Placement']}
            contentStyle={{ backgroundColor: '#071A3D', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
          />
          <Bar dataKey="rate" fill="#138808" radius={[0, 6, 6, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

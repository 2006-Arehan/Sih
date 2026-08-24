import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { SKILLS_DATA } from '../../data/skills';

interface SkillGapChartProps {
  height?: number;
}

export const SkillGapChart: React.FC<SkillGapChartProps> = ({ height = 320 }) => {
  const chartData = SKILLS_DATA.slice(0, 6).map(skill => ({
    name: skill.name.split('&')[0].split('/')[0].trim(),
    demand: skill.demandVolume,
    supply: skill.currentSupply,
    gap: skill.demandVolume - skill.currentSupply
  }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fill: '#475569' }} 
            interval={0}
            angle={-15}
            textAnchor="end"
            stroke="#CBD5E1" 
          />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#071A3D', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="demand" name="Market Demand (Jobs)" fill="#000080" radius={[4, 4, 0, 0]} />
          <Bar dataKey="supply" name="Available Trained Supply" fill="#FF9933" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

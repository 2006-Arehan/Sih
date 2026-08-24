import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface AlignmentChartProps {
  height?: number;
}

const HEALTH_DISTRIBUTION = [
  { name: 'Excellent (90%+)', value: 34, color: '#138808' },
  { name: 'Good (80-89%)', value: 42, color: '#000080' },
  { name: 'Needs Update (70-79%)', value: 18, color: '#FF9933' },
  { name: 'Critical Revamp (<70%)', value: 6, color: '#E11D48' },
];

export const AlignmentChart: React.FC<AlignmentChartProps> = ({ height = 280 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={HEALTH_DISTRIBUTION}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {HEALTH_DISTRIBUTION.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(val) => [`${val}% of State Courses`, 'Share']}
            contentStyle={{ backgroundColor: '#071A3D', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

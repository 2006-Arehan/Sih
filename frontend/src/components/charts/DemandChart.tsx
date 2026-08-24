import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { MONTHLY_DEMAND_TREND } from '../../data/dashboard';

interface DemandChartProps {
  height?: number;
}

export const DemandChart: React.FC<DemandChartProps> = ({ height = 300 }) => {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={MONTHLY_DEMAND_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000080" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#000080" stopOpacity={0.0}/>
            </linearGradient>
            <linearGradient id="seatsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#138808" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#138808" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#071A3D', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
            itemStyle={{ color: '#FFF' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
          <Area type="monotone" dataKey="jobs" name="Industry Demand (Jobs)" stroke="#000080" strokeWidth={2.5} fillOpacity={1} fill="url(#jobsGradient)" />
          <Area type="monotone" dataKey="trainingSeats" name="Trained Supply (Seats)" stroke="#138808" strokeWidth={2.5} fillOpacity={1} fill="url(#seatsGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

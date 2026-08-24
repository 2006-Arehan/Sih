import React, { useState } from 'react';
import { MAHARASHTRA_DISTRICTS } from '../../data/districts';
import { DistrictData, DivisionName } from '../../types/district';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Card } from '../ui/Card';
import { MapPin, Filter, Layers, Users, Briefcase, GraduationCap, ArrowRight, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MaharashtraMapProps {
  onSelectDistrict?: (district: DistrictData) => void;
  selectedDistrictId?: string;
  heightClass?: string;
  showFilters?: boolean;
}

// Visual grid position & regional layout for 36 districts
const DISTRICT_GRID_MAP: Record<string, { x: number; y: number; width: number; height: number; shortLabel: string }> = {
  // Konkan Coast
  'palghar': { x: 30, y: 70, width: 65, height: 45, shortLabel: 'PAL' },
  'thane': { x: 50, y: 125, width: 55, height: 45, shortLabel: 'THA' },
  'mumbai_suburban': { x: 20, y: 140, width: 45, height: 35, shortLabel: 'MUM-S' },
  'mumbai_city': { x: 20, y: 180, width: 45, height: 35, shortLabel: 'MUM' },
  'raigad': { x: 45, y: 220, width: 65, height: 55, shortLabel: 'RAI' },
  'ratnagiri': { x: 50, y: 285, width: 60, height: 65, shortLabel: 'RAT' },
  'sindhudurg': { x: 60, y: 360, width: 55, height: 60, shortLabel: 'SIN' },

  // Nashik Division
  'nandurbar': { x: 110, y: 20, width: 65, height: 45, shortLabel: 'NDB' },
  'dhule': { x: 185, y: 30, width: 65, height: 45, shortLabel: 'DHU' },
  'jalgaon': { x: 260, y: 35, width: 75, height: 50, shortLabel: 'JAL' },
  'nashik': { x: 115, y: 75, width: 75, height: 60, shortLabel: 'NSK' },
  'ahmednagar': { x: 155, y: 145, width: 85, height: 75, shortLabel: 'AHM' },

  // Pune Division
  'pune': { x: 115, y: 215, width: 85, height: 70, shortLabel: 'PUN' },
  'satara': { x: 120, y: 295, width: 75, height: 60, shortLabel: 'SAT' },
  'sangli': { x: 125, y: 365, width: 75, height: 55, shortLabel: 'SAN' },
  'kolhapur': { x: 75, y: 430, width: 75, height: 55, shortLabel: 'KOL' },
  'solapur': { x: 205, y: 310, width: 90, height: 80, shortLabel: 'SOL' },

  // Marathwada (Chhatrapati Sambhajinagar Division)
  'chhatrapati_sambhajinagar': { x: 200, y: 105, width: 85, height: 65, shortLabel: 'CSN' },
  'jalna': { x: 290, y: 115, width: 65, height: 55, shortLabel: 'JLN' },
  'beed': { x: 250, y: 180, width: 75, height: 65, shortLabel: 'BED' },
  'parbhani': { x: 365, y: 125, width: 65, height: 55, shortLabel: 'PBN' },
  'hingoli': { x: 395, y: 80, width: 60, height: 50, shortLabel: 'HNG' },
  'nanded': { x: 440, y: 140, width: 75, height: 65, shortLabel: 'NED' },
  'latur': { x: 335, y: 240, width: 75, height: 65, shortLabel: 'LAT' },
  'dharashiv': { x: 300, y: 310, width: 70, height: 60, shortLabel: 'DHR' },

  // Amravati Division
  'buldhana': { x: 345, y: 40, width: 65, height: 55, shortLabel: 'BLD' },
  'akola': { x: 420, y: 45, width: 60, height: 50, shortLabel: 'AKL' },
  'washim': { x: 440, y: 100, width: 60, height: 45, shortLabel: 'WSM' },
  'amravati': { x: 490, y: 30, width: 75, height: 60, shortLabel: 'AMR' },
  'yavatmal': { x: 510, y: 105, width: 80, height: 65, shortLabel: 'YTL' },

  // Nagpur Division
  'wardha': { x: 575, y: 55, width: 60, height: 50, shortLabel: 'WRD' },
  'nagpur': { x: 645, y: 35, width: 75, height: 60, shortLabel: 'NGP' },
  'bhandara': { x: 730, y: 45, width: 60, height: 50, shortLabel: 'BHA' },
  'gondia': { x: 800, y: 30, width: 65, height: 55, shortLabel: 'GON' },
  'chandrapur': { x: 655, y: 110, width: 80, height: 75, shortLabel: 'CHN' },
  'gadchiroli': { x: 745, y: 115, width: 90, height: 110, shortLabel: 'GAD' },
};

const DIVISION_COLORS: Record<DivisionName, { bg: string; border: string; text: string; fill: string }> = {
  'Konkan': { bg: 'bg-cyan-50', border: 'border-cyan-400', text: 'text-cyan-900', fill: '#0891B2' },
  'Pune': { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-900', fill: '#2563EB' },
  'Nashik': { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-900', fill: '#059669' },
  'Chhatrapati Sambhajinagar': { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-900', fill: '#D97706' },
  'Amravati': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-900', fill: '#7C3AED' },
  'Nagpur': { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-900', fill: '#E11D48' },
};

export const MaharashtraMap: React.FC<MaharashtraMapProps> = ({
  onSelectDistrict,
  selectedDistrictId = 'pune',
  heightClass = 'h-[540px]',
  showFilters = true
}) => {
  const navigate = useNavigate();
  const [selectedDivision, setSelectedDivision] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [activeDistrict, setActiveDistrict] = useState<DistrictData>(() => {
    return MAHARASHTRA_DISTRICTS.find(d => d.id === selectedDistrictId) || MAHARASHTRA_DISTRICTS[0];
  });
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(null);

  const handleDistrictClick = (district: DistrictData) => {
    setActiveDistrict(district);
    if (onSelectDistrict) onSelectDistrict(district);
  };

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter(d => {
    const matchDiv = selectedDivision === 'All' || d.division === selectedDivision;
    const matchSec = selectedSector === 'All' || d.topSectors.some(s => s.toLowerCase().includes(selectedSector.toLowerCase()));
    return matchDiv && matchSec;
  });

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
      
      {/* Map Control Bar & Filters */}
      {showFilters && (
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron-500" />
            <h3 className="font-display font-bold text-sm text-govnavy-950">
              Interactive Maharashtra Skill Heatmap
            </h3>
            <Badge variant="navy" size="sm">
              36 Districts
            </Badge>
          </div>

          {/* Division Filter */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-medium">Division:</span>
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-lg border border-slate-200">
              {['All', 'Konkan', 'Pune', 'Nashik', 'Chhatrapati Sambhajinagar', 'Amravati', 'Nagpur'].map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    selectedDivision === div 
                      ? 'bg-govnavy-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {div === 'Chhatrapati Sambhajinagar' ? 'Marathwada' : div}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Map & Interactive Panel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        
        {/* SVG Interactive Visual Map (8 Columns on lg) */}
        <div className={`lg:col-span-8 p-4 relative bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30 flex items-center justify-center overflow-auto ${heightClass}`}>
          
          {/* Heatmap Legend */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-sm text-xs space-y-1.5 pointer-events-none">
            <span className="font-bold text-[10px] uppercase tracking-wider text-slate-500 block">
              Demand Score Index
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-blue-900"></span>
              <span>Very High (85-100)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-blue-600"></span>
              <span>High (70-84)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-sky-400"></span>
              <span>Medium (55-69)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-3 h-3 rounded bg-slate-300"></span>
              <span>Developing (&lt;55)</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 880 500"
            className="w-full h-full max-h-[480px] drop-shadow-sm select-none"
          >
            {/* Background State Outline Reference */}
            <path
              d="M 20 70 L 110 20 L 350 30 L 740 25 L 860 30 L 840 230 L 680 190 L 480 210 L 370 380 L 160 480 L 50 380 L 20 180 Z"
              fill="#F8FAFC"
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Render 36 District Interactive Nodes */}
            {MAHARASHTRA_DISTRICTS.map((dist) => {
              const geom = DISTRICT_GRID_MAP[dist.id] || { x: 100, y: 100, width: 60, height: 45, shortLabel: dist.name.slice(0, 3).toUpperCase() };
              const isSelected = activeDistrict.id === dist.id;
              const isHovered = hoveredDistrict?.id === dist.id;
              const isFiltered = filteredDistricts.some(fd => fd.id === dist.id);

              // Color determination based on demand score
              const fillColor = 
                dist.demandScore >= 85 ? '#000080' :
                dist.demandScore >= 70 ? '#2563EB' :
                dist.demandScore >= 55 ? '#38BDF8' : '#94A3B8';

              return (
                <g
                  key={dist.id}
                  transform={`translate(${geom.x}, ${geom.y})`}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleDistrictClick(dist)}
                  onMouseEnter={() => setHoveredDistrict(dist)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  opacity={isFiltered ? 1 : 0.25}
                >
                  {/* District Box Shape */}
                  <rect
                    width={geom.width}
                    height={geom.height}
                    rx="8"
                    fill={isSelected ? '#FF9933' : isHovered ? '#138808' : fillColor}
                    stroke={isSelected ? '#7C2D12' : '#FFFFFF'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-colors duration-150 filter drop-shadow-sm"
                  />

                  {/* District Short Code / Name */}
                  <text
                    x={geom.width / 2}
                    y={geom.height / 2 - 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize={geom.width < 60 ? "9" : "11"}
                    fontWeight="bold"
                    fontFamily="Inter, sans-serif"
                  >
                    {geom.shortLabel}
                  </text>

                  {/* Demand Score Badge below */}
                  <text
                    x={geom.width / 2}
                    y={geom.height / 2 + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected ? '#FFF' : '#E0E7FF'}
                    fontSize="8"
                    fontWeight="600"
                  >
                    Score: {dist.demandScore}
                  </text>

                  {/* Pulse Dot on high demand hubs */}
                  {dist.demandScore >= 85 && (
                    <circle
                      cx={geom.width - 6}
                      cy={6}
                      r="3"
                      fill="#FF9933"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* District Hover Tooltip */}
          {hoveredDistrict && (
            <div className="absolute bottom-4 left-4 bg-govnavy-950 text-white p-3 rounded-xl shadow-xl pointer-events-none text-xs border border-slate-700 animate-fade-in z-20 max-w-xs">
              <div className="flex items-center justify-between gap-4 font-bold border-b border-slate-800 pb-1 mb-1.5">
                <span>{hoveredDistrict.name} ({hoveredDistrict.marathiName})</span>
                <span className="text-saffron-400">Score: {hoveredDistrict.demandScore}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Jobs: <strong className="text-white">{hoveredDistrict.totalJobs}</strong> | Division: {hoveredDistrict.division}
              </p>
              <div className="text-[10px] text-emerald-400 mt-1">
                Top: {hoveredDistrict.topSkills.slice(0, 2).join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* District Detail Intelligence Sidebar (4 Columns on lg) */}
        <div className="lg:col-span-4 p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {activeDistrict.division} Division
                </span>
                <h4 className="font-display text-2xl font-bold text-govnavy-950">
                  {activeDistrict.name}
                </h4>
                <p className="text-sm font-semibold text-saffron-600">
                  {activeDistrict.marathiName}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-semibold">Demand Score</span>
                <span className="text-2xl font-extrabold text-govnavy-900 font-mono">
                  {activeDistrict.demandScore}<span className="text-xs text-slate-400">/100</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4 bg-white p-3 rounded-xl border border-slate-200/80">
              {activeDistrict.description}
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Total Active Jobs</span>
                <span className="text-base font-extrabold text-govnavy-950">
                  {activeDistrict.totalJobs.toLocaleString()}+
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Placement Rate</span>
                <span className="text-base font-extrabold text-emerald-700">
                  {activeDistrict.placementRate}%
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Training Capacity</span>
                <span className="text-sm font-bold text-govnavy-900">
                  {activeDistrict.trainingCapacity.toLocaleString()} seats
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Skill Gap Severity</span>
                <span className={`text-xs font-bold ${
                  activeDistrict.skillGap === 'Critical' ? 'text-rose-600' :
                  activeDistrict.skillGap === 'High' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {activeDistrict.skillGap} Gap
                </span>
              </div>
            </div>

            {/* Top Skills Required */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Top Skills in Demand
              </span>
              <div className="flex flex-wrap gap-1">
                {activeDistrict.topSkills.map((sk) => (
                  <span key={sk} className="text-xs bg-white text-govnavy-900 border border-slate-200 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Industrial Sectors */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Key Industrial Sectors
              </span>
              <div className="flex flex-wrap gap-1">
                {activeDistrict.topSectors.map((sec) => (
                  <span key={sec} className="text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {sec}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate(`/government/districts`)}
            >
              Open Full {activeDistrict.name} Analysis
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DemandTable } from '../../components/tables/DemandTable';
import { MAHARASHTRA_DISTRICTS } from '../../data/districts';
import { DistrictData } from '../../types/district';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { MapPin, Building2, Briefcase, GraduationCap, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DistrictAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);

  return (
    <DashboardLayout
      pageTitle="District-Level Workforce & Capacity Analysis"
      pageSubtitle="Granular assessment of industrial hiring demand, polytechnic seats, and placement metrics for all 36 districts."
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/government/map')}
          leftIcon={<MapPin className="w-4 h-4" />}
        >
          Open Spatial Heatmap
        </Button>
      }
    >
      <div className="space-y-6">
        <DemandTable 
          districts={MAHARASHTRA_DISTRICTS}
          onSelectDistrict={(dist) => setSelectedDistrict(dist)}
        />
      </div>

      {/* District Detail Modal */}
      {selectedDistrict && (
        <Modal
          isOpen={!!selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
          title={`${selectedDistrict.name} (${selectedDistrict.marathiName})`}
          subtitle={`${selectedDistrict.division} Division • Administrative Intelligence Profile`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            
            {/* Overview Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedDistrict.description}
              </p>
            </div>

            {/* Score and Gap Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Demand Score</span>
                <span className="text-2xl font-extrabold text-govnavy-950 font-mono">
                  {selectedDistrict.demandScore}/100
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Active Vacancies</span>
                <span className="text-2xl font-extrabold text-blue-700 font-mono">
                  {selectedDistrict.totalJobs.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Training Capacity</span>
                <span className="text-2xl font-extrabold text-slate-800 font-mono">
                  {selectedDistrict.trainingCapacity.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">Placement Rate</span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">
                  {selectedDistrict.placementRate}%
                </span>
              </div>
            </div>

            {/* Skills & Deficit Analysis */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-govnavy-950 mb-2">
                Top Priority Skills in {selectedDistrict.name}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDistrict.topSkills.map((sk) => (
                  <span key={sk} className="text-xs bg-govnavy-50 text-govnavy-900 border border-govnavy-200 px-3 py-1 rounded-lg font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Sectors */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-govnavy-950 mb-2">
                Primary Industrial Sectors
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDistrict.topSectors.map((sec) => (
                  <span key={sec} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-medium">
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDistrict(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  setSelectedDistrict(null);
                  navigate('/government/training-planner');
                }}
              >
                Adjust Training Capacity for {selectedDistrict.name}
              </Button>
            </div>

          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

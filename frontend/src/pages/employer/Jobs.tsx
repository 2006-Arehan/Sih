import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { JOBS_DATA } from '../../data/jobs';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PlusCircle, Search, MapPin, Users, ArrowRight, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmployerJobs: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = JOBS_DATA.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.sector.toLowerCase().includes(search.toLowerCase()) ||
    j.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      pageTitle="My Published Vacancies & Talent Pools"
      pageSubtitle="Track applicants, candidate matching scores, and active recruitment pipelines from Maharashtra technical colleges."
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => navigate('/employer/post-job')}
        >
          Post New Requirement
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* Search */}
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search job title, sector or district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((job) => (
            <Card key={job.id} hoverEffect className="p-6 bg-white border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="navy" size="sm">
                    {job.sector}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {job.openPositions} Openings
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-govnavy-950 mb-1">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{job.companyName} • {job.locationDetails}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.requiredSkills.map(sk => (
                    <span key={sk} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-medium">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-700 mb-4">
                  <span>Package: <strong className="font-mono text-govnavy-950">{job.salaryRange}</strong></span>
                  <span>Match Pool: <strong className="text-blue-700">140+ Trainees</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Posted: {job.postedDate}</span>
                <Button
                  size="sm"
                  variant="outline"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => alert(`Reviewing candidate applications for ${job.title}`)}
                >
                  View Candidate Matches
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

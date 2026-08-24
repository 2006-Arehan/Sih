import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { JOBS_DATA } from '../../data/jobs';
import { JobPosting } from '../../types/job';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, MapPin, Briefcase, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export const StudentJobs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const filtered = JOBS_DATA.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.companyName.toLowerCase().includes(search.toLowerCase()) || j.requiredSkills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchDist = districtFilter === 'All' || j.district === districtFilter;
    return matchSearch && matchDist;
  });

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
  };

  const handleConfirmApply = () => {
    if (selectedJob) {
      setAppliedJobs(prev => [...prev, selectedJob.id]);
      setApplyModalOpen(false);
    }
  };

  return (
    <DashboardLayout
      pageTitle="High-Match Industrial Job Board"
      pageSubtitle="Vacancies matching your verified polytechnic skills across Maharashtra's premier manufacturing and technology parks."
    >
      <div className="space-y-6">
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-gov">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search by job title, company or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">District:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Maharashtra</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai City">Mumbai City</option>
              <option value="Mumbai Suburban">Mumbai Suburban</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Nashik">Nashik</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
              <option value="Kolhapur">Kolhapur</option>
              <option value="Satara">Satara</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <Card key={job.id} hoverEffect className="p-6 bg-white border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {job.matchScore || 88}% Match
                    </span>
                    <Badge variant="navy" size="sm">{job.district}</Badge>
                  </div>

                  <h3 className="font-display font-bold text-lg text-govnavy-950 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{job.companyName} • {job.locationDetails}</p>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.map(sk => (
                        <span key={sk} className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Offered Package</span>
                    <span className="text-sm font-extrabold text-govnavy-900 font-mono">{job.salaryRange}</span>
                  </div>

                  {hasApplied ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Applied
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApply(job)}
                    >
                      Quick Apply
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

      </div>

      {/* Quick Apply Confirmation Modal */}
      {selectedJob && applyModalOpen && (
        <Modal
          isOpen={applyModalOpen}
          onClose={() => setApplyModalOpen(false)}
          title={`Apply for ${selectedJob.title}`}
          subtitle={`${selectedJob.companyName} • ${selectedJob.locationDetails}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-slate-700">
              <div>• Match Score: <strong className="text-emerald-700">{selectedJob.matchScore || 88}%</strong></div>
              <div>• Verified Skills Shared: <strong>Python, SQL, Power BI</strong></div>
              <div>• Student Passport: <strong>Pooja Patil (MSBTE Verified)</strong></div>
              <div>• Package: <strong>{selectedJob.salaryRange}</strong></div>
            </div>

            <p className="text-slate-500 text-[11px]">
              By clicking Submit Application, your verified academic transcripts and polytechnic credentials will be securely shared with {selectedJob.companyName}'s talent acquisition team.
            </p>

            <div className="pt-2 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmApply}
              >
                Confirm & Submit Application
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

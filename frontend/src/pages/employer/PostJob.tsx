import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { SECTORS_DATA } from '../../data/sectors';
import { MAHARASHTRA_DISTRICTS } from '../../data/districts';
import { Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Briefcase, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    sector: 'Automotive & Electric Vehicles',
    employmentType: 'Full-time',
    urgency: 'Immediate',
    requiredSkills: ['EV Powertrain', 'BMS Calibration', 'Embedded C'],
    newSkillInput: '',
    education: 'Diploma in Electrical / Mechanical / Mechatronics',
    experienceLevel: 'Entry Level (0-2 yrs)',
    minExperience: 0,
    salaryRange: '₹4.5 - 6.5 LPA',
    district: 'Pune',
    locationDetails: 'Chakan MIDC Industrial Corridor, Pune',
    openPositions: 25,
    description: 'We are seeking passionate diploma and ITI technicians to calibrate and validate next-generation battery management systems.'
  });

  const handleAddSkill = () => {
    if (formData.newSkillInput.trim() && !formData.requiredSkills.includes(formData.newSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, prev.newSkillInput.trim()],
        newSkillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skillToRemove)
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const steps = [
    { num: 1, label: 'Job Details' },
    { num: 2, label: 'Required Skills' },
    { num: 3, label: 'Experience & Salary' },
    { num: 4, label: 'Location' },
    { num: 5, label: 'Hiring & Review' },
  ];

  return (
    <DashboardLayout
      pageTitle="5-Step Skill Demand Posting Wizard"
      pageSubtitle="Publish hiring requirements to automatically match candidates and feed real-time demand data to state curriculum boards."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Step Indicator Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-gov">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      isCompleted ? 'bg-emerald-600 text-white' :
                      isCurrent ? 'bg-govnavy-900 text-white ring-4 ring-govnavy-900/20' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span className={`text-[10px] mt-1 font-semibold hidden sm:inline ${
                      isCurrent ? 'text-govnavy-950 font-bold' : 'text-slate-500'
                    }`}>
                      {s.label}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      currentStep > s.num ? 'bg-emerald-600' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Wizard Form Card */}
        <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-display text-2xl font-bold text-govnavy-950">
                Job Posting Published Successfully!
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your demand for <strong>{formData.title || 'Technical Specialist'}</strong> ({formData.openPositions} seats) has been registered. 
                Matching polytechnic and ITI candidates across <strong>{formData.district}</strong> have been notified.
              </p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5 text-slate-700">
                <div>• Matched Candidate Pool: <strong>140+ students</strong></div>
                <div>• Sent to MSBTE Alignment Feed: <strong>Yes</strong></div>
                <div>• Job ID: <strong>MH-JOB-2026-8821</strong></div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/employer/jobs')}
                >
                  View My Job Postings
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                >
                  Post Another Requirement
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* STEP 1: Job Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase text-saffron-600">Step 1 of 5</span>
                    <h3 className="font-display text-lg font-bold text-govnavy-950">Role & Industrial Domain</h3>
                  </div>

                  <Input
                    label="Job Role Title"
                    required
                    placeholder="e.g. EV Powertrain & Battery Calibration Technician"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Industry Sector"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      options={SECTORS_DATA.map(s => ({ value: s.name, label: s.name }))}
                    />

                    <Select
                      label="Employment Type"
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      options={[
                        { value: 'Full-time', label: 'Full-time Regular' },
                        { value: 'Apprenticeship', label: 'NEEM / State Apprenticeship' },
                        { value: 'Internship', label: '6-Month Paid Internship' },
                        { value: 'Contract', label: 'Contractual Project' },
                      ]}
                    />
                  </div>

                  <Select
                    label="Hiring Urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    options={[
                      { value: 'Immediate', label: 'Immediate Joining (Within 15 days)' },
                      { value: 'Standard', label: 'Standard Cycle (Within 30-45 days)' },
                      { value: 'Upcoming Quarter', label: 'Upcoming Quarter Campus Drive' },
                    ]}
                  />
                </div>
              )}

              {/* STEP 2: Required Skills */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase text-saffron-600">Step 2 of 5</span>
                    <h3 className="font-display text-lg font-bold text-govnavy-950">Required Skills & Education</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-govnavy-900 mb-1.5">
                      Required Skills in Demand *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add required tool, skill or standard (e.g. CAN Bus, MATLAB, SolidWorks)..."
                        value={formData.newSkillInput}
                        onChange={(e) => setFormData({ ...formData, newSkillInput: e.target.value })}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="md"
                        onClick={handleAddSkill}
                        leftIcon={<Plus className="w-4 h-4" />}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-200 min-h-[60px]">
                      {formData.requiredSkills.map(sk => (
                        <span key={sk} className="inline-flex items-center gap-1.5 text-xs bg-white text-govnavy-900 border border-slate-300 font-semibold px-2.5 py-1 rounded-md shadow-2xs">
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(sk)}
                            className="text-slate-400 hover:text-red-500 font-bold ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Minimum Educational Qualification"
                    placeholder="e.g. Diploma in Mechatronics / Electrical or B.Tech"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  />
                </div>
              )}

              {/* STEP 3: Experience & Salary */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase text-saffron-600">Step 3 of 5</span>
                    <h3 className="font-display text-lg font-bold text-govnavy-950">Experience & Compensation</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Experience Level"
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      options={[
                        { value: 'Entry Level (0-2 yrs)', label: 'Entry Level (0-2 yrs)' },
                        { value: 'Mid Level (2-5 yrs)', label: 'Mid Level (2-5 yrs)' },
                        { value: 'Senior Level (5+ yrs)', label: 'Senior Level (5+ yrs)' },
                      ]}
                    />

                    <Input
                      label="Offered Annual Package (LPA)"
                      placeholder="e.g. ₹4.8 - 6.5 LPA"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-govnavy-900 mb-1.5">
                      Role Overview & Responsibilities
                    </label>
                    <textarea
                      rows={4}
                      className="w-full text-sm rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-govnavy-800"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Location */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase text-saffron-600">Step 4 of 5</span>
                    <h3 className="font-display text-lg font-bold text-govnavy-950">Plant / Office Location</h3>
                  </div>

                  <Select
                    label="Primary Administrative District"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    options={MAHARASHTRA_DISTRICTS.map(d => ({ value: d.name, label: `${d.name} (${d.marathiName})` }))}
                  />

                  <Input
                    label="Plant / Facility Location Details"
                    placeholder="e.g. Chakan MIDC Phase 2, Pune"
                    value={formData.locationDetails}
                    onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
                  />
                </div>
              )}

              {/* STEP 5: Hiring & Review */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold uppercase text-saffron-600">Step 5 of 5</span>
                    <h3 className="font-display text-lg font-bold text-govnavy-950">Expected Volume & Final Preview</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-govnavy-900 mb-1.5">
                      Number of Open Hiring Positions
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="w-full text-sm rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-govnavy-800"
                      value={formData.openPositions}
                      onChange={(e) => setFormData({ ...formData, openPositions: parseInt(e.target.value, 10) || 1 })}
                    />
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-sm text-govnavy-950">{formData.title || 'Technical Role'}</div>
                    <div className="text-slate-600">{formData.sector} • {formData.district} ({formData.locationDetails})</div>
                    <div className="text-emerald-700 font-bold font-mono">{formData.salaryRange} • {formData.openPositions} Openings</div>
                    <div className="pt-2 flex flex-wrap gap-1">
                      {formData.requiredSkills.map(sk => (
                        <span key={sk} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-medium">{sk}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                    onClick={handlePrev}
                  >
                    Previous Step
                  </Button>
                ) : <div />}

                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="font-bold shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleNext}
                >
                  {currentStep === 5 ? 'Publish Job Requirement' : 'Continue to Next Step'}
                </Button>
              </div>

            </div>
          )}
        </Card>

      </div>
    </DashboardLayout>
  );
};

import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { HelpCircle, Send, CheckCircle2 } from 'lucide-react';

export const TrainingSurvey: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout
      pageTitle="State Skill Demand Annual Survey (2026-27)"
      pageSubtitle="Help the Government of Maharashtra forecast workforce investments by sharing your projected headcount growth."
    >
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-govnavy-950">
                Survey Response Logged
              </h3>
              <p className="text-xs text-slate-600">
                Thank you for contributing to the Maharashtra 2026-27 State Skill Mission forecasting model.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display text-lg font-bold text-govnavy-950">
                  Industry Headcount & Emerging Skill Survey
                </h3>
                <p className="text-xs text-slate-500">
                  Takes less than 3 minutes to complete.
                </p>
              </div>

              <Select
                label="Projected Technical Hiring for 2026-27"
                options={[
                  { value: '50-100', label: '50 - 100 Technical Recruits' },
                  { value: '100-250', label: '100 - 250 Technical Recruits' },
                  { value: '250-500', label: '250 - 500 Technical Recruits' },
                  { value: '500+', label: '500+ Mega Scale Recruits' },
                ]}
              />

              <Select
                label="Top Emerging Skill Area of Highest Priority"
                options={[
                  { value: 'ev', label: 'Electric Vehicle Powertrain & BMS Calibration' },
                  { value: 'genai', label: 'Generative AI & LLM Data Engineering' },
                  { value: 'solar', label: 'Solar PV & Battery Energy Storage (BESS)' },
                  { value: 'cnc', label: '5-Axis CNC Machining & Tooling' },
                  { value: 'logistics', label: 'Automated Multi-Modal Logistics & WMS' },
                ]}
              />

              <Select
                label="Willingness to Host State-Subsidized Apprentices"
                options={[
                  { value: 'yes-active', label: 'Yes, actively looking to host 20+ apprentices' },
                  { value: 'yes-few', label: 'Yes, looking to host 5-20 apprentices' },
                  { value: 'exploring', label: 'Currently exploring state apprenticeship subsidies' },
                ]}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-md font-bold mt-2"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Submit Survey Response
              </Button>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

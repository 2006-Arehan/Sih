import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export const CandidateFeedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    institute: 'Government Polytechnic, Pune',
    course: 'Diploma in Mechatronics & EV Systems',
    technicalRating: '4',
    practicalRating: '3',
    softSkillRating: '5',
    missingSkills: 'High-voltage safety protocols, live CAN bus tracing',
    notes: 'The candidate demonstrated great theoretical grasp of circuit components, but needs more hands-on practice with live battery test benches.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout
      pageTitle="Graduate & Candidate Shopfloor Feedback"
      pageSubtitle="Submit structured post-interview and probationary feedback to directly influence state polytechnic syllabus updates."
    >
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 bg-white border-slate-200 shadow-gov-xl">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-govnavy-950">
                Evaluation Submitted Successfully
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your feedback has been anonymized and synced with the MSBTE Board of Technical Education curriculum review panel.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Candidate Evaluation
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-display text-lg font-bold text-govnavy-950">
                  Graduate Competence Evaluation
                </h3>
                <p className="text-xs text-slate-500">
                  Help bridge the gap by sharing constructive workplace observations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Candidate Name / ID"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                />
                <Select
                  label="Graduating Institute"
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  options={[
                    { value: 'Government Polytechnic, Pune', label: 'Government Polytechnic, Pune' },
                    { value: 'Government ITI, Nashik', label: 'Government ITI, Nashik' },
                    { value: 'VJTI, Mumbai', label: 'VJTI, Mumbai' },
                    { value: 'COEP Technological University', label: 'COEP Technological University' },
                  ]}
                />
              </div>

              <Select
                label="Evaluated Course / Trade"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                options={[
                  { value: 'Diploma in Mechatronics & EV Systems', label: 'Diploma in Mechatronics & EV Systems' },
                  { value: 'Diploma in Data Analytics & AI', label: 'Diploma in Data Analytics & AI' },
                  { value: 'ITI Machinist & Precision CNC', label: 'ITI Machinist & Precision CNC' },
                ]}
              />

              <div className="grid grid-cols-3 gap-2">
                <Select
                  label="Technical Score"
                  value={formData.technicalRating}
                  onChange={(e) => setFormData({ ...formData, technicalRating: e.target.value })}
                  options={[
                    { value: '5', label: '5 - Exceptional' },
                    { value: '4', label: '4 - Very Good' },
                    { value: '3', label: '3 - Satisfactory' },
                    { value: '2', label: '2 - Needs Training' },
                    { value: '1', label: '1 - Poor' },
                  ]}
                />
                <Select
                  label="Practical Score"
                  value={formData.practicalRating}
                  onChange={(e) => setFormData({ ...formData, practicalRating: e.target.value })}
                  options={[
                    { value: '5', label: '5 - Exceptional' },
                    { value: '4', label: '4 - Very Good' },
                    { value: '3', label: '3 - Satisfactory' },
                    { value: '2', label: '2 - Needs Training' },
                    { value: '1', label: '1 - Poor' },
                  ]}
                />
                <Select
                  label="Soft Skills Score"
                  value={formData.softSkillRating}
                  onChange={(e) => setFormData({ ...formData, softSkillRating: e.target.value })}
                  options={[
                    { value: '5', label: '5 - Exceptional' },
                    { value: '4', label: '4 - Very Good' },
                    { value: '3', label: '3 - Satisfactory' },
                    { value: '2', label: '2 - Needs Training' },
                    { value: '1', label: '1 - Poor' },
                  ]}
                />
              </div>

              <Input
                label="Specific Missing Skills Observed"
                placeholder="e.g. High-voltage safety, CAN bus diagnostic tool handling"
                value={formData.missingSkills}
                onChange={(e) => setFormData({ ...formData, missingSkills: e.target.value })}
              />

              <div>
                <label className="block text-xs font-semibold text-govnavy-900 mb-1.5">
                  Detailed Shopfloor Feedback & Suggestions
                </label>
                <textarea
                  rows={3}
                  className="w-full text-sm rounded-lg border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-govnavy-800"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-md font-bold"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Submit Feedback to MSBTE
              </Button>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

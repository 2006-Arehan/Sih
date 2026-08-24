import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { BookOpen, Download, ExternalLink, FileSpreadsheet, ShieldAlert, Cpu } from 'lucide-react';

export const Resources: React.FC = () => {
  const resourceGroups = [
    {
      title: 'Curriculum Revamp Toolkits (MSBTE)',
      description: 'Standard syllabus templates and model question banks for modernizing polytechnic diplomas in AI, EV, and Mechatronics.',
      icon: BookOpen,
      links: [
        { name: 'Data Analytics & Applied AI Model Syllabus (2026)', size: '2.4 MB' },
        { name: 'EV Powertrain & BMS Laboratory Guidelines', size: '3.1 MB' },
        { name: 'Precision CNC & CAD/CAM Modernization Rubric', size: '1.8 MB' }
      ]
    },
    {
      title: 'Industry Skill Assessment Frameworks',
      description: 'Standardized assessment rubrics and interview question sets aligned with NSQF Level 5 to Level 7 competencies.',
      icon: Cpu,
      links: [
        { name: 'Full-Stack & Cloud Computing Rubric', size: '1.2 MB' },
        { name: 'Automotive Embedded CAN Network Testing Standards', size: '2.0 MB' },
        { name: 'Solar PV Plant Commissioning Assessment Matrix', size: '1.5 MB' }
      ]
    },
    {
      title: 'State Policy & Regulatory Circulars',
      description: 'Official Government of Maharashtra executive resolutions (GRs) regarding apprenticeship mandates and subsidy allowances.',
      icon: ShieldAlert,
      links: [
        { name: 'Maharashtra State Apprenticeship Policy 2026 Circular', size: '950 KB' },
        { name: 'District Skill Development Committee (DSDC) Guidelines', size: '1.1 MB' },
        { name: 'Green Energy Corridor Vocational Scholarship Scheme', size: '820 KB' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            Academic & Institutional Toolkits
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Curriculum & Policy Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Download verified curriculum frameworks, lab upgrade blueprints, and state government training mandates.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {resourceGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <Card key={idx} className="p-6 bg-white border-slate-200">
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="p-3 rounded-xl bg-govnavy-50 text-govnavy-900 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-govnavy-950">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {group.links.map((link, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800">{link.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">{link.size}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => alert(`Downloading: ${link.name}`)}
                        className="text-xs py-1 px-2.5 bg-white"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

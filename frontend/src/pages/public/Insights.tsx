import React from 'react';
import { TopGovernmentBar } from '../../components/layout/TopGovernmentBar';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MOCK_REPORTS } from '../../data/dashboard';
import { FileText, Download, Calendar, User, Tag, Sparkles } from 'lucide-react';

export const Insights: React.FC = () => {
  return (
    <div className="min-h-screen bg-govbg flex flex-col">
      <TopGovernmentBar />
      <Navbar />

      <section className="bg-govnavy-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-400 bg-saffron-500/10 px-3 py-1 rounded-full border border-saffron-500/20 inline-block mb-3">
            Research & Publications
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight">
            Maharashtra State Skill Insights & Reports
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Download official data releases, district workforce health surveys, and policy recommendations published by the State Skill Mission.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_REPORTS.map((report) => (
            <Card key={report.id} hoverEffect className="p-6 bg-white border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-govnavy-50 text-govnavy-900 border border-govnavy-100">
                    {report.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {report.fileSize} • {report.pages} Pages
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-govnavy-950 mb-2">
                  {report.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {report.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Author: <strong>{report.author}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Published: <strong>{report.publishDate}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {report.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Format: Official PDF</span>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={() => alert(`Simulated Download of: ${report.title}`)}
                >
                  Download Report
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

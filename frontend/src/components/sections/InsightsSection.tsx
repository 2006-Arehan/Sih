import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_REPORTS } from '../../data/dashboard';
import { FileText, Download, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InsightsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-govbg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>State Intelligence Publications</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-govnavy-950 tracking-tight">
              State Skill Reports & Insights
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Download comprehensive policy whitepapers, district skill gap analyses, and technological transition blueprints.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/insights')}
            className="self-start md:self-auto bg-white"
          >
            Browse All Reports
          </Button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_REPORTS.map((report) => (
            <Card key={report.id} hoverEffect className="p-5 flex flex-col justify-between border-slate-200 bg-white">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {report.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {report.fileSize}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-govnavy-950 mb-2 line-clamp-2">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {report.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {report.publishDate}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => alert(`Simulated PDF Download: ${report.title}`)}
                  className="text-xs py-1 px-2.5"
                >
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

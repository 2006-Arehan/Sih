import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { MOCK_REPORTS } from '../../data/dashboard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { FileText, Download, Share2, Sparkles, Filter } from 'lucide-react';

export const GovernmentReports: React.FC = () => {
  return (
    <DashboardLayout
      pageTitle="State Skill Publications & Intelligence Reports"
      pageSubtitle="Official policy briefings, district audit reports, and technical curriculum frameworks available for state administrators."
      actions={
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => alert('Generating Comprehensive State Dossier (PDF)')}
        >
          Generate State PDF Dossier
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_REPORTS.map((report) => (
          <Card key={report.id} className="p-6 bg-white border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-govnavy-50 text-govnavy-900 border border-govnavy-100">
                  {report.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {report.fileSize} • {report.pages} Pages
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-govnavy-950 mb-2">
                {report.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {report.description}
              </p>

              <div className="text-[11px] text-slate-500 space-y-1 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>Published by: <strong>{report.author}</strong></div>
                <div>Release Date: <strong>{report.publishDate}</strong></div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {report.tags.map((tag) => (
                  <span key={tag} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Official Release</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Share2 className="w-3.5 h-3.5" />}
                  onClick={() => alert(`Sharing link copied for ${report.title}`)}
                >
                  Share
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => alert(`Simulated Download of: ${report.title}`)}
                >
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

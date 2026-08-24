import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import { CheckCircle2, HelpCircle, ArrowRight, Award, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    domain: 'Data Analytics & SQL',
    question: 'Which SQL clause is used to filter aggregated group results rather than individual rows?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    correctIndex: 1,
  },
  {
    id: 2,
    domain: 'Python Data Science',
    question: 'In Python Pandas, what is the primary data structure for a 2-dimensional labeled array?',
    options: ['Series', 'DataFrame', 'Panel', 'NDArray'],
    correctIndex: 1,
  },
  {
    id: 3,
    domain: 'Machine Learning',
    question: 'Which metric is best suited to evaluate a classification model on an imbalanced dataset?',
    options: ['Accuracy', 'F1-Score / PR-AUC', 'Mean Squared Error', 'R-Squared'],
    correctIndex: 1,
  },
  {
    id: 4,
    domain: 'Generative AI & LLMs',
    question: 'What technique connects an external knowledge base to an LLM without retraining model weights?',
    options: ['Quantization', 'Retrieval-Augmented Generation (RAG)', 'LoRA Fine-tuning', 'Gradient Descent'],
    correctIndex: 1,
  },
  {
    id: 5,
    domain: 'Cloud Warehousing',
    question: 'Which of the following is a cloud-native column-oriented data warehouse platform?',
    options: ['PostgreSQL', 'Snowflake', 'SQLite', 'Redis'],
    correctIndex: 1,
  }
];

export const SkillAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (optIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = optIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];
  const answeredCount = selectedAnswers.filter(a => a !== undefined).length;
  
  // Calculate score
  const correctCount = selectedAnswers.reduce((acc, ans, idx) => {
    return ans === ASSESSMENT_QUESTIONS[idx].correctIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100);

  return (
    <DashboardLayout
      pageTitle="Interactive Technical Skill Assessment"
      pageSubtitle="Evaluate your real-world technical proficiency to earn verified badges and recalculate your job readiness score."
    >
      <div className="max-w-2xl mx-auto space-y-6">
        
        {isFinished ? (
          <Card className="p-8 bg-white border-slate-200 shadow-gov-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Evaluation Complete
              </span>
              <h3 className="font-display text-2xl font-bold text-govnavy-950 mt-3">
                Assessment Score: {scorePercent}%
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You answered {correctCount} out of {ASSESSMENT_QUESTIONS.length} questions correctly.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 text-left max-w-sm mx-auto">
              <div className="flex justify-between">
                <span>Updated Market Readiness:</span>
                <strong className="text-emerald-700 font-mono">82% (+14% Boost)</strong>
              </div>
              <div className="flex justify-between">
                <span>Verified Badges Earned:</span>
                <strong className="text-govnavy-900">+1 Intermediate Badge</strong>
              </div>
              <div className="flex justify-between">
                <span>New Job Matches Unlocked:</span>
                <strong className="text-blue-700">6 Vacancies</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/student/dashboard')}
              >
                Return to Dashboard
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedAnswers([]);
                  setCurrentIdx(0);
                  setIsFinished(false);
                }}
              >
                Retake Assessment
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 bg-white border-slate-200 shadow-gov-xl space-y-6">
            
            {/* Header / Progress */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-saffron-600 uppercase tracking-wider">
                  Question {currentIdx + 1} of {ASSESSMENT_QUESTIONS.length}
                </span>
                <span className="font-mono text-slate-400">
                  {currentQ.domain}
                </span>
              </div>
              <Progress value={((currentIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100} variant="saffron" size="sm" />
            </div>

            {/* Question Text */}
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-govnavy-950 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-govnavy-900 text-white border-govnavy-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-white text-govnavy-900 font-bold' : 'border-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Answered: {answeredCount}/{ASSESSMENT_QUESTIONS.length}
              </span>

              <Button
                variant="primary"
                size="md"
                disabled={selectedAnswers[currentIdx] === undefined}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNext}
                className="font-bold shadow-md"
              >
                {currentIdx === ASSESSMENT_QUESTIONS.length - 1 ? 'Submit Evaluation' : 'Next Question'}
              </Button>
            </div>

          </Card>
        )}

      </div>
    </DashboardLayout>
  );
};

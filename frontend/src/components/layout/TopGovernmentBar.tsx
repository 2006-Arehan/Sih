import React from 'react';
import { useAccessibility } from '../../hooks/useAccessibility';
import { Sparkles, Eye } from 'lucide-react';

export const TopGovernmentBar: React.FC = () => {
  const { fontSize, setFontSize, highContrast, toggleHighContrast, language, setLanguage } = useAccessibility();

  return (
    <header className="bg-[#051329] text-slate-300 text-xs border-b border-[#0E2246] selection:bg-saffron-500 selection:text-white" aria-label="Official Government Header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Government of Maharashtra Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-saffron-500/20 border border-saffron-500/40 flex items-center justify-center text-[9px] font-bold text-saffron-400">
            🏛️
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="font-semibold text-white tracking-wide">
              {language === 'mr' ? 'महाराष्ट्र शासन' : language === 'hi' ? 'महाराष्ट्र सरकार' : 'Government of Maharashtra'}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline text-[11px]">
              {language === 'mr' 
                ? 'कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग' 
                : language === 'hi' 
                ? 'कौशल, रोजगार, उद्यमिता एवं नवाचार विभाग' 
                : 'Dept. of Skill, Employment, Entrepreneurship & Innovation'}
            </span>
          </div>
        </div>

        {/* Right: Accessibility Toolbar & Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          {/* State Prototype Indicator */}
          <div className="hidden lg:flex items-center gap-1 bg-saffron-500/10 border border-saffron-500/20 px-2 py-0.5 rounded text-[10px] text-saffron-300 font-medium">
            <Sparkles className="w-3 h-3 text-saffron-400" />
            <span>State Prototype</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 hidden sm:inline text-[10px] font-medium">Accessibility</span>
            
            {/* Font Resizing Controls */}
            <div className="flex items-center bg-[#091E42] rounded-md px-1 py-0.5 border border-slate-700/60" aria-label="Font Resizing">
              <button
                onClick={() => setFontSize('small')}
                className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${fontSize === 'small' ? 'bg-saffron-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${fontSize === 'normal' ? 'bg-saffron-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Default Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-[10px] rounded transition-colors ${fontSize === 'large' ? 'bg-saffron-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`p-1 rounded-md border transition-colors ${
                highContrast 
                  ? 'bg-yellow-400 text-black border-yellow-500' 
                  : 'bg-[#091E42] text-slate-400 border-slate-700/60 hover:text-white'
              }`}
              title="Toggle Contrast"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean Language Switcher (मराठी, हिंदी, English) */}
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <button
              onClick={() => setLanguage('mr')}
              className={`transition-colors ${language === 'mr' ? 'text-saffron-400 font-bold underline underline-offset-4' : 'text-slate-400 hover:text-white'}`}
            >
              मराठी
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`transition-colors ${language === 'hi' ? 'text-saffron-400 font-bold underline underline-offset-4' : 'text-slate-400 hover:text-white'}`}
            >
              हिंदी
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => setLanguage('en')}
              className={`transition-colors ${language === 'en' ? 'text-saffron-400 font-bold underline underline-offset-4' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

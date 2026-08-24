import { useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'mr' | 'hi';
export type FontSizeMode = 'small' | 'normal' | 'large';

export function useAccessibility() {
  const [fontSize, setFontSize] = useState<FontSizeMode>(() => {
    return (localStorage.getItem('sp_font_size') as FontSizeMode) || 'normal';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('sp_high_contrast') === 'true';
  });

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('sp_language') as LanguageCode) || 'en';
  });

  // Apply Font Size to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'small') {
      root.style.setProperty('--font-scale', '0.875rem');
    } else if (fontSize === 'large') {
      root.style.setProperty('--font-scale', '1.125rem');
    } else {
      root.style.setProperty('--font-scale', '1rem');
    }
    localStorage.setItem('sp_font_size', fontSize);
  }, [fontSize]);

  // Apply High Contrast Mode
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('sp_high_contrast', String(highContrast));
  }, [highContrast]);

  // Apply Language
  useEffect(() => {
    localStorage.setItem('sp_language', language);
  }, [language]);

  return {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    toggleHighContrast: () => setHighContrast(prev => !prev),
    language,
    setLanguage
  };
}

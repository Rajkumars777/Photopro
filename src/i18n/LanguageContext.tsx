"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Language } from './dict';

type Dictionary = typeof dictionaries.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Defaulting to English.
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Hydrate language choice from standard local storage if available
    const saved = localStorage.getItem('photopro-lang') as Language;
    if (saved === 'en' || saved === 'ja') {
      setLanguageState(saved);
    }
    // No explicit detection for ja anymore, default is en
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('photopro-lang', lang);
  };

  const dict = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

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
  // Use a state that initially doesn't rely on localStorage for SSR,
  // but we can hydrate it. Defaulting to Japanese as requested.
  const [language, setLanguageState] = useState<Language>('ja');

  useEffect(() => {
    // Hydrate language choice from standard local storage if available
    const saved = localStorage.getItem('photopro-lang') as Language;
    if (saved === 'en' || saved === 'ja') {
      setLanguageState(saved);
    } else {
      // detect browser language
      if (navigator.language.startsWith('ja')) {
        setLanguageState('ja');
      }
    }
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

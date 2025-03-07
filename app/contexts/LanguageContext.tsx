'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../i18n/translations';

type Language = 'zh' | 'en';
type TranslationKey = keyof typeof translations.zh | keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'zh';
  const saved = localStorage.getItem('language');
  console.log('Initial language from localStorage:', saved);
  return (saved === 'en' || saved === 'zh') ? saved : 'zh';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [mounted, setMounted] = useState(false);

  // 使用 useCallback 来记忆 setLanguage 函数
  const setLanguage = useCallback((lang: Language) => {
    console.log('Setting language to:', lang);
    if (lang !== 'zh' && lang !== 'en') {
      console.error('Invalid language:', lang);
      return;
    }
    if (lang === language) {
      console.log('Language already set to:', lang);
      return;
    }
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
      console.log('Language saved to localStorage:', lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  }, [language]);

  // 组件挂载时同步语言设置
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language');
    console.log('Mounted, saved language:', saved);
    if (saved === 'en' || saved === 'zh') {
      setLanguageState(saved);
    }
  }, []);

  // 监听其他标签页的语言变化
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        console.log('Storage event:', e.newValue);
        if (e.newValue === 'zh' || e.newValue === 'en') {
          setLanguageState(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    try {
      const value = translations[language][key];
      return value ?? key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  }, [language]);

  // 在客户端渲染之前返回一个加载状态
  if (!mounted && typeof window !== 'undefined') {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/types';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: Language;
  label: string;
  native: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'vi', label: 'Tiếng Việt', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'zh', label: 'Chinese', native: '简体中文', flag: '🇨🇳' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 bg-white/80 hover:bg-brand-purple-50 border border-purple-100/80 shadow-sm transition-all duration-200 backdrop-blur-sm"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-brand-purple-600" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-semibold text-gray-800 hidden sm:inline">{currentLang.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-purple-100 p-1.5 focus:outline-none transition-all animate-in fade-in zoom-in-95">
          <div className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase px-3 py-1.5 border-b border-gray-100">
            Select Language
          </div>
          <div className="py-1">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-purple-600 to-brand-pink-500 text-white font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-brand-lavender-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <span>{item.native}</span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

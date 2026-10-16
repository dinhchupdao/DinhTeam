'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Camera, 
  Search, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t } = useApp();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/photographers', label: t.nav.findPhoto, icon: Search },
    { href: '/booking', label: t.nav.booking, icon: Calendar },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/check-photo', label: t.nav.checkPhoto, icon: ImageIcon },
    { href: '/chat', label: t.nav.chat, icon: MessageSquare, badge: 'Live' },
    { href: '/admin', label: t.nav.admin, icon: ShieldCheck },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-soft border-b border-purple-100/60 py-3'
          : 'bg-white/40 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold text-xl tracking-tight text-gray-900">
                <span>DINH</span>
                <span className="text-brand-pink-500 text-2xl leading-none">.</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded-md bg-purple-100 text-brand-purple-700">
                  STUDIO
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5 hidden sm:block">
                Visual Anthology & Booking
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-purple-700 bg-purple-50/80 font-semibold shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-brand-purple-600' : 'text-gray-400'}`} />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-brand-pink-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-brand rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Multi-language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-brand hover:opacity-95 shadow-brand-glow hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.bookNow}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-purple-50 border border-purple-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-purple-100 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-3">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-100 to-pink-50 text-brand-purple-800 font-semibold'
                      : 'text-gray-700 hover:bg-purple-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-4 h-4 text-brand-purple-600" />}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-pink-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-brand shadow-brand-glow"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.nav.bookNow}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Camera, MapPin, Phone, Mail, Instagram, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, formatCurrency } = useApp();

  return (
    <footer className="bg-gradient-to-b from-[#181126] via-[#120a1f] to-[#0c0616] text-white pt-16 pb-12 border-t border-purple-900/40 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-900/50">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5 font-bold text-xl tracking-tight text-white">
                <span>DINH</span>
                <span className="text-brand-pink-400 text-2xl leading-none">.</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-md bg-purple-900/80 text-purple-200 border border-purple-700/50">
                  STUDIO
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nền tảng tuyển chọn và đặt lịch nhiếp ảnh gia hàng đầu. Kiến tạo những khung hình cảm xúc, minh bạch biểu phí di chuyển 63 tỉnh thành và giao ảnh trực tuyến chuẩn sắc nét.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-brand flex items-center justify-center transition-all duration-200 hover:scale-110 text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="tel:0988776655" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-brand flex items-center justify-center transition-all duration-200 hover:scale-110 text-white"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <Link 
                href="/admin" 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600/60 flex items-center justify-center transition-all duration-200 text-gray-300 hover:text-white"
                title="Admin Portal"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-brand" />
              {t.nav.home} & Dịch Vụ
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/photographers" className="hover:text-brand-pink-400 transition-colors">
                  {t.nav.findPhoto}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-brand-pink-400 transition-colors">
                  {t.nav.booking}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-pink-400 transition-colors">
                  {t.nav.pricing}
                </Link>
              </li>
              <li>
                <Link href="/check-photo" className="hover:text-brand-pink-400 transition-colors">
                  {t.nav.checkPhoto}
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-brand-pink-400 transition-colors">
                  {t.nav.chat}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-pink-400 transition-colors text-purple-300">
                  {t.nav.admin} (CMS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Travel Destinations & Fees */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-brand" />
              Điểm Chụp & Phụ Phí
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex justify-between items-center py-1 border-b border-purple-900/30">
                <span>TP. Hồ Chí Minh</span>
                <span className="font-semibold text-green-400">0 ₫ (Miễn phí)</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-purple-900/30">
                <span>Bình Dương / Đồng Nai</span>
                <span className="font-semibold text-purple-300">{formatCurrency(300000)}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-purple-900/30">
                <span>Vũng Tàu</span>
                <span className="font-semibold text-purple-300">{formatCurrency(800000)}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-purple-900/30">
                <span>Đà Lạt (Lâm Đồng)</span>
                <span className="font-semibold text-brand-pink-400">{formatCurrency(1800000)}</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-purple-900/30">
                <span>Đà Nẵng / Hội An</span>
                <span className="font-semibold text-brand-pink-400">{formatCurrency(2500000)}</span>
              </li>
              <li className="flex justify-between items-center py-1">
                <span>Hà Nội / Sa Pa</span>
                <span className="font-semibold text-brand-pink-400">{formatCurrency(3500000)}</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-gradient-brand" />
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-pink-400 shrink-0 mt-0.5" />
                <span>Khu Biệt Thự Thảo Điền, P. Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-purple-400 shrink-0" />
                <a href="tel:0988776655" className="hover:text-white transition-colors">
                  +84 (0) 988 776 655 (Zalo/Hotline)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-purple-400 shrink-0" />
                <a href="mailto:booking@dinhteam.com" className="hover:text-white transition-colors">
                  toquocvinhmc@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 to-pink-950/40 border border-purple-800/40">
              <div className="text-[11px] text-gray-300 font-medium">
                Cần tư vấn trực tiếp concept?
              </div>
              <Link 
                href="/chat"
                className="mt-2 inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-gradient-brand text-xs font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
              >
                Mở Chat Với Studio Ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} DINH STUDIO. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed & Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink-500 fill-brand-pink-500" />
            <span>for Visual Artists & Photographers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

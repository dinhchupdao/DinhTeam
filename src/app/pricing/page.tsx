'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Sparkles, 
  Check, 
  Search, 
  MapPin, 
  Car, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function PricingPage() {
  const { t, travelFees, formatCurrency, setActiveBookingDraft } = useApp();
  const [searchProvince, setSearchProvince] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'Miền Nam' | 'Miền Trung' | 'Miền Bắc'>('all');

  const filteredTravelFees = travelFees.filter((item) => {
    const matchesSearch = 
      !searchProvince.trim() ||
      item.province.toLowerCase().includes(searchProvince.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchProvince.toLowerCase()));

    const matchesRegion = selectedRegion === 'all' || item.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const packages = [
    {
      id: 'lookbook',
      name: 'Fashion & Lookbook',
      price: 15000000,
      period: 'dự án',
      popular: false,
      desc: 'Dành cho các local brand, thương hiệu thời trang thiết kế, lookbook BST mới.',
      features: [
        'Thời lượng chụp: 4 - 6 giờ tại Studio/Location',
        'Toàn bộ file RAW gốc (không giới hạn)',
        '25 ảnh Master Retouch chuẩn High-End',
        'Hỗ trợ Moodboard & Giám đốc mỹ thuật (Art Direction)',
        'Bàn giao trong 5 ngày làm việc qua mã Booking',
      ],
      serviceType: 'Fashion & Lookbook',
    },
    {
      id: 'portrait',
      name: 'Signature Portraiture',
      price: 8500000,
      period: 'buổi chụp',
      popular: true,
      desc: 'Dành cho doanh nhân, nghệ sĩ và cá nhân muốn ghi dấu bản sắc độc bản.',
      features: [
        'Thời lượng: 2.5 - 3 giờ cá nhân hóa',
        '3 Concept trang phục & layout ánh sáng chuyên sâu',
        '15 ảnh Fine-Art Retouch chi tiết từng sợi tóc',
        'Tặng 1 ảnh ép gỗ cao cấp kích thước 40x60cm',
        'Tư vấn trang phục & Makeup chuyên nghiệp đi kèm',
      ],
      serviceType: 'Signature Portraiture',
    },
    {
      id: 'wedding',
      name: 'Cinematic Wedding',
      price: 28000000,
      period: 'đám cưới',
      popular: false,
      desc: 'Ký sự cưới phóng sự điện ảnh ghi lại trọn vẹn từng giọt nước mắt hạnh phúc.',
      features: [
        'Đội ngũ 2 nhiếp ảnh gia chính suốt cả ngày',
        'Toàn bộ file gốc chỉnh màu kỹ thuật số (800+ ảnh)',
        '60 ảnh Master Retouch in Photobook da Ý khổ 30x30cm',
        'Video Highlights 4K Teaser 60 giây',
        'Hộp gỗ kỷ niệm và USB pha lê khắc tên',
      ],
      serviceType: 'Cinematic Wedding',
    },
  ];

  const handleSelectPackage = (serviceType: string) => {
    setActiveBookingDraft(prev => ({
      ...prev,
      serviceType,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.pricing.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Bảng Giá Dịch Vụ & <span className="text-gradient">Phụ Phí Di Chuyển</span>
        </h1>
        <p className="text-sm text-gray-600">
          {t.pricing.subtitle}
        </p>
      </div>

      {/* 3 Main Pricing Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 relative ${
              pkg.popular
                ? 'bg-gradient-to-b from-white via-purple-50/40 to-pink-50/30 border-2 border-brand-purple-500 shadow-xl shadow-purple-500/10 scale-105 z-10'
                : 'bg-white border-purple-100 shadow-soft hover:shadow-card'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-brand text-white text-[10px] font-extrabold tracking-widest uppercase shadow-md">
                Phổ Biến Nhất
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-extrabold text-xl text-gray-900">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mt-1 min-h-[34px] leading-relaxed">
                  {pkg.desc}
                </p>
              </div>

              <div className="py-2 border-y border-gray-100 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-brand-purple-900">
                  {formatCurrency(pkg.price)}
                </span>
                <span className="text-xs text-gray-400">/ {pkg.period}</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-600 pt-2">
                {pkg.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/booking"
                onClick={() => handleSelectPackage(pkg.serviceType)}
                className={`w-full py-3.5 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                  pkg.popular
                    ? 'bg-gradient-brand text-white shadow-brand-glow hover:opacity-95'
                    : 'bg-brand-purple-50 text-brand-purple-800 hover:bg-brand-purple-100'
                }`}
              >
                <span>Đặt Lịch Gói Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================================================================
           TRAVEL FEE DIRECTORY SECTION (63 Tỉnh Thành)
           ========================================================================== */}
      <div id="travel-fees" className="bg-white rounded-3xl border border-purple-100 shadow-soft p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-brand-pink-700 text-xs font-semibold mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Biểu Phí Chuẩn Xác</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {t.pricing.travelFeeTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t.pricing.travelFeeSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold bg-green-50 text-green-800 px-3.5 py-2 rounded-2xl border border-green-200">
            <Zap className="w-4 h-4 text-green-600 shrink-0" />
            <span>Nội thành Sài Gòn: Miễn phí 100%</span>
          </div>
        </div>

        {/* Search & Region Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.pricing.searchProvince}
              value={searchProvince}
              onChange={(e) => setSearchProvince(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
            {(['all', 'Miền Nam', 'Miền Trung', 'Miền Bắc'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  selectedRegion === reg
                    ? 'bg-gradient-brand text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {reg === 'all' ? 'Tất Cả Khu Vực' : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/80 text-brand-purple-900 uppercase font-bold text-[10px] tracking-wider border-b border-purple-100">
              <tr>
                <th className="py-3.5 px-4">{t.pricing.colProvince}</th>
                <th className="py-3.5 px-4">{t.pricing.colRegion}</th>
                <th className="py-3.5 px-4">{t.pricing.colFee}</th>
                <th className="py-3.5 px-4">{t.pricing.colTime}</th>
                <th className="py-3.5 px-4">{t.pricing.colNotes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTravelFees.map((tf) => (
                <tr key={tf.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-pink-500 shrink-0" />
                    <span>{tf.province}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-medium">
                      {tf.region}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-sm">
                    {tf.fee === 0 ? (
                      <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md text-xs font-bold">
                        0 ₫ ({t.pricing.freeBadge})
                      </span>
                    ) : (
                      <span className="text-brand-purple-800">{formatCurrency(tf.fee)}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{tf.estimatedHours}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 italic">
                    {tf.notes || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

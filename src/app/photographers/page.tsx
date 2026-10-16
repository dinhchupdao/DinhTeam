'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PhotographerCard } from '@/components/PhotographerCard';
import { PhotographyStyle } from '@/types';
import { Search, Filter, SlidersHorizontal, Camera, RotateCcw } from 'lucide-react';

function PhotographersContent() {
  const { t, photographers } = useApp();
  const searchParams = useSearchParams();

  // URL Query defaults
  const initialStyle = searchParams.get('style') || 'all';
  const initialProvince = searchParams.get('province') || '';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [selectedCity, setSelectedCity] = useState<string>(initialProvince);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  const allStyles: (PhotographyStyle | 'all')[] = [
    'all',
    'Fashion & Editorial',
    'Chân Dung Nghệ Thuật',
    'Ký Sự Cưới',
    'Concept & Nàng Thơ',
    'Đường Phố & Film',
    'Lookbook Thương Hiệu',
  ];

  // Filtering & Sorting
  const filteredPhotographers = useMemo(() => {
    return photographers
      .filter((photo) => {
        // Query match
        const matchesQuery = 
          !searchQuery.trim() ||
          photo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.cameraGear.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));

        // Style match
        const matchesStyle =
          selectedStyle === 'all' ||
          photo.styles.includes(selectedStyle as PhotographyStyle);

        // City match
        const matchesCity =
          !selectedCity ||
          photo.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
          selectedCity.toLowerCase().includes(photo.city.toLowerCase());

        return matchesQuery && matchesStyle && matchesCity;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
        return b.rating - a.rating; // default: highest rating
      });
  }, [photographers, searchQuery, selectedStyle, selectedCity, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('all');
    setSelectedCity('');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>{t.find.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Danh Sách <span className="text-gradient">Nhiếp Ảnh Gia</span> Đỉnh Cao
        </h1>
        <p className="text-sm text-gray-600">
          {t.find.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-soft space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Text Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.find.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500 placeholder:text-gray-400"
            />
          </div>

          {/* City / Province Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3.5 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            >
              <option value="">{t.find.allProvinces}</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Lâm Đồng (Đà Lạt / Bảo Lộc)">Đà Lạt (Lâm Đồng)</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Bà Rịa - Vũng Tàu">Vũng Tàu</option>
              <option value="Toàn Quốc">Nhận chụp toàn quốc & quốc tế</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            >
              <option value="rating">{t.find.sortRating}</option>
              <option value="price-asc">{t.find.sortPriceAsc}</option>
              <option value="price-desc">{t.find.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Style Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-brand-purple-600 shrink-0 mr-1" />
          {allStyles.map((style) => {
            const isSelected = selectedStyle === style;
            return (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-gradient-brand text-white shadow-sm shadow-purple-500/20'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-purple-100/60 hover:text-gray-900'
                }`}
              >
                {style === 'all' ? t.find.filterAll : style}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <div>
          Tìm thấy <span className="font-extrabold text-brand-purple-900 text-sm">{filteredPhotographers.length}</span> {t.find.resultsCount}
        </div>
        {(searchQuery || selectedStyle !== 'all' || selectedCity) && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 font-semibold text-brand-pink-600 hover:text-brand-pink-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Photographers Grid */}
      {filteredPhotographers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotographers.map((photo) => (
            <PhotographerCard key={photo.id} photographer={photo} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-purple-100 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-brand-purple-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-800">Không tìm thấy photographer phù hợp</h3>
          <p className="text-xs text-gray-500">
            Hãy thử tìm kiếm với từ khóa khác hoặc xóa bớt bộ lọc phong cách và địa điểm.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-sm"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}

export default function PhotographersPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-gray-400">Đang tải danh sách photographer...</div>}>
      <PhotographersContent />
    </Suspense>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Download, 
  Heart, 
  Calendar, 
  MapPin, 
  User, 
  Camera, 
  Sparkles, 
  AlertCircle, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function CheckPhotoPage() {
  const { t, galleries, toggleFavoritePhoto } = useApp();

  const [searchCode, setSearchCode] = useState('DINH-8821');
  const [activeGalleryCode, setActiveGalleryCode] = useState<string>('DINH-8821');
  const [searchError, setSearchError] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const currentGallery = galleries[activeGalleryCode.trim().toUpperCase()];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = searchCode.trim().toUpperCase();
    if (!formatted) return;

    if (galleries[formatted]) {
      setActiveGalleryCode(formatted);
      setSearchError('');
      setCategoryFilter('all');
    } else {
      setSearchError(t.checkPhoto.emptyError);
    }
  };

  const handleQuickCode = (code: string) => {
    setSearchCode(code);
    setActiveGalleryCode(code);
    setSearchError('');
    setCategoryFilter('all');
  };

  const filteredPhotos = currentGallery?.photos.filter((p) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'favorite') return p.isFavorite;
    return p.category === categoryFilter;
  }) || [];

  const handleDownloadAll = () => {
    setDownloadSuccessToast('Đang khởi tạo file nén ZIP chất lượng cao (85 ảnh)... Quá trình tải sẽ bắt đầu trong giây lát.');
    setTimeout(() => setDownloadSuccessToast(null), 4000);
  };

  const handleDownloadSingle = (title: string) => {
    setDownloadSuccessToast(`Đang tải ảnh "${title}" độ phân giải 24MP...`);
    setTimeout(() => setDownloadSuccessToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>{t.checkPhoto.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Phòng Trưng Bày & <span className="text-gradient">Tải Ảnh Đã Chụp</span>
        </h1>
        <p className="text-sm text-gray-600">
          {t.checkPhoto.subtitle}
        </p>
      </div>

      {/* Booking Code Search Box */}
      <div className="max-w-2xl mx-auto bg-white p-5 rounded-3xl border border-purple-100 shadow-soft space-y-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.checkPhoto.inputPlaceholder}
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs sm:text-sm font-bold text-gray-900 tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-brand-purple-500 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>{t.checkPhoto.btnSearch}</span>
          </button>
        </form>

        {/* Sample Code Hints */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-1">
          <span className="text-[11px] font-semibold text-gray-400">{t.checkPhoto.demoHint}:</span>
          <button
            type="button"
            onClick={() => handleQuickCode('DINH-8821')}
            className="px-2.5 py-1 rounded-lg bg-purple-100/80 text-brand-purple-800 font-mono font-bold text-xs hover:bg-purple-200 transition-colors"
          >
            DINH-8821
          </button>
          <button
            type="button"
            onClick={() => handleQuickCode('DINH-9043')}
            className="px-2.5 py-1 rounded-lg bg-pink-100/80 text-brand-pink-800 font-mono font-bold text-xs hover:bg-pink-200 transition-colors"
          >
            DINH-9043
          </button>
        </div>

        {searchError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* Gallery Display */}
      {currentGallery ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Gallery Header Card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-purple-900 via-purple-900 to-brand-pink-900 text-white p-6 sm:p-10 shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>{currentGallery.bookingCode} • Đã Hoàn Thiện Master Retouch</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Bộ Ảnh Của {currentGallery.clientName}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-purple-200">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-pink-400" />
                    <span>Photo: {currentGallery.photographerName}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-pink-400" />
                    <span>Ngày chụp: {currentGallery.shootDate}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-pink-400" />
                    <span>{currentGallery.location}</span>
                  </span>
                </div>
              </div>

              {/* Download All CTA */}
              <button
                type="button"
                onClick={handleDownloadAll}
                className="px-6 py-3.5 rounded-full bg-white text-brand-purple-900 font-bold text-xs hover:bg-purple-50 transition-colors shadow-lg flex items-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{t.checkPhoto.downloadAll}</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {downloadSuccessToast && (
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" />
              <span>{downloadSuccessToast}</span>
            </div>
          )}

          {/* Category Filter Chips */}
          <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {['all', 'Highlights', 'Portrait', 'Candid', 'favorite'].map((cat) => {
                const isSelected = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                      isSelected
                        ? 'bg-gradient-brand text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'all' && 'Tất Cả Ảnh'}
                    {cat === 'favorite' && 'Đã Thích (★)'}
                    {cat !== 'all' && cat !== 'favorite' && cat}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-500">
              Hiển thị <span className="font-bold text-gray-800">{filteredPhotos.length}</span> / {currentGallery.photos.length} ảnh
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] shadow-soft border border-purple-100 hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between" />

                {/* Favorite Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleFavoritePhoto(currentGallery.bookingCode, photo.id)}
                  className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all ${
                    photo.isFavorite
                      ? 'bg-brand-pink-500 text-white shadow-md'
                      : 'bg-black/40 text-white hover:bg-black/60'
                  }`}
                  title={photo.isFavorite ? 'Bỏ thích' : 'Thích ảnh này'}
                >
                  <Heart className={`w-4 h-4 ${photo.isFavorite ? 'fill-white' : ''}`} />
                </button>

                {/* Photo Title & Single Download */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <div>
                    <h4 className="font-bold text-xs truncate">{photo.title}</h4>
                    <span className="text-[10px] text-purple-200">{photo.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLightboxPhotoIndex(index)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-[10px] font-semibold transition-colors"
                    >
                      Xem Lớn
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(photo.title)}
                      className="p-1.5 rounded-lg bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-sm transition-colors"
                      title={t.checkPhoto.downloadSingle}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Lightbox Modal */}
      {lightboxPhotoIndex !== null && filteredPhotos[lightboxPhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <button
            onClick={() => setLightboxPhotoIndex(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next buttons */}
          {lightboxPhotoIndex > 0 && (
            <button
              onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex - 1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxPhotoIndex < filteredPhotos.length - 1 && (
            <button
              onClick={() => setLightboxPhotoIndex(lightboxPhotoIndex + 1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <div className="relative aspect-[16/10] w-[80vw] max-w-4xl max-h-[75vh]">
              <Image
                src={filteredPhotos[lightboxPhotoIndex].url}
                alt={filteredPhotos[lightboxPhotoIndex].title}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white mt-4 space-y-1">
              <h3 className="font-bold text-base">{filteredPhotos[lightboxPhotoIndex].title}</h3>
              <p className="text-xs text-purple-300">
                {lightboxPhotoIndex + 1} / {filteredPhotos.length} ảnh
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

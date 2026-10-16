'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Photographer } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, MapPin, Camera, Sparkles, X, ChevronRight } from 'lucide-react';

interface PhotographerCardProps {
  photographer: Photographer;
}

export const PhotographerCard: React.FC<PhotographerCardProps> = ({ photographer }) => {
  const { t, formatCurrency, setActiveBookingDraft } = useApp();
  const router = useRouter();
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const handleSelectForBooking = () => {
    setActiveBookingDraft(prev => ({
      ...prev,
      photographerId: photographer.id,
      photographerName: photographer.name,
      photographerAvatar: photographer.avatar,
      basePrice: photographer.startingPrice,
    }));
    router.push('/booking');
  };

  return (
    <>
      <div className="group relative bg-white rounded-3xl overflow-hidden border border-purple-100/80 shadow-soft hover:shadow-brand-glow transition-all duration-300 flex flex-col hover:-translate-y-1.5">
        {/* Cover Photo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          <Image
            src={photographer.coverImage}
            alt={photographer.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-gray-800 shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{photographer.rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-400 font-normal">({photographer.reviewsCount})</span>
          </div>

          {/* Location Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white">
            <MapPin className="w-3 h-3 text-brand-pink-400" />
            <span>{photographer.city}</span>
          </div>

          {/* Avatar and Name Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
              <Image
                src={photographer.avatar}
                alt={photographer.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-white truncate drop-shadow-sm">
                {photographer.name}
              </h3>
              <p className="text-xs text-purple-200 truncate">
                {photographer.title}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {photographer.bio}
          </p>

          {/* Style Tags */}
          <div className="flex flex-wrap gap-1.5">
            {photographer.styles.map((style) => (
              <span
                key={style}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-brand-purple-50 text-brand-purple-700 border border-purple-100/60"
              >
                {style}
              </span>
            ))}
          </div>

          {/* Camera Gear Preview */}
          <div className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 p-2 rounded-xl border border-gray-100">
            <Camera className="w-3.5 h-3.5 text-brand-purple-600 shrink-0" />
            <span className="truncate">{photographer.cameraGear.join(' • ')}</span>
          </div>

          {/* Price & Actions */}
          <div className="pt-2 border-t border-purple-50 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">
                {t.find.priceFrom}
              </span>
              <span className="text-base font-extrabold text-brand-purple-800">
                {formatCurrency(photographer.startingPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowPortfolioModal(true)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {t.find.viewProfile}
              </button>
              <button
                type="button"
                onClick={handleSelectForBooking}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-brand hover:opacity-95 shadow-sm shadow-purple-500/20 transition-all active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>{t.find.bookWith}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Modal */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-purple-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 via-white to-pink-50">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-purple-500">
                  <Image src={photographer.avatar} alt={photographer.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{photographer.name}</h3>
                  <p className="text-xs text-brand-purple-600 font-medium">{photographer.title} • {photographer.experienceYears} năm kinh nghiệm</p>
                </div>
              </div>
              <button
                onClick={() => setShowPortfolioModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Photo & Thumbnails */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {photographer.portfolio.length > 0 && (
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                    <Image
                      src={photographer.portfolio[activePhotoIndex].url}
                      alt={photographer.portfolio[activePhotoIndex].title}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                      <h4 className="font-bold text-base">{photographer.portfolio[activePhotoIndex].title}</h4>
                      <p className="text-xs text-purple-300 font-mono mt-0.5">{photographer.portfolio[activePhotoIndex].exif}</p>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2.5 mt-3 overflow-x-auto pb-2">
                    {photographer.portfolio.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          activePhotoIndex === idx ? 'border-brand-pink-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img.url} alt={img.title} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50/50 p-4 rounded-2xl border border-purple-100/60">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-brand-purple-900 mb-1">Triết Lý Nghệ Thuật:</h5>
                  <p className="text-xs text-gray-700 leading-relaxed">{photographer.bio}</p>
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-brand-purple-900 mb-1">Hệ Thống Thiết Bị Chuyên Dụng:</h5>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {photographer.cameraGear.map((gear) => (
                      <li key={gear} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-500" />
                        <span>{gear}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
              <div className="text-sm font-bold text-gray-900">
                Giá khởi điểm: <span className="text-brand-purple-700">{formatCurrency(photographer.startingPrice)}</span>
              </div>
              <button
                onClick={() => {
                  setShowPortfolioModal(false);
                  handleSelectForBooking();
                }}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all flex items-center gap-1.5"
              >
                <span>Đặt Lịch Với {photographer.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

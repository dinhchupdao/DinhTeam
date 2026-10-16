'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  Car,
  AlertCircle
} from 'lucide-react';

export default function BookingPage() {
  const { 
    t, 
    photographers, 
    travelFees, 
    activeBookingDraft, 
    setActiveBookingDraft, 
    getTravelFeeByProvince, 
    formatCurrency 
  } = useApp();
  
  const router = useRouter();

  // Selected State
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(
    activeBookingDraft?.photographerId || photographers[0].id
  );
  const [servicePackage, setServicePackage] = useState<string>(
    activeBookingDraft?.serviceType || 'Signature Portraiture'
  );
  const [date, setDate] = useState<string>(activeBookingDraft?.date || '2026-11-20');
  const [timeSlot, setTimeSlot] = useState<string>(activeBookingDraft?.timeSlot || '08:00 - 11:30');
  const [guestCount, setGuestCount] = useState<number>(activeBookingDraft?.guestCount || 2);
  const [province, setProvince] = useState<string>(activeBookingDraft?.locationProvince || 'TP. Hồ Chí Minh');
  const [detailedAddress, setDetailedAddress] = useState<string>(
    activeBookingDraft?.locationAddress || 'Studio Thảo Điền, TP. Thủ Đức'
  );
  const [clientName, setClientName] = useState<string>(activeBookingDraft?.clientName || '');
  const [clientPhone, setClientPhone] = useState<string>(activeBookingDraft?.clientPhone || '');
  const [clientEmail, setClientEmail] = useState<string>(activeBookingDraft?.clientEmail || '');
  const [notes, setNotes] = useState<string>(activeBookingDraft?.notes || '');

  const [formError, setFormError] = useState<string>('');

  const selectedPhotographer = photographers.find(p => p.id === selectedPhotoId) || photographers[0];

  // Base price by service
  const packagePriceMultiplier: Record<string, number> = {
    'Signature Portraiture': 1,
    'Fashion & Lookbook': 1.6,
    'Cinematic Wedding': 2.8,
    'Concept & Nàng Thơ': 1.1,
    'Kiến Trúc & Không Gian': 1.8,
  };

  const basePrice = Math.round(selectedPhotographer.startingPrice * (packagePriceMultiplier[servicePackage] || 1));
  const currentTravelFee = getTravelFeeByProvince(province);
  const totalAmount = basePrice + currentTravelFee;
  const depositAmount = Math.round(totalAmount * 0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !clientEmail.trim()) {
      setFormError('Vui lòng điền đầy đủ Họ Tên, Số Điện Thoại và Email để tiếp tục.');
      return;
    }

    // Save to context draft
    setActiveBookingDraft({
      photographerId: selectedPhotographer.id,
      photographerName: selectedPhotographer.name,
      photographerAvatar: selectedPhotographer.avatar,
      serviceType: servicePackage,
      date,
      timeSlot,
      guestCount,
      locationProvince: province,
      locationAddress: detailedAddress,
      basePrice,
      travelFee: currentTravelFee,
      isDepositOnly: true,
      depositAmount,
      totalAmount,
      clientName,
      clientPhone,
      clientEmail,
      notes,
    });

    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-brand-pink-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.booking.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Khởi Tạo <span className="text-gradient">Lịch Chụp</span> Của Bạn
        </h1>
        <p className="text-sm text-gray-600">
          {t.booking.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column (Steps) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Chọn Photographer & Gói */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {t.booking.step1} & Dịch Vụ
              </h2>
            </div>

            {/* Photographer Grid Select */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-700 block">
                {t.booking.selectPhotoPrompt}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {photographers.map((p) => {
                  const isSelected = p.id === selectedPhotoId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPhotoId(p.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 relative ${
                        isSelected
                          ? 'border-brand-purple-600 bg-purple-50/80 shadow-md ring-2 ring-brand-purple-400/30'
                          : 'border-gray-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                        <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-gray-900 truncate">{p.name}</div>
                        <div className="text-[10px] text-gray-500 truncate">{p.styles[0]}</div>
                        <div className="text-[11px] font-extrabold text-brand-purple-700 mt-0.5">
                          từ {formatCurrency(p.startingPrice)}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-purple-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Package Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-gray-700 block">
                {t.booking.servicePackage}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Signature Portraiture', title: 'Signature Portrait', desc: 'Chân dung cá nhân, profile nghệ thuật (15 ảnh retouch)' },
                  { id: 'Fashion & Lookbook', title: 'Fashion & Lookbook', desc: 'Lookbook thời trang, thương hiệu (25 ảnh retouch)' },
                  { id: 'Cinematic Wedding', title: 'Cinematic Wedding', desc: 'Ký sự cưới trọn ngày, photobook da Ý cao cấp' },
                ].map((tier) => {
                  const isSelected = servicePackage === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setServicePackage(tier.id)}
                      className={`p-4 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-brand-pink-500 bg-pink-50/60 shadow-sm ring-2 ring-brand-pink-400/30'
                          : 'border-gray-200 bg-white hover:border-purple-200'
                      }`}
                    >
                      <div className="font-bold text-xs text-gray-900">{tier.title}</div>
                      <div className="text-[11px] text-gray-500 mt-1 leading-snug">{tier.desc}</div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-brand-pink-500 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Ngày & Giờ Chụp */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {t.booking.step2}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-brand-purple-600" />
                  <span>{t.booking.datePrompt}</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-purple-600" />
                  <span>{t.booking.timeSlot}</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                >
                  <option value="06:30 - 09:30">06:30 - 09:30 (Bình minh & Ánh sáng vàng)</option>
                  <option value="08:00 - 11:30">08:00 - 11:30 (Sáng mát & Studio)</option>
                  <option value="14:00 - 17:30">14:00 - 17:30 (Hoàng hôn lãng mạn)</option>
                  <option value="18:30 - 21:30">18:30 - 21:30 (Night Street & Cyberpunk)</option>
                  <option value="Trọn ngày (07:00 - 18:00)">Trọn ngày (Dành cho Ký sự cưới)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Địa Điểm Chụp & Phụ Phí Di Chuyển */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {t.booking.step3}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Province dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-pink-500" />
                  <span>{t.booking.provincePrompt}</span>
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                >
                  {travelFees.map((tf) => (
                    <option key={tf.id} value={tf.province}>
                      {tf.province} — {tf.fee === 0 ? '0 ₫ (Miễn phí nội thành)' : formatCurrency(tf.fee)} ({tf.estimatedHours})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic travel fee callout banner */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                currentTravelFee === 0 
                  ? 'bg-green-50 border-green-200 text-green-900' 
                  : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-brand-purple-950'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-brand-purple-600" />
                  <div>
                    <span className="font-semibold block">{t.booking.travelFeeNotice}</span>
                    <span className="text-[11px] text-gray-500">Bao gồm xe đưa đón/vé di chuyển và thiết bị</span>
                  </div>
                </div>
                <div className="font-extrabold text-sm text-brand-purple-800">
                  {currentTravelFee === 0 ? '0 ₫ (Miễn Phí)' : `+ ${formatCurrency(currentTravelFee)}`}
                </div>
              </div>

              {/* Detailed address & Guest count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">
                    {t.booking.addressPrompt}
                  </label>
                  <input
                    type="text"
                    placeholder={t.booking.addressPlaceholder}
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-purple-600" />
                    <span>{t.booking.guestCountPrompt}</span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  >
                    <option value={1}>1 người (Cá nhân)</option>
                    <option value={2}>2 người (Cặp đôi)</option>
                    <option value={3}>3 - 5 người (Gia đình / Nhóm)</option>
                    <option value={8}>6 - 10 người (Ekip / Doanh nghiệp)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Thông Tin Khách Hàng */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-gradient-brand text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                {t.booking.step4}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t.booking.namePrompt}</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng Anh"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t.booking.phonePrompt}</span>
                </label>
                <input
                  type="tel"
                  placeholder="090 123 4567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t.booking.emailPrompt}</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t.booking.notesPrompt}</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Tone màu ấm, mang theo 2 váy cưới, cần hỗ trợ makeup..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Summary Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5 space-y-5">
            <h3 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-pink-500" />
              <span>Tóm Tắt Đơn Đặt Lịch</span>
            </h3>

            {/* Selected Photo Mini Profile */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-brand-lavender-50 border border-purple-100/80">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <Image src={selectedPhotographer.avatar} alt={selectedPhotographer.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900">{selectedPhotographer.name}</div>
                <div className="text-[11px] text-brand-purple-700 font-medium">{servicePackage}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{date} • {timeSlot}</div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs pt-1">
              <div className="flex justify-between items-center text-gray-600">
                <span>{t.checkout.serviceFee}:</span>
                <span className="font-semibold text-gray-900">{formatCurrency(basePrice)}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <div className="flex items-center gap-1">
                  <span>Phụ phí di chuyển:</span>
                  <span className="text-[10px] text-gray-400">({province})</span>
                </div>
                <span className={`font-semibold ${currentTravelFee === 0 ? 'text-green-600' : 'text-brand-purple-700'}`}>
                  {currentTravelFee === 0 ? '0 ₫ (Miễn phí)' : formatCurrency(currentTravelFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-bold text-sm text-gray-900">{t.checkout.totalAmount}:</span>
                <span className="font-extrabold text-lg text-brand-purple-800">{formatCurrency(totalAmount)}</span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-[11px] text-brand-purple-900 flex justify-between items-center">
                <span>Số tiền đặt cọc giữ lịch (30%):</span>
                <span className="font-bold text-brand-pink-600 text-xs">{formatCurrency(depositAmount)}</span>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full font-bold text-xs text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>{t.booking.btnProceedPayment}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-[10px] text-gray-400 text-center leading-relaxed">
              Bảo mật 100% qua cổng thanh toán mã hóa SSL. Bạn có thể chọn đặt cọc 30% hoặc thanh toán toàn bộ ở bước tiếp theo.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

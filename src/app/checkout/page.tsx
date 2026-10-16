'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PaymentMethod } from '@/types';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Car, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  MessageSquare, 
  Download, 
  Info,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

export default function CheckoutPage() {
  const { 
    t, 
    activeBookingDraft, 
    createBooking, 
    formatCurrency 
  } = useApp();
  const router = useRouter();

  // If no draft exists, fallback with default values
  const draft = activeBookingDraft || {
    photographerName: 'Quốc Vinh',
    photographerAvatar: '/images/photographer.jpg',
    serviceType: 'Signature Portraiture',
    date: '2026-11-20',
    timeSlot: '08:00 - 11:30',
    guestCount: 2,
    locationProvince: 'TP. Hồ Chí Minh',
    locationAddress: 'Studio Thảo Điền, TP. Thủ Đức',
    basePrice: 4500000,
    travelFee: 0,
    clientName: 'Khách Hàng',
    clientPhone: '0901234567',
    clientEmail: 'khachhang@example.com',
  };

  // State
  const [isDepositOnly, setIsDepositOnly] = useState<boolean>(true);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('vietqr');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedBookingCode, setCompletedBookingCode] = useState<string | null>(null);
  const [copiedMemo, setCopiedMemo] = useState<boolean>(false);

  const basePrice = draft.basePrice || 4500000;
  const travelFee = draft.travelFee || 0;
  const totalAmount = basePrice + travelFee;
  const depositAmount = Math.round(totalAmount * 0.3);
  const payableNow = isDepositOnly ? depositAmount : totalAmount;
  const remainingDue = isDepositOnly ? totalAmount - depositAmount : 0;

  const tempBookingRef = `DINH${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyMemo = () => {
    navigator.clipboard.writeText(`${tempBookingRef} ${draft.clientPhone || '0901234567'}`);
    setCopiedMemo(true);
    setTimeout(() => setCopiedMemo(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Create confirmed booking in state
      const newBooking = createBooking({
        clientName: draft.clientName || 'Quý Khách',
        clientPhone: draft.clientPhone || '0901234567',
        clientEmail: draft.clientEmail || 'client@example.com',
        photographerId: draft.photographerId || 'photo-1',
        photographerName: draft.photographerName || 'Quốc Vinh',
        photographerAvatar: draft.photographerAvatar || '/images/photographer.jpg',
        serviceType: draft.serviceType || 'Signature Portraiture',
        date: draft.date || '2026-11-20',
        timeSlot: draft.timeSlot || '08:00 - 11:30',
        guestCount: draft.guestCount || 2,
        locationProvince: draft.locationProvince || 'TP. Hồ Chí Minh',
        locationAddress: draft.locationAddress || 'Studio Thảo Điền',
        basePrice,
        travelFee,
        isDepositOnly,
        depositAmount,
        totalAmount,
        paymentStatus: isDepositOnly ? 'deposit_paid' : 'fully_paid',
        paymentMethod: selectedMethod,
        bookingStatus: 'confirmed',
        notes: draft.notes || '',
      });

      setIsProcessing(false);
      setCompletedBookingCode(newBooking.code);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7B2CBF', '#C026D3', '#E91E63', '#FFD700'],
        });
      } catch (e) {
        console.warn(e);
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.checkout.title}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Xác Nhận & <span className="text-gradient">Đặt Cọc Chụp Ảnh</span>
        </h1>
        <p className="text-sm text-gray-600">
          {t.checkout.subtitle}
        </p>
      </div>

      {!completedBookingCode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Breakdown & Options */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Payment Structure Options (Cọc 30% vs Full 100%) */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-100 shadow-soft space-y-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-purple-600" />
                <span>{t.checkout.paymentOption}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option Deposit 30% */}
                <button
                  type="button"
                  onClick={() => setIsDepositOnly(true)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    isDepositOnly
                      ? 'border-brand-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-brand-purple-400/30'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-brand-purple-900">{t.checkout.optionDeposit}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple-600 text-white">
                      Khuyên Dùng
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
                    {t.checkout.optionDepositDesc}
                  </p>
                  <div className="text-base font-extrabold text-brand-purple-800">
                    {formatCurrency(depositAmount)}
                  </div>
                  {isDepositOnly && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-brand-purple-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>

                {/* Option Full 100% */}
                <button
                  type="button"
                  onClick={() => setIsDepositOnly(false)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    !isDepositOnly
                      ? 'border-brand-pink-500 bg-pink-50/70 shadow-sm ring-2 ring-brand-pink-400/30'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm text-gray-900">{t.checkout.optionFull}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-pink-500 text-white">
                      +05 Ảnh Quà Tặng
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
                    {t.checkout.optionFullDesc}
                  </p>
                  <div className="text-base font-extrabold text-brand-pink-600">
                    {formatCurrency(totalAmount)}
                  </div>
                  {!isDepositOnly && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-brand-pink-500 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-100 shadow-soft space-y-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-pink-500" />
                <span>{t.checkout.paymentMethod}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'vietqr', label: 'VietQR Chuyển Khoản', sub: 'Tự động & Miễn phí' },
                  { id: 'momo', label: 'Ví MoMo', sub: 'Quét mã siêu tốc' },
                  { id: 'vnpay', label: 'Cổng VNPAY', sub: 'ATM & Thẻ nội địa' },
                  { id: 'card', label: 'Visa / Mastercard', sub: 'Thẻ quốc tế' },
                ].map((item) => {
                  const isSelected = selectedMethod === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMethod(item.id as PaymentMethod)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-brand-purple-600 bg-purple-50/80 shadow-xs ring-2 ring-brand-purple-400/20'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                    >
                      <div className="font-bold text-xs text-gray-900">{item.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* VietQR Display Details */}
              {selectedMethod === 'vietqr' && (
                <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-brand-purple-900 font-bold text-sm">
                    <QrCode className="w-4 h-4 text-brand-purple-600" />
                    <span>{t.checkout.qrScanTitle}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    {/* Simulated VietQR Code */}
                    <div className="sm:col-span-5 flex flex-col items-center">
                      <div className="p-3 bg-white rounded-2xl border-2 border-brand-purple-200 shadow-md">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=2|99|888868689999|MB|DINH_STUDIO|0|0|${payableNow}|${tempBookingRef}|TRANSFER_PW`}
                          alt="VietQR Code"
                          className="w-36 h-36 rounded-lg"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-2 text-center">
                        Mở App Ngân Hàng để Quét Mã
                      </span>
                    </div>

                    {/* Bank Details */}
                    <div className="sm:col-span-7 space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-purple-100">
                        <div className="text-[10px] text-gray-400 uppercase font-semibold">Tên Ngân Hàng:</div>
                        <div className="font-bold text-gray-800">MBBank (Ngân Hàng Quân Đội)</div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-semibold">Số Tài Khoản:</div>
                          <div className="font-extrabold text-brand-purple-800 font-mono text-sm">8888 6868 9999</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-purple-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-semibold">Nội Dung Chuyển Khoản:</div>
                          <div className="font-extrabold text-brand-pink-600 font-mono text-xs">{tempBookingRef} {draft.clientPhone || '0901234567'}</div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyMemo}
                          className="px-2 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-brand-purple-800 text-[10px] font-semibold flex items-center gap-1"
                        >
                          {copiedMemo ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedMemo ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      <div className="text-[10px] text-gray-500 leading-snug">
                        Hệ thống tự động kích hoạt mã booking và gửi thông báo xác nhận ngay khi nhận được biến động số dư.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MoMo / VNPAY fallback note */}
              {selectedMethod !== 'vietqr' && (
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-gray-700 space-y-2">
                  <div className="font-semibold text-brand-purple-900">
                    Cổng thanh toán {selectedMethod.toUpperCase()} sẵn sàng:
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Sau khi bấm nút bên dưới, bạn sẽ được chuyển hướng an toàn đến cổng {selectedMethod.toUpperCase()} để xác thực thanh toán số tiền {formatCurrency(payableNow)}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Confirm Action */}
          <div className="lg:col-span-5 sticky top-28 space-y-5">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5 space-y-5">
              <h3 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>{t.checkout.orderSummary}</span>
              </h3>

              {/* Photographer & Session Info */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-lavender-50 border border-purple-100/80">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-purple-200">
                  <Image src={draft.photographerAvatar || '/images/photographer.jpg'} alt="Photo avatar" fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900">{draft.photographerName}</div>
                  <div className="text-[11px] text-brand-purple-700 font-semibold">{draft.serviceType}</div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>{draft.date}</span>
                    <span>•</span>
                    <span>{draft.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Destination & Location Detail */}
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <MapPin className="w-3.5 h-3.5 text-brand-pink-500" />
                  <span>Địa điểm chụp: {draft.locationProvince}</span>
                </div>
                <div className="text-[11px] text-gray-500 pl-5">
                  {draft.locationAddress}
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="space-y-3 text-xs pt-1">
                <div className="flex justify-between items-center text-gray-600">
                  <span>{t.checkout.serviceFee}:</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(basePrice)}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <div className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-brand-purple-600" />
                    <span>{t.checkout.travelFee}:</span>
                  </div>
                  <span className={`font-semibold ${travelFee === 0 ? 'text-green-600' : 'text-brand-purple-700'}`}>
                    {travelFee === 0 ? '0 ₫ (Miễn phí nội thành)' : formatCurrency(travelFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-gray-900">{t.checkout.totalAmount}:</span>
                  <span className="font-extrabold text-lg text-gray-900">{formatCurrency(totalAmount)}</span>
                </div>

                {/* Amount to Pay Now Highlight Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-brand-lavender-100 to-pink-100 border border-purple-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-brand-purple-950">{t.checkout.amountToPayNow}</span>
                    <span className="font-extrabold text-xl text-brand-purple-900">{formatCurrency(payableNow)}</span>
                  </div>
                  {isDepositOnly && (
                    <div className="flex justify-between items-center text-[10px] text-gray-500 pt-1 border-t border-purple-200/50">
                      <span>{t.checkout.remainingAmount}</span>
                      <span className="font-semibold text-gray-700">{formatCurrency(remainingDue)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-full font-bold text-xs text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Đang Xác Nhận Giao Dịch...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.checkout.btnConfirmPayment} ({formatCurrency(payableNow)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                <span>Cam kết hoàn cọc 100% nếu photographer hủy lịch</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==========================================================================
           SUCCESS RECEIPT MODAL / SCREEN
           ========================================================================== */
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-4xl border border-purple-100 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t.checkout.successTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
              {t.checkout.successDesc}
            </p>
          </div>

          {/* Booking Code Highlight */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-brand-purple-50 via-purple-50 to-pink-50 border-2 border-brand-purple-300 inline-block px-8 shadow-sm">
            <div className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
              {t.checkout.bookingCodeLabel}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-brand-purple-800 tracking-wider mt-1">
              {completedBookingCode}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 space-y-1.5 text-left max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-gray-400">Khách hàng:</span>
              <span className="font-semibold text-gray-800">{draft.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Photographer:</span>
              <span className="font-semibold text-gray-800">{draft.photographerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Thời gian:</span>
              <span className="font-semibold text-gray-800">{draft.date} ({draft.timeSlot})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Địa điểm:</span>
              <span className="font-semibold text-gray-800">{draft.locationProvince}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-1.5 font-bold">
              <span>Đã thanh toán cọc:</span>
              <span className="text-brand-pink-600">{formatCurrency(payableNow)}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/check-photo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.checkout.btnViewGallery}</span>
            </Link>
            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold text-brand-purple-900 bg-white border border-purple-200 hover:bg-purple-50 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-brand-purple-600" />
              <span>{t.checkout.btnChatWithStudio}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

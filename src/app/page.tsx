'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { PhotographerCard } from '@/components/PhotographerCard';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  Zap,
  CreditCard,
  Download,
  Star
} from 'lucide-react';

export default function HomePage() {
  const { t, photographers, travelFees, formatCurrency } = useApp();
  const router = useRouter();

  // Quick Hero Search state
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPhotographers = photographers.filter(p => p.featured).slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/photographers?style=${encodeURIComponent(selectedStyle)}&province=${encodeURIComponent(selectedProvince)}&q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* ==========================================================================
           1. HERO SECTION (Gradient Tím - Hồng, Soft Lavender, Glowing Shadows)
           ========================================================================== */}
      <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Ambient Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-brand-purple-400/20 via-brand-pink-400/20 to-purple-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-pink-300/15 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-purple-100/80 to-brand-pink-100/80 border border-purple-200/60 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-brand-purple-700 animate-pulse" />
              <span className="text-xs font-semibold text-brand-purple-900 tracking-wide">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              {t.hero.titleLine1} <br />
              <span className="text-gradient">
                {t.hero.titleGradient}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              {t.hero.subtext}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-brand hover:opacity-95 shadow-brand-glow hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.hero.ctaBook}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/photographers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-brand-purple-900 bg-white hover:bg-brand-lavender-50 border border-purple-200/80 shadow-soft transition-all duration-300 active:scale-95"
              >
                <Search className="w-4 h-4 text-brand-purple-600" />
                <span>{t.hero.ctaFind}</span>
              </Link>
            </div>
          </div>

          {/* Quick Search Floating Box */}
          <div className="mt-12 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-purple-100 shadow-xl shadow-purple-500/5">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Style selector */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider pl-1">
                  Phong Cách
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-100/80 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                >
                  <option value="all">Tất cả phong cách</option>
                  <option value="Fashion & Editorial">Fashion & Editorial</option>
                  <option value="Ký Sự Cưới">Ký Sự Cưới & Romance</option>
                  <option value="Chân Dung Nghệ Thuật">Chân Dung Nghệ Thuật</option>
                  <option value="Concept & Nàng Thơ">Concept & Nàng Thơ</option>
                  <option value="Đường Phố & Film">Đường Phố & Film Noir</option>
                  <option value="Lookbook Thương Hiệu">Lookbook Thương Hiệu</option>
                </select>
              </div>

              {/* Province selector */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider pl-1">
                  Địa Điểm Chụp
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-100/80 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                >
                  <option value="">Toàn quốc (63 tỉnh)</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (0 ₫)</option>
                  <option value="Lâm Đồng (Đà Lạt / Bảo Lộc)">Đà Lạt (1.800.000 ₫)</option>
                  <option value="Bà Rịa - Vũng Tàu">Vũng Tàu (800.000 ₫)</option>
                  <option value="Đà Nẵng">Đà Nẵng (2.500.000 ₫)</option>
                  <option value="Hà Nội">Hà Nội (3.500.000 ₫)</option>
                  <option value="Khánh Hòa (Nha Trang / Cam Ranh)">Nha Trang (2.000.000 ₫)</option>
                  <option value="Phú Quốc (Kiên Giang)">Phú Quốc (2.200.000 ₫)</option>
                </select>
              </div>

              {/* Keyword input */}
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider pl-1">
                  Tên Photo / Thiết bị
                </label>
                <input
                  type="text"
                  placeholder="Quốc Vinh, Leica, Sony..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-100/80 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              {/* Search submit */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs text-white bg-gradient-brand hover:opacity-95 shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-1.5 h-[42px]"
                >
                  <Search className="w-4 h-4" />
                  <span>Tìm Kiếm Ngay</span>
                </button>
              </div>
            </form>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-purple-100/80">
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-purple-900">8+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                {t.hero.statsExperience}
              </div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-pink-600">350+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                {t.hero.statsProjects}
              </div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-purple-900">5.0 ★</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                {t.hero.statsRating}
              </div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-brand-pink-600">100%</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">
                {t.hero.statsGuarantee}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           2. FEATURED PHOTOGRAPHERS SHOWCASE
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Gương Mặt Nghệ Thuật</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Photographer Tiêu Biểu Tuần Này
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Những nghệ sĩ có lượt đặt lịch cao nhất và đạt chứng chỉ Color Grading quốc tế
            </p>
          </div>
          <Link
            href="/photographers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple-700 hover:text-brand-pink-600 transition-colors group"
          >
            <span>Xem tất cả {photographers.length} nhiếp ảnh gia</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPhotographers.map((photo) => (
            <PhotographerCard key={photo.id} photographer={photo} />
          ))}
        </div>
      </section>

      {/* ==========================================================================
           3. TRAVEL FEE TRANSPARENCY BANNER (Key Requirement Highlight)
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-purple-900 via-purple-900 to-brand-pink-900 text-white p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Minh Bạch Tuyệt Đối • Không Phí Ẩn</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Tự Động Tính Phụ Phí Di Chuyển Chuẩn Xác 63 Tỉnh Thành
              </h3>
              <p className="text-sm text-purple-100 leading-relaxed font-normal">
                Bất kể bạn muốn chụp tại trung tâm Sài Gòn (miễn phí), đồi thông Đà Lạt, bãi biển Nha Trang hay mùa lúa Sa Pa, hệ thống sẽ tự động đối chiếu khoảng cách và hiển thị phụ phí di chuyển chi tiết ngay tại trang thanh toán.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium bg-black/25 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Nội thành Sài Gòn: 0 ₫</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium bg-black/25 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Đà Lạt: 1.800.000 ₫ (Bao gồm xe đưa đón)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium bg-black/25 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Hà Nội: 3.500.000 ₫ (Vé máy bay khứ hồi)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center space-y-4">
              <h4 className="font-bold text-base text-white">Tra Cứu Bảng Phí Di Chuyển</h4>
              <p className="text-xs text-purple-200">
                Xem toàn bộ biểu phí chuẩn xác áp dụng cho {travelFees.length} tỉnh thành
              </p>
              <Link
                href="/pricing#travel-fees"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-white text-brand-purple-900 font-bold text-xs hover:bg-purple-50 transition-colors shadow-lg"
              >
                <span>Xem Bảng Phí Chi Tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           4. HOW IT WORKS (Quy Trình 4 Bước)
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-brand-pink-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quy Trình Trơn Tru</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Chỉ 4 Bước Đến Bộ Ảnh Trong Mơ
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Trải nghiệm đặt lịch nhiếp ảnh chuyên nghiệp chưa bao giờ dễ dàng và an tâm đến thế
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/80 shadow-soft hover:shadow-card transition-all relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple-100 text-brand-purple-700 flex items-center justify-center font-extrabold text-lg mb-4">
              01
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">Tra Cứu & Chọn Photo</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Duyệt qua danh sách nhiếp ảnh gia với profile minh bạch, portfolio ảnh thực tế và đánh giá từ khách hàng trước.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/80 shadow-soft hover:shadow-card transition-all relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-700 flex items-center justify-center font-extrabold text-lg mb-4">
              02
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">Chọn Lịch & Địa Điểm</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Chọn ngày, giờ và tỉnh thành chụp. Hệ thống tự động tính toán phụ phí di chuyển chuẩn xác ngay lập tức.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/80 shadow-soft hover:shadow-card transition-all relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple-100 text-brand-purple-700 flex items-center justify-center font-extrabold text-lg mb-4">
              03
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">Đặt Cọc 30% Linh Hoạt</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Thanh toán cọc 30% qua VietQR, MoMo hoặc VNPAY để giữ lịch chắc chắn. 70% còn lại thanh toán sau khi chụp.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/80 shadow-soft hover:shadow-card transition-all relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-pink-100 text-brand-pink-700 flex items-center justify-center font-extrabold text-lg mb-4">
              04
            </div>
            <h3 className="font-bold text-base text-gray-900 mb-2">Check & Tải Ảnh Online</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sử dụng mã booking độc quyền để vào phòng ảnh riêng, xem trước, chọn ảnh yêu thích và tải xuống file chất lượng gốc.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           5. TESTIMONIALS
           ========================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-lavender-50 via-white to-pink-50/50 p-8 sm:p-12 rounded-4xl border border-purple-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Cảm Nhận Từ Những Khách Hàng Tinh Tế
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Hơn 350+ buổi chụp thành công trên khắp Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-400 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "Thực sự bất ngờ vì website tính phí di chuyển đi Đà Lạt rất chuẩn xác. Không hề có phụ phí vô lý nào khi thanh toán. Anh Hải Đăng chụp siêu có tâm!"
              </p>
              <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-purple-200 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Mai Lan" fill className="object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900">Thảo Linh & Hoàng Nam</h5>
                  <span className="text-[10px] text-gray-400">Gói Ký Sự Cưới Đà Lạt</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-400 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "Mục Check ảnh bằng mã booking cực kỳ tiện lợi. Cả ekip thương hiệu của mình vào chọn ảnh và tải file RAW nhanh chóng. Rất chuyên nghiệp!"
              </p>
              <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-pink-200 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Minh Quan" fill className="object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900">Minh Quân</h5>
                  <span className="text-[10px] text-gray-400">Creative Director, Lookbook FW</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-100/60 shadow-sm space-y-3">
              <div className="flex gap-1 text-amber-400 text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "Chức năng chat 1-1 trực tiếp giải đáp mọi băn khoăn về trang phục và góc máy. Mình cọc trước 30% yên tâm tuyệt đối."
              </p>
              <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-purple-200 overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" alt="Hoang Yen" fill className="object-cover" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900">Hoàng Yến</h5>
                  <span className="text-[10px] text-gray-400">Gói Chân Dung Signature</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           6. FINAL CALL TO ACTION
           ========================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Sẵn Sàng Cho Khung Hình Xuất Thần Tiếp Theo?
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Chọn nhiếp ảnh gia yêu thích, kiểm tra lịch trống và nhận ưu đãi tặng thêm 05 ảnh Master Retouch khi đặt lịch trong tháng này.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Đặt Lịch Chụp Ngay</span>
          </Link>
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-brand-purple-900 bg-white border border-purple-200 hover:bg-purple-50 transition-all"
          >
            <span>Nhắn Tin Tư Vấn Riêng</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Award, 
  HelpCircle,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const faqs = [
    {
      q: 'Phụ phí di chuyển được tính như thế nào khi chụp ngoài TP. Hồ Chí Minh?',
      a: 'Hệ thống của DINH STUDIO tự động tính toán phụ phí theo biểu phí niêm yết chuẩn cho từng tỉnh thành (bao gồm chi phí đi lại, vé máy bay/xe đưa đón và vận chuyển thiết bị của ekip). Chi phí này được hiển thị minh bạch 100% tại bước thanh toán và cam kết không phát sinh bất kỳ khoản phí ngoài nào.',
    },
    {
      q: 'Chính sách đặt cọc và thanh toán ra sao?',
      a: 'Khách hàng có thể lựa chọn đặt cọc 30% để giữ lịch chắc chắn với photographer (70% còn lại thanh toán vào ngày chụp), hoặc thanh toán toàn bộ 100% để nhận thêm ưu đãi 05 ảnh Master Retouch và khung ảnh pha lê cao cấp.',
    },
    {
      q: 'Sau bao lâu thì tôi nhận được ảnh chụp hoàn thiện?',
      a: 'Toàn bộ file gốc sẽ được cập nhật lên hệ thống trong vòng 24 - 48 giờ sau buổi chụp. Các ảnh chọn Retouch kỹ thuật số chuyên sâu sẽ được bàn giao đầy đủ trong vòng 5 - 7 ngày làm việc qua phòng ảnh trực tuyến.',
    },
    {
      q: 'Tôi có thể đổi lịch chụp nếu thời tiết xấu hoặc có việc đột xuất không?',
      a: 'Hoàn toàn được! DINH STUDIO hỗ trợ dời lịch miễn phí trước 48 giờ nếu gặp điều kiện thời tiết bất khả kháng hoặc kế hoạch cá nhân thay đổi.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-brand-purple-800 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5" />
          <span>Về DINH STUDIO</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Nghệ Thuật Kể Chuyện Bằng <span className="text-gradient">Ánh Sáng & Cảm Xúc</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
          Được thành lập bởi nghệ sĩ thị giác Quốc Vinh, DINH STUDIO không chỉ là một studio chụp ảnh, mà là một nền tảng tiên phong kết nối những tâm hồn yêu cái đẹp với các nhiếp ảnh gia hàng đầu Việt Nam.
        </p>
      </div>

      {/* Story & Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            Mỗi Khoảnh Khắc Đều Xứng Đáng Trở Thành Tác Phẩm Nghệ Thuật
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Chúng tôi tin rằng nhiếp ảnh không chỉ là việc bắt trọn hình ảnh vật lý, mà là ghi lại năng lượng, thần thái và nhịp đập cảm xúc của chủ thể. Dù là một chiến dịch thời trang Haute Couture, một bộ ảnh chân dung khẳng định vị thế, hay những khoảnh khắc rơi nước mắt trong lễ cưới, ekip luôn dốc trọn tâm huyết cho từng khung hình.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <Award className="w-5 h-5 text-brand-purple-600 mb-2" />
              <div className="font-bold text-sm text-gray-900">Chuẩn Mực Vogue</div>
              <div className="text-[11px] text-gray-500 mt-1">Được đăng tải trên các ấn phẩm thời trang hàng đầu</div>
            </div>
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <ShieldCheck className="w-5 h-5 text-brand-pink-600 mb-2" />
              <div className="font-bold text-sm text-gray-900">Minh Bạch Tuyệt Đối</div>
              <div className="text-[11px] text-gray-500 mt-1">Biểu phí phụ thu di chuyển tự động và bảo hành màu ảnh</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-100">
            <Image
              src="/images/photographer.jpg"
              alt="Quoc Vinh and Studio Team"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-purple-100 shadow-xl hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-bold">
              ★
            </div>
            <div>
              <div className="font-extrabold text-xs text-gray-900">Quoc Vinh Visual Artist</div>
              <div className="text-[10px] text-gray-400">Founder & Lead Photographer</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Giải đáp mọi thắc mắc của bạn về quy trình booking và giao ảnh
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-purple-100/80 bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-brand-purple-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-purple-600' : 'text-gray-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-purple-50 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form & Studio Locations */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-soft p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-pink-600 uppercase tracking-wider">Liên Hệ Với Chúng Tôi</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">Kết Nối Trực Tiếp</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Đội ngũ sáng tạo và tư vấn viên luôn sẵn sàng lắng nghe mọi ý tưởng độc đáo của bạn.
              </p>
            </div>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-pink-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900">Studio Trụ Sở Sài Gòn</div>
                  <div className="text-gray-500 mt-0.5">Khu Biệt Thự Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900">Hotline / Zalo</div>
                  <a href="tel:0988776655" className="text-brand-purple-700 font-semibold hover:underline">
                    +84 (0) 988 776 655
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-purple-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-gray-900">Email Hợp Tác</div>
                  <a href="mailto:toquocvinhmc@gmail.com" className="text-brand-purple-700 font-semibold hover:underline">
                    toquocvinhmc@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {contactSubmitted ? (
              <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="font-bold text-base text-green-900">Đã Nhận Yêu Cầu Của Bạn!</h4>
                <p className="text-xs text-green-700">
                  Chuyên viên DINH STUDIO sẽ liên hệ lại qua Số điện thoại / Zalo trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Họ và Tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Số Điện Thoại / Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="090 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Nội Dung Cần Trao Đổi *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Mô tả buổi chụp mong muốn hoặc dịch vụ bạn quan tâm..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all"
                >
                  Gửi Tin Nhắn Cho Studio
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

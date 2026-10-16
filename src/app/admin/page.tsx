'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { BookingStatus, TravelFee, Photographer, DeliveredGallery } from '@/types';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  Car, 
  ImageIcon, 
  MessageSquare, 
  BarChart3, 
  DollarSign, 
  Edit2, 
  Trash2, 
  Plus, 
  Check, 
  Lock, 
  Search, 
  Eye, 
  Sparkles,
  ArrowRight,
  LogOut,
  AlertCircle
} from 'lucide-react';

export default function AdminPage() {
  const { 
    t, 
    bookings, 
    updateBookingStatus, 
    travelFees, 
    updateTravelFee, 
    addTravelFee, 
    deleteTravelFee, 
    photographers, 
    addPhotographer, 
    deletePhotographer, 
    galleries, 
    saveDeliveredGallery, 
    chatMessages, 
    adminReplyMessage, 
    formatCurrency 
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for convenient demo review
  const [adminEmail, setAdminEmail] = useState('admin@dinhteam.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'travel-fees' | 'photographers' | 'gallery' | 'chat'>('overview');

  // Travel Fee Editing State
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [editFeeAmount, setEditFeeAmount] = useState<number>(0);
  const [editFeeNotes, setEditFeeNotes] = useState<string>('');
  const [searchFeeText, setSearchFeeText] = useState<string>('');
  const [showAddFeeModal, setShowAddFeeModal] = useState<boolean>(false);
  const [newProvinceName, setNewProvinceName] = useState<string>('');
  const [newProvinceFee, setNewProvinceFee] = useState<number>(1000000);
  const [newProvinceRegion, setNewProvinceRegion] = useState<'Miền Nam' | 'Miền Trung' | 'Miền Bắc'>('Miền Nam');
  const [feeSaveSuccessToast, setFeeSaveSuccessToast] = useState<string | null>(null);

  // Gallery Upload State
  const [galleryBookingCode, setGalleryBookingCode] = useState('DINH-8821');
  const [galleryClientName, setGalleryClientName] = useState('Trần Thảo Linh');
  const [galleryPhotoTitle, setGalleryPhotoTitle] = useState('Bình Minh Hoàng Hôn Mới');
  const [galleryPhotoUrl, setGalleryPhotoUrl] = useState('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80');
  const [gallerySuccessToast, setGallerySuccessToast] = useState<string | null>(null);

  // Chat Reply State
  const [replyText, setReplyText] = useState('');
  const [replyAsRole, setReplyAsRole] = useState<'admin' | 'photographer'>('admin');

  // Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'deposit_paid' ? b.depositAmount : b.totalAmount), 0);
  const activeBookingsCount = bookings.filter(b => b.bookingStatus !== 'cancelled').length;

  // Handle Travel Fee Edit Save
  const handleSaveTravelFee = (id: string) => {
    updateTravelFee(id, Number(editFeeAmount), editFeeNotes);
    setEditingFeeId(null);
    setFeeSaveSuccessToast('Đã cập nhật phụ phí thành công! Mức phí mới đã được áp dụng trực tiếp vào trang thanh toán của khách.');
    setTimeout(() => setFeeSaveSuccessToast(null), 4000);
  };

  // Handle Add New Destination Fee
  const handleAddNewFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvinceName.trim()) return;

    addTravelFee({
      id: `tf-${Date.now()}`,
      province: newProvinceName.trim(),
      region: newProvinceRegion,
      fee: Number(newProvinceFee),
      estimatedHours: 'Linh hoạt',
      notes: 'Thêm mới từ quản trị viên',
    });

    setShowAddFeeModal(false);
    setNewProvinceName('');
    setFeeSaveSuccessToast(`Đã thêm thành công địa điểm "${newProvinceName}".`);
    setTimeout(() => setFeeSaveSuccessToast(null), 4000);
  };

  // Handle Add Photo to Gallery
  const handleAddPhotoToGallery = (e: React.FormEvent) => {
    e.preventDefault();
    const code = galleryBookingCode.trim().toUpperCase();
    const existing = galleries[code] || {
      bookingCode: code,
      clientName: galleryClientName,
      photographerName: 'Quốc Vinh',
      shootDate: new Date().toLocaleDateString('vi-VN'),
      location: 'Studio / Ngoại cảnh',
      totalPhotos: 0,
      coverUrl: galleryPhotoUrl,
      photos: [],
    };

    const newPhoto = {
      id: `p-${Date.now()}`,
      url: galleryPhotoUrl,
      title: galleryPhotoTitle,
      category: 'Highlights',
      highResUrl: galleryPhotoUrl,
    };

    saveDeliveredGallery({
      ...existing,
      totalPhotos: existing.photos.length + 1,
      photos: [newPhoto, ...existing.photos],
    });

    setGallerySuccessToast(`Đã tải ảnh lên bộ sưu tập cho mã ${code}! Khách có thể vào trang Check ảnh để xem ngay.`);
    setTimeout(() => setGallerySuccessToast(null), 4000);
  };

  // Handle Admin Reply in Chat
  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    adminReplyMessage(replyText.trim(), replyAsRole);
    setReplyText('');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-purple-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-brand text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Đăng Nhập Quản Trị Studio</h2>
          <p className="text-xs text-gray-500">Truy cập Dashboard để quản lý booking, phí di chuyển và phòng chat</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email quản trị</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Mật khẩu</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-opacity"
          >
            Đăng Nhập Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-purple-600" />
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {t.admin.dashboard}
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
              Live CMS
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Đang đăng nhập với quyền Quản trị viên cấp cao • DINH STUDIO HQ
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 scrollbar-none">
        {[
          { id: 'overview', label: t.admin.tabOverview, icon: BarChart3 },
          { id: 'bookings', label: t.admin.tabBookings, icon: Calendar, badge: bookings.length },
          { id: 'travel-fees', label: t.admin.tabTravelFees, icon: Car, highlight: true },
          { id: 'photographers', label: t.admin.tabPhotographers, icon: Users },
          { id: 'gallery', label: t.admin.tabGallery, icon: ImageIcon },
          { id: 'chat', label: t.admin.tabChat, icon: MessageSquare, badge: chatMessages.length },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                isSelected
                  ? 'bg-gradient-brand text-white shadow-brand-glow'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-purple-50/80 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isSelected ? 'bg-white text-brand-purple-900' : 'bg-gray-100 text-gray-700'
                }`}>
                  {tab.badge}
                </span>
              )}
              {tab.highlight && !isSelected && (
                <span className="w-2 h-2 rounded-full bg-brand-pink-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* ==========================================================================
           TAB 1: OVERVIEW ANALYTICS
           ========================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-soft">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{t.admin.totalRevenue}</span>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-extrabold text-brand-purple-900">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-[11px] text-green-600 font-semibold mt-1">
                ↑ +24% so với tháng trước
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-soft">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{t.admin.totalBookings}</span>
                <Calendar className="w-5 h-5 text-brand-purple-600" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">
                {bookings.length} đơn
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {activeBookingsCount} đơn đang hoạt động
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-soft">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{t.admin.activeChats}</span>
                <MessageSquare className="w-5 h-5 text-brand-pink-500" />
              </div>
              <div className="text-2xl font-extrabold text-brand-pink-600">
                {chatMessages.length} tin nhắn
              </div>
              <div className="text-[11px] text-green-600 font-semibold mt-1">
                Thời gian phản hồi TB: 1.8 phút
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-soft">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">{t.admin.activePhotographers}</span>
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900">
                {photographers.length} nghệ sĩ
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Tất cả đã xác minh hồ sơ
              </div>
            </div>
          </div>

          {/* Recent Bookings Quick Table */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-soft space-y-4">
            <h3 className="font-extrabold text-base text-gray-900">
              Đơn Đặt Lịch Mới Nhất Cần Theo Dõi
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-purple-50/70 text-gray-600 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Mã Đơn</th>
                    <th className="p-3">Khách Hàng</th>
                    <th className="p-3">Photographer</th>
                    <th className="p-3">Địa Điểm (Phí Di Chuyển)</th>
                    <th className="p-3">Tổng Tiền</th>
                    <th className="p-3">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-purple-50/30">
                      <td className="p-3 font-mono font-bold text-brand-purple-700">{b.code}</td>
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{b.clientName}</div>
                        <div className="text-[10px] text-gray-400">{b.clientPhone}</div>
                      </td>
                      <td className="p-3 font-medium text-gray-800">{b.photographerName}</td>
                      <td className="p-3">
                        <div>{b.locationProvince}</div>
                        <div className="text-[10px] font-semibold text-brand-purple-600">
                          {b.travelFee === 0 ? '0 ₫ (Nội thành)' : `+ ${formatCurrency(b.travelFee)}`}
                        </div>
                      </td>
                      <td className="p-3 font-bold text-gray-900">{formatCurrency(b.totalAmount)}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          b.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                          b.bookingStatus === 'shooting' ? 'bg-purple-100 text-brand-purple-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
           TAB 2: BOOKINGS MANAGEMENT
           ========================================================================== */}
      {activeTab === 'bookings' && (
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-soft space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900">
              Quản Lý Chi Tiết Tất Cả Đơn Đặt Lịch ({bookings.length})
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50/70 text-gray-700 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Mã Booking</th>
                  <th className="p-3.5">Khách Hàng</th>
                  <th className="p-3.5">Photographer</th>
                  <th className="p-3.5">Ngày & Khung Giờ</th>
                  <th className="p-3.5">Địa Điểm & Phụ Phí</th>
                  <th className="p-3.5">Tài Chính</th>
                  <th className="p-3.5">Cập Nhật Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-purple-50/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-sm text-brand-purple-800">
                      {b.code}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-gray-900">{b.clientName}</div>
                      <div className="text-[11px] text-gray-500">{b.clientPhone}</div>
                      <div className="text-[10px] text-gray-400">{b.clientEmail}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-gray-800">{b.photographerName}</div>
                      <div className="text-[10px] text-brand-purple-600">{b.serviceType}</div>
                    </td>
                    <td className="p-3.5 text-gray-600">
                      <div className="font-semibold">{b.date}</div>
                      <div className="text-[10px] text-gray-400">{b.timeSlot}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-gray-800">{b.locationProvince}</div>
                      <div className="text-[10px] font-bold text-brand-pink-600">
                        Phí di chuyển: {b.travelFee === 0 ? '0 ₫ (Miễn phí)' : formatCurrency(b.travelFee)}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-extrabold text-gray-900">{formatCurrency(b.totalAmount)}</div>
                      <div className={`text-[10px] font-bold ${
                        b.paymentStatus === 'fully_paid' ? 'text-green-600' : 'text-amber-600'
                      }`}>
                        {b.paymentStatus === 'fully_paid' ? 'Đã trả 100%' : `Đã cọc: ${formatCurrency(b.depositAmount)}`}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                        className="px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                      >
                        <option value="pending">Chờ duyệt (Pending)</option>
                        <option value="confirmed">Đã cọc / Xác nhận</option>
                        <option value="shooting">Đang đi chụp (Shooting)</option>
                        <option value="editing">Đang hậu kỳ (Editing)</option>
                        <option value="delivered">Đã giao ảnh (Delivered)</option>
                        <option value="cancelled">Đã hủy (Cancelled)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================================================
           TAB 3: QUẢN LÝ PHÍ DI CHUYỂN (Key Requirement)
           ========================================================================== */}
      {activeTab === 'travel-fees' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6 animate-in fade-in">
          {/* Header Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-brand-lavender-100 to-pink-100 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-brand-purple-700" />
                <h3 className="font-extrabold text-sm sm:text-base text-brand-purple-950">
                  {t.admin.tabTravelFees} (Đồng Bộ Thanh Toán Tự Động)
                </h3>
              </div>
              <p className="text-xs text-brand-purple-800 leading-relaxed max-w-2xl">
                {t.admin.travelFeeNotice}
              </p>
            </div>

            <button
              onClick={() => setShowAddFeeModal(true)}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-sm hover:opacity-95 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.btnAddFee}</span>
            </button>
          </div>

          {feeSaveSuccessToast && (
            <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" />
              <span>{feeSaveSuccessToast}</span>
            </div>
          )}

          {/* Search Box */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tỉnh thành để chỉnh sửa phí..."
              value={searchFeeText}
              onChange={(e) => setSearchFeeText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
            />
          </div>

          {/* Travel Fee Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50/80 text-gray-700 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3.5">Tỉnh / Thành Phố</th>
                  <th className="p-3.5">Khu Vực</th>
                  <th className="p-3.5">Mức Phí Di Chuyển Hiện Tại</th>
                  <th className="p-3.5">Ghi Chú Ekip</th>
                  <th className="p-3.5 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {travelFees
                  .filter(tf => !searchFeeText.trim() || tf.province.toLowerCase().includes(searchFeeText.toLowerCase()))
                  .map((tf) => {
                    const isEditing = editingFeeId === tf.id;
                    return (
                      <tr key={tf.id} className="hover:bg-purple-50/40 transition-colors">
                        <td className="p-3.5 font-bold text-gray-900">
                          {tf.province}
                        </td>
                        <td className="p-3.5 text-gray-500">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px]">
                            {tf.region}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {isEditing ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                step="50000"
                                value={editFeeAmount}
                                onChange={(e) => setEditFeeAmount(Number(e.target.value))}
                                className="w-36 px-2.5 py-1.5 rounded-xl border border-brand-purple-400 text-xs font-bold bg-white focus:outline-none"
                              />
                              <span className="text-xs font-bold text-gray-500">₫</span>
                            </div>
                          ) : (
                            <span className={`font-extrabold text-sm ${tf.fee === 0 ? 'text-green-600' : 'text-brand-purple-800'}`}>
                              {tf.fee === 0 ? '0 ₫ (Miễn phí nội thành)' : formatCurrency(tf.fee)}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-gray-500">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editFeeNotes}
                              onChange={(e) => setEditFeeNotes(e.target.value)}
                              placeholder="Ghi chú đưa đón, xe, vé..."
                              className="w-full px-2.5 py-1.5 rounded-xl border border-brand-purple-400 text-xs bg-white focus:outline-none"
                            />
                          ) : (
                            <span>{tf.notes || '—'}</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleSaveTravelFee(tf.id)}
                                className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Lưu Phí</span>
                              </button>
                              <button
                                onClick={() => setEditingFeeId(null)}
                                className="px-2.5 py-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-[11px]"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingFeeId(tf.id);
                                  setEditFeeAmount(tf.fee);
                                  setEditFeeNotes(tf.notes || '');
                                }}
                                className="p-2 rounded-xl text-brand-purple-700 hover:bg-purple-100 transition-colors"
                                title="Sửa biểu phí này"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTravelFee(tf.id)}
                                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                title="Xóa địa điểm này"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Add Travel Fee Modal */}
          {showAddFeeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-purple-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-base text-gray-900">Thêm Tỉnh Thành & Biểu Phí Mới</h4>
                  <button onClick={() => setShowAddFeeModal(false)} className="text-gray-400 hover:text-gray-700">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddNewFee} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Tên Tỉnh / Thành Phố *</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Phú Quốc, Quy Nhơn, Côn Đảo..."
                      value={newProvinceName}
                      onChange={(e) => setNewProvinceName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Khu Vực</label>
                    <select
                      value={newProvinceRegion}
                      onChange={(e) => setNewProvinceRegion(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                    >
                      <option value="Miền Nam">Miền Nam</option>
                      <option value="Miền Trung">Miền Trung</option>
                      <option value="Miền Bắc">Miền Bắc</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Mức Phụ Phí Di Chuyển (₫) *</label>
                    <input
                      type="number"
                      step="50000"
                      value={newProvinceFee}
                      onChange={(e) => setNewProvinceFee(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-brand-purple-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFeeModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-brand shadow-sm"
                    >
                      Xác Nhận Thêm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==========================================================================
           TAB 4: QUẢN LÝ PHOTOGRAPHER
           ========================================================================== */}
      {activeTab === 'photographers' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-gray-900">
              Danh Sách Hồ Sơ Photographer ({photographers.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl border border-purple-100 bg-purple-50/20 space-y-3 relative">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-brand-purple-500">
                    <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">{p.name}</h4>
                    <p className="text-[11px] text-brand-purple-700 truncate">{p.title}</p>
                    <div className="text-[10px] text-gray-400">{p.city} • {p.rating} ★</div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2">{p.bio}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="font-bold text-brand-purple-900">
                    Khởi điểm: {formatCurrency(p.startingPrice)}
                  </span>
                  <button
                    onClick={() => deletePhotographer(p.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    title="Xóa hồ sơ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================================
           TAB 5: UPLOAD GALLERY CHO KHÁCH CHECK ẢNH
           ========================================================================== */}
      {activeTab === 'gallery' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-purple-600" />
              <span>Giao Ảnh Cho Khách (Upload Gallery Deliverables)</span>
            </h3>
            <p className="text-xs text-gray-500">
              Nhập mã booking của khách để thêm ảnh hoàn thiện vào bộ sưu tập. Khách sẽ thấy ngay lập tức khi tra cứu trên trang "Check ảnh".
            </p>
          </div>

          {gallerySuccessToast && (
            <div className="p-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" />
              <span>{gallerySuccessToast}</span>
            </div>
          )}

          <form onSubmit={handleAddPhotoToGallery} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Mã Đơn Booking *</label>
                <input
                  type="text"
                  placeholder="Ví dụ: DINH-8821"
                  value={galleryBookingCode}
                  onChange={(e) => setGalleryBookingCode(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Tên Khách Hàng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trần Thảo Linh"
                  value={galleryClientName}
                  onChange={(e) => setGalleryClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Tiêu Đề Bức Ảnh</label>
              <input
                type="text"
                placeholder="Ví dụ: Hoàng Hôn Đà Lạt Master Color"
                value={galleryPhotoTitle}
                onChange={(e) => setGalleryPhotoTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Đường Dẫn Ảnh (Cloudinary / Supabase / Unsplash URL) *</label>
              <input
                type="url"
                value={galleryPhotoUrl}
                onChange={(e) => setGalleryPhotoUrl(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full text-xs font-bold text-white bg-gradient-brand shadow-brand-glow hover:opacity-95 transition-all"
              >
                Giao Ảnh Lên Bộ Sưu Tập Khách Hàng
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==========================================================================
           TAB 6: HỘP THƯ CHAT KHÁCH HÀNG (Admin Reply Suite)
           ========================================================================== */}
      {activeTab === 'chat' && (
        <div className="max-w-4xl bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-soft space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-base text-gray-900">
                Hộp Thư Khách Hàng Trực Tiếp
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Xem toàn bộ lịch sử trao đổi và phản hồi khách hàng theo thời gian thực
              </p>
            </div>
          </div>

          {/* Messages list */}
          <div className="space-y-3 max-h-96 overflow-y-auto p-4 rounded-2xl bg-gray-50 border border-gray-100">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3 text-xs">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200">
                  <Image src={msg.avatar} alt={msg.senderName} fill className="object-cover" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{msg.senderName}</span>
                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    <span className={`px-2 py-0.2 rounded-md text-[9px] font-bold ${
                      msg.sender === 'client' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-brand-purple-700'
                    }`}>
                      {msg.sender === 'client' ? 'Khách Hàng' : 'Studio'}
                    </span>
                  </div>
                  <p className="text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 inline-block shadow-2xs">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Admin Reply Form */}
          <form onSubmit={handleSendAdminReply} className="space-y-3 pt-2">
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
              <span>Phản hồi với tư cách:</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  checked={replyAsRole === 'admin'}
                  onChange={() => setReplyAsRole('admin')}
                  className="text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span>Tư Vấn Viên Studio</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  checked={replyAsRole === 'photographer'}
                  onChange={() => setReplyAsRole('photographer')}
                  className="text-brand-purple-600 focus:ring-brand-purple-500"
                />
                <span>Nhiếp Ảnh Gia Phụ Trách</span>
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập nội dung trả lời khách hàng..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-purple-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-brand shadow-sm hover:opacity-95"
              >
                Gửi Phản Hồi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

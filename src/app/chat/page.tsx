'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  CheckCheck, 
  Paperclip, 
  Phone, 
  Info,
  User
} from 'lucide-react';

export default function ChatPage() {
  const { t, chatMessages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    sendMessage(inputText.trim(), selectedImage || undefined);
    setInputText('');
    setSelectedImage(null);
  };

  const handleQuickPreset = (text: string) => {
    sendMessage(text);
  };

  const handleSimulateAttachment = () => {
    // Demo reference photo attachment
    setSelectedImage('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Chat Container Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden flex flex-col h-[78vh]">
        {/* Chat Room Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-white to-pink-50 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-brand flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-gray-900">
                  {t.chat.title}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-brand-purple-700">
                  Realtime
                </span>
              </div>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>{t.chat.statusOnline}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:0988776655"
              className="p-2.5 rounded-xl bg-purple-50 text-brand-purple-700 hover:bg-purple-100 transition-colors"
              title="Gọi hotline tư vấn trực tiếp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-brand-lavender-50/70 border-b border-purple-50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Gợi ý nhanh:
          </span>
          <button
            type="button"
            onClick={() => handleQuickPreset('Cho mình hỏi chi tiết phụ phí di chuyển đi Đà Lạt với ạ?')}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-purple-100 border border-purple-100 text-brand-purple-800 shadow-2xs shrink-0 transition-colors"
          >
            {t.chat.presetFee}
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('Studio có thể tư vấn cho mình concept chụp kỷ niệm cưới không?')}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-purple-100 border border-purple-100 text-brand-purple-800 shadow-2xs shrink-0 transition-colors"
          >
            {t.chat.presetConcept}
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('Cho mình hỏi lịch trống chụp vào cuối tuần này của anh Quốc Vinh ạ?')}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-purple-100 border border-purple-100 text-brand-purple-800 shadow-2xs shrink-0 transition-colors"
          >
            {t.chat.presetSchedule}
          </button>
        </div>

        {/* Message History Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/40">
          {chatMessages.map((msg) => {
            const isMe = msg.sender === 'client';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${
                  isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200 mt-1">
                  <Image src={msg.avatar} alt={msg.senderName} fill className="object-cover" />
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`text-[10px] font-semibold text-gray-400 ${isMe ? 'text-right' : 'text-left'}`}>
                    {msg.senderName}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-gradient-brand text-white rounded-tr-none'
                        : 'bg-white border border-purple-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text && <p>{msg.text}</p>}

                    {/* Image Attachment Preview */}
                    {msg.imageUrl && (
                      <div className="mt-2 relative rounded-xl overflow-hidden aspect-[4/3] w-full max-w-[280px] shadow-sm">
                        <Image src={msg.imageUrl} alt="Chat attachment" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-1 text-[10px] text-gray-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-brand-purple-500" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachment Pending Preview */}
        {selectedImage && (
          <div className="px-4 py-2 bg-purple-50 border-t border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-brand-purple-800">
              <ImageIcon className="w-4 h-4" />
              <span>Đã đính kèm ảnh mẫu tham khảo</span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-[11px] text-red-500 font-semibold hover:underline"
            >
              Hủy ảnh
            </button>
          </div>
        )}

        {/* Input Message Form */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-gray-100 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateAttachment}
            className="p-2.5 rounded-xl text-gray-500 hover:text-brand-purple-700 hover:bg-purple-50 transition-colors"
            title={t.chat.attachImage}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={t.chat.inputPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-purple-500 placeholder:text-gray-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim() && !selectedImage}
            className="p-3 rounded-2xl bg-gradient-brand text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-opacity disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

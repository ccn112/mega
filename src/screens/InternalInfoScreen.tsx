import React, { useState } from 'react';
import { 
  MessageSquare, 
  Newspaper, 
  Globe, 
  Users, 
  Search,
  ChevronRight,
  TrendingUp,
  Bell,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkplaceScreen } from './WorkplaceScreen';

export const InternalInfoScreen = () => {
  const [activeTab, setActiveTab] = useState<'workplace' | 'portal'>('workplace');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Tab Switcher */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('workplace')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'workplace' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Bảng tin nội bộ
          </button>
          <button 
            onClick={() => setActiveTab('portal')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'portal' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Cổng thông tin
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'workplace' ? (
            <motion.div 
              key="workplace"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="h-full"
            >
              <WorkplaceScreen />
            </motion.div>
          ) : (
            <motion.div 
              key="portal"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-4 space-y-6 pb-24"
            >
              {/* Search Portal */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm thông tin, tài liệu..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>

              {/* Featured News */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Tin nổi bật</h3>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group cursor-pointer">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://picsum.photos/seed/portal1/800/400" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      alt="News"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Thông báo tập đoàn</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                      Tân Á Đại Thành công bố chiến lược phát triển bền vững giai đoạn 2025-2030
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">22 Tháng 2, 2026 • 1,240 lượt xem</p>
                  </div>
                </div>
              </section>

              {/* Categories */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Chuyên mục</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Văn hóa doanh nghiệp', icon: Users, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Tin tức thị trường', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Quy trình & Quy định', icon: Newspaper, color: 'bg-amber-50 text-amber-600' },
                    { label: 'Sự kiện nội bộ', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
                  ].map((cat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3 hover:border-brand-blue/30 transition-all cursor-pointer">
                      <div className={`size-10 rounded-lg ${cat.color} flex items-center justify-center`}>
                        <cat.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 leading-tight">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Updates */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Cập nhật mới</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Thay đổi giờ làm việc mùa hè', time: '1 ngày trước' },
                    { title: 'Hướng dẫn sử dụng hệ thống ERP mới', time: '2 ngày trước' },
                    { title: 'Danh sách nhân viên xuất sắc tháng 1', time: '3 ngày trước' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-brand-blue" />
                        <span className="text-xs font-medium text-slate-700 group-hover:text-brand-blue transition-colors">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

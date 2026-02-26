import React from 'react';
import { 
  Plus, 
  CheckCircle2, 
  PenTool, 
  ChevronRight, 
  FileText, 
  History, 
  CreditCard, 
  Users, 
  Clock,
  TrendingUp,
  Globe,
  Target,
  Newspaper,
  Calendar,
  UserMinus,
  Plane,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeScreen = ({ 
  userRole,
  onShowDashboard,
  onShowProposal,
  onShowApproval,
  onShowSignature
}: { 
  userRole: string | null,
  onShowDashboard: () => void, 
  onShowProposal: () => void,
  onShowApproval: () => void,
  onShowSignature: () => void,
  key?: string 
}) => {
  const isBOD = userRole === 'HĐQT' || userRole === 'Ban TGĐ & QL';
  const isHR = userRole === 'Nhân sự';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24 space-y-8"
    >
      <section className="px-4 pt-6 pb-2">
        <h2 className="text-xl font-black text-slate-900">
          Chào buổi sáng, {userRole || 'Thành viên'}
        </h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">
          {isBOD 
            ? 'Hệ thống đã sẵn sàng với các báo cáo chiến lược mới nhất.' 
            : 'Chúc bạn một ngày làm việc hiệu quả và năng động.'}
        </p>
      </section>

      {/* Market & Strategy Quick View - Only for BOD */}
      {isBOD && (
        <section className="px-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { label: 'Giá thép HRC', val: '$540.2', change: '+1.2%', icon: TrendingUp, color: 'text-brand-blue bg-blue-50' },
              { label: 'Tỷ giá USD/VND', val: '25,420', change: '-0.05%', icon: Globe, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Mục tiêu Meyland', val: '90.4%', change: 'On Track', icon: Target, color: 'text-brand-gold bg-orange-50' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm min-w-[160px] flex flex-col gap-2">
                <div className={`size-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-slate-900">{item.val}</span>
                    <span className={`text-[8px] font-bold ${item.change.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>{item.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tiện ích nhanh</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Tờ trình', icon: FileText, color: 'bg-blue-50 text-blue-600', action: onShowProposal },
            { label: 'Phê duyệt', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600', action: onShowApproval },
            { label: 'Ký số', icon: PenTool, color: 'bg-purple-50 text-purple-600', action: onShowSignature },
            { label: 'Lịch họp', icon: Calendar, color: 'bg-amber-50 text-amber-600', action: () => {} },
            { label: 'Nghỉ phép', icon: UserMinus, color: 'bg-pink-50 text-pink-600', action: () => {} },
            { label: 'Công tác', icon: Plane, color: 'bg-indigo-50 text-indigo-600', action: () => {} },
            { label: 'Thanh toán', icon: CreditCard, color: 'bg-cyan-50 text-cyan-600', action: () => {} },
            { label: 'Thêm...', icon: MoreHorizontal, color: 'bg-slate-50 text-slate-600', action: () => {} },
          ].map((item, i) => (
            <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 group">
              <div className={`size-12 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <item.icon size={22} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Workplace Highlight */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Bảng tin Workplace</h3>
          <button className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Xem tất cả</button>
        </div>
        <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center gap-3">
            <img src="https://picsum.photos/seed/ceo/100/100" className="size-8 rounded-full" alt="CEO" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Nguyễn Văn A <span className="text-[10px] font-medium text-slate-400 ml-1">• 1 giờ trước</span></h4>
              <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">Tổng Giám Đốc</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              Chúc mừng đội ngũ dự án Meyhomes đã hoàn thành vượt tiến độ giai đoạn 2! Đây là nỗ lực tuyệt vời của tất cả mọi người. 🚀
            </p>
          </div>
          <div className="bg-slate-50 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <ThumbsUp size={12} /> 45
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <MessageSquare size={12} /> 12
              </div>
            </div>
            <button className="text-[10px] font-bold text-brand-blue">Tương tác ngay</button>
          </div>
        </div>
      </section>

      {/* BI Dashboard - Only for BOD */}
      {isBOD && (
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Báo cáo chiến lược</h3>
            <button onClick={onShowDashboard} className="text-brand-blue text-[10px] font-black uppercase tracking-widest flex items-center">
              Xem BI <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doanh thu Tập đoàn</p>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">12,450 Tỷ</h4>
                </div>
                <span className="text-[10px] bg-blue-50 text-brand-blue px-3 py-1 rounded-full font-black uppercase tracking-widest">Tháng này</span>
              </div>
              <div className="h-32 w-full flex items-end gap-2 px-2">
                {[20, 40, 100, 75, 50, 65, 85, 60, 95, 110, 130, 120].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-lg ${i === 10 ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-slate-100'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HR Stats - Only for HR */}
      {isHR && (
        <section className="px-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Thống kê nhân sự</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng nhân sự</p>
              <p className="text-xl font-black text-slate-900 mt-1">2,450</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">+12 tháng này</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tỷ lệ nghỉ việc</p>
              <p className="text-xl font-black text-slate-900 mt-1">1.2%</p>
              <p className="text-[10px] text-brand-blue font-bold mt-1">Trong ngưỡng an toàn</p>
            </div>
          </div>
        </section>
      )}

      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Tin tức & Thông cáo</h3>
          <button className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center">
            Tất cả <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Tân Á Đại Thành nhận giải thưởng Top 10 Doanh nghiệp tiêu biểu', source: 'Phòng Truyền thông', time: '1 giờ trước', icon: Newspaper },
            { title: 'Bản tin thị trường Bất động sản nghỉ dưỡng Phú Quốc Q1/2024', source: 'Ban Chiến lược', time: '3 giờ trước', icon: TrendingUp },
          ].map((news, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="size-12 bg-slate-50 rounded-lg flex items-center justify-center text-brand-blue shrink-0">
                <news.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold leading-tight truncate">{news.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{news.source}</span>
                  <span className="text-[10px] text-slate-300">•</span>
                  <span className="text-[10px] text-slate-400">{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

import React from 'react';
import { 
  MapPin, 
  LogIn, 
  LogOut, 
  CreditCard, 
  Gift, 
  ChevronRight, 
  Calendar, 
  Clock,
  UserPlus,
  FileCheck,
  Heart,
  Briefcase,
  Plus,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export const HRScreen = ({ 
  userRole,
  onCheckIn, 
  onCheckOut,
  onShowPayroll, 
  onShowBenefits 
}: { 
  userRole: string | null,
  onCheckIn: () => void, 
  onCheckOut: () => void,
  onShowPayroll: () => void, 
  onShowBenefits: () => void,
  key?: string
}) => {
  const isHR = userRole === 'Nhân sự';
  const isBOD = userRole === 'HĐQT' || userRole === 'Ban TGĐ & QL';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="pb-24"
    >
      {/* Attendance Section - For everyone except maybe BOD who might not check in */}
      <section className="p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Chấm công</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-emerald-500" /> Trụ sở Tập đoàn
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-brand-blue">08:30</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thứ 4, 24 Tháng 5</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onCheckIn}
              className="flex flex-col items-center justify-center gap-2 py-5 bg-brand-blue text-white rounded-lg font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform"
            >
              <LogIn size={20} />
              <span>Vào ca</span>
            </button>
            <button 
              onClick={onCheckOut}
              className="flex flex-col items-center justify-center gap-2 py-5 bg-slate-50 text-slate-400 rounded-lg font-black uppercase text-[10px] tracking-widest border border-slate-100 active:scale-95 transition-transform"
            >
              <LogOut size={20} />
              <span>Tan ca</span>
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Tổng giờ làm: 0h 00m</span>
            <button className="text-brand-blue">Lịch sử</button>
          </div>
        </div>
      </section>

      {/* HR Management Dashboard - Only for HR Role */}
      {isHR && (
        <section className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Quản trị nhân sự</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-brand-blue" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Tuyển dụng</span>
              </div>
              <p className="text-lg font-black text-slate-900">12</p>
              <p className="text-[10px] text-slate-500">Vị trí đang mở</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Hợp đồng</span>
              </div>
              <p className="text-lg font-black text-slate-900">05</p>
              <p className="text-[10px] text-slate-500">Sắp hết hạn</p>
            </div>
          </div>
        </section>
      )}

      <section className="px-4 grid grid-cols-2 gap-4">
        <div 
          onClick={onShowPayroll}
          className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-4 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="size-12 bg-blue-50 text-brand-blue rounded-lg flex items-center justify-center">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">Phiếu lương</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Tháng 04/2024</p>
          </div>
          <div className="mt-auto flex justify-end">
            <ChevronRight size={16} className="text-slate-200" />
          </div>
        </div>
        <div 
          onClick={onShowBenefits}
          className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-4 cursor-pointer active:scale-95 transition-transform"
        >
          <div className="size-12 bg-orange-50 text-brand-gold rounded-lg flex items-center justify-center">
            <Gift size={24} />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">Phúc lợi</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Bảo hiểm & Quà</p>
          </div>
          <div className="mt-auto flex justify-end">
            <ChevronRight size={16} className="text-slate-200" />
          </div>
        </div>
      </section>

      <section className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Đề xuất & Đơn từ</h2>
          <button className="size-8 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Nghỉ phép', meta: 'Còn lại: 10.5 ngày', icon: Calendar, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Tăng ca (OT)', meta: 'Yêu cầu OT tháng này', icon: Clock, color: 'text-purple-600 bg-purple-50' },
            { label: 'Công tác', meta: 'Lịch trình di chuyển', icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-slate-100 flex items-center justify-between group hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">{item.label}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{item.meta}</p>
                </div>
              </div>
              <button className="bg-slate-50 text-brand-blue px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 active:scale-95 transition-transform">Tạo mới</button>
            </div>
          ))}
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tiện ích nhân sự</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Đào tạo', icon: UserPlus, color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Quy định', icon: FileCheck, color: 'bg-slate-50 text-slate-600' },
            { label: 'Sức khỏe', icon: Heart, color: 'bg-rose-50 text-rose-600' },
            { label: 'Tuyển dụng', icon: Users, color: 'bg-emerald-50 text-emerald-600' },
          ].map((tool, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3 cursor-pointer active:scale-95 transition-transform">
              <div className={`size-10 rounded-lg flex items-center justify-center ${tool.color}`}>
                <tool.icon size={20} />
              </div>
              <span className="text-xs font-bold text-slate-700">{tool.label}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

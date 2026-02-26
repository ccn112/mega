import React from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  Calendar, 
  Users, 
  Briefcase, 
  FileText,
  ChevronDown,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-[70] bg-white flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900">Tạo Dự án mới</h1>
        </div>
        <button className="text-brand-blue font-bold text-sm">Lưu nháp</button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="h-40 bg-slate-100 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400">
          <Camera size={32} />
          <span className="text-xs font-bold">Thêm ảnh bìa dự án</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Tên dự án</label>
            <input 
              type="text" 
              placeholder="Nhập tên dự án..."
              className="w-full border-b border-slate-200 py-2 text-lg font-bold focus:border-brand-blue outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Lĩnh vực</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-medium">Bất động sản</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Đơn vị quản lý</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-medium">Tập đoàn</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Ngày bắt đầu</label>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-sm font-medium">Chọn ngày</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Ngày kết thúc</label>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Calendar size={14} className="text-slate-400" />
                <span className="text-sm font-medium">Chọn ngày</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Mô tả dự án</label>
            <textarea 
              placeholder="Mục tiêu, phạm vi và các thông tin quan trọng khác..."
              className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm focus:ring-2 focus:ring-brand-blue outline-none min-h-[120px]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Thành viên nòng cốt</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button className="size-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                <Plus size={20} />
              </button>
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  className="size-10 rounded-full object-cover ring-2 ring-white shrink-0"
                  src={`https://picsum.photos/seed/${i + 50}/100/100`}
                  alt="Member"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform">
          <Briefcase size={18} /> Khởi tạo dự án
        </button>
      </div>
    </motion.div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

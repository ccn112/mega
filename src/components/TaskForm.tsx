import React from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  AlertCircle,
  ChevronDown,
  Paperclip
} from 'lucide-react';
import { motion } from 'motion/react';

export const TaskForm = ({ onBack }: { onBack: () => void }) => {
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
          <h1 className="font-bold text-slate-900">Giao việc mới</h1>
        </div>
        <button className="text-brand-blue font-bold text-sm">Lưu nháp</button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Tên công việc</label>
            <input 
              type="text" 
              placeholder="Nhập tên công việc..."
              className="w-full border-b border-slate-200 py-2 text-lg font-bold focus:border-brand-blue outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Thuộc dự án</label>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-brand-blue" />
                <span className="text-sm font-medium">Nhà máy Tân Á Đại Thành - GĐ2</span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Người thực hiện</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-emerald-500" />
                  <span className="text-sm font-medium">Chọn người</span>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Độ ưu tiên</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-sm font-medium">Cao</span>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Hạn hoàn thành</label>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <Calendar size={14} className="text-slate-400" />
              <span className="text-sm font-medium">Chọn ngày & giờ</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Mô tả chi tiết</label>
            <textarea 
              placeholder="Hướng dẫn thực hiện và các yêu cầu kết quả..."
              className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm focus:ring-2 focus:ring-brand-blue outline-none min-h-[120px]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Tài liệu hướng dẫn</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-blue/40 hover:text-brand-blue transition-all cursor-pointer">
              <Paperclip size={24} />
              <span className="text-xs font-bold">Đính kèm tài liệu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform">
          <Send size={18} /> Giao việc
        </button>
      </div>
    </motion.div>
  );
};

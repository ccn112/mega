import React from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  Paperclip, 
  ChevronDown,
  FileText,
  Briefcase,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProposalForm = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 z-[70] bg-white flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900">Tạo Tờ trình mới</h1>
        </div>
        <button className="text-brand-blue font-bold text-sm">Lưu nháp</button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Tiêu đề tờ trình</label>
            <input 
              type="text" 
              placeholder="Nhập tiêu đề..."
              className="w-full border-b border-slate-200 py-2 text-lg font-bold focus:border-brand-blue outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phòng ban</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-medium">Phòng Đầu tư</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Loại tờ trình</label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                <span className="text-sm font-medium">Chi phí dự án</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Nội dung chi tiết</label>
            <textarea 
              placeholder="Mô tả chi tiết nội dung tờ trình và các căn cứ phê duyệt..."
              className="w-full bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm focus:ring-2 focus:ring-brand-blue outline-none min-h-[200px]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Tài liệu đính kèm</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-blue/40 hover:text-brand-blue transition-all cursor-pointer">
              <Paperclip size={32} />
              <span className="text-xs font-bold">Tải lên tài liệu (PDF, DOCX, XLSX)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform">
          <Send size={18} /> Gửi trình ký
        </button>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  FileText, 
  User, 
  Clock,
  ChevronRight,
  Search,
  Filter,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickApproval = ({ onBack }: { onBack: () => void }) => {
  const [items, setItems] = useState([
    { id: '1', title: 'Phê duyệt chủ trương Dự án Meyhomes Capital Phú Quốc', requester: 'Lê Văn A', dept: 'Phòng Đầu tư', time: '10 phút trước', urgent: true },
    { id: '2', title: 'Tờ trình quyết toán kinh phí Marketing Q3/2023', requester: 'Nguyễn Thị B', dept: 'Marketing', time: 'Hôm qua', urgent: false },
    { id: '3', title: 'Đề xuất mua sắm thiết bị văn phòng đợt 2', requester: 'Trần Văn C', dept: 'Hành chính', time: '2 ngày trước', urgent: false },
  ]);

  const [showComment, setShowComment] = useState<string | null>(null);

  const handleAction = (id: string, action: string) => {
    setItems(items.filter(item => item.id !== id));
    alert(`${action} thành công!`);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[70] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900">Phê duyệt nhanh</h1>
        </div>
        <div className="flex gap-1">
          <button className="p-2 text-slate-400"><Search size={20} /></button>
          <button className="p-2 text-slate-400"><Filter size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang chờ bạn duyệt ({items.length})</p>
        </div>

        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.dept}</span>
                </div>
                {item.urgent && (
                  <span className="bg-red-100 text-red-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Khẩn</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-800 leading-snug mb-3">{item.title}</h3>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-1">
                  <User size={12} /> {item.requester}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} /> {item.time}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-2 flex gap-2 border-t border-slate-100">
              <button 
                onClick={() => handleAction(item.id, 'Phê duyệt')}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-lg shadow-green-600/20"
              >
                <CheckCircle2 size={14} /> Phê duyệt
              </button>
              <button 
                onClick={() => handleAction(item.id, 'Từ chối')}
                className="flex-1 bg-white text-red-600 border border-red-100 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1"
              >
                <XCircle size={14} /> Từ chối
              </button>
              <button 
                onClick={() => setShowComment(item.id)}
                className="size-10 bg-white text-slate-400 border border-slate-200 rounded-lg flex items-center justify-center"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <CheckCircle2 size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Bạn đã hoàn thành hết các phê duyệt!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showComment && (
          <div className="fixed inset-0 z-[80] flex items-end bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full rounded-t-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900">Thêm ý kiến phê duyệt</h4>
                <button onClick={() => setShowComment(null)} className="p-2 text-slate-400"><X size={20} /></button>
              </div>
              <textarea 
                placeholder="Nhập ý kiến hoặc yêu cầu bổ sung..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-brand-blue min-h-[120px] mb-4"
              />
              <button 
                onClick={() => setShowComment(null)}
                className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold"
              >
                Gửi ý kiến
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


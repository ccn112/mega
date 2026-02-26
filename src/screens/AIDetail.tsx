import React from 'react';
import { 
  ArrowLeft, 
  Bot, 
  Settings, 
  History, 
  BookOpen, 
  Shield, 
  ChevronRight,
  Zap,
  MessageSquare,
  Trash2,
  Bell
} from 'lucide-react';
import { motion } from 'motion/react';
import { requestNotificationPermission } from '../firebase';

export const AIDetail = ({ onBack }: { onBack: () => void }) => {
  const handleEnableNotifications = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      alert('Đã bật thông báo thành công!');
    } else {
      alert('Không thể bật thông báo. Vui lòng kiểm tra quyền trình duyệt.');
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900">Cài đặt Trợ lý AI</h1>
        </div>
        <button className="p-2 text-slate-400 hover:text-red-500 rounded-full">
          <Trash2 size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="size-20 rounded-lg bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center text-white shadow-xl shadow-brand-blue/20 mb-4">
            <Bot size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">TAD Virtual Assistant</h2>
          <p className="text-sm text-slate-500 mt-1">Phiên bản 2.4.0 • Enterprise Edition</p>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-50 text-brand-blue text-[10px] font-bold rounded-full border border-blue-100">GPT-4o Powered</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">Secure Data</span>
          </div>
        </div>

        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tùy chỉnh & Bảo mật</h3>
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
            {[
              { label: 'Thông báo đẩy (Push)', icon: Bell, color: 'text-brand-blue', action: handleEnableNotifications },
              { label: 'Lịch sử trò chuyện', icon: History, color: 'text-brand-blue' },
              { label: 'Cơ sở tri thức nội bộ', icon: BookOpen, color: 'text-emerald-500' },
              { label: 'Quyền truy cập dữ liệu', icon: Shield, color: 'text-purple-500' },
              { label: 'Cài đặt giọng nói', icon: Zap, color: 'text-brand-gold' },
              { label: 'Phản hồi & Góp ý', icon: MessageSquare, color: 'text-slate-500' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={item.action}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-blue rounded-lg p-6 text-white shadow-xl shadow-brand-blue/20">
          <h4 className="font-bold mb-2">Bạn có biết?</h4>
          <p className="text-sm text-blue-100 leading-relaxed">Trợ lý AI có thể giúp bạn soạn thảo email, tóm tắt các cuộc họp Teams và tra cứu nhanh các quy định nhân sự của tập đoàn.</p>
          <button className="mt-4 bg-white text-brand-blue px-4 py-2 rounded-lg text-xs font-bold">Tìm hiểu thêm</button>
        </section>
      </div>
    </motion.div>
  );
};

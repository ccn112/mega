import React, { useState } from 'react';
import { 
  Bot, 
  FileText, 
  Download, 
  Paperclip, 
  Mic, 
  Send,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

export const AIScreen = ({ onShowSettings }: { onShowSettings: () => void, key?: string }) => {
  const [messages] = useState([
    { role: 'ai', text: 'Xin chào! Tôi là Trợ lý AI nội bộ của Tân Á Đại Thành. Tôi có thể giúp bạn tóm tắt văn bản, kiểm tra lịch biểu hoặc tra cứu quy định nhanh chóng.', time: 'Vừa xong' },
    { role: 'user', text: 'Chào bạn, tôi cần tóm tắt nội dung chính của Tờ trình số 123/TT-HĐQT về kế hoạch kinh doanh quý 3.', time: '10:24 AM' },
    { role: 'ai', text: 'Tôi đã tìm thấy Tờ trình số 123. Dưới đây là các điểm chính:\n• Mục tiêu doanh thu: Tăng 15% so với Q2.\n• Trọng tâm: Mở rộng thị trường miền Trung.\n• Ngân sách dự kiến: 2.5 tỷ VNĐ.', time: '10:25 AM', attachment: { name: 'To_trinh_123_Q3_v1.pdf', size: '1.2 MB' } },
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-[calc(100vh-120px)] relative"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end ml-auto max-w-[85%]' : 'max-w-[85%]'}`}>
            {msg.role === 'ai' && (
              <div className="size-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={20} className="text-brand-blue" />
              </div>
            )}
            <div className={`space-y-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-tr-none shadow-md shadow-brand-blue/10' : 'bg-white border border-slate-100 shadow-sm text-sm rounded-tl-none'}`}>
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
              </div>
              {msg.attachment && (
                <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg border border-slate-200 group cursor-pointer hover:bg-white transition-colors mt-2">
                  <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{msg.attachment.name}</p>
                    <p className="text-[10px] text-slate-400">{msg.attachment.size} • PDF Document</p>
                  </div>
                  <Download size={16} className="text-slate-400 group-hover:text-brand-blue" />
                </div>
              )}
              <span className="text-[10px] text-slate-400 block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="absolute bottom-4 left-4 right-4 z-40">
        <div className="flex items-end gap-2 bg-white/90 backdrop-blur-md p-2 rounded-lg border border-slate-200 shadow-2xl shadow-slate-200/50 focus-within:border-brand-blue/50 transition-all">
          <button className="size-10 flex items-center justify-center text-slate-400 hover:text-brand-blue shrink-0">
            <Paperclip size={20} />
          </button>
          <textarea 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 placeholder:text-slate-400 resize-none min-h-[40px] max-h-32" 
            placeholder="Nhập tin nhắn..." 
            rows={1}
          ></textarea>
          <div className="flex gap-1 shrink-0">
            <button className="size-10 flex items-center justify-center text-slate-400 hover:text-brand-blue">
              <Mic size={20} />
            </button>
            <button className="size-10 flex items-center justify-center bg-brand-blue text-white rounded-full shadow-lg shadow-brand-blue/30 active:scale-95 transition-transform">
              <Send size={20} />
            </button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MoreVertical,
  MessageSquare,
  Paperclip,
  User,
  History,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  status: 'todo' | 'in-progress' | 'completed';
  desc?: string;
}

export const TaskDetail = ({ task, onBack, onUpdateProgress }: { task: Task, onBack: () => void, onUpdateProgress: (id: string, progress: number) => void }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[70] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900 text-sm">Chi tiết công việc</h1>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-4 space-y-6">
          {/* Main Info */}
          <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                task.priority === 'high' ? 'bg-red-50 text-red-500' : 
                task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-500'
              }`}>
                {task.priority} Priority
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{task.project}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{task.title}</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {task.desc || "Tiếp tục triển khai các hạng mục theo kế hoạch đã được phê duyệt. Cần chú ý các mốc thời gian quan trọng để đảm bảo tiến độ chung của dự án."}
            </p>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hạn hoàn thành</p>
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Calendar size={16} className="text-brand-blue" />
                {task.dueDate}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Người thực hiện</p>
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <User size={16} className="text-emerald-500" />
                Bạn
              </div>
            </div>
          </div>

          {/* Progress */}
          <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Tiến độ hiện tại</h3>
              <span className="text-2xl font-black text-brand-blue">{task.progress}%</span>
            </div>
            <div className="relative pt-1">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                value={task.progress}
                onChange={(e) => onUpdateProgress(task.id, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand-blue"
              />
              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </section>

          {/* Discussion/History */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thảo luận & Lịch sử</h3>
              <History size={14} className="text-slate-400" />
            </div>
            <div className="space-y-3">
              {[
                { user: 'Hệ thống', time: '2 giờ trước', text: 'Bạn đã cập nhật tiến độ lên 65%', type: 'system' },
                { user: 'Nguyễn Văn A', time: 'Hôm qua', text: 'Cần đẩy nhanh phần báo cáo tài chính nhé.', type: 'user' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    item.type === 'system' ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-brand-blue'
                  }`}>
                    {item.user.charAt(0)}
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-900">{item.user}</span>
                      <span className="text-[9px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-20 max-w-md mx-auto">
        <div className="flex gap-2">
          <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-lg border border-slate-200">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Nhập phản hồi..."
              className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-4 right-4 flex gap-2 z-10 max-w-md mx-auto pointer-events-none">
        <button 
          onClick={() => onUpdateProgress(task.id, 100)}
          className="flex-1 h-12 bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-500/20 pointer-events-auto active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} />
          Hoàn thành
        </button>
      </div>
    </motion.div>
  );
};

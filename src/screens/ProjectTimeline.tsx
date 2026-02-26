import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Flag,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  desc: string;
  totalTasks: number;
  completedTasks: number;
}

export const ProjectTimeline = ({ onBack }: { onBack: () => void }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const milestones: Milestone[] = [
    { id: '1', title: 'Khởi động dự án & Khảo sát', date: '01/09/2023', status: 'completed', desc: 'Hoàn thành khảo sát địa chất và bàn giao mặt bằng sạch.', totalTasks: 12, completedTasks: 12 },
    { id: '2', title: 'Thi công phần móng', date: '15/10/2023', status: 'completed', desc: 'Đã nghiệm thu cốt thép móng khu A và khu B.', totalTasks: 24, completedTasks: 24 },
    { id: '3', title: 'Xây dựng kết cấu tầng 1-3', date: '30/11/2023', status: 'in-progress', desc: 'Đang đổ bê tông sàn tầng 2. Dự kiến hoàn thành đúng hạn.', totalTasks: 18, completedTasks: 8 },
    { id: '4', title: 'Lắp đặt hệ thống M&E', date: '15/12/2023', status: 'upcoming', desc: 'Đang chuẩn bị vật tư và nhân lực cho giai đoạn lắp đặt.', totalTasks: 15, completedTasks: 0 },
    { id: '5', title: 'Hoàn thiện & Bàn giao', date: '30/01/2024', status: 'upcoming', desc: 'Giai đoạn cuối cùng của dự án.', totalTasks: 10, completedTasks: 0 },
  ];

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-emerald-500" size={18} />;
      case 'in-progress': return <Clock className="text-brand-blue animate-pulse" size={18} />;
      case 'delayed': return <AlertTriangle className="text-red-500" size={18} />;
      default: return <div className="size-4 rounded-full border-2 border-slate-300" />;
    }
  };

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
          <div>
            <h1 className="font-bold text-slate-900 text-sm">Lộ trình dự án</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">5 Cột mốc quan trọng</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
          <Calendar size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-9 top-10 bottom-10 w-0.5 bg-slate-200" />

        <div className="space-y-10">
          {milestones.map((m, idx) => (
            <div key={m.id} className="relative flex gap-6">
              <div className={`size-6 rounded-full flex items-center justify-center z-10 shrink-0 ${
                m.status === 'completed' ? 'bg-emerald-50' : 
                m.status === 'in-progress' ? 'bg-blue-50' : 'bg-white border-2 border-slate-200'
              }`}>
                {getStatusIcon(m.status)}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold ${
                    m.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-900'
                  }`}>
                    {m.title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {m.date}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{m.desc}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${m.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-blue'}`}
                        style={{ width: `${(m.completedTasks / m.totalTasks) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{m.completedTasks}/{m.totalTasks} việc</span>
                  </div>
                  <button 
                    onClick={() => setSelectedMilestone(selectedMilestone === m.id ? null : m.id)}
                    className="text-[10px] font-bold text-brand-blue uppercase tracking-wider"
                  >
                    {selectedMilestone === m.id ? 'Thu gọn' : 'Xem việc'}
                  </button>
                </div>

                <AnimatePresence>
                  {selectedMilestone === m.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-2"
                    >
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`size-1.5 rounded-full ${m.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-blue'}`} />
                            <span className="text-[10px] font-medium text-slate-600">Công việc chi tiết #{i}</span>
                          </div>
                          <ChevronRight size={12} className="text-slate-300" />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {m.status === 'in-progress' && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-brand-blue" />
                      <span className="text-[10px] font-bold text-brand-blue uppercase">Đang thực hiện</span>
                    </div>
                    <ChevronRight size={14} className="text-brand-blue" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
          <Flag className="text-amber-600 shrink-0" size={20} />
          <div>
            <h4 className="text-xs font-bold text-amber-900">Mục tiêu tiếp theo</h4>
            <p className="text-[10px] text-amber-700 mt-1">Hoàn thành cất nóc dự kiến vào ngày 15/01/2024. Cần tập trung đẩy nhanh tiến độ hoàn thiện sàn tầng 3.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

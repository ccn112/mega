import React from 'react';
import { 
  ArrowLeft, 
  Plus,
  MoreVertical,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectGantt = ({ onBack }: { onBack: () => void }) => {
  const tasks = [
    { id: '1', title: 'Khảo sát địa chất', start: 0, duration: 15, color: 'bg-blue-500' },
    { id: '2', title: 'Thiết kế bản vẽ móng', start: 10, duration: 20, color: 'bg-emerald-500' },
    { id: '3', title: 'Lập dự toán vật tư', start: 25, duration: 10, color: 'bg-amber-500' },
    { id: '4', title: 'Thi công phần móng', start: 30, duration: 40, color: 'bg-brand-blue' },
    { id: '5', title: 'Nghiệm thu mặt bằng', start: 0, duration: 5, color: 'bg-slate-400' },
  ];

  const days = Array.from({ length: 30 }).map((_, i) => i + 1);

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
            <h1 className="font-bold text-slate-900 text-sm">Biểu đồ Gantt</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Dự án Nhà máy GĐ2</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
          <Calendar size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-auto bg-white m-4 rounded-lg border border-slate-100 shadow-sm">
        <div className="min-w-[1200px]">
          {/* Timeline Header */}
          <div className="flex border-b border-slate-100">
            <div className="w-64 p-4 border-r border-slate-100 shrink-0 font-black text-[10px] text-slate-400 uppercase tracking-widest">Tên công việc</div>
            <div className="flex-1 flex">
              {days.map(d => (
                <div key={d} className="w-10 h-12 flex items-center justify-center border-r border-slate-50 text-[10px] font-bold text-slate-400">{d}</div>
              ))}
            </div>
          </div>

          {/* Gantt Rows */}
          <div className="divide-y divide-slate-50">
            {tasks.map((task) => (
              <div key={task.id} className="flex group hover:bg-slate-50 transition-colors">
                <div className="w-64 p-4 border-r border-slate-100 shrink-0 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 truncate">{task.title}</span>
                  <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 flex relative h-14 items-center">
                  {/* Grid lines */}
                  {days.map(d => (
                    <div key={d} className="w-10 h-full border-r border-slate-50/50 shrink-0"></div>
                  ))}
                  
                  {/* Task Bar */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: task.duration * 10 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className={`absolute h-6 rounded-full ${task.color} shadow-sm flex items-center px-3`}
                    style={{ left: task.start * 10 }}
                  >
                    <span className="text-[8px] font-black text-white uppercase truncate">{task.duration} ngày</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Khảo sát</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Thiết kế</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-brand-blue" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Thi công</span>
          </div>
        </div>
        <button className="bg-brand-blue text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-brand-blue/20">Xuất báo cáo</button>
      </div>
    </motion.div>
  );
};

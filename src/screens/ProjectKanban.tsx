import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  MoreVertical, 
  User, 
  Clock, 
  AlertCircle,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
}

export const ProjectKanban = ({ onBack }: { onBack: () => void }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Khảo sát địa chất khu B', priority: 'high', assignee: 'Nguyễn Văn A', dueDate: '25/02', status: 'in-progress' },
    { id: '2', title: 'Thiết kế bản vẽ móng', priority: 'medium', assignee: 'Trần Thị B', dueDate: '28/02', status: 'todo' },
    { id: '3', title: 'Lập dự toán vật tư đợt 1', priority: 'low', assignee: 'Phạm Thị D', dueDate: '01/03', status: 'todo' },
    { id: '4', title: 'Nghiệm thu mặt bằng sạch', priority: 'high', assignee: 'Lê Văn C', dueDate: '20/02', status: 'done' },
    { id: '5', title: 'Ký hợp đồng thầu phụ điện', priority: 'medium', assignee: 'Hoàng Văn E', dueDate: '22/02', status: 'done' },
  ]);

  const columns: { id: Task['status'], title: string, color: string }[] = [
    { id: 'todo', title: 'Cần làm', color: 'bg-slate-100 text-slate-600' },
    { id: 'in-progress', title: 'Đang làm', color: 'bg-blue-50 text-brand-blue' },
    { id: 'done', title: 'Hoàn thành', color: 'bg-emerald-50 text-emerald-600' },
  ];

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
            <h1 className="font-bold text-slate-900 text-sm">Bảng Kanban</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Dự án Nhà máy GĐ2</p>
          </div>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-x-auto flex gap-4 p-4 no-scrollbar">
        {columns.map((col) => (
          <div key={col.id} className="w-72 shrink-0 flex flex-col gap-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${col.color}`}>
              <h3 className="text-xs font-black uppercase tracking-widest">{col.title}</h3>
              <span className="text-[10px] font-bold opacity-60">{tasks.filter(t => t.status === col.id).length}</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pb-20 no-scrollbar">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <motion.div 
                  key={task.id}
                  layoutId={task.id}
                  className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                      task.priority === 'high' ? 'bg-red-50 text-red-500' : 
                      task.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-500'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="p-1 text-slate-300 hover:text-slate-500">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                    {task.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-[10px] font-medium text-slate-500">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Clock size={12} />
                      {task.dueDate}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-[10px] font-bold hover:border-brand-blue/40 hover:text-brand-blue transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Thêm công việc
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

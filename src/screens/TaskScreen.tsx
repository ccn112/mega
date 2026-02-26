import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  Filter,
  MoreVertical,
  Calendar,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { TaskDetail } from './TaskDetail';

interface Task {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  status: 'todo' | 'in-progress' | 'completed';
}

export const TaskScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Hoàn thiện báo cáo tài chính Q4', project: 'Kế hoạch 2024', dueDate: '25/02/2024', priority: 'high', progress: 65, status: 'in-progress' },
    { id: '2', title: 'Họp triển khai ERP giai đoạn 2', project: 'Digital Transformation', dueDate: '23/02/2024', priority: 'high', progress: 0, status: 'todo' },
    { id: '3', title: 'Kiểm tra tiến độ lắp đặt tại nhà máy Hà Nam', project: 'Dự án Nhà máy 3', dueDate: '28/02/2024', priority: 'medium', progress: 30, status: 'in-progress' },
    { id: '4', title: 'Phê duyệt tờ trình mua sắm thiết bị', project: 'Văn phòng phẩm', dueDate: '22/02/2024', priority: 'low', progress: 100, status: 'completed' },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const updateProgress = (id: string, newProgress: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const status = newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'todo';
        return { ...t, progress: newProgress, status };
      }
      return t;
    }));
    if (selectedTask?.id === id) {
      setSelectedTask(prev => prev ? { ...prev, progress: newProgress, status: newProgress === 100 ? 'completed' : 'in-progress' } : null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Stats Summary */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { label: 'Đang làm', count: tasks.filter(t => t.status === 'in-progress').length, color: 'bg-blue-500' },
          { label: 'Sắp tới', count: tasks.filter(t => t.status === 'todo').length, color: 'bg-brand-gold' },
          { label: 'Hoàn thành', count: tasks.filter(t => t.status === 'completed').length, color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <div className={`w-1 h-4 ${stat.color} rounded-full mb-2`}></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-xl font-black text-slate-900">{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Danh sách công việc</h2>
        <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-500 shadow-sm">
          <Filter size={16} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
        {tasks.map((task) => (
          <motion.div 
            key={task.id}
            layoutId={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`size-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-brand-gold' : 'bg-blue-400'
                  }`}></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.project}</span>
                </div>
                <h3 className="font-bold text-slate-900 leading-tight group-hover:text-brand-blue transition-colors">{task.title}</h3>
              </div>
              <button className="p-1 text-slate-300">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Calendar size={12} />
                  {task.dueDate}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <BarChart3 size={12} />
                  {task.progress}%
                </div>
              </div>
              <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  className={`h-full ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-brand-blue'}`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Task Detail Overlay */}
      <AnimatePresence>
        {selectedTask && (
          <TaskDetail 
            task={selectedTask} 
            onBack={() => setSelectedTask(null)} 
            onUpdateProgress={updateProgress}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

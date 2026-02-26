import React from 'react';
import { 
  X, 
  AlertCircle, 
  Clock, 
  Calendar, 
  CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';

interface Task {
  id: string;
  title: string;
  time: string;
  type: 'overdue' | 'today' | 'upcoming';
}

export const CheckInModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const tasks: Task[] = [
    { id: '1', title: 'Hoàn thiện báo cáo tiến độ tuần 7', time: 'Quá hạn 2 ngày', type: 'overdue' },
    { id: '2', title: 'Duyệt bản vẽ thiết kế Móng nhà máy', time: 'Hôm nay, 14:00', type: 'today' },
    { id: '3', title: 'Họp giao ban tiến độ tuần', time: 'Ngày mai, 08:30', type: 'upcoming' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg w-full max-w-sm overflow-hidden shadow-2xl"
      >
        <div className="bg-brand-blue p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-xl font-bold">Check-in Thành công!</h2>
          </div>
          <p className="text-blue-100 text-sm">Chào mừng bạn bắt đầu ngày làm việc.</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Việc cần làm hôm nay</h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex gap-3 items-start">
                  <div className={`mt-1 size-2 rounded-full shrink-0 ${
                    task.type === 'overdue' ? 'bg-red-500 animate-pulse' : 
                    task.type === 'today' ? 'bg-brand-blue' : 'bg-slate-300'
                  }`} />
                  <div>
                    <p className={`text-sm font-bold ${task.type === 'overdue' ? 'text-red-600' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      {task.type === 'overdue' ? <AlertCircle size={10} /> : <Clock size={10} />}
                      {task.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-brand-blue text-white py-3 rounded-lg font-bold shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform"
          >
            Bắt đầu làm việc
          </button>
        </div>
      </motion.div>
    </div>
  );
};

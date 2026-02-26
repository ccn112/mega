import React, { useState } from 'react';
import { 
  X, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';

interface Task {
  id: string;
  title: string;
  time: string;
  type: 'overdue' | 'today';
}

export const CheckOutModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [report, setReport] = useState('');
  
  if (!isOpen) return null;

  const tasks: Task[] = [
    { id: '1', title: 'Hoàn thiện báo cáo tiến độ tuần 7', time: 'Quá hạn 2 ngày', type: 'overdue' },
    { id: '2', title: 'Duyệt bản vẽ thiết kế Móng nhà máy', time: 'Hôm nay, 14:00', type: 'today' },
  ];

  const canCheckOut = report.trim().length > 10;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="bg-slate-900 p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <LogOut size={24} />
            </div>
            <h2 className="text-xl font-bold">Check-out</h2>
          </div>
          <p className="text-slate-400 text-sm">Vui lòng báo cáo kết quả công việc trước khi kết thúc ngày.</p>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Tổng kết công việc</h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
                  <div className={`mt-1 size-2 rounded-full shrink-0 ${
                    task.type === 'overdue' ? 'bg-red-500' : 'bg-brand-blue'
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

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Báo cáo công việc</label>
            <textarea 
              value={report}
              onChange={(e) => setReport(e.target.value)}
              placeholder="Nhập tóm tắt kết quả công việc hôm nay..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-blue outline-none min-h-[100px]"
            />
            {!canCheckOut && report.length > 0 && (
              <p className="text-[10px] text-red-500 mt-1">Báo cáo cần ít nhất 10 ký tự.</p>
            )}
          </div>

          <button 
            disabled={!canCheckOut}
            onClick={onClose}
            className={`w-full py-3 rounded-lg font-bold shadow-lg transition-all active:scale-95 ${
              canCheckOut 
              ? 'bg-brand-blue text-white shadow-brand-blue/20' 
              : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            Xác nhận Check-out
          </button>
        </div>
      </motion.div>
    </div>
  );
};


import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectCalendar = ({ onBack }: { onBack: () => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  const events = [
    { day: 22, title: 'Họp giao ban dự án', type: 'meeting' },
    { day: 24, title: 'Nghiệm thu móng khu B', type: 'task' },
    { day: 25, title: 'Báo cáo tiến độ tuần', type: 'report' },
    { day: 28, title: 'Thanh toán đợt 1', type: 'finance' },
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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
            <h1 className="font-bold text-slate-900 text-sm">Lịch công việc</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Dự án Nhà máy GĐ2</p>
          </div>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-50">
            <h2 className="font-black text-slate-900 uppercase tracking-widest">{monthNames[month]} {year}</h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-50">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
              <div key={d} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: 42 }).map((_, i) => {
              const dayNum = i - startDay + 1;
              const isCurrentMonth = dayNum > 0 && dayNum <= totalDays;
              const dayEvents = events.filter(e => e.day === dayNum);
              const isToday = dayNum === new Date().getDate() && month === new Date().getMonth();

              return (
                <div key={i} className={`h-20 border-r border-b border-slate-50 p-1 relative ${!isCurrentMonth ? 'bg-slate-50/50' : ''}`}>
                  {isCurrentMonth && (
                    <>
                      <span className={`text-[10px] font-bold ${isToday ? 'bg-brand-blue text-white size-5 flex items-center justify-center rounded-full' : 'text-slate-400'}`}>
                        {dayNum}
                      </span>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.map((e, idx) => (
                          <div key={idx} className="text-[8px] font-bold bg-blue-50 text-brand-blue px-1 py-0.5 rounded truncate">
                            {e.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Sự kiện hôm nay</h3>
        <div className="space-y-3">
          {events.filter(e => e.day === new Date().getDate()).length > 0 ? (
            events.filter(e => e.day === new Date().getDate()).map((e, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">{e.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">09:00 - 10:30 • Phòng họp 2</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg border border-slate-100 border-dashed text-center text-slate-400">
              <p className="text-xs font-bold">Không có sự kiện nào hôm nay</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { 
  Zap, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Flag 
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectScreen = ({ onShowDetail }: { onShowDetail: () => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="pb-24 p-4 space-y-6"
  >
    <section className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Zap size={18} className="text-brand-gold" />
          Hiệu suất Quý 4
        </h3>
        <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded-full">MỤC TIÊU: 95%</span>
      </div>
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-600">Tiến độ OKR</span>
            <span className="text-sm font-bold text-brand-gold">88.5%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="bg-brand-gold h-full rounded-full" style={{ width: '88.5%' }}></div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-slate-900 leading-none">8.5</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Điểm KPI</p>
        </div>
      </div>
    </section>

    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Dự án đang triển khai</h2>
        <button className="text-brand-blue text-sm font-semibold">Xem tất cả</button>
      </div>
      <div className="space-y-4">
        <div 
          onClick={onShowDetail}
          className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="h-32 bg-slate-200 relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHmEaHJ2wSXVGTXBP85azuR1oXPZ16HNRyDLk-vSV-k_0423gPVu-uNfHHfFc0K04xBBIGLelDYYHmo4HnliKBvuQvY1jA1yvXI2Xj5CC3I9CxCi-LyNsqFftD_Vb2iTLklBUfuGbBdwWNC3AoXwAz_xaDkPG0L0Ic7ztT5MRfo-qQCxkoL35-cBRrgR_XSMETRwiD2kX7EzPXYGavR7I-zZqRVyO4p5u2JsxlK6_bm4npLpOYtNwPfo00cCoTJ-2HVh6pggDt9Eni" 
              className="w-full h-full object-cover" 
              alt="Project"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Ưu tiên cao</div>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1">Xây dựng & Hạ tầng</p>
            <h4 className="text-base font-bold mb-3">Nhà máy Tân Á Đại Thành - Giai đoạn 2</h4>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="flex items-center gap-1"><Calendar size={12} /> 30/12/2023</span>
              <span className="font-bold text-slate-700">75% hoàn thành</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
              <div className="bg-brand-blue h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="size-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i}/100/100`} alt="Member" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="size-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">+5</div>
              </div>
              <button className="px-4 py-1.5 bg-blue-50 text-brand-blue text-xs font-bold rounded-lg">Chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Công việc cá nhân</h2>
        <button className="p-1 text-brand-blue"><Plus size={20} /></button>
      </div>
      <div className="space-y-3">
        {[
          { title: 'Duyệt bản vẽ thiết kế Móng nhà máy', meta: 'Hôm nay, 14:00 • Dự án Tân Á GĐ2', priority: true },
          { title: 'Họp giao ban tiến độ tuần', meta: 'Ngày mai, 08:30 • Toàn công ty', priority: false },
          { title: 'Gửi báo cáo KPI Tháng 11', meta: 'Đã hoàn thành', done: true },
        ].map((task, idx) => (
          <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${task.done ? 'bg-slate-50 border-transparent opacity-50' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className={`size-5 rounded border-2 flex items-center justify-center ${task.done ? 'bg-brand-blue border-brand-blue' : 'border-slate-300'}`}>
              {task.done && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${task.done ? 'line-through text-slate-500' : 'text-slate-800'}`}>{task.title}</p>
              <p className="text-[10px] text-slate-500 font-medium">{task.meta}</p>
            </div>
            {task.priority && <Flag size={14} className="text-red-500" />}
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

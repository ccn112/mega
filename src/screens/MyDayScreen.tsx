import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  ChevronRight,
  Plus,
  LayoutDashboard,
  Timer,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MyDayScreen = ({ 
  onShowProjectDetail,
  onShowTaskDetail
}: { 
  onShowProjectDetail: () => void,
  onShowTaskDetail: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'projects'>('tasks');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Header Info */}
      <div className="bg-white px-4 pt-6 pb-4 border-b border-slate-200">
        <h2 className="text-xl font-black text-slate-900">Ngày của tôi</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">Thứ Hai, 22 Tháng 2, 2026</p>
        
        <div className="flex bg-slate-100 p-1 rounded-xl mt-6">
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'tasks' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Công việc
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'projects' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Dự án tham gia
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'tasks' ? (
            <motion.div 
              key="tasks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 space-y-6"
            >
              {/* Task Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Tổng</p>
                  <p className="text-lg font-black text-slate-900">12</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Đang làm</p>
                  <p className="text-lg font-black text-brand-blue">4</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Xong</p>
                  <p className="text-lg font-black text-emerald-500">8</p>
                </div>
              </div>

              {/* Task List */}
              <section>
                <div className="flex justify-between items-center mb-3 px-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Việc cần làm hôm nay</h3>
                  <button className="p-1.5 bg-brand-blue text-white rounded-lg"><Plus size={14} /></button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Gửi báo cáo tiến độ tuần', project: 'Nhà máy GĐ2', time: '09:00', priority: 'High' },
                    { title: 'Họp team thiết kế', project: 'Meyhomes', time: '14:00', priority: 'Medium' },
                    { title: 'Review bản vẽ móng', project: 'Nhà máy GĐ2', time: '16:30', priority: 'High' },
                    { title: 'Phê duyệt chi phí vật tư', project: 'Meyhomes', time: '17:45', priority: 'Low' },
                    { title: 'Kiểm tra tiến độ thi công khu C', project: 'Meyhomes', time: '08:00', priority: 'High' },
                  ].map((task, i) => (
                    <div key={i} onClick={onShowTaskDetail} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-brand-blue/30 transition-all">
                      <div className="size-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-transparent hover:border-brand-blue hover:text-brand-blue transition-all">
                        <CheckCircle2 size={12} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{task.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-brand-blue uppercase">{task.project}</span>
                          <span className="text-[10px] text-slate-300">•</span>
                          <span className="text-[10px] text-slate-400 font-medium">{task.time}</span>
                        </div>
                      </div>
                      <div className={`size-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 space-y-4"
            >
              {[
                { name: 'Nhà máy Tân Á Đại Thành - GĐ2', role: 'Quản lý dự án', progress: 75, status: 'On Track' },
                { name: 'Khu đô thị Meyhomes Capital', role: 'Thành viên', progress: 40, status: 'At Risk' },
                { name: 'Hệ thống ERP Nội bộ', role: 'Cố vấn', progress: 90, status: 'On Track' },
              ].map((proj, i) => (
                <div key={i} onClick={onShowProjectDetail} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm cursor-pointer hover:border-brand-blue/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{proj.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{proj.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                      proj.status === 'On Track' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Tiến độ</span>
                      <span className="text-[10px] font-black text-brand-blue">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

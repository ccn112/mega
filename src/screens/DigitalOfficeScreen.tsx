import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Users, 
  Clock, 
  Calendar,
  ChevronRight,
  TrendingUp,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProposalScreen } from './ProposalScreen';
import { HRScreen } from './HRScreen';

export const DigitalOfficeScreen = ({ 
  userRole,
  onShowProposal, 
  onShowApproval,
  onCheckIn,
  onCheckOut,
  onShowPayroll,
  onShowBenefits
}: { 
  userRole: string | null,
  onShowProposal: () => void, 
  onShowApproval: () => void,
  onCheckIn: () => void,
  onCheckOut: () => void,
  onShowPayroll: () => void,
  onShowBenefits: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'office' | 'hr'>('office');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Tab Switcher */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('office')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'office' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Văn phòng số
          </button>
          <button 
            onClick={() => setActiveTab('hr')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'hr' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Nhân sự (HR)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'office' ? (
            <motion.div 
              key="office"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-4 space-y-6"
            >
              {/* Quick Access */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={onShowProposal} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:border-brand-blue/30 transition-all">
                  <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                    <FileText size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Tạo Tờ trình</span>
                </button>
                <button onClick={onShowApproval} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:border-brand-blue/30 transition-all">
                  <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Phê duyệt</span>
                </button>
              </div>

              {/* Pending Tasks */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Chờ xử lý</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Phê duyệt dự toán Meyhomes', type: 'Tờ trình', time: '2 giờ trước', priority: 'High' },
                    { title: 'Ký hợp đồng thầu phụ khu B', type: 'Hợp đồng', time: '5 giờ trước', priority: 'Medium' },
                    { title: 'Đề xuất mua sắm thiết bị IT', type: 'Tờ trình', time: '1 ngày trước', priority: 'Low' },
                    { title: 'Phê duyệt kế hoạch tuyển dụng Q2', type: 'Kế hoạch', time: 'Hôm qua', priority: 'Medium' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Clock size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.type} • {item.time}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Documents */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Tài liệu gần đây</h3>
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                  {[
                    { name: 'Báo cáo tài chính Q4.pdf', size: '2.4 MB' },
                    { name: 'Kế hoạch nhân sự 2024.docx', size: '1.1 MB' },
                    { name: 'Sơ đồ tổ chức mới.pdf', size: '850 KB' },
                  ].map((doc, i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-700">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="hr"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <HRScreen 
                userRole={userRole}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
                onShowPayroll={onShowPayroll}
                onShowBenefits={onShowBenefits}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

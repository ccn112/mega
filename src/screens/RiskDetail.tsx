import React from 'react';
import { ArrowLeft, AlertCircle, Clock, CheckCircle2, MessageSquare, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const RiskDetail = ({ onBack }: { onBack: () => void }) => {
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
          <h1 className="font-bold text-slate-900 text-sm">Vấn đề & Rủi ro</h1>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Risk Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">Ưu tiên cao</span>
                <span className="text-[10px] text-slate-400 font-bold">ID: RISK-042</span>
              </div>
              <h2 className="text-base font-black text-slate-900 mt-2 leading-tight">Chậm giải phóng mặt bằng Phân khu C</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Người phụ trách</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="https://picsum.photos/seed/user1/100/100" className="size-6 rounded-full" alt="User" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-slate-700">Lê Văn Nam</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hạn xử lý</p>
              <p className="text-xs font-bold text-slate-700 mt-2">15 Tháng 3, 2026</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mô tả chi tiết</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hiện tại còn 12 hộ dân chưa đồng ý với phương án đền bù tại Phân khu C. Việc này đang trực tiếp làm chậm tiến độ san lấp mặt bằng, ảnh hưởng đến kế hoạch khởi công móng vào đầu tháng 4.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ảnh hưởng</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-red-600 font-medium">
                <div className="size-1.5 rounded-full bg-red-500" />
                Trễ tiến độ tổng thể 4 tuần
              </li>
              <li className="flex items-center gap-2 text-xs text-red-600 font-medium">
                <div className="size-1.5 rounded-full bg-red-500" />
                Phát sinh chi phí phạt thầu xây dựng
              </li>
            </ul>
          </div>
        </div>

        {/* Action Plan */}
        <section>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 px-1">Kế hoạch xử lý</h3>
          <div className="space-y-4 relative pl-8">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100" />
            {[
              { title: 'Họp với UBND Phường An Thới', status: 'Hoàn thành', date: '18/02/2026', done: true },
              { title: 'Trình phương án hỗ trợ bổ sung', status: 'Đang thực hiện', date: '22/02/2026', done: false },
              { title: 'Vận động các hộ dân ký biên bản', status: 'Chưa bắt đầu', date: '01/03/2026', done: false },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[26px] top-0.5 size-4 rounded-full border-2 flex items-center justify-center ${
                  step.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-300'
                }`}>
                  {step.done ? <CheckCircle2 size={10} /> : <div className="size-1.5 rounded-full bg-current" />}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${step.done ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{step.status}</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-medium">{step.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discussion */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Thảo luận (5)</h3>
            <button className="text-[10px] font-bold text-brand-blue uppercase">Xem tất cả</button>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <img src="https://picsum.photos/seed/user2/100/100" className="size-8 rounded-full" alt="User" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Trần Minh Hoàng</h4>
                  <p className="text-[10px] text-slate-400 font-medium">10 phút trước</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tôi vừa cập nhật phương án hỗ trợ mới, nhờ anh Nam xem qua và trình sếp duyệt sớm để kịp buổi họp ngày mai.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Input */}
      <div className="p-4 bg-white border-t border-slate-200 flex gap-3 sticky bottom-0">
        <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3">
          <MessageSquare size={18} className="text-slate-400" />
          <input type="text" placeholder="Nhập ý kiến của bạn..." className="bg-transparent text-xs font-medium outline-none flex-1" />
        </div>
        <button className="size-11 bg-brand-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/20">
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

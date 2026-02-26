import React from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Download, 
  Info, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  Gift,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';

export const PayrollDetail = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
  >
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-slate-900">Phiếu lương Chi tiết</h1>
      </div>
      <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-full">
        <Download size={20} />
      </button>
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="bg-brand-blue rounded-lg p-6 text-white shadow-xl shadow-brand-blue/20">
        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Tháng 04/2024</p>
        <h2 className="text-3xl font-black mb-4">24,500,000đ</h2>
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <div className="text-xs">
            <p className="text-blue-100 opacity-80">Ngày thanh toán</p>
            <p className="font-bold">05/05/2024</p>
          </div>
          <div className="text-xs text-right">
            <p className="text-blue-100 opacity-80">Trạng thái</p>
            <p className="font-bold bg-white/20 px-2 py-0.5 rounded">Đã quyết toán</p>
          </div>
        </div>
      </div>

      <section className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Chi tiết Thu nhập</h3>
        </div>
        <div className="p-4 space-y-4">
          {[
            { label: 'Lương cơ bản', val: '18,000,000đ' },
            { label: 'Phụ cấp trách nhiệm', val: '3,000,000đ' },
            { label: 'Thưởng KPI', val: '4,500,000đ' },
            { label: 'Phụ cấp ăn trưa', val: '1,200,000đ' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-slate-500">{item.label}</span>
              <span className="font-bold text-slate-900">{item.val}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Các khoản khấu trừ</h3>
        </div>
        <div className="p-4 space-y-4">
          {[
            { label: 'Bảo hiểm xã hội (8%)', val: '-1,440,000đ' },
            { label: 'Bảo hiểm y tế (1.5%)', val: '-270,000đ' },
            { label: 'Thuế TNCN', val: '-490,000đ' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-slate-500">{item.label}</span>
              <span className="font-bold text-red-500">{item.val}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </motion.div>
);

export const BenefitsDetail = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
  >
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-slate-900">Phúc lợi của bạn</h1>
      </div>
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Gift size={24} />
          </div>
          <h2 className="text-xl font-bold">Gói Phúc lợi 2024</h2>
        </div>
        <p className="text-orange-50 text-sm leading-relaxed">Bạn đang tận hưởng đầy đủ các quyền lợi cao cấp từ tập đoàn Tân Á Đại Thành.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'Bảo hiểm PVI Care', desc: 'Gói bảo hiểm sức khỏe nội trú & ngoại trú cao cấp', icon: ShieldCheck, color: 'text-brand-blue bg-blue-50' },
          { title: 'Thưởng thâm niên', desc: 'Thưởng 1 tháng lương cho mỗi 5 năm cống hiến', icon: Heart, color: 'text-red-600 bg-red-50' },
          { title: 'Du lịch hàng năm', desc: 'Chuyến đi 4 ngày 3 đêm tại các resort 5 sao', icon: Calendar, color: 'text-emerald-600 bg-emerald-50' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
              <button className="text-brand-blue text-xs font-bold mt-3 flex items-center gap-1">
                Xem chi tiết <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

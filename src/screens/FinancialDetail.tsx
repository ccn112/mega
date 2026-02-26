import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const data = [
  { name: 'Q1', value: 4000 },
  { name: 'Q2', value: 3000 },
  { name: 'Q3', value: 2000 },
  { name: 'Q4', value: 2780 },
];

const pieData = [
  { name: 'Xây dựng', value: 400 },
  { name: 'GPMB', value: 300 },
  { name: 'Thiết kế', value: 300 },
  { name: 'Khác', value: 200 },
];

const COLORS = ['#1A73E8', '#34A853', '#FBBC05', '#EA4335'];

export const FinancialDetail = ({ onBack }: { onBack: () => void }) => {
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
          <h1 className="font-bold text-slate-900 text-sm">Hiệu quả tài chính</h1>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <Download size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng ngân sách</p>
            <p className="text-xl font-black text-slate-900 mt-1">24,800 tỷ</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">100% Kế hoạch</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã giải ngân</p>
            <p className="text-xl font-black text-slate-900 mt-1">12,400 tỷ</p>
            <p className="text-[10px] text-brand-blue font-bold mt-1">50% Tổng ngân sách</p>
          </div>
        </div>

        {/* Charts */}
        <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Giải ngân theo quý (Tỷ VNĐ)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#1A73E8" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Cơ cấu chi phí</h3>
          <div className="flex items-center">
            <div className="h-48 w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-bold text-slate-600">{item.name}</span>
                  <span className="text-[10px] font-black text-slate-900 ml-auto">{item.value} tỷ</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed List */}
        <section>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 px-1">Lịch sử giải ngân</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
            {[
              { title: 'Thanh toán đợt 3 - Thầu xây dựng', date: '20/02/2026', amount: '450 tỷ', status: 'Hoàn thành' },
              { title: 'Chi phí tư vấn thiết kế cảnh quan', date: '15/02/2026', amount: '12 tỷ', status: 'Hoàn thành' },
              { title: 'Tạm ứng mua vật tư thép Q1', date: '10/02/2026', amount: '120 tỷ', status: 'Đang xử lý' },
              { title: 'Lương & Thưởng dự án tháng 1', date: '05/02/2026', amount: '2.5 tỷ', status: 'Hoàn thành' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">{item.amount}</p>
                  <span className={`text-[8px] font-black uppercase tracking-wider ${
                    item.status === 'Hoàn thành' ? 'text-emerald-500' : 'text-brand-blue'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

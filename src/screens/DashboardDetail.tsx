import React from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Filter,
  Download,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardDetail = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = React.useState<'bds' | 'kimkhi' | 'hr'>('bds');
  const [bdsSubTab, setBdsSubTab] = React.useState<'overview' | 'sales' | 'inventory' | 'booking'>('overview');

  return (
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
          <h1 className="font-bold text-slate-900">Báo cáo Quản trị BI</h1>
        </div>
        <div className="flex gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-full">
            <Download size={20} />
          </button>
        </div>
      </header>

      {/* Sector Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'bds', label: 'Bất động sản' },
          { id: 'kimkhi', label: 'Kim khí & Gia dụng' },
          { id: 'hr', label: 'Nhân sự & Vận hành' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                : 'bg-slate-50 text-slate-500 border border-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* BDS Sub Tabs */}
      {activeTab === 'bds' && (
        <div className="bg-white px-4 py-2 border-b border-slate-100 flex gap-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'sales', label: 'Bán hàng' },
            { id: 'inventory', label: 'Rổ hàng/Đại lý' },
            { id: 'booking', label: 'Booking/Cọc' },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setBdsSubTab(sub.id as any)}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all ${
                bdsSubTab === sub.id 
                  ? 'text-brand-blue border-b-2 border-brand-blue' 
                  : 'text-slate-400'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'bds' && (
          <>
            {bdsSubTab === 'overview' && (
              <>
                <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doanh thu Meyland</p>
                      <h2 className="text-3xl font-black text-slate-900 mt-1">4,520.5 Tỷ</h2>
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-2">
                        <TrendingUp size={14} /> +15.2% so với cùng kỳ
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-brand-blue">
                      <BarChart3 size={24} />
                    </div>
                  </div>
                  <div className="h-32 w-full flex items-end justify-between gap-1.5 px-1">
                    {[30, 45, 35, 60, 80, 100, 85, 70, 90, 110, 130, 120].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-500 ${i === 10 ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-blue-100'}`} 
                          style={{ height: `${h / 1.5}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                <section className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={16} className="text-brand-blue" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mục tiêu năm</span>
                    </div>
                    <p className="text-xl font-black text-slate-900">5,000 Tỷ</p>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-brand-blue w-[90.4%]"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold">Đạt 90.4% kế hoạch</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <PieChart size={16} className="text-brand-gold" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thị phần BĐS</span>
                    </div>
                    <p className="text-xl font-black text-slate-900">24.5%</p>
                    <p className="text-[10px] text-green-600 font-bold mt-2 flex items-center gap-1">
                      <TrendingUp size={12} /> +2.1% tăng trưởng
                    </p>
                  </div>
                </section>

                <section className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-slate-50 bg-slate-50/30">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Trọng điểm dự án</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { name: 'Meyhomes Capital Phú Quốc', val: '2,150 Tỷ', status: 'Đang mở bán' },
                      { name: 'MeyResort Bãi Lữ', val: '1,240 Tỷ', status: 'Hoàn thiện' },
                      { name: 'MeySenses Lucia Bay', val: '850 Tỷ', status: 'Giai đoạn 1' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                        <div>
                          <p className="text-sm font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-brand-blue font-bold uppercase tracking-widest mt-1">{item.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-900">{item.val}</p>
                          <ChevronRight size={14} className="text-slate-300 inline-block ml-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {bdsSubTab === 'sales' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Kết quả bán hàng tháng</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Căn hộ', val: 145, target: 150, color: 'bg-blue-500' },
                      { label: 'Shophouse', val: 42, target: 50, color: 'bg-emerald-500' },
                      { label: 'Biệt thự', val: 12, target: 15, color: 'bg-brand-gold' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-700">{item.label}</span>
                          <span className="text-xs font-black text-slate-900">{item.val} / {item.target} Căn</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${(item.val / item.target) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Top Best Seller</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { name: 'Đại lý CenLand', sales: '850 Tỷ', units: 45 },
                      { name: 'Đại lý Sunland', sales: '620 Tỷ', units: 32 },
                      { name: 'Đại lý Đất Xanh', sales: '580 Tỷ', units: 28 },
                    ].map((agent, i) => (
                      <div key={i} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 text-[10px]">{i+1}</div>
                          <span className="text-xs font-bold text-slate-700">{agent.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-slate-900">{agent.sales}</p>
                          <p className="text-[10px] text-slate-400 font-bold">{agent.units} Căn</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {bdsSubTab === 'inventory' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Phân bổ rổ hàng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-[10px] font-bold text-brand-blue uppercase">Rổ hàng chung</p>
                      <p className="text-xl font-black text-slate-900 mt-1">450</p>
                      <p className="text-[10px] text-slate-500">Sản phẩm</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase">Rổ hàng độc quyền</p>
                      <p className="text-xl font-black text-slate-900 mt-1">120</p>
                      <p className="text-[10px] text-slate-500">Sản phẩm</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Chi tiết rổ hàng đại lý</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {[
                      { agent: 'CenLand', total: 50, sold: 35, remaining: 15 },
                      { agent: 'Sunland', total: 40, sold: 20, remaining: 20 },
                      { agent: 'Đất Xanh', total: 30, sold: 25, remaining: 5 },
                      { agent: 'ERA Vietnam', total: 25, sold: 10, remaining: 15 },
                    ].map((item, i) => (
                      <div key={i} className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-800">{item.agent}</span>
                          <span className="text-[10px] font-black text-brand-blue">{item.sold}/{item.total}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-brand-blue" style={{ width: `${(item.sold / item.total) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Còn lại: {item.remaining}</span>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase">Tỷ lệ: {Math.round((item.sold / item.total) * 100)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {bdsSubTab === 'booking' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng Booking</p>
                    <h2 className="text-2xl font-black text-slate-900 mt-1">1,245</h2>
                    <p className="text-[10px] text-brand-blue font-bold mt-2">+15% vs tuần trước</p>
                  </div>
                  <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng Tiền Cọc</p>
                    <h2 className="text-2xl font-black text-slate-900 mt-1">62.5 Tỷ</h2>
                    <p className="text-[10px] text-emerald-600 font-bold mt-2">Đã khớp lệnh</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Trạng thái Booking theo dự án</h3>
                  </div>
                  <div className="p-4 space-y-6">
                    {[
                      { name: 'Meyhomes Capital', booking: 850, deposit: 420, rate: 49 },
                      { name: 'MeyResort Bãi Lữ', booking: 240, deposit: 150, rate: 62 },
                      { name: 'MeySenses Lucia Bay', booking: 155, deposit: 55, rate: 35 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                          <span className="text-[10px] font-black text-brand-blue">{item.rate}% Chuyển cọc</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 p-2 rounded border border-slate-100">
                            <p className="text-[8px] font-bold text-slate-400 uppercase">Booking</p>
                            <p className="text-sm font-black text-slate-700">{item.booking}</p>
                          </div>
                          <div className="bg-emerald-50 p-2 rounded border border-emerald-100">
                            <p className="text-[8px] font-bold text-emerald-600 uppercase">Đặt cọc</p>
                            <p className="text-sm font-black text-emerald-700">{item.deposit}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'kimkhi' && (
          <>
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doanh thu Kim khí</p>
                  <h2 className="text-3xl font-black text-slate-900 mt-1">2,840.2 Tỷ</h2>
                  <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-2">
                    <TrendingUp size={14} /> +8.4% so với cùng kỳ
                  </p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-brand-gold">
                  <BarChart3 size={24} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sản lượng Bồn nước</p>
                  <p className="text-lg font-black text-slate-900">125,000 SP</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sản lượng Bình nóng lạnh</p>
                  <p className="text-lg font-black text-slate-900">85,000 SP</p>
                </div>
              </div>
            </div>

            <section className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 bg-slate-50/30">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Phân tích theo khu vực</h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { region: 'Miền Bắc', share: 45, color: 'bg-brand-blue' },
                  { region: 'Miền Nam', share: 35, color: 'bg-brand-gold' },
                  { region: 'Miền Trung', share: 20, color: 'bg-emerald-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span>{item.region}</span>
                      <span>{item.share}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.share}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'hr' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng nhân sự</p>
                <h2 className="text-3xl font-black text-slate-900 mt-1">5,240</h2>
                <p className="text-[10px] text-green-600 font-bold mt-2">+120 tháng này</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tỷ lệ nghỉ việc</p>
                <h2 className="text-3xl font-black text-slate-900 mt-1">1.2%</h2>
                <p className="text-[10px] text-green-600 font-bold mt-2">-0.5% cải thiện</p>
              </div>
            </div>

            <section className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-50 bg-slate-50/30">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Hiệu suất vận hành</h3>
              </div>
              <div className="p-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-blue-50 text-brand-blue rounded-lg flex items-center justify-center">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Chỉ số hài lòng (eNPS)</p>
                      <p className="text-[10px] text-slate-400">Khảo sát quý 1</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-brand-blue">8.5/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                      <Target size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Tỷ lệ hoàn thành KPI</p>
                      <p className="text-[10px] text-slate-400">Toàn tập đoàn</p>
                    </div>
                  </div>
                  <span className="text-lg font-black text-emerald-600">92%</span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
};

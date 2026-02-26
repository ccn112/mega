import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Calendar,
  BarChart3,
  FileText,
  MessageSquare,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectDetail = ({ 
  onBack, 
  onShowTeam, 
  onShowDocuments, 
  onShowTimeline,
  onShowKanban,
  onShowCalendar,
  onShowGantt,
  onShowFinancialDetail,
  onShowRiskDetail
}: { 
  onBack: () => void, 
  onShowTeam: () => void, 
  onShowDocuments: () => void, 
  onShowTimeline: () => void,
  onShowKanban: () => void,
  onShowCalendar: () => void,
  onShowGantt: () => void,
  onShowFinancialDetail: () => void,
  onShowRiskDetail: () => void
}) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 text-sm">Meyhomes Capital Phú Quốc</h1>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
              <MapPin size={10} />
              An Thới, Phú Quốc, Kiên Giang
            </div>
          </div>
        </div>
        <div className="bg-blue-50 text-brand-blue px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
          Đang triển khai
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section */}
        <div className="h-56 relative">
          <img 
            src="https://picsum.photos/seed/meyhomes/800/600" 
            className="w-full h-full object-cover" 
            alt="Project Manager"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Chủ đầu tư</p>
            <h2 className="text-xl font-black">Tập đoàn Tân Á Đại Thành</h2>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Financial Performance */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Hiệu quả tài chính</h3>
              <button 
                onClick={onShowFinancialDetail}
                className="text-[10px] font-bold text-brand-blue uppercase tracking-wider"
              >
                Chi tiết
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Tổng đầu tư', val: '24,800 tỷ', sub: '→ Kế hoạch năm', color: 'text-slate-900' },
                { label: 'Đã giải ngân', val: '12,400 tỷ', sub: '+5.2% vs QK', color: 'text-emerald-500', icon: TrendingUp },
                { label: 'NS còn lại', val: '12,400 tỷ', sub: '-3.1% dự phòng', color: 'text-red-500', icon: TrendingDown },
                { label: 'Biên lợi nhuận', val: '18%', sub: '+1.5% mục tiêu', color: 'text-emerald-500', icon: TrendingUp },
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-lg font-black text-slate-900 mt-1">{item.val}</p>
                  <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${item.color}`}>
                    {item.icon && <item.icon size={10} />}
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Execution Progress */}
          <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Tiến độ thực hiện</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Kế hoạch</span>
                  <span className="text-[10px] font-black text-slate-900">65%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Thực tế</span>
                  <span className="text-[10px] font-black text-brand-blue">58%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-blue rounded-full" style={{ width: '58%' }} />
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="size-4 rounded-full bg-emerald-500 flex items-center justify-center text-white mt-0.5">
                    <CheckCircle2 size={10} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Hoàn thiện phần móng - Phân khu A</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Đã hoàn thành: 15/05/2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-4 rounded-full bg-brand-blue flex items-center justify-center text-white mt-0.5">
                    <Clock size={10} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Cất nóc Block B1 & B2</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Dự kiến: 20/09/2024 (Đang chậm 12 ngày)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Business & Inventory */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Kinh doanh & Kho hàng</h3>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-50">
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng sản phẩm</p>
                <p className="text-xl font-black text-slate-900 mt-1">1,450</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Căn hộ & Shophouse</p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đã bán</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-emerald-600">890</span>
                  <span className="text-[10px] font-bold text-slate-400">(61%)</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tồn kho</p>
                <p className="text-xl font-black text-orange-600 mt-1">560</p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Doanh thu dự kiến</p>
                <p className="text-xl font-black text-brand-blue mt-1">8,240 tỷ</p>
              </div>
            </div>
          </section>

          {/* Issues & Risks */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Vấn đề & Rủi ro (3)</h3>
                <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase">Ưu tiên cao</span>
              </div>
            </div>
            <div className="space-y-3">
              <div 
                onClick={onShowRiskDetail}
                className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3 cursor-pointer group"
              >
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-red-900">Chậm giải phóng mặt bằng Phân khu C</h4>
                  <p className="text-[10px] text-red-700 mt-1">Ảnh hưởng: Trễ tiến độ 4 tuần, phát sinh chi phí phạt</p>
                </div>
                <ChevronRight size={16} className="text-red-300 group-hover:text-red-500 transition-colors" />
              </div>
              <div 
                onClick={onShowRiskDetail}
                className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3 cursor-pointer group"
              >
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-amber-900">Giá vật liệu thép tăng 15%</h4>
                  <p className="text-[10px] text-amber-700 mt-1">Ảnh hưởng: Vượt ngân sách vật tư quý 3</p>
                </div>
                <ChevronRight size={16} className="text-amber-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-white border-t border-slate-200 flex gap-3">
        <button 
          onClick={onShowDocuments}
          className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <FileText size={18} /> Tài liệu
        </button>
        <button className="flex-1 bg-brand-blue text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20">
          <MessageSquare size={18} /> Thảo luận
        </button>
      </div>
    </motion.div>
  );
};

import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Lock 
} from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardScreen = ({ 
  userRole,
  onShowDetail 
}: { 
  userRole: string | null,
  onShowDetail: () => void, 
  key?: string 
}) => {
  const isBOD = userRole === 'HĐQT' || userRole === 'Ban TGĐ & QL';
  const isHR = userRole === 'Nhân sự';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24 p-4 space-y-6"
    >
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
            <Briefcase size={14} className="text-brand-blue" />
            <span className="text-sm font-bold text-slate-700">Tập đoàn Tân Á Đại Thành</span>
          </div>
          <div className="text-[10px] font-medium text-slate-400 uppercase text-right">
            Cập nhật: 09:42<br/>Hôm nay, 24/10
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-brand-blue text-white text-xs font-bold py-2 rounded-lg shadow-lg shadow-brand-blue/20">Năm nay (YTD)</button>
          <button className="flex-1 bg-white text-slate-600 text-xs font-semibold py-2 rounded-lg border border-slate-200">Quý 3</button>
          <button className="flex-1 bg-white text-slate-600 text-xs font-semibold py-2 rounded-lg border border-slate-200">Tháng 10</button>
        </div>
      </section>

      {/* Financial Overview - Only for BOD */}
      {isBOD && (
        <section className="space-y-4">
          <div 
            onClick={onShowDetail}
            className="grid grid-cols-2 gap-4 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm col-span-2">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase">Tổng Doanh Thu Tập Đoàn</p>
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <TrendingUp size={10} /> 12.4%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl font-bold text-slate-900">12,450.8</h2>
                <span className="text-sm font-medium text-slate-400">Tỷ VNĐ</span>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue w-[78%]"></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-medium">Mục tiêu: 16,000 Tỷ</span>
                <span className="text-[10px] text-brand-blue font-bold">78% đạt được</span>
              </div>
            </div>
          </div>

          {/* Real Estate Specific Summary for BOD */}
          <div 
            onClick={onShowDetail}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Kinh doanh Bất động sản</h4>
              <span className="px-2 py-0.5 bg-blue-50 text-brand-blue text-[8px] font-black rounded uppercase">Meyland</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Booking</p>
                <p className="text-sm font-black text-slate-900">1,245</p>
              </div>
              <div className="text-center border-x border-slate-50">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Đặt cọc</p>
                <p className="text-sm font-black text-brand-blue">622</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Tỷ lệ khớp</p>
                <p className="text-sm font-black text-emerald-600">50%</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-slate-500">Tiến độ rổ hàng đại lý</span>
                <span className="text-[10px] font-black text-brand-blue">68%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue w-[68%]"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HR Overview - Only for HR */}
      {isHR && (
        <section className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Tổng quan nhân sự</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Biến động NS</p>
              <p className="text-lg font-black text-slate-900 mt-1">2.4%</p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                <TrendingUp size={10} /> +0.2% vs QK
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chi phí lương</p>
              <p className="text-lg font-black text-slate-900 mt-1">45.2 Tỷ</p>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                Trong ngân sách
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-br from-brand-blue to-blue-700 p-4 rounded-lg shadow-xl shadow-brand-blue/30 text-white relative overflow-hidden">
        <div className="relative z-10 flex gap-4">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md self-start">
            <Zap size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1">Phân tích từ AI Insight</h4>
            <p className="text-xs text-white/80 leading-relaxed italic">
              {isBOD 
                ? '"Doanh thu mảng BĐS Meyland dự kiến tăng 15% vào Q4 nhờ dự án Meyhomes Capital Phú Quốc giai đoạn 2 bắt đầu ghi nhận bàn giao."'
                : isHR 
                  ? '"Chương trình đào tạo kỹ năng số cho nhân viên khối văn phòng đang đạt tỷ lệ tham gia 85%, cao hơn 10% so với mục tiêu."'
                  : '"Bạn có 3 tờ trình đang chờ phê duyệt và 2 nhiệm vụ dự án cần hoàn thành trong hôm nay."'}
            </p>
            <button className="mt-3 text-[10px] font-bold uppercase bg-white text-brand-blue px-3 py-1.5 rounded-full flex items-center gap-1">
              Xem chi tiết <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* Unit Performance - Only for BOD */}
      {isBOD && (
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800">Hiệu quả đơn vị thành viên</h3>
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {[
              { id: '01', name: 'BĐS Meyland', sub: 'Hàng hiệu quốc tế', val: '4,520 Tỷ', trend: '+15.2%' },
              { id: '02', name: 'Kim khí Stromman', sub: 'Ống nhựa & Năng lượng', val: '3,115 Tỷ', trend: '+5.8%' },
              { id: '03', name: 'Hóa chất Chemco', sub: 'Công nghiệp', locked: true },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 ${item.locked ? 'bg-slate-50/50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-xs">{item.id}</div>
                  <div className={item.locked ? 'opacity-60' : ''}>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.sub}</p>
                  </div>
                </div>
                {item.locked ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-200/50 rounded-full text-slate-500">
                    <Lock size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Hạn chế</span>
                  </div>
                ) : (
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.val}</p>
                    <p className="text-[10px] text-green-600 font-bold">{item.trend}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

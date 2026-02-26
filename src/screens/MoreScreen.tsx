import React from 'react';
import { 
  Bot, 
  Building2, 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Shield,
  Bell,
  Smartphone,
  Globe,
  Database,
  PieChart
} from 'lucide-react';
import { motion } from 'motion/react';
import { odoo } from '../services/odooService';

export const MoreScreen = ({ 
  userRole,
  onShowAI, 
  onShowCRM, 
  onShowDashboard,
  onLogout,
  onSimulateNotification
}: { 
  userRole?: string | null,
  onShowAI: () => void, 
  onShowCRM: () => void, 
  onShowDashboard: () => void,
  onLogout: () => void,
  onSimulateNotification?: (type: 'project' | 'task' | 'proposal' | 'approval') => void
}) => {
  const user = odoo.getCurrentUser();
  const displayName = user?.name || 'Người dùng';
  const displayRole = userRole || 'Nhân sự';
  const displayAvatar = user?.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyodQTBPDqKiieiG9uPNA_Vr1-wEx33DZp83o1Ac1OyJgt4VY1dOBDb3F1QBaByoLxMxV5rpEpMaybBIruU4Ekh4XwMi-E9aO7pdBlHAXJsfWSQClOodHv4zCMBsLLR3zigvSuCoPXQiQfuNZTgSt517fygttY0pXDJKKkb8XvkuA2vPlCYs5hk5ld7sNSi2CGWcxWb8_j54KFyymgeCjoW9hP9U67-HvibEyudoH72-wI6nP2VQ7myCpO68-G9-qzqb6WWDnu20Z0';

  const apps = [
    { label: 'AI Agent', icon: Bot, color: 'bg-indigo-50 text-indigo-600', action: onShowAI, desc: 'Trợ lý ảo thông minh' },
    { label: 'CRM', icon: Building2, color: 'bg-blue-50 text-blue-600', action: onShowCRM, desc: 'Quản trị khách hàng' },
    { label: 'BI Dashboard', icon: LayoutDashboard, color: 'bg-emerald-50 text-emerald-600', action: onShowDashboard, desc: 'Báo cáo quản trị' },
    { label: 'Dữ liệu tập trung', icon: Database, color: 'bg-amber-50 text-amber-600', action: () => {}, desc: 'Kho tài liệu số' },
    { label: 'Phân tích thị trường', icon: PieChart, color: 'bg-purple-50 text-purple-600', action: () => {}, desc: 'Dữ liệu ngành' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-24">
        {/* User Profile Summary */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <img 
            src={displayAvatar}
            className="size-14 rounded-full object-cover ring-4 ring-blue-50"
            alt="User"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">{displayName}</h4>
            <p className="text-xs text-slate-500 font-medium truncate">{displayRole}</p>
          </div>
          <button className="p-2 text-slate-300 hover:text-brand-blue transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Simulation Section */}
        {/* {onSimulateNotification && (
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Mô phỏng Push Notification</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onSimulateNotification('project')}
                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600 hover:border-brand-blue transition-all"
              >
                Dự án mới
              </button>
              <button 
                onClick={() => onSimulateNotification('task')}
                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600 hover:border-brand-blue transition-all"
              >
                Công việc mới
              </button>
              <button 
                onClick={() => onSimulateNotification('proposal')}
                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600 hover:border-brand-blue transition-all"
              >
                Phiếu cần duyệt
              </button>
              <button 
                onClick={() => onSimulateNotification('approval')}
                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-[10px] font-bold text-slate-600 hover:border-brand-blue transition-all"
              >
                Duyệt nhanh
              </button>
            </div>
          </section>
        )} */}

        {/* Apps Grid */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Ứng dụng mở rộng</h3>
          <div className="grid grid-cols-1 gap-3">
            {apps.map((app, i) => (
              <button 
                key={i} 
                onClick={app.action}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-brand-blue/30 transition-all group"
              >
                <div className={`size-12 rounded-xl ${app.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <app.icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-sm font-bold text-slate-900">{app.label}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{app.desc}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* System & Settings */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Hệ thống</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
            {[
              { label: 'Thông báo', icon: Bell, color: 'text-blue-500' },
              { label: 'Bảo mật & Quyền riêng tư', icon: Shield, color: 'text-emerald-500' },
              { label: 'Thiết bị đã kết nối', icon: Smartphone, color: 'text-purple-500' },
              { label: 'Ngôn ngữ', icon: Globe, color: 'text-amber-500', extra: 'Tiếng Việt' },
              { label: 'Trợ giúp & Hỗ trợ', icon: HelpCircle, color: 'text-slate-400' },
            ].map((item, i) => (
              <button key={i} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={item.color} />
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.extra && <span className="text-[10px] font-bold text-slate-400">{item.extra}</span>}
                  <ChevronRight size={14} className="text-slate-300" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} /> Đăng xuất
        </button>

        <div className="text-center">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Tân Á Đại Thành • Version 2.4.0</p>
        </div>
      </div>
    </motion.div>
  );
};

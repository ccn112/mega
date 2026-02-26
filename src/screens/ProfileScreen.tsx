import React from 'react';
import { 
  User, 
  Briefcase, 
  IdCard, 
  MapPin, 
  Lock, 
  Settings, 
  ChevronRight, 
  Camera,
  LogOut,
  ShieldCheck,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { odoo, OdooUser } from '../services/odooService';

export const ProfileScreen = ({ onBack, onLogout }: { onBack: () => void, onLogout: () => void }) => {
  const [realUser, setRealUser] = React.useState<OdooUser | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = () => {
      setLoading(true);
      try {
        const user = odoo.getCurrentUser();
        setRealUser(user);
      } catch (err) {
        console.error('Failed to fetch real user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const sections = [
    {
      title: 'Thông tin cá nhân',
      icon: User,
      items: [
        { label: 'Họ và tên', value: realUser?.name || 'Nguyễn Văn A', icon: User },
        { label: 'Ngày sinh', value: '15/05/1990', icon: Calendar },
        { label: 'Email', value: realUser?.username || 'anv@tanadaithanh.vn', icon: Mail },
        { label: 'Số điện thoại', value: '0901 234 567', icon: Phone },
      ]
    },
    {
      title: 'Vị trí công tác',
      icon: Briefcase,
      items: [
        { label: 'Mã nhân viên', value: realUser?.uid?.toString() || 'TAD-8899', icon: IdCard },
        { label: 'Phòng ban', value: realUser?.company_name || 'Ban Chuyển đổi số', icon: Briefcase },
        { label: 'Chức vụ', value: 'Chuyên viên Cao cấp', icon: ShieldCheck },
        { label: 'Ngày vào làm', value: '01/01/2022', icon: Calendar },
      ]
    },
    {
      title: 'Giấy tờ & Địa chỉ',
      icon: IdCard,
      items: [
        { label: 'Số CCCD', value: '001090123456', icon: IdCard },
        { label: 'Ngày cấp', value: '20/10/2021', icon: Calendar },
        { label: 'Địa chỉ thường trú', value: '124 Tôn Đức Thắng, Đống Đa, Hà Nội', icon: MapPin },
      ]
    },
    {
      title: 'Bảo mật & Đăng nhập',
      icon: Lock,
      items: [
        { label: 'Tên đăng nhập', value: 'anv.tad', icon: User },
        { label: 'Phương thức SSO', value: 'Microsoft Azure AD', icon: ShieldCheck },
        { label: 'Xác thực 2 lớp', value: 'Đã bật', icon: Lock },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[70] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="text-slate-500 font-bold text-sm">Đóng</button>
        <h1 className="font-black text-brand-blue uppercase tracking-tight">Hồ sơ nhân sự</h1>
        <button onClick={onLogout} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto pb-10">
        {/* Profile Header */}
        <div className="bg-white p-8 flex flex-col items-center border-b border-slate-100">
          <div className="relative">
            <div className="size-28 rounded-lg border-4 border-brand-blue/10 p-1 shadow-xl">
              <img 
                className="w-full h-full rounded-lg object-cover" 
                src={realUser?.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDyodQTBPDqKiieiG9uPNA_Vr1-wEx33DZp83o1Ac1OyJgt4VY1dOBDb3F1QBaByoLxMxV5rpEpMaybBIruU4Ekh4XwMi-E9aO7pdBlHAXJsfWSQClOodHv4zCMBsLLR3zigvSuCoPXQiQfuNZTgSt517fygttY0pXDJKKkb8XvkuA2vPlCYs5hk5ld7sNSi2CGWcxWb8_j54KFyymgeCjoW9hP9U67-HvibEyudoH72-wI6nP2VQ7myCpO68-G9-qzqb6WWDnu20Z0"} 
                alt="Avatar"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-0 right-0 size-10 bg-brand-blue text-white rounded-lg flex items-center justify-center shadow-lg border-4 border-white active:scale-90 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900">{realUser?.name || "Nguyễn Văn A"}</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">{realUser?.company_name || "Ban Chuyển đổi số"}</p>
          {loading && <p className="text-[10px] text-brand-blue animate-pulse mt-2">Chờ tí...</p>}
        </div>

        {/* Info Sections */}
        <div className="p-4 space-y-6">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <section.icon size={16} className="text-brand-blue" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">{section.title}</h3>
              </div>
              <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                {section.items.map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-blue transition-colors">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-semibold text-slate-700">{item.value}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-200" />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Settings Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Settings size={16} className="text-brand-blue" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Thiết lập ứng dụng</h3>
            </div>
            <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Settings size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Chế độ tối (Dark Mode)</span>
                </div>
                <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                  <div className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Quyền riêng tư</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

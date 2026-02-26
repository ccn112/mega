import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  ChevronRight,
  Filter,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';

interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  type: 'VIP' | 'Potential' | 'Regular';
  status: 'Active' | 'Lead';
}

export const CRMScreen = ({ onBack }: { onBack?: () => void }) => {
  const customers: Customer[] = [
    { id: '1', name: 'Nguyễn Văn X', company: 'Công ty XD Hòa Bình', phone: '0901234567', email: 'x.nguyen@hoabinh.com', type: 'VIP', status: 'Active' },
    { id: '2', name: 'Trần Thị Y', company: 'Tập đoàn Vingroup', phone: '0912345678', email: 'y.tran@vingroup.com', type: 'VIP', status: 'Lead' },
    { id: '3', name: 'Lê Văn Z', company: 'Bất động sản CenLand', phone: '0987654321', email: 'z.le@cenland.vn', type: 'Potential', status: 'Active' },
    { id: '4', name: 'Phạm Văn M', company: 'Nội thất Hòa Phát', phone: '0933445566', email: 'm.pham@hoaphat.com', type: 'Regular', status: 'Active' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50 fixed inset-0 z-[80]"
    >
      {onBack && (
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-sm">Quản lý Khách hàng</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">CRM System</p>
            </div>
          </div>
          <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
            <Plus size={20} />
          </button>
        </header>
      )}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm khách hàng..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Tổng khách hàng</p>
            <p className="text-xl font-black text-slate-900">1,248</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Cơ hội mới</p>
            <p className="text-xl font-black text-brand-blue">42</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:border-brand-blue/30 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-lg flex items-center justify-center ${
                  customer.type === 'VIP' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-brand-blue'
                }`}>
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{customer.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building2 size={12} className="text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">{customer.company}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-brand-blue'
              }`}>
                {customer.status}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Phone size={12} />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <Mail size={12} />
                  {customer.email}
                </div>
              </div>
              <button className="p-1.5 text-slate-300 hover:text-brand-blue transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

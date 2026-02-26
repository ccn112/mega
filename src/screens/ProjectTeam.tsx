import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  UserPlus,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';

interface Member {
  id: string;
  name: string;
  role: string;
  dept: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
}

export const ProjectTeam = ({ onBack }: { onBack: () => void }) => {
  const members: Member[] = [
    { id: '1', name: 'Nguyễn Văn A', role: 'Quản trị dự án (PM)', dept: 'Ban Dự án', avatar: 'https://picsum.photos/seed/1/100/100', status: 'online' },
    { id: '2', name: 'Trần Thị B', role: 'Kỹ sư hiện trường', dept: 'Phòng Kỹ thuật', avatar: 'https://picsum.photos/seed/2/100/100', status: 'busy' },
    { id: '3', name: 'Lê Văn C', role: 'Giám sát thi công', dept: 'Phòng Kỹ thuật', avatar: 'https://picsum.photos/seed/3/100/100', status: 'offline' },
    { id: '4', name: 'Phạm Thị D', role: 'Kế toán dự án', dept: 'Phòng Tài chính', avatar: 'https://picsum.photos/seed/4/100/100', status: 'online' },
    { id: '5', name: 'Hoàng Văn E', role: 'Chuyên viên Pháp chế', dept: 'Phòng Pháp chế', avatar: 'https://picsum.photos/seed/5/100/100', status: 'online' },
  ];

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
          <div>
            <h1 className="font-bold text-slate-900 text-sm">Đội ngũ dự án</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">12 thành viên</p>
          </div>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <UserPlus size={20} />
        </button>
      </header>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm thành viên..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-brand-blue/30 transition-all">
            <div className="relative">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="size-12 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <span className={`absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-white ${
                member.status === 'online' ? 'bg-emerald-500' : 
                member.status === 'busy' ? 'bg-red-500' : 'bg-slate-300'
              }`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">{member.name}</h3>
              <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">{member.dept}</p>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                <MessageSquare size={16} />
              </button>
              <button className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                <Phone size={16} />
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}

        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold hover:border-brand-blue/40 hover:text-brand-blue transition-all flex items-center justify-center gap-2">
          <UserPlus size={16} />
          Mời thêm thành viên
        </button>
      </div>
    </motion.div>
  );
};

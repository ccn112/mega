import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  FileText,
  MessageSquare,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdvancedFilterModal } from '../components/AdvancedFilterModal';

type ProposalStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'draft';

interface Proposal {
  id: string;
  title: string;
  code: string;
  creator: string;
  date: string;
  status: ProposalStatus;
  department: string;
  priority: 'low' | 'medium' | 'high';
  sla?: string; // Time remaining for current step
}

const mockProposals: Proposal[] = [
  { id: '1', title: 'Đề xuất mua sắm máy in văn phòng', code: 'TTR-2024-001', creator: 'Nguyễn Văn A', date: '2024-02-20', status: 'pending', department: 'Hành chính', priority: 'medium', sla: 'Còn 4h 15p' },
  { id: '2', title: 'Tờ trình phê duyệt kế hoạch marketing Q2', code: 'TTR-2024-002', creator: 'Trần Thị B', date: '2024-02-18', status: 'approved', department: 'Marketing', priority: 'high' },
  { id: '3', title: 'Yêu cầu cấp kinh phí sự kiện tất niên', code: 'TTR-2024-003', creator: 'Lê Văn C', date: '2024-02-15', status: 'rejected', department: 'Công đoàn', priority: 'medium' },
  { id: '4', title: 'Đề xuất tuyển dụng nhân viên IT', code: 'TTR-2024-004', creator: 'Phạm Văn D', date: '2024-02-21', status: 'draft', department: 'Nhân sự', priority: 'low' },
  { id: '5', title: 'Tờ trình nâng cấp hệ thống ERP', code: 'TTR-2024-005', creator: 'Hoàng Văn E', date: '2024-02-19', status: 'pending', department: 'IT', priority: 'high', sla: 'Quá hạn 2h' },
];

export const ProposalScreen = ({ onShowDetail }: { onShowDetail: (id: string) => void, key?: string }) => {
  const [filter, setFilter] = useState<ProposalStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  const filteredProposals = mockProposals.filter(p => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status: ProposalStatus) => {
    switch (status) {
      case 'pending': return { label: 'Chờ duyệt', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock };
      case 'approved': return { label: 'Đã duyệt', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 };
      case 'rejected': return { label: 'Từ chối', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle };
      case 'draft': return { label: 'Bản nháp', color: 'text-slate-500', bg: 'bg-slate-100', icon: FileText };
      default: return { label: 'Tất cả', color: 'text-slate-600', bg: 'bg-slate-50', icon: AlertCircle };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 pb-24 space-y-4"
    >
      <AdvancedFilterModal isOpen={showAdvancedFilter} onClose={() => setShowAdvancedFilter(false)} />

      {/* Search & Filter Header */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm tờ trình, mã số..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAdvancedFilter(true)}
            className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-brand-blue hover:text-brand-blue transition-all"
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {(['all', 'pending', 'approved', 'rejected', 'draft'] as ProposalStatus[]).map((s) => {
            const config = getStatusConfig(s);
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive 
                    ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-brand-blue/30'
                }`}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => {
            const status = getStatusConfig(proposal.status);
            return (
              <motion.div
                key={proposal.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden"
              >
                <div onClick={() => onShowDetail(proposal.id)} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col gap-1">
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${status.bg} ${status.color}`}>
                        <status.icon size={12} />
                        {status.label}
                      </div>
                      {proposal.sla && (
                        <div className={`text-[9px] font-bold flex items-center gap-1 ${proposal.sla.includes('Quá hạn') ? 'text-red-500' : 'text-brand-blue'}`}>
                          <Clock size={10} />
                          {proposal.sla}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">{proposal.code}</span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {proposal.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                        {proposal.creator.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-700 leading-none">{proposal.creator}</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">{proposal.department}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-[10px] font-medium">{proposal.date}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                {proposal.status === 'pending' && (
                  <div className="flex border-t border-slate-50 bg-slate-50/30">
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Quick Approve'); }}
                      className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Check size={14} />
                      Duyệt nhanh
                    </button>
                    <div className="w-px bg-slate-100" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Quick Reject'); }}
                      className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={14} />
                      Từ chối
                    </button>
                    <div className="w-px bg-slate-100" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Quick Comment'); }}
                      className="flex-1 py-2.5 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      <MessageSquare size={14} />
                      Phản hồi
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="font-bold text-slate-900">Không tìm thấy tờ trình</h3>
            <p className="text-xs text-slate-500 mt-1">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

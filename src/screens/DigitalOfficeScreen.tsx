import React, { useEffect, useMemo, useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Users, 
  Clock, 
  Calendar,
  ChevronRight,
  TrendingUp,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProposalScreen } from './ProposalScreen';
import { HRScreen } from './HRScreen';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { odoo, ApprovalRequest, RecentDocument } from '../services/odooService';

export const DigitalOfficeScreen = ({ 
  userRole,
  onShowProposal, 
  onShowApproval,
  onOpenProposalDetail,
  onCheckIn,
  onCheckOut,
  onShowPayroll,
  onShowBenefits
}: { 
  userRole: string | null,
  onShowProposal: () => void, 
  onShowApproval: () => void,
  onOpenProposalDetail: (id: number) => void,
  onCheckIn: () => void,
  onCheckOut: () => void,
  onShowPayroll: () => void,
  onShowBenefits: () => void
}) => {
  const [activeTab, setActiveTab] = useState<'office' | 'hr'>('office');
  const [pendingCount, setPendingCount] = useState(0);
  const [allRequests, setAllRequests] = useState<ApprovalRequest[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ApprovalRequest[]>([]);
  const [approvedRequests, setApprovedRequests] = useState<ApprovalRequest[]>([]);
  const [cancelledRequests, setCancelledRequests] = useState<ApprovalRequest[]>([]);
  const [pendingTab, setPendingTab] = useState<'all' | 'pending' | 'approved' | 'cancelled'>('all');
  const [recentDocs, setRecentDocs] = useState<RecentDocument[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<RecentDocument | null>(null);

  const formatDateTime = (value?: string) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
  };

  const formatFileSize = (size?: number) => {
    if (!size || size <= 0) return 'N/A';
    if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    if (size >= 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${size} B`;
  };

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const count = await odoo.getUserPendingApprovalCount();
        setPendingCount(count);
      } catch (error) {
        console.warn('Không tải được thống kê tờ trình:', error);
      }
    };

    loadSummary();
  }, []);

  useEffect(() => {
    if (activeTab !== 'office') return;

    const loadPending = async () => {
      setLoadingPending(true);
      try {
        const pendingStatuses = ['pending', 'new', 'waiting', 'confirm'];
        const approvedStatuses = ['approved', 'done'];
        const cancelledStatuses = ['refused', 'rejected', 'cancel', 'cancelled'];

        const [pending, approved, cancelled] = await Promise.all([
          odoo.getUserApprovalRequestsByStatuses(pendingStatuses, 5),
          odoo.getUserApprovalRequestsByStatuses(approvedStatuses, 5),
          odoo.getUserApprovalRequestsByStatuses(cancelledStatuses, 5),
        ]);

        const allMap = new Map<number, ApprovalRequest>();
        [...pending, ...approved, ...cancelled].forEach((item) => {
          allMap.set(item.id, item);
        });

        const all = Array.from(allMap.values()).sort((a, b) => {
          const dateA = a.create_date ? new Date(a.create_date).getTime() : 0;
          const dateB = b.create_date ? new Date(b.create_date).getTime() : 0;
          if (dateA !== dateB) return dateB - dateA;
          return (b.id || 0) - (a.id || 0);
        }).slice(0, 5);

        setAllRequests(all);
        setPendingRequests(pending || []);
        setApprovedRequests(approved || []);
        setCancelledRequests(cancelled || []);
      } catch (error) {
        console.warn('Không tải được tờ trình chờ duyệt:', error);
      } finally {
        setLoadingPending(false);
      }
    };

    const loadDocs = async () => {
      setLoadingDocs(true);
      try {
        const data = await odoo.getRecentDocuments(5);
        setRecentDocs(data || []);
      } catch (error) {
        console.warn('Không tải được tài liệu gần đây:', error);
      } finally {
        setLoadingDocs(false);
      }
    };

    loadPending();
    loadDocs();
  }, [activeTab]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-50"
    >
      {/* Tab Switcher */}
      <div className="px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('office')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'office' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            <span className="relative inline-flex items-center justify-center">
              Văn phòng số
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-4 min-w-4 px-1.5 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('hr')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'hr' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500'
            }`}
          >
            Nhân sự (HR)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'office' ? (
            <motion.div 
              key="office"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="p-4 space-y-6"
            >
              {/* Quick Access */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={onShowProposal} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:border-brand-blue/30 transition-all">
                  <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-brand-blue">
                    <FileText size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Tạo Tờ trình</span>
                </button>
                <button onClick={onShowApproval} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center gap-2 hover:border-brand-blue/30 transition-all">
                  <div className="relative size-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={20} />
                    {pendingCount > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-4 px-1.5 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700">Phê duyệt</span>
                </button>
              </div>

              {/* Pending Tasks */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Tờ trình</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    { key: 'all', label: 'Tất cả' },
                    { key: 'pending', label: 'Chờ duyệt' },
                    { key: 'approved', label: 'Đã duyệt' },
                    { key: 'cancelled', label: 'Đã hủy' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setPendingTab(tab.key as typeof pendingTab)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap border transition-all ${
                        pendingTab === tab.key
                          ? 'bg-brand-blue text-white border-brand-blue'
                          : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {loadingPending ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3 text-slate-500">
                      <div className="size-5 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                      Đang tải tờ trình...
                    </div>
                  ) : (pendingTab === 'pending' ? pendingRequests.length === 0 :
                    pendingTab === 'approved' ? approvedRequests.length === 0 :
                    pendingTab === 'cancelled' ? cancelledRequests.length === 0 : allRequests.length === 0) ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-500">
                      Không có tờ trình phù hợp.
                    </div>
                  ) : (
                    (pendingTab === 'pending'
                      ? pendingRequests
                      : pendingTab === 'approved'
                        ? approvedRequests
                        : pendingTab === 'cancelled'
                          ? cancelledRequests
                          : allRequests
                    ).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onOpenProposalDetail(item.id)}
                        className="w-full text-left bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-brand-blue/30 transition-all"
                      >
                        <div className="size-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                          {item.request_owner_id?.[0] ? (
                            <img src={`/api/odoo/web/image?model=res.users&id=${item.request_owner_id[0]}&field=avatar_128`} alt="requester" className="w-full h-full object-cover" />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.request_owner_id?.[1] || 'N/A'} • {item.company_id?.[1] || 'N/A'}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">Tờ trình • {formatDateTime(item.create_date || item.date_confirmed)}</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                    ))
                  )}
                </div>
              </section>

              {/* Recent Documents */}
              <section>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Tài liệu gần đây</h3>
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-50">
                  {loadingDocs ? (
                    <div className="p-3 text-xs text-slate-500">Đang tải tài liệu...</div>
                  ) : recentDocs.length === 0 ? (
                    <div className="p-3 text-xs text-slate-500">Chưa có tài liệu gần đây.</div>
                  ) : (
                    recentDocs.map((doc) => (
                      <button key={doc.id} onClick={() => setSelectedDoc(doc)} className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText size={18} className="text-slate-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-700 truncate">{doc.name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2">{formatFileSize(doc.file_size)}</span>
                      </button>
                    ))
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="hr"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <HRScreen 
                userRole={userRole}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
                onShowPayroll={onShowPayroll}
                onShowBenefits={onShowBenefits}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <DocumentPreviewModal
            doc={{
              id: selectedDoc.id,
              name: selectedDoc.name,
              download_url: selectedDoc.download_url,
              file_size: selectedDoc.file_size
            }}
            isOpen={!!selectedDoc}
            onClose={() => setSelectedDoc(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

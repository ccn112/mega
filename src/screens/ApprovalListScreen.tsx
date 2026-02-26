import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Plus,
  RefreshCw,
  Calendar,
  User,
  DollarSign,
  MessageSquare,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { odoo, ApprovalRequest } from '../services/odooService';
import { ProposalDetail } from './ProposalDetail';
import { ApprovalFilterModal, ApprovalFilterState } from '../components/ApprovalFilterModal';

type StatusTab = 'all' | 'pending' | 'approved' | 'rejected';

export const ApprovalListScreen = ({ onBack }: { onBack: () => void }) => {
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState<StatusTab>('all');
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [activeAvatarId, setActiveAvatarId] = useState<number | null>(null);
  const [counts, setCounts] = useState({ all: 0, pending: 0, approved: 0, rejected: 0 });
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState<ApprovalFilterState>({
    type: null,
    company: null,
    category: null,
    requester: null,
    statuses: [],
  });
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchRequests = useCallback(async (isRefresh = false, customOffset?: number) => {
    const isLoadMore = !isRefresh;
    if (isRefresh) {
      setRefreshing(true);
      setOffset(0);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentOffset = typeof customOffset === 'number' ? customOffset : (isRefresh ? 0 : offset);
      const data = await odoo.getApprovalRequests(limit, currentOffset);
      
      if (data && Array.isArray(data)) {
        if (isRefresh) {
          setRequests(data);
        } else {
          setRequests(prev => [...prev, ...data]);
        }
        setHasMore(data.length === limit);
        setOffset(currentOffset + data.length);
      } else {
        console.warn('Odoo returned unexpected data format for approvals:', data);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      // Optionally show a toast or error message in UI
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      }
      setRefreshing(false);
      setLoading(false);
    }
  }, [limit, offset]);

  const fetchCounts = useCallback(async () => {
    try {
      const [data, userPending] = await Promise.all([
        odoo.getApprovalRequestCounts(),
        odoo.getUserPendingApprovalCount(),
      ]);
      setCounts({ ...data, pending: userPending });
    } catch (error) {
      console.warn('Không tải được thống kê tờ trình:', error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchRequests(true);
    fetchCounts();
  }, []);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loadingMore && !loading && !refreshing) {
          fetchRequests(false);
        }
      },
      { root: null, rootMargin: '120px', threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, refreshing, fetchRequests]);

  const getStatusColor = (status: string) => {
    const mapped = odoo.mapApprovalStatus(status);
    switch (mapped) {
      case 'approved': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    const mapped = odoo.mapApprovalStatus(status);
    switch (mapped) {
      case 'approved': return <CheckCircle2 size={12} />;
      case 'pending': return <Clock size={12} />;
      case 'rejected': return <XCircle size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  const getStatusLabel = (status: string) => {
    return odoo.getApprovalStatusLabel(status);
  };

  const handleApprove = async (requestId: number) => {
    setProcessingId(requestId);
    try {
      await odoo.approveApprovalRequest(requestId);
      await fetchRequests(true, 0);
      alert('Đã duyệt tờ trình');
    } catch (error: any) {
      alert(error?.message || 'Duyệt tờ trình thất bại');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: number) => {
    const reason = window.prompt('Nhập lý do từ chối', '') || '';
    setProcessingId(requestId);
    try {
      await odoo.rejectApprovalRequest(requestId, reason);
      await fetchRequests(true, 0);
      alert('Đã từ chối tờ trình');
    } catch (error: any) {
      alert(error?.message || 'Từ chối tờ trình thất bại');
    } finally {
      setProcessingId(null);
    }
  };

  const handleComment = async (requestId: number) => {
    const content = window.prompt('Nhập bình luận/ghi chú', '') || '';
    if (!content.trim()) return;
    setProcessingId(requestId);
    try {
      await odoo.commentApprovalRequest(requestId, content);
      await fetchRequests(true, 0);
      alert('Đã gửi bình luận');
    } catch (error: any) {
      alert(error?.message || 'Gửi bình luận thất bại');
    } finally {
      setProcessingId(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDateTime = (value?: string) => {
    if (!value) return 'N/A';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
  };

  const typeOptions = useMemo(() => {
    const set = new Map<string, string>();
    requests.forEach((req) => {
      const value = (req.code || '').split('-')[0];
      if (value) set.set(value, value);
    });
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [requests]);

  const companyOptions = useMemo(() => {
    const set = new Map<string, string>();
    requests.forEach((req) => {
      if (Array.isArray(req.company_id) && req.company_id[1]) {
        set.set(String(req.company_id[0]), req.company_id[1]);
      }
    });
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [requests]);

  const categoryOptions = useMemo(() => {
    const set = new Map<string, string>();
    requests.forEach((req) => {
      if (Array.isArray(req.category_id) && req.category_id[1]) {
        set.set(String(req.category_id[0]), req.category_id[1]);
      }
    });
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [requests]);

  const requesterOptions = useMemo(() => {
    const set = new Map<string, string>();
    requests.forEach((req) => {
      if (Array.isArray(req.request_owner_id) && req.request_owner_id[1]) {
        set.set(String(req.request_owner_id[0]), req.request_owner_id[1]);
      }
    });
    return Array.from(set.entries()).map(([value, label]) => ({ value, label }));
  }, [requests]);

  const filteredRequests = requests.filter(req => {
    const status = odoo.mapApprovalStatus(req.request_status);
    const matchesStatus = statusTab === 'all' || status === statusTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch = (req.name || '').toLowerCase().includes(query) ||
      (req.code || '').toLowerCase().includes(query) ||
      (req.reason || '').toLowerCase().includes(query);

    const matchesType = !advancedFilter.type || (req.code || '').startsWith(advancedFilter.type);
    const matchesCompany = !advancedFilter.company || String(req.company_id?.[0] || '') === advancedFilter.company;
    const matchesCategory = !advancedFilter.category || String(req.category_id?.[0] || '') === advancedFilter.category;
    const matchesRequester = !advancedFilter.requester || String(req.request_owner_id?.[0] || '') === advancedFilter.requester;
    const matchesAdvancedStatus = advancedFilter.statuses.length === 0 || advancedFilter.statuses.includes(status);

    return matchesStatus && matchesSearch && matchesType && matchesCompany && matchesCategory && matchesRequester && matchesAdvancedStatus;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const dateA = a.create_date ? new Date(a.create_date).getTime() : (a.date_confirmed ? new Date(a.date_confirmed).getTime() : 0);
    const dateB = b.create_date ? new Date(b.create_date).getTime() : (b.date_confirmed ? new Date(b.date_confirmed).getTime() : 0);
    if (dateA !== dateB) return dateB - dateA;
    return (b.id || 0) - (a.id || 0);
  });

  const sortedApproverIds = (req: ApprovalRequest) => {
    const ids = Array.isArray(req.approver_ids) ? req.approver_ids : [];
    if (ids.length === 0) return req.next_approver_ids || [];
    return ids;
  };

  const tabCounts = counts;

  const isUserPending = (req: ApprovalRequest) => {
    const userStatus = odoo.mapApprovalStatus(req.user_status || req.request_status || '');
    return userStatus === 'pending';
  };

  const getRequesterAvatar = (req: ApprovalRequest) => {
    const requesterId = Array.isArray(req.request_owner_id) ? req.request_owner_id[0] : null;
    if (!requesterId) return null;
    return {
      id: requesterId,
      name: req.request_owner_id?.[1] || 'N/A',
      url: `/api/odoo/web/image?model=res.users&id=${requesterId}&field=avatar_128`,
    };
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h1 className="font-black text-brand-blue uppercase tracking-tight leading-tight whitespace-normal">Danh sách tờ trình</h1>
        </div>
        <button 
          onClick={() => {
            fetchRequests(true);
            fetchCounts();
          }}
          className={`p-2 hover:bg-slate-100 rounded-full transition-colors ${refreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={20} className="text-slate-600" />
        </button>
      </header>

      {/* Search & Filter */}
      <div className="p-4 bg-white border-b border-slate-200 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm tờ trình, mã, lý do..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setShowAdvancedFilter(true)}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-brand-blue/30 hover:text-brand-blue transition-all"
          >
            <Filter size={18} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: `Tất cả (${tabCounts.all})` },
            { id: 'pending', label: `Chờ duyệt (${tabCounts.pending})` },
            { id: 'approved', label: `Đã duyệt (${tabCounts.approved})` },
            { id: 'rejected', label: `Từ chối (${tabCounts.rejected})` },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setStatusTab(tab.id as StatusTab)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all ${
                statusTab === tab.id
                  ? 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/20' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="size-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chờ tí...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-2">
            <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-2">
              <FileText size={32} />
            </div>
            <p className="text-sm font-bold text-slate-500">Không tìm thấy tờ trình nào</p>
            <p className="text-xs text-slate-400">Thử thay đổi từ khóa tìm kiếm</p>
          </div>
        ) : (
          <>
            {sortedRequests.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedRequestId(req.id)}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-all group active:scale-[0.98]"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-brand-blue uppercase tracking-wider bg-brand-blue/5 px-2 py-0.5 rounded">
                        {req.code || 'NO-CODE'}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-widest ${getStatusColor(req.request_status)}`}>
                        {getStatusIcon(req.request_status)}
                        {getStatusLabel(req.request_status)}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-brand-blue transition-colors">
                      {req.name}
                    </h3>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {getRequesterAvatar(req) ? (
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAvatarId(activeAvatarId === getRequesterAvatar(req)!.id ? null : getRequesterAvatar(req)!.id);
                          }}
                          title={getRequesterAvatar(req)!.name}
                          className={`size-7 rounded-full border-2 border-white bg-slate-200 overflow-hidden transition-transform ${
                            activeAvatarId === getRequesterAvatar(req)!.id ? 'scale-110' : ''
                          }`}
                        >
                          <img src={getRequesterAvatar(req)!.url} alt="requester" className="w-full h-full object-cover" />
                        </button>
                        {activeAvatarId === getRequesterAvatar(req)!.id && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                            {getRequesterAvatar(req)!.name}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="size-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <User size={14} />
                      </div>
                    )}
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Người yêu cầu</p>
                      <p className="text-[11px] font-bold text-slate-700">{req.request_owner_id?.[1] || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <DollarSign size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Số tiền</p>
                      <p className="text-[11px] font-bold text-brand-blue">{formatCurrency(req.amount || 0)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={12} />
                    <span className="text-[10px] font-medium">{formatDateTime(req.create_date || req.date_confirmed)}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {sortedApproverIds(req).slice(0, 3).map((userId) => (
                      <div key={userId} className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAvatarId(activeAvatarId === userId ? null : userId);
                          }}
                          title={`User ${userId}`}
                          className={`size-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden transition-transform ${
                            activeAvatarId === userId ? 'scale-110' : ''
                          }`}
                        >
                          <img src={`/api/odoo/web/image?model=res.users&id=${userId}&field=avatar_128`} alt="approver" className="w-full h-full object-cover" />
                        </button>
                        {activeAvatarId === userId && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                            ID {userId}
                          </div>
                        )}
                      </div>
                    ))}
                    {sortedApproverIds(req).length > 3 && (
                      <div className="size-6 rounded-full border-2 border-white bg-brand-blue flex items-center justify-center text-[8px] font-bold text-white">
                        +{sortedApproverIds(req).length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {isUserPending(req) ? (
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(req.id);
                      }}
                      disabled={processingId === req.id}
                      className="py-2 rounded-lg text-[10px] font-bold text-emerald-600 bg-emerald-50 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <Check size={12} />
                      Duyệt
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(req.id);
                      }}
                      disabled={processingId === req.id}
                      className="py-2 rounded-lg text-[10px] font-bold text-red-600 bg-red-50 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <XCircle size={12} />
                      Từ chối
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComment(req.id);
                      }}
                      disabled={processingId === req.id}
                      className="py-2 rounded-lg text-[10px] font-bold text-slate-600 bg-slate-100 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <MessageSquare size={12} />
                      Bình luận
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleComment(req.id);
                      }}
                      disabled={processingId === req.id}
                      className="w-full py-2 rounded-lg text-[10px] font-bold text-slate-600 bg-slate-100 flex items-center justify-center gap-1 disabled:opacity-50"
                    >
                      <MessageSquare size={12} />
                      Bình luận
                    </button>
                  </div>
                )}
              </motion.div>
            ))}

            {hasMore && (
              <div ref={sentinelRef} className="w-full py-6 text-center">
                {loadingMore && (
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Đang tải thêm...</span>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 size-14 bg-brand-blue text-white rounded-2xl shadow-xl shadow-brand-blue/40 flex items-center justify-center active:scale-90 transition-transform z-20">
        <Plus size={28} />
      </button>

      <AnimatePresence>
        {selectedRequestId && (
          <ProposalDetail
            requestId={selectedRequestId}
            onBack={() => setSelectedRequestId(null)}
          />
        )}
      </AnimatePresence>

      <ApprovalFilterModal
        isOpen={showAdvancedFilter}
        onClose={() => setShowAdvancedFilter(false)}
        onApply={setAdvancedFilter}
        onReset={() => setAdvancedFilter({ type: null, company: null, category: null, requester: null, statuses: [] })}
        state={advancedFilter}
        typeOptions={typeOptions}
        companyOptions={companyOptions}
        categoryOptions={categoryOptions}
        requesterOptions={requesterOptions}
      />
    </motion.div>
  );
};

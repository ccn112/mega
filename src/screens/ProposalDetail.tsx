import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  MessageSquare,
  AlertCircle,
  Users,
  Share2,
  FileText,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { odoo, ApprovalAttachment, ApprovalRequestDetail } from '../services/odooService';

interface ProposalDetailProps {
  onBack: () => void;
  requestId?: number | string;
}

const formatDate = (value?: string) => {
  if (!value) return 'N/A';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('vi-VN');
};

const formatCurrency = (amount?: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const renderFieldValue = (value: any, type?: string) => {
  if (value === undefined || value === null || value === false || value === '') return 'N/A';
  if (Array.isArray(value)) {
    if (value.length === 2 && typeof value[1] === 'string') return value[1];
    return value.join(', ');
  }
  if (type === 'monetary' || type === 'float' || type === 'integer') {
    if (typeof value === 'number' && type === 'monetary') {
      return formatCurrency(value);
    }
    return String(value);
  }
  if (type === 'datetime' || type === 'date') {
    return formatDate(String(value));
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
};

export const ProposalDetail = ({ onBack, requestId }: ProposalDetailProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApprovalRequestDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'comments' | 'attachments' | 'workflow'>('general');
  const [commentText, setCommentText] = useState('');
  const [processingAction, setProcessingAction] = useState<'approve' | 'reject' | 'comment' | null>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<ApprovalAttachment | null>(null);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const numericId = useMemo(() => {
    if (typeof requestId === 'number') return requestId;
    if (typeof requestId === 'string' && requestId.trim()) {
      const parsed = Number(requestId);
      return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
  }, [requestId]);

  const loadDetail = async () => {
    if (!numericId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await odoo.getApprovalRequestDetail(numericId, { includeRelated: false });
      setDetail(data);
    } catch (e: any) {
      setError(e?.message || 'Không tải được chi tiết tờ trình');
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async () => {
    if (!numericId) return;
    setLoadingRelated(true);
    try {
      const related = await odoo.getApprovalRequestRelated(numericId);
      setDetail((prev) => prev ? { ...prev, ...related } : prev);
    } catch (e) {
      console.warn('Không tải được dữ liệu liên quan:', e);
    } finally {
      setLoadingRelated(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [numericId]);

  useEffect(() => {
    if (!numericId) return;
    loadRelated();
  }, [numericId]);

  useEffect(() => {
    if (detail?.attachments?.length) {
      setSelectedAttachment((prev) => prev || detail.attachments[0]);
    } else {
      setSelectedAttachment(null);
    }
  }, [detail]);

  const renderHtmlContent = (value?: string | number | null) => {
    const textValue = typeof value === 'string' ? value : value === null || value === undefined ? '' : String(value);
    if (!textValue.trim()) {
      return <p className="text-xs text-slate-400 leading-relaxed">N/A</p>;
    }

    const hasHtml = /<[^>]+>/.test(textValue);
    if (!hasHtml) {
      return <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{textValue}</p>;
    }

    return <div className="text-xs text-slate-600 leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: textValue }} />;
  };

  const onShare = async () => {
    if (!detail) return;
    const text = `${detail.name}\nMã: ${detail.code || 'N/A'}\nTrạng thái: ${odoo.getApprovalStatusLabel(detail.request_status)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: detail.name, text });
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      alert('Đã sao chép nội dung chia sẻ vào clipboard');
      return;
    }

    alert(text);
  };

  const onApprove = async () => {
    if (!numericId) return;
    setProcessingAction('approve');
    try {
      await odoo.approveApprovalRequest(numericId);
      await loadDetail();
      alert('Đã duyệt tờ trình');
    } catch (e: any) {
      alert(e?.message || 'Duyệt tờ trình thất bại');
    } finally {
      setProcessingAction(null);
    }
  };

  const onReject = async () => {
    if (!numericId) return;
    const reason = window.prompt('Nhập lý do từ chối', '') || '';
    setProcessingAction('reject');
    try {
      await odoo.rejectApprovalRequest(numericId, reason);
      await loadDetail();
      alert('Đã từ chối tờ trình');
    } catch (e: any) {
      alert(e?.message || 'Từ chối tờ trình thất bại');
    } finally {
      setProcessingAction(null);
    }
  };

  const onSubmitComment = async () => {
    if (!numericId) return;
    const text = commentText.trim();
    if (!text) return;
    setProcessingAction('comment');
    try {
      await odoo.commentApprovalRequest(numericId, text);
      setCommentText('');
      await loadDetail();
      setActiveTab('comments');
    } catch (e: any) {
      alert(e?.message || 'Gửi bình luận thất bại');
    } finally {
      setProcessingAction(null);
    }
  };

  const status = odoo.mapApprovalStatus(detail?.request_status || '');
  const statusLabel = odoo.getApprovalStatusLabel(detail?.request_status || '');
  const StatusIcon = status === 'approved' ? CheckCircle2 : status === 'rejected' ? XCircle : Clock;
  const statusColor = status === 'approved'
    ? 'bg-emerald-50 text-emerald-600'
    : status === 'rejected'
      ? 'bg-red-50 text-red-600'
      : 'bg-amber-50 text-amber-600';
  const canAct = status === 'pending';

  const commentGroups = useMemo(() => {
    if (!detail) return { comments: [], notes: [], system: [] };
    return {
      comments: detail.comments.filter((item) => item.kind === 'comment'),
      notes: detail.comments.filter((item) => item.kind === 'note'),
      system: detail.comments.filter((item) => item.kind === 'system'),
    };
  }, [detail]);

  const renderAttachmentPreview = () => {
    if (!selectedAttachment) return null;

    const mime = (selectedAttachment.mimetype || '').toLowerCase();
    const isImage = mime.startsWith('image/');
    const isPdf = mime.includes('pdf');
    const isText = mime.startsWith('text/');

    if (isImage) {
      return (
        <img
          src={selectedAttachment.preview_url}
          alt={selectedAttachment.name}
          className="w-full max-h-72 object-contain rounded-lg border border-slate-100 bg-slate-50"
        />
      );
    }

    if (isPdf || isText) {
      return (
        <iframe
          src={selectedAttachment.preview_url}
          title={selectedAttachment.name}
          className="w-full h-72 rounded-lg border border-slate-100 bg-slate-50"
        />
      );
    }

    return (
      <div className="p-4 rounded-lg border border-slate-100 bg-slate-50 text-center space-y-2">
        <p className="text-xs text-slate-500">Định dạng file này chưa hỗ trợ xem nhanh.</p>
        <a
          href={selectedAttachment.download_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-brand-blue text-white text-xs font-bold"
        >
          Tải xuống để xem
        </a>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[60] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 text-sm">Chi tiết tờ trình</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{detail?.code || 'N/A'}</p>
          </div>
        </div>
        <button onClick={onShare} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600">
          <Share2 size={18} />
        </button>
      </header>

      <div className="px-4 py-2 bg-white border-b border-slate-200 sticky top-[61px] z-10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { key: 'general', label: 'Nội dung chung' },
            { key: 'comments', label: `Bình luận/Ghi chú (${detail?.comments.length || 0})` },
            { key: 'attachments', label: `File đính kèm (${detail?.attachments.length || 0})` },
            { key: 'workflow', label: `Quy trình duyệt (${detail?.approvers.length || 0})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'general' | 'comments' | 'attachments' | 'workflow')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap border transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-6">
        {!numericId && (
          <div className="bg-white p-4 rounded-lg border border-slate-100 text-sm text-slate-600">
            Không có mã tờ trình để tải chi tiết.
          </div>
        )}

        {loading && (
          <div className="bg-white p-6 rounded-lg border border-slate-100 flex items-center gap-3 text-slate-500">
            <div className="size-5 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
            Chờ tí...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {detail && (
          <>
            {activeTab === 'general' && (
              <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-4">
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${statusColor}`}>
                  <StatusIcon size={12} />
                  {statusLabel}
                </div>

                <h2 className="text-base font-bold text-slate-900 leading-tight">{detail.name}</h2>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngân sách</span>
                    <p className="text-xs font-bold text-brand-blue">{formatCurrency(detail.amount)}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Công ty</span>
                    <p className="text-xs text-slate-700">{detail.company_id?.[1] || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nhóm tờ trình</span>
                    <p className="text-xs text-slate-700">{detail.category_id?.[1] || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức ưu tiên</span>
                    <p className="text-xs text-slate-700">{detail.priority || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Người lập</span>
                    <div className="flex items-center gap-2 text-slate-700">
                      <User size={14} className="text-slate-400" />
                      <span className="text-xs font-medium">{detail.request_owner_id?.[1] || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày gửi</span>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs font-medium">{formatDate(detail.request_date || detail.date_confirmed)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lý do</span>
                  {renderHtmlContent(detail.reason)}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Căn cứ pháp lý</span>
                  {renderHtmlContent(detail.legal_basis)}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nội dung chi tiết</span>
                  {renderHtmlContent(detail.detail_html)}
                  {detail.detail_html && detail.detail_html.trim() ? (
                    <pre className="text-[10px] text-slate-500 bg-slate-50 rounded-lg border border-slate-100 p-3 whitespace-pre-wrap break-words">{detail.detail_html}</pre>
                  ) : null}
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Thông tin bổ sung</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ngày nộp</p>
                      <p className="text-xs text-slate-700 mt-1">{formatDate(detail.request_date || detail.date_confirmed)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ngày cần duyệt</p>
                      <p className="text-xs text-slate-700 mt-1">{formatDate(detail.date_scheduled)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Ngày hoàn tất</p>
                      <p className="text-xs text-slate-700 mt-1">{formatDate(detail.date_done)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Nhóm</p>
                      <p className="text-xs text-slate-700 mt-1">{detail.category_id?.[1] || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Các bước đã duyệt</h3>
                  {loadingRelated && detail.approvers.length === 0 ? (
                    <p className="text-xs text-slate-400">Đang tải dữ liệu duyệt...</p>
                  ) : detail.approvers.filter((item) => odoo.mapApprovalStatus(item.status) === 'approved').length === 0 ? (
                    <p className="text-xs text-slate-400">Chưa có bước duyệt hoàn tất.</p>
                  ) : (
                    detail.approvers
                      .filter((item) => odoo.mapApprovalStatus(item.status) === 'approved')
                      .map((approver) => (
                        <div key={approver.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                              {approver.avatar_url ? (
                                <img src={approver.avatar_url} alt="approver" className="w-full h-full object-cover" />
                              ) : null}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{approver.user_id?.[1] || 'N/A'}</p>
                              <p className="text-[10px] text-slate-400">Bước {approver.sequence || 0}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold text-emerald-600 bg-emerald-50">Đã duyệt</span>
                            <p className="text-[9px] text-slate-400 mt-1">{formatDate(approver.action_date)}</p>
                          </div>
                        </div>
                      ))
                  )}
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-2">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Người đang theo dõi</h3>
                  {loadingRelated && detail.followers.length === 0 ? (
                    <p className="text-xs text-slate-400">Đang tải người theo dõi...</p>
                  ) : detail.followers.length === 0 ? (
                    <p className="text-xs text-slate-400">Chưa có người theo dõi.</p>
                  ) : (
                    detail.followers.map((follower) => (
                      <div key={follower.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                            {follower.avatar_url ? (
                              <img src={follower.avatar_url} alt="follower" className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{follower.partner_id?.[1] || 'N/A'}</p>
                            <p className="text-[10px] text-slate-400">{follower.email || 'Không có email'}</p>
                          </div>
                        </div>
                        <MessageSquare size={14} className="text-slate-300" />
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {activeTab === 'comments' && (
              <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-4">
                {detail.comments.length === 0 ? (
                  <p className="text-xs text-slate-400">Chưa có bình luận/ghi chú.</p>
                ) : (
                  <>
                    {commentGroups.comments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bình luận</h4>
                        {commentGroups.comments.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="size-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                                  <MessageSquare size={12} />
                                </span>
                                <p className="text-xs font-bold text-slate-800">{item.author}</p>
                              </div>
                              <p className="text-[10px] text-slate-400">{formatDate(item.date)}</p>
                            </div>
                            <div className="text-xs text-slate-700 break-words" dangerouslySetInnerHTML={{ __html: item.body || '' }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {commentGroups.notes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ghi chú</h4>
                        {commentGroups.notes.map((item) => (
                          <div key={item.id} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="size-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                                  <FileText size={12} />
                                </span>
                                <p className="text-xs font-bold text-slate-800">{item.author}</p>
                              </div>
                              <p className="text-[10px] text-slate-400">{formatDate(item.date)}</p>
                            </div>
                            <div className="text-xs text-slate-700 break-words" dangerouslySetInnerHTML={{ __html: item.body || '' }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {commentGroups.system.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thông báo</h4>
                        {commentGroups.system.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">Thông báo</span>
                                <p className="text-xs font-bold text-slate-800">{item.author}</p>
                              </div>
                              <p className="text-[10px] text-slate-400">{formatDate(item.date)}</p>
                            </div>
                            <div className="text-xs text-slate-700 break-words" dangerouslySetInnerHTML={{ __html: item.body || '' }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="sticky bottom-0 bg-white pt-3 border-t border-slate-100 space-y-2">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    placeholder="Nhập bình luận hoặc ghi chú..."
                    className="w-full rounded-lg border border-slate-200 text-xs p-3 outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                  <button
                    onClick={onSubmitComment}
                    disabled={processingAction === 'comment' || !commentText.trim()}
                    className="w-full py-2.5 rounded-lg bg-brand-blue text-white text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Send size={14} />
                    {processingAction === 'comment' ? 'Đang gửi...' : 'Gửi bình luận'}
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'attachments' && (
              <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-3">
                {detail.attachments.length === 0 ? (
                  <p className="text-xs text-slate-400">Không có file đính kèm.</p>
                ) : (
                  <>
                    {selectedAttachment && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-700 truncate pr-2">{selectedAttachment.name}</p>
                          <a
                            href={selectedAttachment.download_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-bold text-brand-blue whitespace-nowrap"
                          >
                            Tải xuống
                          </a>
                        </div>
                        {renderAttachmentPreview()}
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {detail.attachments.map((file) => {
                        const isSelected = selectedAttachment?.id === file.id;
                        return (
                          <button
                            key={file.id}
                            onClick={() => setSelectedAttachment(file)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              isSelected
                                ? 'border-brand-blue/40 bg-brand-blue/5'
                                : 'border-slate-100 bg-slate-50 hover:border-brand-blue/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 text-left">
                              <FileText size={14} className="text-slate-400 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                                <p className="text-[10px] text-slate-400">{formatDate(file.create_date)}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">Xem</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </section>
            )}

            {activeTab === 'workflow' && (
              <section className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Các bước duyệt</h3>
                  <span className="text-[10px] font-bold text-slate-500">{detail.approvers.length}</span>
                </div>

                {loadingRelated && detail.approvers.length === 0 ? (
                  <p className="text-xs text-slate-400">Đang tải quy trình duyệt...</p>
                ) : detail.approvers.length === 0 ? (
                  <p className="text-xs text-slate-400">Chưa có người phê duyệt.</p>
                ) : (
                  detail.approvers.map((approver) => {
                    const approverStatus = odoo.mapApprovalStatus(approver.status);
                    const approverLabel = odoo.getApprovalStatusLabel(approver.status);
                    const approverStatusClass = approverStatus === 'approved'
                      ? 'text-emerald-600 bg-emerald-50'
                      : approverStatus === 'rejected'
                        ? 'text-red-600 bg-red-50'
                        : approverStatus === 'pending'
                          ? 'text-amber-600 bg-amber-50'
                          : 'text-slate-600 bg-slate-100';

                    return (
                      <div key={approver.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                            {approver.avatar_url ? (
                              <img src={approver.avatar_url} alt="approver" className="w-full h-full object-cover" />
                            ) : null}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{approver.user_id?.[1] || 'N/A'}</p>
                            <p className="text-[10px] text-slate-400">Bước {approver.sequence || 0}{approver.required ? ' • Bắt buộc' : ''}</p>
                            <p className="text-[10px] text-slate-400">{approver.email || 'Không có email'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${approverStatusClass}`}>{approverLabel}</span>
                          <p className="text-[9px] text-slate-400 mt-1">{formatDate(approver.action_date)}</p>
                        </div>
                      </div>
                    );
                  })
                )}

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Người theo dõi</h3>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Users size={14} />
                      <span className="text-[10px] font-bold">{detail.followers.length}</span>
                    </div>
                  </div>

                  {loadingRelated && detail.followers.length === 0 ? (
                    <p className="text-xs text-slate-400 mt-2">Đang tải người theo dõi...</p>
                  ) : detail.followers.length === 0 ? (
                    <p className="text-xs text-slate-400 mt-2">Chưa có người theo dõi.</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {detail.followers.map((follower) => (
                        <div key={follower.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-slate-200 overflow-hidden">
                              {follower.avatar_url ? (
                                <img src={follower.avatar_url} alt="follower" className="w-full h-full object-cover" />
                              ) : null}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{follower.partner_id?.[1] || 'N/A'}</p>
                              <p className="text-[10px] text-slate-400">{follower.email || 'Không có email'}</p>
                            </div>
                          </div>
                          <MessageSquare size={14} className="text-slate-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

          </>
        )}
      </div>

      {canAct && (
        <div className="border-t border-slate-200 bg-white px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onApprove}
              disabled={processingAction !== null}
              className="py-2.5 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold disabled:opacity-50"
            >
              {processingAction === 'approve' ? 'Đang duyệt...' : 'Duyệt'}
            </button>
            <button
              onClick={onReject}
              disabled={processingAction !== null}
              className="py-2.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold disabled:opacity-50"
            >
              {processingAction === 'reject' ? 'Đang xử lý...' : 'Từ chối'}
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              disabled={processingAction !== null}
              className="py-2.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold disabled:opacity-50"
            >
              Bình luận
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

import React from 'react';
import { X, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ApprovalStatusFilter = 'pending' | 'approved' | 'rejected';

export interface ApprovalFilterState {
  type: string | null;
  company: string | null;
  category: string | null;
  requester: string | null;
  statuses: ApprovalStatusFilter[];
}

interface FilterOption {
  value: string;
  label: string;
}

interface ApprovalFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (state: ApprovalFilterState) => void;
  onReset: () => void;
  state: ApprovalFilterState;
  typeOptions: FilterOption[];
  companyOptions: FilterOption[];
  categoryOptions: FilterOption[];
  requesterOptions: FilterOption[];
}

const statusOptions: Array<{ value: ApprovalStatusFilter; label: string }> = [
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'approved', label: 'Đã duyệt' },
  { value: 'rejected', label: 'Từ chối' },
];

const FilterGroup = ({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: FilterOption[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) => (
  <section className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
      {selected && (
        <button
          onClick={() => onSelect(null)}
          className="text-[10px] font-bold text-slate-500 hover:text-brand-blue"
        >
          Bỏ chọn
        </button>
      )}
    </div>
    {options.length === 0 ? (
      <p className="text-xs text-slate-400">Chưa có dữ liệu</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {options.map((item) => {
          const isActive = selected === item.value;
          return (
            <button
              key={item.value}
              onClick={() => onSelect(isActive ? null : item.value)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                isActive
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue/30'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    )}
  </section>
);

export const ApprovalFilterModal = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  state,
  typeOptions,
  companyOptions,
  categoryOptions,
  requesterOptions,
}: ApprovalFilterModalProps) => {
  const toggleStatus = (value: ApprovalStatusFilter) => {
    const exists = state.statuses.includes(value);
    const next = exists ? state.statuses.filter((item) => item !== value) : [...state.statuses, value];
    onApply({ ...state, statuses: next });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg z-[80] max-w-md mx-auto flex flex-col max-h-[90vh]"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-2" />
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-brand-blue" />
                <h2 className="text-lg font-bold text-slate-900">Lọc nâng cao</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <FilterGroup title="Loại tờ trình" options={typeOptions} selected={state.type} onSelect={(value) => onApply({ ...state, type: value })} />
              <FilterGroup title="Công ty" options={companyOptions} selected={state.company} onSelect={(value) => onApply({ ...state, company: value })} />
              <FilterGroup title="Nhóm tờ trình" options={categoryOptions} selected={state.category} onSelect={(value) => onApply({ ...state, category: value })} />
              <FilterGroup title="Người gửi" options={requesterOptions} selected={state.requester} onSelect={(value) => onApply({ ...state, requester: value })} />

              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trạng thái</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((item) => {
                    const isActive = state.statuses.includes(item.value);
                    return (
                      <button
                        key={item.value}
                        onClick={() => toggleStatus(item.value)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                          isActive
                            ? 'bg-brand-blue text-white border-brand-blue'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue/30'
                        }`}
                      >
                        {isActive && <Check size={12} className="inline-block mr-1" />}
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button
                onClick={onReset}
                className="flex-1 h-12 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold active:scale-95 transition-transform"
              >
                Thiết lập lại
              </button>
              <button
                onClick={onClose}
                className="flex-1 h-12 bg-brand-blue text-white rounded-lg font-bold shadow-lg shadow-brand-blue/20 active:scale-95 transition-transform"
              >
                Áp dụng
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

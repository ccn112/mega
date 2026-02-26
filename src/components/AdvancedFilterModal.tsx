import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  Building2, 
  Users, 
  Layers, 
  ArrowRightLeft,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterCategory {
  id: string;
  name: string;
  count: number;
  subCategories?: FilterCategory[];
}

const hierarchyData: FilterCategory[] = [
  {
    id: 'group',
    name: 'Tập đoàn Tân Á Đại Thành',
    count: 156,
    subCategories: [
      {
        id: 'corp-1',
        name: 'Tổng Công ty Nhựa',
        count: 42,
        subCategories: [
          { id: 'dept-1', name: 'Phòng Kinh doanh', count: 12 },
          { id: 'dept-2', name: 'Phòng Kỹ thuật', count: 8 },
        ]
      },
      {
        id: 'corp-2',
        name: 'Tổng Công ty Bất động sản',
        count: 28,
        subCategories: [
          { id: 'dept-3', name: 'Ban Dự án', count: 15 },
          { id: 'dept-4', name: 'Phòng Pháp chế', count: 6 },
        ]
      },
    ]
  }
];

export const AdvancedFilterModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [expanded, setExpanded] = useState<string[]>(['group']);
  const [selectedId, setSelectedId] = useState<string>('group');
  const [type, setType] = useState<'direct' | 'inter'>('direct');

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const renderCategory = (cat: FilterCategory, level: number = 0) => {
    const isExpanded = expanded.includes(cat.id);
    const isSelected = selectedId === cat.id;
    const hasSubs = cat.subCategories && cat.subCategories.length > 0;

    return (
      <div key={cat.id} className="select-none">
        <div 
          onClick={() => {
            setSelectedId(cat.id);
            if (hasSubs) toggleExpand(cat.id);
          }}
          className={`flex items-center justify-between py-3 px-4 cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
          }`}
          style={{ paddingLeft: `${(level * 16) + 16}px` }}
        >
          <div className="flex items-center gap-3">
            {hasSubs ? (
              isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />
            ) : (
              <div className="w-4" />
            )}
            {level === 0 ? <Building2 size={18} className="text-brand-blue" /> :
             level === 1 ? <Layers size={18} className="text-brand-gold" /> :
             <Users size={18} className="text-emerald-500" />}
            <span className={`text-sm ${isSelected ? 'font-bold text-brand-blue' : 'font-medium text-slate-700'}`}>
              {cat.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {cat.count}
            </span>
            {isSelected && <Check size={16} className="text-brand-blue" />}
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && hasSubs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {cat.subCategories!.map(sub => renderCategory(sub, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
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
              <h2 className="text-lg font-bold text-slate-900">Lọc nâng cao</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Type Filter */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loại tờ trình</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setType('direct')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      type === 'direct' 
                        ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                        : 'border-slate-100 bg-white text-slate-500'
                    }`}
                  >
                    <Layers size={24} />
                    <span className="text-xs font-bold">Trực tiếp</span>
                    <span className="text-[10px] opacity-60">124 tờ trình</span>
                  </button>
                  <button 
                    onClick={() => setType('inter')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      type === 'inter' 
                        ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                        : 'border-slate-100 bg-white text-slate-500'
                    }`}
                  >
                    <ArrowRightLeft size={24} />
                    <span className="text-xs font-bold">Liên phòng ban</span>
                    <span className="text-[10px] opacity-60">32 tờ trình</span>
                  </button>
                </div>
              </section>

              {/* Hierarchy Filter */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đơn vị & Phòng ban</h3>
                <div className="bg-white rounded-lg border border-slate-100 overflow-hidden divide-y divide-slate-50">
                  {hierarchyData.map(group => renderCategory(group))}
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <button 
                onClick={() => {
                  setSelectedId('group');
                  setType('direct');
                }}
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

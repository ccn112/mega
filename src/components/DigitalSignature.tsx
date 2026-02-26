import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PenTool, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  MoreVertical,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DigitalSignature = ({ onBack }: { onBack: () => void }) => {
  const [docs, setDocs] = useState([
    { id: '1', title: 'Hợp đồng cung ứng thiết bị Bình nước nóng Rossi', date: '24/10/2023', type: 'Hợp đồng kinh tế' },
    { id: '2', title: 'Quyết định bổ nhiệm cán bộ quản lý dự án', date: '23/10/2023', type: 'Văn bản nội bộ' },
    { id: '3', title: 'Biên bản nghiệm thu giai đoạn 1 - Meyhomes', date: '22/10/2023', type: 'Biên bản kỹ thuật' },
  ]);

  const [signing, setSigning] = useState<string | null>(null);

  const handleSign = (id: string) => {
    setSigning(id);
    setTimeout(() => {
      setDocs(docs.filter(d => d.id !== id));
      setSigning(null);
      alert('Ký số thành công!');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 z-[70] bg-slate-50 flex flex-col"
    >
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-900">Ký số CA</h1>
        </div>
        <button className="p-2 text-slate-400"><Search size={20} /></button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-brand-blue rounded-lg p-6 text-white shadow-xl shadow-brand-blue/20 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-lg font-bold">Chứng thư số khả dụng</h2>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Chủ sở hữu</p>
              <p className="font-bold">NGUYỄN VĂN A</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Hết hạn</p>
              <p className="font-bold">12/12/2025</p>
            </div>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tài liệu chờ ký ({docs.length})</p>

        {docs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 flex items-start gap-4">
              <div className="size-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-800 leading-snug truncate">{doc.title}</h3>
                <p className="text-[10px] text-slate-500 mt-1">{doc.type} • {doc.date}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-brand-gold font-bold">
                  <Clock size={10} /> Chờ ký duyệt
                </div>
              </div>
              <button className="p-2 text-slate-300"><MoreVertical size={20} /></button>
            </div>
            <div className="px-4 pb-4">
              <button 
                onClick={() => handleSign(doc.id)}
                disabled={signing === doc.id}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  signing === doc.id 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20 active:scale-95'
                }`}
              >
                {signing === doc.id ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <Clock size={16} />
                    </motion.div>
                    Đang xử lý ký số...
                  </>
                ) : (
                  <>
                    <PenTool size={16} /> Ký ngay
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {docs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <CheckCircle2 size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Không còn tài liệu nào cần ký!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

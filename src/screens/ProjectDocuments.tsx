import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  FileText, 
  FileCode, 
  FileImage, 
  File, 
  MoreVertical, 
  Download, 
  Share2, 
  Plus,
  Filter,
  ChevronRight,
  Folder
} from 'lucide-react';
import { motion } from 'motion/react';

interface Doc {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'image' | 'folder';
  size?: string;
  date: string;
  author: string;
}

export const ProjectDocuments = ({ onBack }: { onBack: () => void }) => {
  const [view, setView] = useState<'grid' | 'list'>('list');

  const docs: Doc[] = [
    { id: 'folder-1', name: 'Bản vẽ thiết kế', type: 'folder', date: '20/10/2023', author: 'Trần Thị B' },
    { id: 'folder-2', name: 'Hồ sơ pháp lý', type: 'folder', date: '15/10/2023', author: 'Hoàng Văn E' },
    { id: '1', name: 'Báo cáo tiến độ T10.pdf', type: 'pdf', size: '2.4 MB', date: '24/10/2023', author: 'Nguyễn Văn A' },
    { id: '2', name: 'Dự toán chi tiết GĐ2.xlsx', type: 'xlsx', size: '1.1 MB', date: '23/10/2023', author: 'Phạm Thị D' },
    { id: '3', name: 'Ảnh hiện trường_01.jpg', type: 'image', size: '4.5 MB', date: '22/10/2023', author: 'Lê Văn C' },
    { id: '4', name: 'Hợp đồng thầu phụ.docx', type: 'docx', size: '850 KB', date: '21/10/2023', author: 'Nguyễn Văn A' },
  ];

  const getFileIcon = (type: Doc['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" />;
      case 'docx': return <FileText className="text-blue-500" />;
      case 'xlsx': return <FileText className="text-emerald-500" />;
      case 'image': return <FileImage className="text-purple-500" />;
      case 'folder': return <Folder className="text-amber-500 fill-amber-500" />;
      default: return <File className="text-slate-400" />;
    }
  };

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
            <h1 className="font-bold text-slate-900 text-sm">Tài liệu dự án</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">45 tệp • 128 MB</p>
          </div>
        </div>
        <button className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
          <Plus size={20} />
        </button>
      </header>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm kiếm tài liệu..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-brand-blue border-b-2 border-brand-blue pb-1">Tất cả</button>
            <button className="text-xs font-bold text-slate-400 pb-1">Gần đây</button>
            <button className="text-xs font-bold text-slate-400 pb-1">Đã chia sẻ</button>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-all ${view === 'list' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-400'}`}
            >
              <FileText size={14} />
            </button>
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-400'}`}
            >
              <FileImage size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3 group hover:border-brand-blue/30 transition-all">
            <div className={`size-12 rounded-lg flex items-center justify-center shrink-0 ${
              doc.type === 'folder' ? 'bg-amber-50' : 'bg-slate-50'
            }`}>
              {getFileIcon(doc.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                {doc.size && <span className="text-[10px] text-slate-400 font-medium">{doc.size}</span>}
                <span className="text-[10px] text-slate-400 font-medium">{doc.date}</span>
                <span className="text-[10px] text-slate-400 font-medium">• {doc.author}</span>
              </div>
            </div>

            <div className="flex items-center">
              <button className="p-2 text-slate-400 hover:text-brand-blue transition-colors">
                <Download size={16} />
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}

        <div className="py-8 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
          <Plus size={32} className="mb-2 opacity-20" />
          <p className="text-xs font-bold">Tải lên tài liệu mới</p>
          <p className="text-[10px] mt-1">Kéo thả hoặc nhấn để chọn tệp</p>
        </div>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { X, Download, ExternalLink, File } from 'lucide-react';
import { motion } from 'motion/react';

interface DocumentPreviewModalProps {
  doc: { id: number; name: string; download_url: string; file_size?: number };
  isOpen: boolean;
  onClose: () => void;
}

const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

const isImageFile = (filename: string): boolean => {
  const ext = getFileExtension(filename);
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
};

const isPdfFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'pdf';
};

export const DocumentPreviewModal = ({ doc, isOpen, onClose }: DocumentPreviewModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [previewError, setPreviewError] = useState(false);

  if (!isOpen) return null;

  const ext = getFileExtension(doc.name);
  const canPreview = isImageFile(doc.name) || isPdfFile(doc.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 truncate">{doc.name}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {ext.toUpperCase()} • {
                doc.file_size && doc.file_size >= 1024 * 1024
                  ? `${(doc.file_size / (1024 * 1024)).toFixed(1)} MB`
                  : doc.file_size && doc.file_size >= 1024
                  ? `${(doc.file_size / 1024).toFixed(1)} KB`
                  : doc.file_size
                  ? `${doc.file_size} B`
                  : 'N/A'
              }
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <a
              href={doc.download_url}
              download={doc.name}
              className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-slate-900"
              title="Download"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={18} />
            </a>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors text-slate-600 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto bg-slate-100 flex items-center justify-center">
          {!canPreview ? (
            // File type not supported for preview
            <div className="flex flex-col items-center justify-center p-8">
              <File size={48} className="text-slate-400 mb-4" />
              <p className="text-sm font-medium text-slate-600 text-center mb-4">
                Không thể xem trước tệp {ext.toUpperCase()}
              </p>
              <a
                href={doc.download_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                Mở tệp
              </a>
            </div>
          ) : isImageFile(doc.name) ? (
            // Image preview
            <>
              {isLoading && (
                <div className="absolute flex items-center justify-center">
                  <div className="text-slate-400">Đang tải hình ảnh...</div>
                </div>
              )}
              {!previewError ? (
                <img
                  src={doc.download_url}
                  alt={doc.name}
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setPreviewError(true);
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <p className="text-sm text-slate-600 mb-4">Không thể tải hình ảnh</p>
                  <a
                    href={doc.download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} />
                    Mở tệp
                  </a>
                </div>
              )}
            </>
          ) : isPdfFile(doc.name) ? (
            // PDF preview
            <object
              data={`${doc.download_url}#toolbar=0`}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center p-8">
                <p className="text-sm text-slate-600 mb-4">Trình xem PDF không khả dụng</p>
                <a
                  href={doc.download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  Tải PDF
                </a>
              </div>
            </object>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
};

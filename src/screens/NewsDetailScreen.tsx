import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  link: string;
  date: string;
  image?: string;
}

export const NewsDetailScreen = ({ 
  newsItem,
  onBack 
}: { 
  newsItem: NewsItem,
  onBack: () => void 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullContent, setFullContent] = useState<string | null>(null);

  useEffect(() => {
    // Try to fetch the full content if we don't have it
    if (!newsItem.content) {
      setIsLoading(false);
    } else {
      setFullContent(newsItem.content);
      setIsLoading(false);
    }
  }, [newsItem]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24 space-y-4"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2"
        >
          <ArrowLeft size={20} className="text-slate-900" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-slate-900 line-clamp-2">{newsItem.title}</h2>
          <p className="text-[10px] text-slate-400 font-medium mt-1">{newsItem.date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {/* Featured Image */}
        {newsItem.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl overflow-hidden bg-slate-100 h-48"
          >
            <img 
              src={newsItem.image} 
              alt={newsItem.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </motion.div>
        )}

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            {newsItem.title}
          </h1>
          <p className="text-sm text-slate-600">{newsItem.excerpt}</p>
        </div>

        {/* Content */}
        {fullContent ? (
          <div className="prose prose-sm max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: fullContent }}
              className="text-sm text-slate-700 leading-relaxed space-y-3"
            />
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">{newsItem.excerpt}</p>
          </div>
        )}

        {/* Source Link */}
        <a
          href={newsItem.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm w-full justify-center mt-4"
        >
          <ExternalLink size={16} />
          Xem bài viết đầu đủ
        </a>
      </div>
    </motion.div>
  );
};

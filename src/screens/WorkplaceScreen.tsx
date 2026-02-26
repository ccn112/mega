import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Paperclip, 
  Send,
  User
} from 'lucide-react';
import { motion } from 'motion/react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  role: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  liked: boolean;
}

export const WorkplaceScreen = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Nguyễn Văn A',
      avatar: 'https://picsum.photos/seed/1/100/100',
      role: 'Tổng Giám Đốc',
      time: '1 giờ trước',
      content: 'Chúc mừng đội ngũ dự án Meyhomes đã hoàn thành vượt tiến độ giai đoạn 2! Đây là nỗ lực tuyệt vời của tất cả mọi người. 🚀',
      image: 'https://picsum.photos/seed/work1/800/400',
      likes: 45,
      comments: 12,
      liked: true
    },
    {
      id: '2',
      author: 'Trần Thị B',
      avatar: 'https://picsum.photos/seed/2/100/100',
      role: 'Trưởng phòng Nhân sự',
      time: '3 giờ trước',
      content: 'Thông báo: Thứ 7 tuần này công ty sẽ tổ chức buổi Workshop về "Chuyển đổi số trong quản trị vận hành". Mọi người nhớ đăng ký tham gia nhé!',
      likes: 28,
      comments: 5,
      liked: false
    },
    {
      id: '3',
      author: 'Lê Văn C',
      avatar: 'https://picsum.photos/seed/3/100/100',
      role: 'Giám đốc Dự án',
      time: '5 giờ trước',
      content: 'Hình ảnh thực tế từ công trường dự án Meyhomes Capital Phú Quốc. Tiến độ đang được đẩy nhanh tối đa để bàn giao đúng hạn cho khách hàng.',
      image: 'https://picsum.photos/seed/work2/800/400',
      likes: 156,
      comments: 24,
      liked: false
    },
    {
      id: '4',
      author: 'Phạm Minh D',
      avatar: 'https://picsum.photos/seed/4/100/100',
      role: 'Ban TGĐ',
      time: 'Hôm qua',
      content: 'Tân Á Đại Thành tiếp tục khẳng định vị thế dẫn đầu với giải thưởng Top 10 Doanh nghiệp tiêu biểu năm 2023. Tự hào về tập thể chúng ta!',
      likes: 230,
      comments: 45,
      liked: true
    }
  ]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-slate-100"
    >
      {/* Create Post */}
      <div className="bg-white p-4 border-b border-slate-200 mb-2">
        <div className="flex gap-3">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyodQTBPDqKiieiG9uPNA_Vr1-wEx33DZp83o1Ac1OyJgt4VY1dOBDb3F1QBaByoLxMxV5rpEpMaybBIruU4Ekh4XwMi-E9aO7pdBlHAXJsfWSQClOodHv4zCMBsLLR3zigvSuCoPXQiQfuNZTgSt517fygttY0pXDJKKkb8XvkuA2vPlCYs5hk5ld7sNSi2CGWcxWb8_j54KFyymgeCjoW9hP9U67-HvibEyudoH72-wI6nP2VQ7myCpO68-G9-qzqb6WWDnu20Z0" 
            className="size-10 rounded-full object-cover"
            alt="My Avatar"
          />
          <button className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 text-left text-slate-400 text-sm hover:bg-slate-100 transition-colors">
            Bạn đang nghĩ gì?
          </button>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
          <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-brand-blue">
            <ImageIcon size={16} className="text-emerald-500" /> Ảnh/Video
          </button>
          <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-brand-blue">
            <Paperclip size={16} className="text-blue-500" /> Đính kèm
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-24">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border-y border-slate-200 shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={post.avatar} className="size-10 rounded-full object-cover" alt={post.author} />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{post.author}</h3>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{post.role} • {post.time}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="px-4 pb-3">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.image && (
              <div className="w-full aspect-video overflow-hidden">
                <img src={post.image} className="w-full h-full object-cover" alt="Post content" referrerPolicy="no-referrer" />
              </div>
            )}

            <div className="px-4 py-2 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <ThumbsUp size={14} className={post.liked ? 'text-brand-blue fill-brand-blue' : ''} />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <MessageSquare size={14} />
                  {post.comments}
                </div>
              </div>
              <button className="text-slate-400 hover:text-brand-blue">
                <Share2 size={16} />
              </button>
            </div>

            <div className="p-2 flex gap-2 border-t border-slate-50">
              <button className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                post.liked ? 'text-brand-blue bg-blue-50' : 'text-slate-500 hover:bg-slate-50'
              }`}>
                <ThumbsUp size={16} /> Thích
              </button>
              <button className="flex-1 py-2 rounded-lg text-xs font-bold text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <MessageSquare size={16} /> Bình luận
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

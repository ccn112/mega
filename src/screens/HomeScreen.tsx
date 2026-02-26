import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  PenTool, 
  ChevronRight, 
  FileText, 
  History, 
  CreditCard, 
  Users, 
  Clock,
  TrendingUp,
  Globe,
  Target,
  Newspaper,
  Calendar,
  UserMinus,
  Plane,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  MoonStar
} from 'lucide-react';
import { motion } from 'motion/react';
import { odoo } from '../services/odooService';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  advice: string;
  weatherCode: number;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  image?: string;
}

const normalizeUrl = (value?: string | null): string => {
  if (!value) return '';
  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return `https://tanadaithanh.vn${value}`;
  return value;
};

const parseNewsFromHtml = (html: string): NewsItem[] => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const articles = Array.from(doc.querySelectorAll('article'));

    const items = articles
      .map((article, index): NewsItem | null => {
        const linkEl = article.querySelector('a[href]') as HTMLAnchorElement | null;
        const titleEl = article.querySelector('h2, h3, .post-title, .entry-title');
        const excerptEl = article.querySelector('.post-excerpt, .entry-summary, p');
        const dateEl = article.querySelector('time, .post-date, .entry-date');
        const imageEl = article.querySelector('img') as HTMLImageElement | null;

        const title = (titleEl?.textContent || '').trim();
        const link = normalizeUrl(linkEl?.getAttribute('href') || '');
        if (!title || !link) return null;

        const excerpt = (excerptEl?.textContent || '').trim();
        const date = (dateEl?.textContent || '').trim();
        const image = normalizeUrl(imageEl?.getAttribute('src'));

        return {
          id: `html_news_${index}`,
          title,
          excerpt: excerpt || 'Xem chi tiết bài viết tại trang Tin tức Tân Á Đại Thành.',
          link,
          date,
          image: image || undefined,
        };
      })
      .filter((item): item is NewsItem => Boolean(item));

    return items.slice(0, 8);
  } catch (error) {
    console.warn('Không parse được HTML tin tức:', error);
    return [];
  }
};

const getCacheValue = <T,>(key: string, maxAgeMs: number): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value: T; savedAt: number };
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > maxAgeMs) return null;
    return parsed.value;
  } catch {
    return null;
  }
};

const setCacheValue = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify({ value, savedAt: Date.now() }));
  } catch {
    return;
  }
};

const getWeatherIcon = (code: number) => {
  if ([0, 1].includes(code)) return Sun;
  if ([2, 3].includes(code)) return Cloud;
  if ([45, 48].includes(code)) return Cloud;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow;
  return Cloud;
};

const getWeatherAdvice = (code: number, temp: number) => {
  if ([0, 1].includes(code)) return 'Thời tiết đẹp, hãy tận dụng để làm việc hiệu quả!';
  if ([2, 3].includes(code)) return 'Trời hơi âm u, hãy tập trung vào công việc.';
  if ([45, 48].includes(code)) return 'Có sương mù, cần cẩn thận khi đi lại.';
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'Trời mưa, hãy chuẩn bị ô khi ra ngoài.';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Có tuyết, hãy mặc ấm và cẩn thận.';
  if (temp > 35) return 'Trời nóng, nhớ uống đủ nước!';
  if (temp < 5) return 'Trời lạnh, hãy mặc ấm!';
  return 'Một ngày bình thường, hãy làm việc thật tốt!';
};

const fetchWeather = async (): Promise<WeatherData | null> => {
  try {
    const cached = getCacheValue<WeatherData>('home_weather_cache', 30 * 60 * 1000);
    if (cached) return cached;

    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,weather_code&timezone=auto'
    );
    const data = await response.json();
    const current = data.current;
    const code = current.weather_code;
    const temp = current.temperature_2m;
    
    const weatherValue = {
      temperature: Math.round(temp),
      description: `${temp}°C`,
      icon: 'weather',
      advice: getWeatherAdvice(code, temp),
      weatherCode: code,
    };

    setCacheValue('home_weather_cache', weatherValue);
    return weatherValue;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return null;
  }
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
};

export const HomeScreen = ({ 
  userRole,
  pendingApprovalCount = 0,
  onShowDashboard,
  onShowProposal,
  onShowApproval,
  onShowSignature,
  onShowNewsDetail
}: { 
  userRole: string | null,
  pendingApprovalCount?: number,
  onShowDashboard: () => void, 
  onShowProposal: () => void,
  onShowApproval: () => void,
  onShowSignature: () => void,
  onShowNewsDetail?: (news: NewsItem) => void,
  key?: string 
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const user = odoo.getCurrentUser();
  const userName = user?.name || userRole || 'Thành viên';
  
  useEffect(() => {
    fetchWeather().then(setWeather);
    fetchNews();
  }, []);
  
  const fetchNews = async () => {
    try {
      const cached = getCacheValue<NewsItem[]>('home_news_cache', 15 * 60 * 1000);
      if (cached && cached.length > 0) {
        setNews(cached);
        setLoadingNews(false);
        return;
      }

      setLoadingNews(true);
      const response = await fetch('/api/news');
      const contentType = response.headers.get('content-type') || '';

      let nextNews: NewsItem[] = [];
      if (contentType.includes('application/json')) {
        const data = await response.json();
        nextNews = Array.isArray(data?.news) ? data.news : [];
      } else {
        const html = await response.text();
        nextNews = parseNewsFromHtml(html);
      }

      setNews(nextNews);
      if (nextNews.length > 0) {
        setCacheValue('home_news_cache', nextNews);
      }
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setNews([]);
    } finally {
      setLoadingNews(false);
    }
  };
  
  const isBOD = userRole === 'HĐQT' || userRole === 'Ban TGĐ & QL';
  const isHR = userRole === 'Nhân sự';
  const greeting = getTimeBasedGreeting();
  const currentHour = new Date().getHours();
  const isNightTime = currentHour >= 19 || currentHour < 5;
  const WeatherIcon = weather
    ? (isNightTime ? MoonStar : getWeatherIcon(weather.weatherCode))
    : Cloud;
  const weatherAdvice = isNightTime ? 'Đêm rồi, chúc bạn ngủ ngon 🌙' : weather?.advice;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-24 space-y-8"
    >
      <section className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-base font-black text-slate-900 leading-snug break-words">
              {greeting}, {userName}
            </h2>
            {/* <p className="text-slate-500 text-sm mt-1 font-medium">
              {isBOD 
                ? 'Hệ thống đã sẵn sàng với các báo cáo chiến lược mới nhất.' 
                : 'Chúc bạn một ngày làm việc hiệu quả và năng động.'}
            </p> */}
          </div>
          {weather && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 min-w-[100px] border border-blue-200/50">
              <div className="flex items-center gap-2 mb-2">
                <WeatherIcon size={24} className="text-blue-600" />
                <span className="text-lg font-black text-slate-900">{weather.temperature}°C</span>
              </div>
              <p className="text-[10px] text-blue-600 font-bold leading-tight">{weatherAdvice}</p>
            </div>
          )}
        </div>
      </section>

      {/* Market & Strategy Quick View - Only for BOD */}
      {isBOD && (
        <section className="px-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { label: 'Giá thép HRC', val: '$540.2', change: '+1.2%', icon: TrendingUp, color: 'text-brand-blue bg-blue-50' },
              { label: 'Tỷ giá USD/VND', val: '25,420', change: '-0.05%', icon: Globe, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Mục tiêu Meyland', val: '90.4%', change: 'On Track', icon: Target, color: 'text-brand-gold bg-orange-50' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm min-w-[160px] flex flex-col gap-2">
                <div className={`size-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-slate-900">{item.val}</span>
                    <span className={`text-[8px] font-bold ${item.change.startsWith('+') ? 'text-green-600' : 'text-slate-400'}`}>{item.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Tiện ích nhanh</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Tờ trình', icon: FileText, color: 'bg-blue-50 text-blue-600', action: onShowProposal },
            { label: 'Phê duyệt', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600', action: onShowApproval, badge: pendingApprovalCount },
            { label: 'Ký số', icon: PenTool, color: 'bg-purple-50 text-purple-600', action: onShowSignature },
            { label: 'Lịch họp', icon: Calendar, color: 'bg-amber-50 text-amber-600', action: () => {} },
            { label: 'Nghỉ phép', icon: UserMinus, color: 'bg-pink-50 text-pink-600', action: () => {} },
            { label: 'Công tác', icon: Plane, color: 'bg-indigo-50 text-indigo-600', action: () => {} },
            { label: 'Thanh toán', icon: CreditCard, color: 'bg-cyan-50 text-cyan-600', action: () => {} },
            { label: 'Thêm...', icon: MoreHorizontal, color: 'bg-slate-50 text-slate-600', action: () => {} },
          ].map((item, i) => (
            <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 group relative">
              <div className={`size-12 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative`}>
                <item.icon size={22} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 px-1.5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Workplace Highlight */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Bảng tin Workplace</h3>
          <button className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Xem tất cả</button>
        </div>
        <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center gap-3">
            <img src="https://picsum.photos/seed/ceo/100/100" className="size-8 rounded-full" alt="CEO" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Nguyễn Văn A <span className="text-[10px] font-medium text-slate-400 ml-1">• 1 giờ trước</span></h4>
              <p className="text-[10px] text-brand-blue font-bold uppercase tracking-wider">Tổng Giám Đốc</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              Chúc mừng đội ngũ dự án Meyhomes đã hoàn thành vượt tiến độ giai đoạn 2! Đây là nỗ lực tuyệt vời của tất cả mọi người. 🚀
            </p>
          </div>
          <div className="bg-slate-50 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <ThumbsUp size={12} /> 45
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <MessageSquare size={12} /> 12
              </div>
            </div>
            <button className="text-[10px] font-bold text-brand-blue">Tương tác ngay</button>
          </div>
        </div>
      </section>

      {/* BI Dashboard - Only for BOD */}
      {isBOD && (
        <section className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Báo cáo chiến lược</h3>
            <button onClick={onShowDashboard} className="text-brand-blue text-[10px] font-black uppercase tracking-widest flex items-center">
              Xem BI <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doanh thu Tập đoàn</p>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">12,450 Tỷ</h4>
                </div>
                <span className="text-[10px] bg-blue-50 text-brand-blue px-3 py-1 rounded-full font-black uppercase tracking-widest">Tháng này</span>
              </div>
              <div className="h-32 w-full flex items-end gap-2 px-2">
                {[20, 40, 100, 75, 50, 65, 85, 60, 95, 110, 130, 120].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-lg ${i === 10 ? 'bg-brand-blue shadow-lg shadow-brand-blue/20' : 'bg-slate-100'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HR Stats - Only for HR */}
      {isHR && (
        <section className="px-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Thống kê nhân sự</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tổng nhân sự</p>
              <p className="text-xl font-black text-slate-900 mt-1">2,450</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1">+12 tháng này</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tỷ lệ nghỉ việc</p>
              <p className="text-xl font-black text-slate-900 mt-1">1.2%</p>
              <p className="text-[10px] text-brand-blue font-bold mt-1">Trong ngưỡng an toàn</p>
            </div>
          </div>
        </section>
      )}

      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Tin tức & Thông cáo</h3>
          <a href="https://tanadaithanh.vn/tin-tuc/" target="_blank" rel="noreferrer" className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center hover:text-brand-blue transition-colors">
            Tất cả <ChevronRight size={14} />
          </a>
        </div>
        <div className="space-y-3">
          {loadingNews ? (
            <div className="text-xs text-slate-500 text-center py-4">Đang tải tin tức...</div>
          ) : news.length === 0 ? (
            <div className="text-xs text-slate-500 text-center py-4">Chưa có tin tức nào</div>
          ) : (
            news.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => onShowNewsDetail?.(item)}
                className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-start gap-4 cursor-pointer hover:bg-slate-50 hover:border-slate-200 transition-all text-left w-full"
              >
                {item.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold leading-tight line-clamp-2 text-slate-900">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    {item.date && (
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { 
  Lock, 
  ArrowRight, 
  Fingerprint, 
  ScanFace, 
  User, 
  Mail, 
  ChevronDown,
  ShieldCheck,
  Cpu,
  Sparkles,
  Building2,
  Users,
  Handshake,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { odoo } from '../services/odooService';

type AuthMode = 'login' | 'register';
type UserCategory = 'employee' | 'partner';

export const LoginScreen = ({ onLogin }: { onLogin: (role?: string) => void }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showQuickLogin, setShowQuickLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | null>(null);
  const [username, setUsername] = useState('chinh.nc01@tanadaithanh.vn');
  const [password, setPassword] = useState('CongchInh112');
  const [erpUrl, setErpUrl] = useState('https://office.tanadaithanh.vn'); // Default URL
  const [error, setError] = useState<string | null>(null);

  const employeeRoles = ['HĐQT', 'Ban TGĐ & QL', 'Nhân viên'];
  const partnerRoles = ['Nhà cung cấp', 'Đại lý', 'Khách hàng'];

  const handleLogin = async () => {
    if (!username || !password) {
      onLogin(); // Fallback to demo login if empty
      return;
    }

    setIsAuthenticating(true);
    setError(null);
    try {
      console.log('Starting login process for:', username);
      const result = await odoo.login(username, password);
      console.log('Odoo Login Success:', result);
      
      onLogin('Nhân viên');
    } catch (err: any) {
      console.error('Login screen error catch:', err);
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBiometricAuth = (type: 'fingerprint' | 'face') => {
    // Simplified: directly call login or proceed
    onLogin('Ban TGĐ & QL');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Biometric Overlay */}
      <AnimatePresence>
        {isAuthenticating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="size-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mb-6" />
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">
              Đang xác thực...
            </h3>
            <p className="text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">Hệ thống đang kết nối tới Odoo</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Futuristic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/cyberpunk/1080/1920?blur=5" 
          className="w-full h-full object-cover opacity-40"
          alt="Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-brand-blue/20 to-black/80" />
      </div>

      {/* Animated Particles/Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-700" />

      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 text-center relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 mb-4 inline-block shadow-2xl">
          <img 
            src="https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png" 
            alt="Tân Á Đại Thành" 
            className="h-10 brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center justify-center gap-2">
          <Cpu className="text-brand-blue" size={24} />
          Mega App AI
        </h1>
        <p className="text-blue-200/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Future of Enterprise Management</p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl">
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <div className="space-y-4">
                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl text-red-200 text-[10px] font-bold text-center">
                      {error}
                    </div>
                  )}
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="text" 
                      value={erpUrl}
                      onChange={(e) => setErpUrl(e.target.value)}
                      placeholder="Odoo URL"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 outline-none focus:border-brand-blue/50 transition-all text-xs"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Tên đăng nhập / Email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mật khẩu"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleLogin}
                  className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-brand-blue/30 active:scale-95 transition-all hover:bg-blue-500"
                >
                  Đăng nhập <ArrowRight size={16} />
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px bg-white/10 flex-1" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Hoặc đăng nhập bằng</span>
                  <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="flex justify-center gap-6">
                  <button 
                    onClick={() => handleBiometricAuth('fingerprint')}
                    className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-blue hover:border-brand-blue/50 transition-all active:scale-90"
                  >
                    <Fingerprint size={24} />
                  </button>
                  <button 
                    onClick={() => handleBiometricAuth('face')}
                    className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-blue hover:border-brand-blue/50 transition-all active:scale-90"
                  >
                    <ScanFace size={24} />
                  </button>
                </div>

                <div className="text-center pt-4">
                  <button 
                    onClick={() => setMode('register')}
                    className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                  >
                    Chưa có tài khoản? Đăng ký ngay
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <h2 className="text-lg font-black text-white text-center uppercase tracking-widest mb-6">Đăng ký thành viên</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input 
                      type="email" 
                      placeholder="Email công ty"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 outline-none focus:border-brand-blue/50 transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white/60 outline-none focus:border-brand-blue/50 transition-all appearance-none">
                      <option value="" disabled selected>Chọn vai trò đăng ký</option>
                      <option value="employee">Nhân viên tập đoàn</option>
                      <option value="supplier">Nhà cung cấp</option>
                      <option value="dealer">Đại lý</option>
                      <option value="customer">Khách hàng</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>

                <button 
                  onClick={() => setMode('login')}
                  className="w-full bg-white/10 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 border border-white/10 active:scale-95 transition-all hover:bg-white/20"
                >
                  Tạo tài khoản <Sparkles size={16} className="text-brand-gold" />
                </button>

                <div className="text-center pt-4">
                  <button 
                    onClick={() => setMode('login')}
                    className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Đã có tài khoản? Đăng nhập
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Login Section */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Truy cập nhanh</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative group">
              <button 
                onClick={() => {
                  setSelectedCategory(selectedCategory === 'employee' ? null : 'employee');
                }}
                className={`w-full py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  selectedCategory === 'employee' 
                    ? 'bg-brand-blue/20 border-brand-blue text-white' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Building2 size={18} />
                <span className="text-[10px] font-black uppercase tracking-wider">Nhân viên</span>
              </button>
              
              <AnimatePresence>
                {selectedCategory === 'employee' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
                  >
                    {employeeRoles.map(role => (
                      <button 
                        key={role}
                        onClick={() => onLogin(role)}
                        className="w-full px-4 py-2.5 text-[10px] font-bold text-white/60 hover:bg-brand-blue hover:text-white text-left transition-colors border-b border-white/5 last:border-0"
                      >
                        {role}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group">
              <button 
                onClick={() => {
                  setSelectedCategory(selectedCategory === 'partner' ? null : 'partner');
                }}
                className={`w-full py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  selectedCategory === 'partner' 
                    ? 'bg-emerald-500/20 border-emerald-500 text-white' 
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Handshake size={18} />
                <span className="text-[10px] font-black uppercase tracking-wider">Đối tác</span>
              </button>

              <AnimatePresence>
                {selectedCategory === 'partner' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-20"
                  >
                    {partnerRoles.map(role => (
                      <button 
                        key={role}
                        onClick={() => onLogin(role)}
                        className="w-full px-4 py-2.5 text-[10px] font-bold text-white/60 hover:bg-emerald-500 hover:text-white text-left transition-colors border-b border-white/5 last:border-0"
                      >
                        {role}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="mt-12 text-[9px] text-white/20 font-black uppercase tracking-[0.3em] text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck size={12} className="text-emerald-500/50" />
          Quantum Encrypted Connection
        </div>
        © 2026 TAN A DAI THANH GROUP
      </footer>
    </div>
  );
};

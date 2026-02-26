import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  LayoutDashboard, 
  Bot, 
  Bell, 
  Plus,
  FileText,
  Settings,
  CheckCircle2,
  MessageSquare,
  Building2,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Screens & Components ---
import { HomeScreen } from './screens/HomeScreen';
import { ProjectScreen } from './screens/ProjectScreen';
import { HRScreen } from './screens/HRScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AIScreen } from './screens/AIScreen';
import { ProposalScreen } from './screens/ProposalScreen';

import { WorkplaceScreen } from './screens/WorkplaceScreen';
import { CRMScreen } from './screens/CRMScreen';
import { DigitalOfficeScreen } from './screens/DigitalOfficeScreen';
import { MyDayScreen } from './screens/MyDayScreen';
import { InternalInfoScreen } from './screens/InternalInfoScreen';
import { MoreScreen } from './screens/MoreScreen';
import { FinancialDetail } from './screens/FinancialDetail';
import { RiskDetail } from './screens/RiskDetail';
import { ProjectDetail } from './screens/ProjectDetail';
import { ProjectTeam } from './screens/ProjectTeam';
import { ProjectDocuments } from './screens/ProjectDocuments';
import { ProjectTimeline } from './screens/ProjectTimeline';
import { ProjectKanban } from './screens/ProjectKanban';
import { ProjectCalendar } from './screens/ProjectCalendar';
import { ProjectGantt } from './screens/ProjectGantt';
import { PayrollDetail, BenefitsDetail } from './screens/HRDetails';
import { DashboardDetail } from './screens/DashboardDetail';
import { AIDetail } from './screens/AIDetail';
import { ProposalDetail } from './screens/ProposalDetail';
import { ProfileScreen } from './screens/ProfileScreen';
import { ApprovalListScreen } from './screens/ApprovalListScreen';
import { TaskScreen } from './screens/TaskScreen';
import { TaskDetail } from './screens/TaskDetail';
import { CheckInModal } from './components/CheckInModal';
import { CheckOutModal } from './components/CheckOutModal';
import { ProposalForm } from './components/ProposalForm';
import { ProjectForm } from './components/ProjectForm';
import { TaskForm } from './components/TaskForm';
import { QuickApproval } from './components/QuickApproval';
import { DigitalSignature } from './components/DigitalSignature';
import { LoginScreen } from './screens/LoginScreen';
import { odoo } from './services/odooService';
import { simulateNotificationClick } from './services/firebaseService';

// --- Types ---
type Screen = 'home' | 'digital_office' | 'my_day' | 'internal_info' | 'more';

// --- Components ---

const BottomNav = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems: { id: Screen, label: string, icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'digital_office', label: 'Văn phòng số', icon: FileText },
    { id: 'my_day', label: 'My Day', icon: Calendar },
    { id: 'internal_info', label: 'TT nội bộ', icon: MessageSquare },
    { id: 'more', label: 'Thêm nữa', icon: Settings },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-1 pb-6 pt-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] max-w-md mx-auto"
    >
      <div className="flex justify-between items-center max-w-md mx-auto px-1 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-all duration-300 shrink-0 ${
              activeScreen === item.id 
                ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} fill={activeScreen === item.id ? "currentColor" : "none"} />
            {activeScreen === item.id && (
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

const Header = ({ title, subtitle, showAvatar = true, rightAction, onAvatarClick }: { title: string, subtitle?: string, showAvatar?: boolean, rightAction?: React.ReactNode, onAvatarClick?: () => void }) => {
  const user = odoo.getCurrentUser();
  
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 bg-brand-blue border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-lg max-w-md mx-auto"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-white/20 shadow-sm">
          <img 
            className="w-full h-full object-contain p-1.5" 
            src="https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png" 
            alt="Logo"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-sm font-black text-white leading-tight uppercase tracking-tight">{title}</h1>
          {subtitle && <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightAction}
        <button className="relative p-2 text-white/80 hover:bg-white/10 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-gold rounded-full border-2 border-brand-blue"></span>
        </button>
        {showAvatar && (
          <button 
            onClick={onAvatarClick}
            className="w-9 h-9 rounded-full border-2 border-white/20 p-0.5 shadow-sm active:scale-90 transition-transform bg-white/10 overflow-hidden"
          >
            <img 
              className="w-full h-full rounded-full object-cover" 
              src={user?.image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDyodQTBPDqKiieiG9uPNA_Vr1-wEx33DZp83o1Ac1OyJgt4VY1dOBDb3F1QBaByoLxMxV5rpEpMaybBIruU4Ekh4XwMi-E9aO7pdBlHAXJsfWSQClOodHv4zCMBsLLR3zigvSuCoPXQiQfuNZTgSt517fygttY0pXDJKKkb8XvkuA2vPlCYs5hk5ld7sNSi2CGWcxWb8_j54KFyymgeCjoW9hP9U67-HvibEyudoH72-wI6nP2VQ7myCpO68-G9-qzqb6WWDnu20Z0"} 
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </button>
        )}
      </div>
    </header>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  
  // UI visibility states
  const [uiVisible, setUiVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detail States
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showQuickApproval, setShowQuickApproval] = useState(false);
  const [showDigitalSignature, setShowDigitalSignature] = useState(false);
  
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [showProjectTeam, setShowProjectTeam] = useState(false);
  const [showProjectDocuments, setShowProjectDocuments] = useState(false);
  const [showProjectTimeline, setShowProjectTimeline] = useState(false);
  const [showProjectKanban, setShowProjectKanban] = useState(false);
  const [showProjectCalendar, setShowProjectCalendar] = useState(false);
  const [showProjectGantt, setShowProjectGantt] = useState(false);
  const [showFinancialDetail, setShowFinancialDetail] = useState(false);
  const [showRiskDetail, setShowRiskDetail] = useState(false);
  const [showCRMDetail, setShowCRMDetail] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showPayroll, setShowPayroll] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showDashboardDetail, setShowDashboardDetail] = useState(false);
  const [showAIDetail, setShowAIDetail] = useState(false);
  const [proposalDetailId, setProposalDetailId] = useState<number | string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showApprovalList, setShowApprovalList] = useState(false);

  // Notification Handling Logic
  React.useEffect(() => {
    const handleNotification = (e: any) => {
      const { screen: targetScreen, id } = e.detail;
      console.log('Handling notification:', targetScreen, id);

      // Reset all overlays first
      handleBack();

      switch (targetScreen) {
        case 'project_detail':
          setScreen('my_day');
          setShowProjectDetail(true);
          break;
        case 'task_detail':
          setScreen('my_day');
          setShowTaskDetail(true);
          break;
        case 'proposal_detail':
          setScreen('digital_office');
          setProposalDetailId(id || null);
          break;
        case 'approval':
          setScreen('digital_office');
          setShowQuickApproval(true);
          break;
        case 'dashboard':
          setScreen('more');
          setShowDashboardDetail(true);
          break;
        default:
          setScreen('home');
      }
    };

    window.addEventListener('app-notification-click', handleNotification);
    return () => window.removeEventListener('app-notification-click', handleNotification);
  }, []);

  // Scroll handler for hiding/showing UI
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setUiVisible(false);
      } else {
        setUiVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Swipe to back logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchEnd - touchStart;
    const isLeftToRightSwipe = distance > minSwipeDistance;
    
    // Only trigger if starting from the left edge (e.g., first 40px)
    if (isLeftToRightSwipe && touchStart < 40) {
      handleBack();
    }
  };

  const handleBack = () => {
    if (showProjectTimeline) setShowProjectTimeline(false);
    else if (showProjectDocuments) setShowProjectDocuments(false);
    else if (showProjectTeam) setShowProjectTeam(false);
    else if (showProjectKanban) setShowProjectKanban(false);
    else if (showProjectCalendar) setShowProjectCalendar(false);
    else if (showProjectGantt) setShowProjectGantt(false);
    else if (showProjectDetail) setShowProjectDetail(false);
    else if (showPayroll) setShowPayroll(false);
    else if (showBenefits) setShowBenefits(false);
    else if (showDashboardDetail) setShowDashboardDetail(false);
    else if (showAIDetail) setShowAIDetail(false);
    else if (proposalDetailId) setProposalDetailId(null);
    else if (showProfile) setShowProfile(false);
    else if (showApprovalList) setShowApprovalList(false);
    else if (showProposalForm) setShowProposalForm(false);
    else if (showProjectForm) setShowProjectForm(false);
    else if (showTaskForm) setShowTaskForm(false);
    else if (showQuickApproval) setShowQuickApproval(false);
    else if (showDigitalSignature) setShowDigitalSignature(false);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={(role) => {
      setIsLoggedIn(true);
      if (role) setUserRole(role);
    }} />;
  }

  const getScreenTitle = () => {
    switch (screen) {
      case 'home': return 'Tân Á Đại Thành';
      case 'digital_office': return 'Văn phòng số';
      case 'my_day': return 'Ngày làm việc';
      case 'internal_info': return 'Thông tin nội bộ';
      case 'more': return 'Tiện ích mở rộng';
      default: return 'Tân Á Đại Thành';
    }
  };

  const getScreenSubtitle = () => {
    switch (screen) {
      case 'home': return 'Mega App Nội bộ';
      case 'digital_office': return 'Hệ thống điều hành điện tử';
      case 'my_day': return 'Cá nhân hóa công việc';
      case 'internal_info': return 'Mạng xã hội & Cổng thông tin';
      case 'more': return 'Tất cả ứng dụng';
      default: return '';
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 font-sans text-slate-900 max-w-md mx-auto shadow-2xl relative overflow-x-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Header 
        title={getScreenTitle()} 
        subtitle={userRole || getScreenSubtitle()} 
        onAvatarClick={() => setShowProfile(true)}
        rightAction={
          screen === 'ai' && (
            <button 
              onClick={() => setShowAIDetail(true)} 
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <Settings size={20} />
            </button>
          )
        }
      />
      
      <main className="pt-[64px] min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomeScreen 
              key="home" 
              userRole={userRole}
              onShowDashboard={() => {
                setScreen('more');
                setShowDashboardDetail(true);
              }} 
              onShowProposal={() => setShowProposalForm(true)}
              onShowApproval={() => setShowApprovalList(true)}
              onShowSignature={() => setShowDigitalSignature(true)}
            />
          )}
          {screen === 'digital_office' && (
            <DigitalOfficeScreen 
              userRole={userRole}
              onShowProposal={() => setShowProposalForm(true)}
              onShowApproval={() => setShowApprovalList(true)}
              onCheckIn={() => setShowCheckInModal(true)}
              onCheckOut={() => setShowCheckOutModal(true)}
              onShowPayroll={() => setShowPayroll(true)}
              onShowBenefits={() => setShowBenefits(true)}
            />
          )}
          {screen === 'my_day' && (
            <MyDayScreen 
              onShowProjectDetail={() => setShowProjectDetail(true)}
              onShowTaskDetail={() => setShowTaskDetail(true)}
            />
          )}
          {screen === 'internal_info' && <InternalInfoScreen />}
          {screen === 'more' && (
            <MoreScreen 
              onShowAI={() => setShowAIDetail(true)}
              onShowCRM={() => setShowCRMDetail(true)}
              onShowDashboard={() => setShowDashboardDetail(true)}
              onLogout={() => setIsLoggedIn(false)}
              onSimulateNotification={(type) => {
                switch(type) {
                  case 'project': simulateNotificationClick({ screen: 'project_detail', id: '1' }); break;
                  case 'task': simulateNotificationClick({ screen: 'task_detail', id: '1' }); break;
                  case 'proposal': simulateNotificationClick({ screen: 'proposal_detail', id: '1' }); break;
                  case 'approval': simulateNotificationClick({ screen: 'approval', id: '1' }); break;
                }
              }}
            />
          )}
          {screen === 'dashboard' && (
            <DashboardScreen 
              key="dashboard" 
              userRole={userRole}
              onShowDetail={() => setShowDashboardDetail(true)} 
            />
          )}
          {screen === 'ai' && (
            <AIScreen 
              key="ai" 
              onShowSettings={() => setShowAIDetail(true)} 
            />
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeScreen={screen} setScreen={setScreen} />
      
      {/* Detail Overlays */}
      <AnimatePresence>
        {showProjectDetail && (
          <ProjectDetail 
            onBack={() => setShowProjectDetail(false)} 
            onShowTeam={() => setShowProjectTeam(true)}
            onShowDocuments={() => setShowProjectDocuments(true)}
            onShowTimeline={() => setShowProjectTimeline(true)}
            onShowKanban={() => setShowProjectKanban(true)}
            onShowCalendar={() => setShowProjectCalendar(true)}
            onShowGantt={() => setShowProjectGantt(true)}
            onShowFinancialDetail={() => setShowFinancialDetail(true)}
            onShowRiskDetail={() => setShowRiskDetail(true)}
          />
        )}
        {showProjectTeam && <ProjectTeam onBack={() => setShowProjectTeam(false)} />}
        {showProjectDocuments && <ProjectDocuments onBack={() => setShowProjectDocuments(false)} />}
        {showProjectTimeline && <ProjectTimeline onBack={() => setShowProjectTimeline(false)} />}
        {showProjectKanban && <ProjectKanban onBack={() => setShowProjectKanban(false)} />}
        {showProjectCalendar && <ProjectCalendar onBack={() => setShowProjectCalendar(false)} />}
        {showProjectGantt && <ProjectGantt onBack={() => setShowProjectGantt(false)} />}
        {showFinancialDetail && <FinancialDetail onBack={() => setShowFinancialDetail(false)} />}
        {showRiskDetail && <RiskDetail onBack={() => setShowRiskDetail(false)} />}
        {showPayroll && <PayrollDetail onBack={() => setShowPayroll(false)} />}
        {showBenefits && <BenefitsDetail onBack={() => setShowBenefits(false)} />}
        {showDashboardDetail && <DashboardDetail onBack={() => setShowDashboardDetail(false)} />}
        {showAIDetail && <AIDetail onBack={() => setShowAIDetail(false)} />}
        {showCRMDetail && <CRMScreen onBack={() => setShowCRMDetail(false)} />}
        {showTaskDetail && (
          <TaskDetail 
            task={{
              id: '1',
              title: 'Gửi báo cáo tiến độ tuần',
              project: 'Nhà máy GĐ2',
              dueDate: '25/02/2026',
              priority: 'high',
              progress: 45,
              status: 'in-progress',
              desc: 'Cần tổng hợp số liệu từ các tổ đội và gửi cho Ban Giám đốc trước 17h.'
            }}
            onBack={() => setShowTaskDetail(false)} 
            onUpdateProgress={() => {}}
          />
        )}
        {proposalDetailId && <ProposalDetail requestId={proposalDetailId} onBack={() => setProposalDetailId(null)} />}
        {showProfile && <ProfileScreen onBack={() => setShowProfile(false)} onLogout={() => setIsLoggedIn(false)} />}
        {showApprovalList && <ApprovalListScreen onBack={() => setShowApprovalList(false)} />}
        {showProposalForm && <ProposalForm onBack={() => setShowProposalForm(false)} />}
        {showProjectForm && <ProjectForm onBack={() => setShowProjectForm(false)} />}
        {showTaskForm && <TaskForm onBack={() => setShowTaskForm(false)} />}
        {showQuickApproval && <QuickApproval onBack={() => setShowQuickApproval(false)} />}
        {showDigitalSignature && <DigitalSignature onBack={() => setShowDigitalSignature(false)} />}
      </AnimatePresence>

      {/* Modals */}
      <CheckInModal isOpen={showCheckInModal} onClose={() => setShowCheckInModal(false)} />
      <CheckOutModal isOpen={showCheckOutModal} onClose={() => setShowCheckOutModal(false)} />

      {/* Floating Action Button (only on home/digital_office/my_day) */}
      {(screen === 'home' || screen === 'digital_office' || screen === 'my_day') && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: 0 }}
          onClick={() => {
            if (screen === 'digital_office') setShowProposalForm(true);
            else if (screen === 'my_day') setShowTaskForm(true);
            else setShowProposalForm(true); // Default for home
          }}
          className="fixed right-6 bottom-24 size-14 bg-brand-blue text-white rounded-full shadow-lg shadow-brand-blue/30 flex items-center justify-center z-40 active:scale-95 transition-transform"
        >
          <Plus size={32} />
        </motion.button>
      )}
    </div>
  );
}

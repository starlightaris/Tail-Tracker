// Layout.js
import React, { useState, useContext } from 'react';
import { 
  PawPrint, LayoutDashboard, UtensilsCrossed, 
  Heart, User, LogOut, Menu, X, ChevronLeft,
  Bell, Settings
} from 'lucide-react';
import PetSelector from './PetSelector';
import { PetContext } from '../context/PetContext';

const Layout = ({ children, onLogout, currentPage, navigateTo }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedPet } = useContext(PetContext);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'diet', icon: <UtensilsCrossed size={20} />, label: 'Diet Manager' },
    { id: 'health', icon: <Heart size={20} />, label: 'Health Tracker' },
    { id: 'profile', icon: <User size={20} />, label: 'Pet Profile' },
  ];

  const handleNavigation = (pageId) => {
    navigateTo(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <aside style={{ 
        ...styles.sidebar, 
        ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed),
        ...(mobileMenuOpen ? styles.sidebarMobileOpen : {})
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoArea}>
            <PawPrint size={28} color="#ca8398" />
            {sidebarOpen && <span style={styles.logoText}>Tail Tracker</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.sidebarToggle}>
            <ChevronLeft size={20} style={{ transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)' }} />
          </button>
        </div>

        <div style={styles.userSection}>
          <div style={styles.userAvatar}>
            {user.name?.[0] || 'U'}
          </div>
          {sidebarOpen && (
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user.name || 'User'}</div>
              <div style={styles.userEmail}>{user.email || 'user@example.com'}</div>
            </div>
          )}
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              style={{
                ...styles.navLink,
                ...(currentPage === item.id ? styles.navLinkActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={onLogout} style={styles.logoutBtn}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div style={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div style={{ 
        ...styles.main, 
        ...(sidebarOpen ? styles.mainWithSidebar : styles.mainFull) 
      }}>
        {/* Top Bar */}
        <header style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              style={styles.mobileMenuBtn}
            >
              <Menu size={24} />
            </button>
            <div style={styles.pageTitle}>
              {navItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
            </div>
          </div>
          
          <div style={styles.topBarRight}>
            <div style={styles.petSelectorWrapper}>
              <PetSelector />
            </div>
            <button style={styles.notificationBtn}>
              <Bell size={20} />
              <span style={styles.notificationBadge}>3</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f6f4',
  },
  sidebar: {
    backgroundColor: 'white',
    borderRight: '1px solid #eae8e4',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    position: 'fixed',
    height: '100vh',
    zIndex: 100,
    boxShadow: '2px 0 12px rgba(0,0,0,0.03)',
  },
  sidebarOpen: {
    width: '260px',
  },
  sidebarClosed: {
    width: '72px',
  },
  sidebarMobileOpen: {
    transform: 'translateX(0)',
  },
  sidebarHeader: {
    padding: '20px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eae8e4',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ca8398',
  },
  sidebarToggle: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9a958c',
    display: 'flex',
    alignItems: 'center',
  },
  userSection: {
    padding: '20px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #eae8e4',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: '#ca8398',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px',
    flexShrink: 0,
  },
  userInfo: {
    overflow: 'hidden',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#676354',
    whiteSpace: 'nowrap',
  },
  userEmail: {
    fontSize: '11px',
    color: '#9a958c',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nav: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#676354',
    transition: 'all 0.2s',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  navLinkActive: {
    backgroundColor: '#ca8398',
    color: 'white',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
  },
  sidebarFooter: {
    padding: '16px',
    borderTop: '1px solid #eae8e4',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ca8398',
    cursor: 'pointer',
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s',
    fontFamily: 'inherit',
  },
  main: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
  },
  mainWithSidebar: {
    marginLeft: '260px',
  },
  mainFull: {
    marginLeft: '72px',
  },
  topBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #eae8e4',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#676354',
    '@media (max-width: 768px)': {
      display: 'flex',
    },
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#676354',
  },
  topBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  petSelectorWrapper: {
    minWidth: '180px',
  },
  notificationBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#676354',
    padding: '8px',
  },
  notificationBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#ca8398',
    color: 'white',
    fontSize: '10px',
    borderRadius: '10px',
    padding: '2px 6px',
  },
  content: {
    padding: '0',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
};

// Add responsive styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 768px) {
    .sidebar-open {
      transform: translateX(0);
    }
    .sidebar-closed {
      transform: translateX(-100%);
    }
  }
`;
document.head.appendChild(styleSheet);

export default Layout;
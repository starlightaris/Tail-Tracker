// Layout.js
import React, { useState, useContext, useEffect } from 'react';
import {
  PawPrint, LayoutDashboard, UtensilsCrossed,
  Heart, User, LogOut, ChevronLeft, Bell, Menu, X, CheckCircle, AlertCircle, Coffee
} from 'lucide-react';
import { PetContext } from '../context/PetContext';

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'diet', icon: UtensilsCrossed, label: 'Diet Manager' },
  { id: 'health', icon: Heart, label: 'Health Tracker' },
  { id: 'profile', icon: User, label: 'Pet Profiles' },
];

const SAMPLE_NOTIFICATIONS = [
  { id: 1, petName: "Charlie", type: "medical", title: "Medical Checkup Due", message: "Charlie's annual checkup is scheduled for today! 🏥", time: "2 hours ago", read: false, icon: "🏥" },
  { id: 2, petName: "Luna", type: "feeding", title: "Feeding Complete", message: "Luna was fed at 08:30 AM. She finished all her food! 🍖", time: "4 hours ago", read: false, icon: "🍖" },
  { id: 3, petName: "Buddy", type: "vaccination", title: "Vaccination Reminder", message: "Buddy's rabies vaccination is due in 3 days! 💉", time: "1 day ago", read: true, icon: "💉" },
  { id: 4, petName: "All Pets", type: "environment", title: "Room Temperature Alert", message: "Temperature dropped to 20°C. Consider adjusting heating for pets! 🌡️", time: "1 day ago", read: true, icon: "🌡️" },
  { id: 5, petName: "Luna", type: "activity", title: "High Activity Detected", message: "Luna has been extra playful today! +45% more steps than usual ⚡", time: "2 days ago", read: true, icon: "⚡" },
];

const Layout = ({ children, onLogout, currentPage, navigateTo }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);
  const { selectedPet, allPets, setSelectedPet } = useContext(PetContext);
  const user = JSON.parse(localStorage.getItem('tt_user') || '{}');

  const sideW = collapsed ? 72 : 248;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'medical': return <AlertCircle size={16} color="#ca8398" />;
      case 'feeding': return <Coffee size={16} color="#60a1b0" />;
      case 'vaccination': return <AlertCircle size={16} color="#ca8398" />;
      default: return <CheckCircle size={16} color="#60a1b0" />;
    }
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showNotifications && !e.target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showNotifications]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f6f2' }}>
      {/* Sidebar */}
      <aside style={{
        width: sideW, flexShrink: 0, background: 'white',
        borderRight: '1px solid #eae8e2', display: 'flex', flexDirection: 'column',
        position: 'fixed', height: '100vh', zIndex: 200,
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '2px 0 16px rgba(103,99,84,0.06)',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '18px 14px' : '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #eae8e2', minHeight: 68,
        }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden', animation: 'slideIn 0.25s ease' }}>
              <img
                src="/logo32.png"
                alt="Tail Tracker Logo"
                style={{
                  width: 36,
                  height: 36,
                  objectFit: 'contain',
                  flexShrink: 0,
                  borderRadius: 8,
                }}
              />
              <span style={{
                fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600,
                color: '#ca8398', whiteSpace: 'nowrap',
              }}>Tail Tracker</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: '#f8f6f2', border: '1px solid #eae8e2', borderRadius: 10,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#9a958c', transition: 'all 0.2s', flexShrink: 0,
            marginLeft: collapsed ? 'auto' : 0, marginRight: collapsed ? 'auto' : 0,
          }}>
            <ChevronLeft size={16} style={{ transform: collapsed ? 'rotate(180deg)' : '', transition: 'transform 0.3s' }} />
          </button>
        </div>
        {/* User */}
        <div style={{
          padding: collapsed ? '14px 0' : '14px 20px',
          borderBottom: '1px solid #eae8e2', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: 'linear-gradient(135deg, #ca8398, #b06d82)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 15, flexShrink: 0, fontFamily: "'Nunito', sans-serif",
          }}>
            {(user.name?.[0] || 'U').toUpperCase()}
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', animation: 'slideIn 0.25s ease', }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3a3728', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name || 'User'}</div>
              <div style={{ fontSize: 11, color: '#9a958c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email || 'user@example.com'}</div>
            </div>
          )}
        </div>

        {/* Pet Switcher */}
        {!collapsed && (
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #eae8e2', animation: 'slideIn 0.25s ease' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#9a958c', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Active Pet</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {allPets.map(pet => (
                <button key={pet.id} onClick={() => setSelectedPet(pet)} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
                  borderRadius: 12, border: 'none', cursor: 'pointer', transition: 'all 0.18s',
                  background: selectedPet?.id === pet.id ? '#f7edf0' : 'transparent',
                  width: '100%', textAlign: 'left',
                }}>
                  <img src={pet.img} alt={pet.name} style={{
                    width: 36, height: 36, borderRadius: 18, objectFit: 'cover',
                    border: selectedPet?.id === pet.id ? '2px solid #ca8398' : '2px solid transparent',
                    transition: 'border-color 0.2s',
                  }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: selectedPet?.id === pet.id ? '#ca8398' : '#676354' }}>{pet.name}</div>
                    <div style={{ fontSize: 11, color: '#9a958c' }}>{pet.breed}</div>
                  </div>
                  {selectedPet?.id === pet.id && <span style={{ marginLeft: 'auto', fontSize: 16 }}>🐾</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ flex: 1, padding: collapsed ? '12px 8px' : '12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(({ id, icon: Icon, label }, idx) => {
            const active = currentPage === id;
            return (
              <button key={id} onClick={() => navigateTo(id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
                borderRadius: 14, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: active ? 'linear-gradient(135deg, #ca8398, #b06d82)' : 'transparent',
                color: active ? 'white' : '#9a958c', width: '100%',
                justifyContent: collapsed ? 'center' : 'flex-start',
                boxShadow: active ? '0 4px 14px rgba(202,131,152,0.3)' : 'none',
                fontFamily: "'Nunito', sans-serif",
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f8f6f2'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                title={collapsed ? label : ''}
              >
                <Icon size={20} />
                {!collapsed && <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: collapsed ? '12px 8px' : '12px', borderTop: '1px solid #eae8e2' }}>
          <button onClick={onLogout} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#ca8398', width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif",
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f7edf0'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={20} />
            {!collapsed && <span style={{ fontSize: 14, fontWeight: 600 }}>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: sideW, flex: 1, transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <header style={{
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #eae8e2', padding: '0 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 60, position: 'sticky', top: 0, zIndex: 100,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{
              margin: 0, fontSize: 18, fontWeight: 800, color: '#3a3728',
              fontFamily: "'Fraunces', serif",
            }}>
              {NAV_ITEMS.find(i => i.id === currentPage)?.label || 'Dashboard'}
            </h2>
            {selectedPet && (
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                background: '#f7edf0', borderRadius: 20, fontSize: 13, fontWeight: 600,
                color: '#ca8398', animation: 'fadeIn 0.3s ease',
              }}>
                <img src={selectedPet.img} alt="" style={{ width: 20, height: 20, borderRadius: 10, objectFit: 'cover' }} />
                {selectedPet.name}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: '#9a958c' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>

            {/* Notification Bell Button */}
            <div className="notifications-container" style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  position: 'relative', background: '#f5f3f0', border: 'none',
                  borderRadius: 12, width: 38, height: 38, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#676354',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#eae8e2'}
                onMouseLeave={e => e.currentTarget.style.background = '#f5f3f0'}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16,
                    background: '#ca8398', color: 'white', borderRadius: 8,
                    fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', padding: '0 4px', animation: 'pulse 2s ease-in-out infinite',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute', top: 45, right: 0, width: 360,
                  background: 'white', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  border: '1px solid #eae8e2', zIndex: 1000, overflow: 'hidden',
                  animation: 'slideDown 0.25s ease',
                }}>
                  <div style={{
                    padding: '16px 20px', borderBottom: '1px solid #eae8e2',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#676354' }}>
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} style={{
                        background: 'none', border: 'none', fontSize: 12,
                        color: '#ca8398', cursor: 'pointer', fontWeight: 500,
                      }}>
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '40px', textAlign: 'center', color: '#9a958c' }}>
                        <Bell size={32} />
                        <p style={{ marginTop: 12 }}>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          style={{
                            padding: '14px 20px',
                            borderBottom: '1px solid #f0eeea',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            background: notification.read ? 'white' : '#fef5f7',
                            opacity: notification.read ? 0.7 : 1,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                          onMouseLeave={e => e.currentTarget.style.background = notification.read ? 'white' : '#fef5f7'}
                        >
                          <div style={{ display: 'flex', gap: 12 }}>
                            <div style={{
                              width: 40, height: 40, borderRadius: 20,
                              background: notification.type === 'medical' ? '#ca839810' : '#60a1b010',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 20,
                            }}>
                              {notification.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#676354' }}>
                                  {notification.title}
                                </div>
                                <div style={{ fontSize: 10, color: '#9a958c' }}>
                                  {notification.time}
                                </div>
                              </div>
                              <div style={{ fontSize: 12, color: '#9a958c', marginBottom: 4 }}>
                                {notification.message}
                              </div>
                              <div style={{ fontSize: 11, fontWeight: 500, color: '#ca8398', display: 'flex', alignItems: 'center', gap: 4 }}>
                                🐾 {notification.petName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: '28px 28px', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
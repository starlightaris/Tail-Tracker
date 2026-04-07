import React, { useState, useContext } from 'react';
import {
  PawPrint, LayoutDashboard, UtensilsCrossed,
  Heart, User, LogOut, ChevronLeft, Bell, Menu, X
} from 'lucide-react';
import { PetContext } from '../context/PetContext';

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'diet',      icon: UtensilsCrossed, label: 'Diet Manager' },
  { id: 'health',    icon: Heart,           label: 'Health Tracker' },
  { id: 'profile',   icon: User,            label: 'Pet Profiles' },
];

const Layout = ({ children, onLogout, currentPage, navigateTo }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedPet, allPets, setSelectedPet } = useContext(PetContext);
  const user = JSON.parse(localStorage.getItem('tt_user') || '{}');

  const sideW = collapsed ? 72 : 248;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f6f2' }}>
      {/* Sidebar */}
      <aside style={{
        width: sideW, flexShrink: 0, background: 'white',
        borderRight: '1px solid #eae8e2', display: 'flex', flexDirection: 'column',
        position: 'fixed', height: '100vh', zIndex: 200,
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '2px 0 16px rgba(103,99,84,0.06)',
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '18px 14px' : '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #eae8e2', minHeight: 68,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
            <PawPrint size={26} color="#ca8398" style={{ flexShrink: 0, animation: 'heartbeat 3s ease-in-out infinite' }} />
            {!collapsed && <span style={{
              fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600,
              color: '#ca8398', whiteSpace: 'nowrap', animation: 'slideIn 0.25s ease',
            }}>Tail Tracker</span>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: '#f8f6f2', border: '1px solid #eae8e2', borderRadius: 10,
            width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#9a958c', transition: 'all 0.2s', flexShrink: 0,
          }}>
            <ChevronLeft size={16} style={{ transform: collapsed ? 'rotate(180deg)' : '', transition: 'transform 0.3s' }} />
          </button>
        </div>

        {/* User */}
        <div style={{
          padding: collapsed ? '14px' : '14px 20px',
          borderBottom: '1px solid #eae8e2', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: 'linear-gradient(135deg, #ca8398, #b06d82)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 15, flexShrink: 0, fontFamily: "'Nunito', sans-serif",
          }}>
            {(user.name?.[0] || 'U').toUpperCase()}
          </div>
          {!collapsed && (
            <div style={{ overflow: 'hidden', animation: 'slideIn 0.25s ease' }}>
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
                    width: 28, height: 28, borderRadius: 14, objectFit: 'cover',
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

        {/* Nav */}
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
                animation: `slideIn 0.25s ease ${idx * 0.04}s both`,
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

      {/* Main */}
      <div style={{ marginLeft: sideW, flex: 1, transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
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
            <button style={{
              position: 'relative', background: '#f5f3f0', border: 'none',
              borderRadius: 12, width: 38, height: 38, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#676354',
            }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute', top: 6, right: 6, width: 8, height: 8,
                background: '#ca8398', borderRadius: '50%',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            </button>
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
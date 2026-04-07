import React, { useState, useEffect, useRef } from 'react';

/*  Toast */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const toast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  };
  return { toasts, toast };
};

export const ToastContainer = ({ toasts }) => (
  <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        background: t.type === 'error' ? '#a5637a' : '#676354',
        color: 'white', padding: '11px 20px', borderRadius: 40,
        fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        animation: 'toastIn 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: "'Nunito', sans-serif",
      }}>
        <span>{t.type === 'error' ? '⚠️' : '✓'}</span> {t.message}
      </div>
    ))}
  </div>
);

/* Section Card */
export const Card = ({ children, style, className }) => (
  <div style={{
    background: 'white', borderRadius: 20, border: '1px solid #eae8e2',
    boxShadow: '0 2px 10px rgba(103,99,84,0.07)', overflow: 'hidden',
    ...style
  }} className={className}>
    {children}
  </div>
);

export const CardHeader = ({ icon, title, right, color = '#ca8398' }) => (
  <div style={{
    padding: '16px 22px', borderBottom: '1px solid #f0eeea',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#fdfcfb',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color, display: 'flex' }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#676354', fontFamily: "'Nunito', sans-serif" }}>{title}</h3>
    </div>
    {right}
  </div>
);

/* Stat Chip */
export const StatChip = ({ icon, label, value, color = '#ca8398', trend, style, animDelay = 0 }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
    background: 'white', borderRadius: 16, border: '1px solid #f0eeea',
    animation: `fadeUp 0.4s ease ${animDelay}s both`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'default',
    ...style,
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(103,99,84,0.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
  >
    <div style={{
      width: 46, height: 46, borderRadius: 14, flexShrink: 0,
      background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9a958c', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: '#3a3728', lineHeight: 1.2 }}>{value}</div>
      {trend && <div style={{ fontSize: 11, color: trend.startsWith('+') ? '#60a1b0' : '#ca8398', marginTop: 2, fontWeight: 600 }}>
        {trend.startsWith('+') ? '↑' : '↓'} {trend}
      </div>}
    </div>
  </div>
);

/* Badge */
export const Badge = ({ children, color = '#ca8398', bg }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px',
    borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: '0.2px',
    color, background: bg || `${color}18`,
    fontFamily: "'Nunito', sans-serif",
  }}>
    {children}
  </span>
);

/* Page Header */
export const PageHeader = ({ title, subtitle, action, icon, color = '#ca8398' }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 28, animation: 'fadeUp 0.3s ease',
    flexWrap: 'wrap', gap: 12,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {icon && (
        <div style={{
          width: 48, height: 48, borderRadius: 16, background: `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color,
        }}>{icon}</div>
      )}
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#3a3728', fontFamily: "'Fraunces', serif", letterSpacing: '-0.3px' }}>
          {title}
        </h1>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9a958c' }}>{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

/* Pill Button */
export const PillBtn = ({ children, onClick, variant = 'primary', icon, small, style }) => {
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: small ? '7px 14px' : '10px 20px',
      borderRadius: 40, border: isOutline ? '1.5px solid #ca8398' : 'none',
      background: isPrimary ? 'linear-gradient(135deg, #ca8398, #b06d82)'
        : isOutline ? 'transparent' : '#f5f3f0',
      color: isPrimary ? 'white' : isOutline ? '#ca8398' : '#676354',
      fontSize: small ? 13 : 14, fontWeight: 700, cursor: 'pointer',
      boxShadow: isPrimary ? '0 4px 14px rgba(202,131,152,0.35)' : 'none',
      transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif",
      ...style,
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}
    >
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      {children}
    </button>
  );
};

/* Animated Number */
export const AnimatedNum = ({ value, suffix = '', duration = 800 }) => {
  const [display, setDisplay] = useState(0);
  const target = parseFloat(value) || 0;
  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(parseFloat((target * progress).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <span>{display}{suffix}</span>;
};

/* Mini Bar Chart */
export const MiniBarChart = ({ data, color = '#ca8398', height = 80 }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#9a958c' }}>{d.value}</div>
          <div style={{
            width: '100%', maxWidth: 28, borderRadius: '4px 4px 0 0',
            background: `${color}cc`, height: `${(d.value / max) * (height - 28)}px`,
            animation: `barGrow 0.5s ease ${i * 0.06}s both`,
            transition: 'height 0.4s',
          }} />
          <div style={{ fontSize: 10, color: '#9a958c', whiteSpace: 'nowrap' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
};

/* Empty State */
export const EmptyState = ({ emoji = '🐾', message, sub }) => (
  <div style={{ textAlign: 'center', padding: '48px 24px', animation: 'fadeIn 0.4s ease' }}>
    <div style={{ fontSize: 52, marginBottom: 14, animation: 'float 3s ease-in-out infinite' }}>{emoji}</div>
    <p style={{ fontSize: 16, fontWeight: 700, color: '#676354', margin: '0 0 6px' }}>{message}</p>
    {sub && <p style={{ fontSize: 13, color: '#9a958c', margin: 0 }}>{sub}</p>}
  </div>
);

/* Modal */
export const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(58,55,40,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, animation: 'fadeIn 0.2s ease', padding: 20,
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'white', borderRadius: 24, width: '100%', maxWidth: 500,
        maxHeight: '90vh', overflow: 'auto', animation: 'scaleIn 0.25s ease',
        boxShadow: '0 24px 60px rgba(103,99,84,0.2)',
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid #eae8e2',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#3a3728', fontFamily: "'Fraunces', serif" }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a958c', display: 'flex', padding: 4, borderRadius: 8 }}>
            ✕
          </button>
        </div>
        <div style={{ padding: '20px 24px' }}>{children}</div>
        {footer && <div style={{ padding: '16px 24px', borderTop: '1px solid #eae8e2', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>}
      </div>
    </div>
  );
};

/* Form Field */
export const Field = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#676354', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
    {children}
  </div>
);

export const Input = ({ style, ...props }) => (
  <input {...props} style={{
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s', background: 'white', color: '#3a3728',
    fontFamily: "'Nunito', sans-serif", ...style,
  }}
    onFocus={e => e.target.style.borderColor = '#ca8398'}
    onBlur={e => e.target.style.borderColor = '#e8e5df'}
  />
);

export const Select = ({ style, children, ...props }) => (
  <select {...props} style={{
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none',
    background: 'white', color: '#3a3728', cursor: 'pointer',
    fontFamily: "'Nunito', sans-serif", ...style,
  }}>
    {children}
  </select>
);

export const Textarea = ({ style, ...props }) => (
  <textarea {...props} style={{
    width: '100%', padding: '10px 14px', borderRadius: 12,
    border: '1.5px solid #e8e5df', fontSize: 14, outline: 'none',
    resize: 'vertical', fontFamily: "'Nunito', sans-serif",
    background: 'white', color: '#3a3728', ...style,
  }}
    onFocus={e => e.target.style.borderColor = '#ca8398'}
    onBlur={e => e.target.style.borderColor = '#e8e5df'}
  />
);
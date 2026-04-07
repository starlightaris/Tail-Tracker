import React, { useState } from 'react';
import { PawPrint, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

const MOCK_USERS = [
  { email: 'user@example.com', password: 'password123', name: 'John Doe' },
  { email: 'petlover@tailtracker.com', password: 'petcare', name: 'Jane Smith' }
];

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // subtle loading feel

    if (isLogin) {
      const user = MOCK_USERS.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('tt_user', JSON.stringify({ name: user.name, email: user.email }));
        onLogin();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); setLoading(false); return; }
      if (formData.password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
      localStorage.setItem('tt_user', JSON.stringify({ name: formData.name, email: formData.email }));
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div style={S.bg}>
      {/* Animated blobs */}
      <div style={{ ...S.blob, ...S.blob1 }} />
      <div style={{ ...S.blob, ...S.blob2 }} />
      <div style={{ ...S.blob, ...S.blob3 }} />

      <div style={S.card}>
        <div style={S.logoWrap}>
          <div style={S.logoIcon}>
            <PawPrint size={36} color="#ca8398" style={{ animation: 'wiggle 2s ease-in-out infinite' }} />
          </div>
          <h1 style={S.logoText}>Tail Tracker</h1>
          <p style={S.tagline}>Smart Care for Happy Tails 🐾</p>
        </div>

        <div style={S.toggle}>
          {['Sign In', 'Create Account'].map((label, i) => (
            <button key={label} onClick={() => { setIsLogin(i === 0); setError(''); }}
              style={{ ...S.toggleBtn, ...(isLogin === (i === 0) ? S.toggleActive : {}) }}>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={S.form}>
          {!isLogin && (
            <InputRow icon={<User size={16} />} type="text" placeholder="Full Name" value={formData.name} onChange={update('name')} required />
          )}
          <InputRow icon={<Mail size={16} />} type="email" placeholder="Email Address" value={formData.email} onChange={update('email')} required />
          <InputRow
            icon={<Lock size={16} />} type={showPassword ? 'text' : 'password'}
            placeholder="Password" value={formData.password} onChange={update('password')} required
            suffix={
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={S.eyeBtn}>
                {showPassword ? <EyeOff size={16} color="#9a958c" /> : <Eye size={16} color="#9a958c" />}
              </button>
            }
          />
          {!isLogin && (
            <InputRow icon={<Lock size={16} />} type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={update('confirmPassword')} required />
          )}

          {error && <div style={S.error}>{error}</div>}

          {isLogin && (
            <div style={{ textAlign: 'right', marginTop: '-4px' }}>
              <span style={S.forgotLink}>Forgot Password?</span>
            </div>
          )}

          <button type="submit" style={{ ...S.submit, ...(loading ? S.submitLoading : {}) }} disabled={loading}>
            {loading ? <span style={S.spinner} /> : null}
            {loading ? 'Just a moment…' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={S.demo}>
          <Sparkles size={14} color="#ca8398" />
          <span>Demo: <code style={S.code}>user@example.com</code> / <code style={S.code}>password123</code></span>
        </div>
      </div>
    </div>
  );
};

const InputRow = ({ icon, suffix, ...props }) => (
  <div style={S.inputRow}>
    <span style={S.inputIcon}>{icon}</span>
    <input {...props} style={S.input} />
    {suffix}
  </div>
);

const S = {
  bg: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'linear-gradient(145deg, #f2dce4 0%, #d4eaf0 100%)',
    position: 'relative', overflow: 'hidden',
  },
  blob: { position: 'absolute', borderRadius: '50%', filter: 'blur(60px)', opacity: 0.45 },
  blob1: { width: 320, height: 320, background: '#ca8398', top: -80, right: -80, animation: 'float 6s ease-in-out infinite' },
  blob2: { width: 240, height: 240, background: '#60a1b0', bottom: -60, left: -60, animation: 'float 8s ease-in-out infinite reverse' },
  blob3: { width: 160, height: 160, background: '#dadbd5', bottom: '20%', right: '15%', animation: 'float 5s ease-in-out infinite 1s' },
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
    borderRadius: 32, padding: '40px 36px', width: '90%', maxWidth: 440,
    boxShadow: '0 24px 60px rgba(103,99,84,0.18)',
    zIndex: 1, animation: 'scaleIn 0.4s cubic-bezier(0.4,0,0.2,1)',
    border: '1px solid rgba(255,255,255,0.7)',
  },
  logoWrap: { textAlign: 'center', marginBottom: 28 },
  logoIcon: {
    width: 76, height: 76, borderRadius: 38,
    background: 'linear-gradient(145deg, #fce9ef, #f7edf0)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 14px', boxShadow: '0 4px 14px rgba(202,131,152,0.25)',
  },
  logoText: { fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, color: '#676354', margin: 0 },
  tagline: { fontSize: 13, color: '#9a958c', marginTop: 6 },
  toggle: {
    display: 'flex', gap: 6, background: '#f5f3f0', borderRadius: 40,
    padding: 4, marginBottom: 24,
  },
  toggleBtn: {
    flex: 1, padding: '10px', borderRadius: 36, border: 'none',
    background: 'transparent', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.22s', color: '#9a958c',
    fontFamily: "'Nunito', sans-serif",
  },
  toggleActive: { background: '#ca8398', color: 'white', boxShadow: '0 4px 12px rgba(202,131,152,0.35)' },
  form: { display: 'flex', flexDirection: 'column', gap: 12 },
  inputRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    border: '1.5px solid #e8e5df', borderRadius: 14, padding: '10px 14px',
    background: 'white', transition: 'border-color 0.2s',
  },
  inputIcon: { color: '#9a958c', display: 'flex', flexShrink: 0 },
  input: { flex: 1, border: 'none', outline: 'none', fontSize: 14, background: 'transparent', color: '#3a3728' },
  eyeBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 },
  error: {
    background: '#fce9ef', color: '#a5637a', padding: '10px 14px',
    borderRadius: 12, fontSize: 13, textAlign: 'center', border: '1px solid #f0c8d5',
  },
  forgotLink: { fontSize: 12, color: '#ca8398', cursor: 'pointer' },
  submit: {
    padding: '14px', background: 'linear-gradient(135deg, #ca8398, #b06d82)',
    border: 'none', borderRadius: 40, color: 'white', fontSize: 15,
    fontWeight: 700, cursor: 'pointer', marginTop: 6,
    boxShadow: '0 6px 20px rgba(202,131,152,0.4)', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: "'Nunito', sans-serif",
  },
  submitLoading: { opacity: 0.8 },
  spinner: {
    width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block',
  },
  demo: {
    marginTop: 20, textAlign: 'center', fontSize: 12, color: '#9a958c',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  code: { background: '#f5f3f0', padding: '2px 7px', borderRadius: 6, fontSize: 11, color: '#676354' },
};

export default Login;
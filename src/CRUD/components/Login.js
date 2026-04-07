// components/Login.js
import React, { useState } from 'react';
import { PawPrint, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Mock users database
  const mockUsers = [
    { email: 'user@example.com', password: 'password123', name: 'John Doe' },
    { email: 'petlover@tailtracker.com', password: 'petcare', name: 'Jane Smith' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
        onLogin();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      // Mock signup - just log in
      localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
      onLogin();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.bgDecoration}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <PawPrint size={40} color="#ca8398" />
          </div>
          <h1 style={styles.logoText}>Tail Tracker</h1>
          <p style={styles.tagline}>Smart Pet Care Dashboard</p>
        </div>

        <div style={styles.toggleContainer}>
          <button 
            onClick={() => setIsLogin(true)} 
            style={{ ...styles.toggleBtn, ...(isLogin ? styles.toggleActive : {}) }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            style={{ ...styles.toggleBtn, ...(!isLogin ? styles.toggleActive : {}) }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <User size={18} color="#9a958c" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <Mail size={18} color="#9a958c" />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={18} color="#9a958c" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isLogin && (
            <div style={styles.inputGroup}>
              <Lock size={18} color="#9a958c" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={styles.input}
                required
              />
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          {isLogin && (
            <div style={styles.forgotPassword}>
              <a href="#" style={styles.forgotLink}>Forgot Password?</a>
            </div>
          )}

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <p>Demo Credentials:</p>
          <code>user@example.com / password123</code>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #ca8398 0%, #60a1b0 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    top: '-150px',
    right: '-150px',
  },
  circle2: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)',
    bottom: '-100px',
    left: '-100px',
  },
  circle3: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    bottom: '20%',
    right: '10%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '32px',
    padding: '40px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    zIndex: 1,
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#ca839810',
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#676354',
    margin: 0,
  },
  tagline: {
    fontSize: '14px',
    color: '#9a958c',
    marginTop: '8px',
  },
  toggleContainer: {
    display: 'flex',
    gap: '12px',
    backgroundColor: '#f5f3f0',
    borderRadius: '40px',
    padding: '4px',
    marginBottom: '28px',
  },
  toggleBtn: {
    flex: 1,
    padding: '10px 20px',
    borderRadius: '36px',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#676354',
  },
  toggleActive: {
    backgroundColor: '#ca8398',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid #dadbd5',
    borderRadius: '16px',
    padding: '12px 16px',
    transition: 'border 0.2s',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: 'transparent',
  },
  eyeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9a958c',
  },
  forgotPassword: {
    textAlign: 'right',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#ca8398',
    textDecoration: 'none',
  },
  error: {
    backgroundColor: '#fee',
    color: '#ca8398',
    padding: '10px',
    borderRadius: '12px',
    fontSize: '13px',
    textAlign: 'center',
  },
  submitBtn: {
    padding: '14px',
    backgroundColor: '#ca8398',
    border: 'none',
    borderRadius: '40px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  demoCredentials: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#9a958c',
    '& code': {
      display: 'inline-block',
      marginTop: '6px',
      padding: '4px 8px',
      backgroundColor: '#f5f3f0',
      borderRadius: '8px',
      fontSize: '11px',
    },
  },
};

export default Login;
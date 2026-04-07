import React from 'react';
import PetSelector from './PetSelector';

const Layout = ({ children }) => {
  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <span style={styles.logoEmoji}>🐾</span>
          <span style={styles.logoText}>Tail Tracker</span>
          <span style={styles.logoBadge}>v2.0</span>
        </div>
        <div style={styles.headerRight}>
          <PetSelector />
        </div>
      </header>
      
      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>Tail Tracker © 2026</span>
          <span style={styles.footerDivider}>•</span>
          <span>Connected to Feeder Prototype v2.0</span>
          <span style={styles.footerDivider}>•</span>
          <span>🐾 Real-time pet health monitoring</span>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f6f4',
  },
  header: {
    background: '#ffffff',
    padding: '12px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e8e5e0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoEmoji: {
    fontSize: '28px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ca8398',
    letterSpacing: '-0.3px',
  },
  logoBadge: {
    fontSize: '11px',
    fontWeight: '500',
    backgroundColor: '#dadbd5',
    color: '#676354',
    padding: '2px 8px',
    borderRadius: '20px',
    marginLeft: '4px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  main: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e8e5e0',
    padding: '16px 32px',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    fontSize: '13px',
    color: '#9a958c',
  },
  footerDivider: {
    color: '#dadbd5',
  },
};

export default Layout;
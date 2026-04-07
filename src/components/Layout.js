import React from 'react';
import PetSelector from './PetSelector';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ background: '#282c34', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem' }}>🐾 Tail Tracker</h1>
        <PetSelector />
      </header>
      
      <main style={{ flex: 1, background: '#f4f4f7' }}>
        {children}
      </main>

      <footer style={{ textAlign: 'center', padding: '10px', background: '#eee' }}>
        Tail Tracker © 2026 | Connected to Feeder Prototype v1.0
      </footer>
    </div>
  );
};

export default Layout;
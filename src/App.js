import React, { useState } from 'react';
import { PetProvider } from './context/PetContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import DietManager from './pages/DietManager';
import Health from './pages/Health';

function App() {
  const [view, setView] = useState('dashboard'); // Simple toggle: dashboard, profile, diet

  return (
    <PetProvider>
      <Layout>
        {/* Navigation Buttons */}
        <div style={{ padding: '10px', background: '#fff', borderBottom: '1px solid #ddd' }}>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('profile')}>Pet Profiles</button>
          <button onClick={() => setView('diet')}>Diet Controller</button>
          <button onClick={() => setView('health')}>Health Tracker</button>
        </div>

        {/* Conditional Rendering based on view */}
        {view === 'dashboard' && <Dashboard />}
        {view === 'profile' && <PetProfile />}
        {view === 'diet' && <DietManager />}
        {view === 'health' && <Health />}
      </Layout>
    </PetProvider>
  );
}

export default App;
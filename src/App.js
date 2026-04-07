import React, { useState, useEffect } from 'react';
import { PetProvider } from './context/PetContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import DietManager from './pages/DietManager';
import Health from './pages/Health';
import Login from './components/Login';
import './styles/theme.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('tt_loggedIn') === 'true'
  );
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated) localStorage.setItem('tt_loggedIn', 'true');
    else localStorage.removeItem('tt_loggedIn');
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLogin={() => { setIsAuthenticated(true); setCurrentPage('dashboard'); }} />;
  }

  return (
    <PetProvider>
      <Layout
        currentPage={currentPage}
        navigateTo={setCurrentPage}
        onLogout={() => { setIsAuthenticated(false); localStorage.removeItem('tt_user'); }}
      >
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'diet'      && <DietManager />}
        {currentPage === 'health'    && <Health />}
        {currentPage === 'profile'   && <PetProfile />}
      </Layout>
    </PetProvider>
  );
};

export default App;
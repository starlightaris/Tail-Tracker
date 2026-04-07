// App.js
import React, { useState, useEffect } from 'react';
import { PetProvider } from './context/PetContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import DietManager from './pages/DietManager';
import Health from './pages/Health';
import Login from './components/Login';

// Simple router implementation without react-router-dom
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <PetProvider>
      <Layout onLogout={handleLogout} currentPage={currentPage} navigateTo={navigateTo}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'profile' && <PetProfile />}
        {currentPage === 'diet' && <DietManager />}
        {currentPage === 'health' && <Health />}
      </Layout>
    </PetProvider>
  );
};

export default App;
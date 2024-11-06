// src/App.js
import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import TireStatus from './components/TireStatus';
import MaintenanceRecord from './components/MaintenanceRecord';
import Reports from './components/Reports'; 
import Stock from './components/Stock'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('home'); 

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('home');
  };

  const handleViewTireStatus = () => {
    setView('tireStatus');
  };

  const handleViewMaintenanceRecord = () => {
    setView('maintenanceRecord');
  };

  const handleViewReports = () => {
    setView('reports');
  };

  const handleViewStock = () => {
    setView('stock');
  };

  const handleBackToHome = () => {
    setView('home');
  };

  return (
    <div className="App">
      {!isAuthenticated && <Login onLogin={handleLogin} />}

      {isAuthenticated && view === 'home' && (
        <Home
          onLogout={handleLogout}
          onViewTireStatus={handleViewTireStatus}
          onViewMaintenance={handleViewMaintenanceRecord}
          onViewReports={handleViewReports} 
          onViewStock={handleViewStock} 
        />
      )}

      {isAuthenticated && view === 'tireStatus' && (
        <TireStatus onBack={handleBackToHome} onViewMaintenance={handleViewMaintenanceRecord} />
      )}

      {isAuthenticated && view === 'maintenanceRecord' && (
        <MaintenanceRecord onBack={handleBackToHome} onCancel={handleBackToHome} />
      )}

      {isAuthenticated && view === 'reports' && (
        <Reports onBack={handleBackToHome} onDownloadPDF={() => {}} onMainMenu={handleBackToHome} />
      )}

      {isAuthenticated && view === 'stock' && (
        <Stock onBack={handleBackToHome} onMainMenu={handleBackToHome} />
      )}
    </div>
  );
}

export default App;

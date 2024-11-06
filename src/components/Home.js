// src/components/Home.js
import React, { useState } from 'react';
import './Home.css';
import tireIcon from '../assets/tire.png';
import maintenanceIcon from '../assets/maintenance.png';
import reportIcon from '../assets/report.png';
import inventoryIcon from '../assets/inventory.png';
import statsIcon from '../assets/stats.png';
import managementIcon from '../assets/management.png';
import reportButtonIcon from '../assets/report_button.png';
import configButtonIcon from '../assets/config_button.png';
import sm2Logo from '../assets/Logo_SM2.png';

function Home({ onLogout, onViewTireStatus, onViewMaintenance, onViewReports, onViewStock }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleUnauthorizedAccess = () => {
    setAlertMessage("Você deve ter autorização para entrar nesta função.");
    setShowAlert(true);
  };

  const handleDevelopmentAlert = () => {
    setAlertMessage("Esta funcionalidade está em desenvolvimento.");
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <div className="home-container">
      <div className="header">
        <img src={sm2Logo} alt="SM2 Logo" className="sm2-logo" />
        <h2>Bem-Vindo!</h2>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>

      <div className="menu">
        <div className="menu-item" onClick={onViewTireStatus}>
          <img src={tireIcon} alt="Pneus" />
          <span>Pneus</span>
        </div>
        <div className="menu-item" onClick={onViewMaintenance}>
          <img src={maintenanceIcon} alt="Manutenção" />
          <span>Manutenção</span>
        </div>
        <div className="menu-item" onClick={onViewReports}>
          <img src={reportIcon} alt="Relatórios" />
          <span>Relatórios</span>
        </div>
        <div className="menu-item" onClick={onViewStock}>
          <img src={inventoryIcon} alt="Estoque" />
          <span>Estoque</span>
        </div>
      </div>

      <div className="section" onClick={handleUnauthorizedAccess}>
        <img src={statsIcon} alt="Estatística" />
        <span>Estatística</span>
      </div>

      <div className="section" onClick={handleUnauthorizedAccess}>
        <img src={managementIcon} alt="Gerenciamento" />
        <span>Gerenciamento</span>
      </div>

      <div className="footer">
        <button className="footer-button" onClick={handleDevelopmentAlert}>
          <img src={reportButtonIcon} alt="Reportar" /> Reportar
        </button>
        <button className="footer-button">
          <div>SM2</div>
        </button>
        <button className="footer-button" onClick={handleDevelopmentAlert}>
          <img src={configButtonIcon} alt="Configurações" /> Configurações
        </button>
      </div>

      {showAlert && (
        <div className="alert-overlay" onClick={closeAlert}>
          <div className="alert-box" onClick={(e) => e.stopPropagation()}>
            <p>{alertMessage}</p>
            <button className="close-alert-button" onClick={closeAlert}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

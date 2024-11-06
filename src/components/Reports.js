// src/components/Reports.js
import React, { useState } from 'react';
import './Reports.css';
import sm2Logo from '../assets/Logo_SM2.png'; // Importando o logo SM2

function Reports({ onBack, onDownloadPDF, onMainMenu }) {
  const [startDate, setStartDate] = useState("2025-10-28");
  const [endDate, setEndDate] = useState("2025-10-30");
  const [maintenanceType, setMaintenanceType] = useState(["Rodízio", "Recapagem"]);
  const [tireStatus, setTireStatus] = useState("Bom");
  const [vehiclePlate, setVehiclePlate] = useState("GFD1D68, IKS2E31");

  const results = [
    {
      plate: "GFD1D68",
      maintenanceData: "RODÍZIO,RECAPAGEM",
      currentKm: "1400",
      remainingLife: "298,600",
      tireStatus: "Bom",
    },
    {
      plate: "IKS2E31",
      maintenanceData: "RODÍZIO,RECAPAGEM",
      currentKm: "1410",
      remainingLife: "298,590",
      tireStatus: "Bom",
    }
  ];

  const handleMaintenanceTypeToggle = (type) => {
    setMaintenanceType((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  return (
    <div className="reports-container-custom">
      <header className="reports-header-custom">
        <img src={sm2Logo} alt="SM2 Logo" className="sm2-logo-custom" /> {/* Logo SM2 */}
        <h2>Relatórios</h2>
      </header>

      <div className="reports-filters-custom">
        <label>
          Gerar Relatórios De:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          à
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        
        <label>Tipo de Manutenção:</label>
        <div className="maintenance-type-options-custom">
          {["Revisão", "Rodízio", "Reparação", "Recapagem", "Substituição"].map((type) => (
            <button
              key={type}
              className={`maintenance-type-button-custom ${maintenanceType.includes(type) ? 'selected' : ''}`}
              onClick={() => handleMaintenanceTypeToggle(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <label>Status do Pneu:</label>
        <div className="tire-status-options-custom">
          {["Bom", "Ruim", "Atenção"].map((status) => (
            <button
              key={status}
              className={`tire-status-button-custom ${tireStatus === status ? status.toLowerCase() : ''}`}
              onClick={() => setTireStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <label>
          Placa do Veículo:
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
        </label>
        <button className="generate-report-button-custom">Gerar Relatório</button>
      </div>

      <div className="report-results-custom">
        <p>Número de pneus encontrados: {results.length}</p>
        {results.map((result, index) => (
          <div key={index} className="result-item-custom">
            <p>Tabela de Resultados :</p>
            <p>Placa do veículo: {result.plate}</p>
            <p>Dados de Manutenção: {result.maintenanceData}</p>
            <p>KM Atual: {result.currentKm}</p>
            <p>Vida Útil Restante: {result.remainingLife}</p>
            <p>Status do Pneu: ({result.tireStatus})</p>
          </div>
        ))}
      </div>

      <div className="reports-footer-custom">
        <button className="footer-button-custom" onClick={onBack}>⬅️</button>
        <button className="footer-button-custom" onClick={onDownloadPDF}>Baixar PDF</button>
        <button className="footer-button-custom" onClick={onMainMenu}>Tela Principal</button>
      </div>
    </div>
  );
}

export default Reports;

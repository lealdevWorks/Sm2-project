// src/components/TireStatus.js
import React, { useState } from 'react';
import './TireStatus.css';
import tireIcon from '../assets/tire_estoque.png';
import sm2Logo from '../assets/Logo_SM2.png'; // Importando o logo SM2

function TireStatus({ onBack, onViewMaintenance }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const tireData = [
    { number: 759, vehicleId: 'GFD1D68', currentKm: '1400 KM', lifeSpan: '298,600 MIL', lastMaintenance: '01/09/2023', responsible: 'Carlos Silva' },
    { number: 8564, vehicleId: 'IKS2E31', currentKm: '1410 KM', lifeSpan: '298,590 MIL', lastMaintenance: '12/08/2023', responsible: 'Robson Gomes' },
    { number: 551, vehicleId: 'AGE8A12', currentKm: '1489 KM', lifeSpan: '298,511 MIL', lastMaintenance: '20/07/2023', responsible: 'João Santos' },
    { number: 652, vehicleId: 'FGS5F32', currentKm: '1501 KM', lifeSpan: '298,499 MIL', lastMaintenance: '05/09/2023', responsible: 'Maria Fernandes' },
    { number: 653, vehicleId: 'FDS5E32', currentKm: '152056 KM', lifeSpan: '147,944 MIL', lastMaintenance: '18/06/2023', responsible: 'Paulo Lima' },
    { number: 321, vehicleId: 'DES6J21', currentKm: '299001 KM', lifeSpan: '999 KM', lastMaintenance: '22/08/2023', responsible: 'Fernando Souza' },
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  return (
    <div className="tire-status-container">
      <div className="header23">
        <img src={sm2Logo} alt="SM2 Logo" className="sm2-logo-tire-status" /> {/* Logo SM2 */}
        <h2>Status dos Pneus</h2>
      </div>

      <div className="filter-bar">
        <input type="text" placeholder="Pesquise, marque o Filtro" />
        <button className="filter-button">OK</button>
        
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === 'KM'}
              onChange={() => handleFilterChange('KM')}
            /> KM
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFilter === 'N° Série'}
              onChange={() => handleFilterChange('N° Série')}
            /> N° Série
          </label>
        </div>
        
        <div className="status-indicators">
          <label className="status-btn good">
            <input type="checkbox" /> Bom
          </label>
          <label className="status-btn bad">
            <input type="checkbox" /> Ruim
          </label>
          <label className="status-btn warning">
            <input type="checkbox" /> Atenção
          </label>
        </div>
      </div>

      <div className="tire-cards-container">
        <div className="tire-cards">
          {tireData.map((tire, index) => (
            <div
              className={`tire-card ${index >= tireData.length - 2 ? 'special-card' : ''} ${index === tireData.length - 1 ? 'special-card-alt' : ''}`}
              key={index}
            >
              <input type="checkbox" className="tire-select" />
              <img src={tireIcon} alt="Tire Icon" />
              <div className="tire-info">
                <p className="tire-number">N° {tire.number}</p>
                <p className="vehicle-id">ID do veículo: {tire.vehicleId}</p>
                <p>Quilometragem Atual: {tire.currentKm}</p>
                <p>Vida Útil: {tire.lifeSpan}</p>
                <p>Última Manutenção: {tire.lastMaintenance}</p>
                <p>Responsável: {tire.responsible}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer23">
        <button className="footer-button back-button" onClick={onBack}>⬅️</button>
        <button className="footer-button">Gerar Relatório</button>
        <button className="footer-button" onClick={onViewMaintenance}>Manutenção</button>
      </div>
    </div>
  );
}

export default TireStatus;

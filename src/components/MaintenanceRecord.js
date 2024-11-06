// src/components/MaintenanceRecord.js
import React, { useState } from 'react';
import './MaintenanceRecord.css';
import tireIcon from '../assets/tire_estoque.png';
import sm2Logo from '../assets/Logo_SM2.png'; // Importando o logo SM2

function MaintenanceRecord({ onBack, onCancel }) {
  const [selectedFilter, setSelectedFilter] = useState("N° Série");
  const [isRetreaded, setIsRetreaded] = useState(false);
  const [retreadCount, setRetreadCount] = useState(1);
  const [isEditingVehicleId, setIsEditingVehicleId] = useState(false);
  const [vehicleId, setVehicleId] = useState("GFD1D68");
  const [isTireDowngraded, setIsTireDowngraded] = useState(false);
  const [downgradeReason, setDowngradeReason] = useState("");

  const [installationKm] = useState(1400);
  const [currentKm, setCurrentKm] = useState(1400);
  const [lifeSpan, setLifeSpan] = useState(300000);
  const [newKmValue, setNewKmValue] = useState(currentKm);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showKmInput, setShowKmInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [note, setNote] = useState("");

  const [maintenanceType, setMaintenanceType] = useState({
    review: false,
    rotation: false,
    repair: false,
    retread: false,
    replacement: false,
  });

  const handleFilterChange = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const toggleEditVehicleId = () => {
    setIsEditingVehicleId(!isEditingVehicleId);
  };

  const handleVehicleIdChange = (e) => {
    setVehicleId(e.target.value);
  };

  const handleKmInputClick = () => {
    setShowKmInput(true);
    setErrorMessage("");
  };

  const handleKmChange = (e) => {
    setNewKmValue(parseInt(e.target.value, 10) || 0);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const confirmKmUpdate = () => {
    if (newKmValue === currentKm) {
      setErrorMessage("Erro: Forneça um Km válido (diferente do Km Atual).");
    } else if (newKmValue < installationKm) {
      setErrorMessage("Erro: O valor de Km Atual não pode ser menor que o Km de Instalação.");
    } else if (newKmValue > currentKm) {
      const difference = newKmValue - currentKm;
      setCurrentKm(newKmValue);
      setLifeSpan((prevLifeSpan) => prevLifeSpan - difference);
      setShowConfirmModal(false);
      setShowKmInput(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Erro: O Km Atual deve ser maior que o valor anterior.");
    }
  };

  const handleMaintenanceTypeChange = (type) => {
    setMaintenanceType({
      review: type === 'review',
      rotation: type === 'rotation',
      repair: type === 'repair',
      retread: type === 'retread',
      replacement: type === 'replacement',
    });
  };

  const handleDowngradeReasonChange = (e) => {
    setDowngradeReason(e.target.value);
  };

  return (
    <div className="maintenance-record-container">
      <div className="maintenance-record-header-custom">
        <img src={sm2Logo} alt="SM2 Logo" className="sm2-logo-maintenance" /> {/* Logo SM2 */}
        <h2>Registro de Manutenção</h2>
      </div>

      <div className="maintenance-record-filter-bar">
        <input type="text" defaultValue="759" placeholder="Pesquise, marque o Filtro" />
        <button className="maintenance-record-filter-button">OK</button>
        
        <div className="maintenance-record-filter-options">
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
      </div>

      <div className="maintenance-record-tire-info">
        <img src={tireIcon} alt="Tire Icon" />
        <p className="maintenance-record-tire-number">N° 759</p>
        
        <div className="vehicle-id-container">
          {isEditingVehicleId ? (
            <input
              type="text"
              value={vehicleId}
              onChange={handleVehicleIdChange}
              onBlur={toggleEditVehicleId}
              className="vehicle-id-input"
            />
          ) : (
            <p className="maintenance-record-vehicle-id" onClick={toggleEditVehicleId}>
              ID do veículo: {vehicleId}
            </p>
          )}
          <span onClick={toggleEditVehicleId} className="maintenance-edit-icon">✏️</span>
        </div>

        <div className="km-container">
          <label>Km de Instalação:</label>
          <p>{installationKm} KM</p>
        </div>

        <div className="km-container">
          <label>Km Atual:</label>
          <p>{currentKm} KM</p>
          {!showKmInput && (
            <button className="km-alter-button" onClick={handleKmInputClick}>Alterar Km</button>
          )}
          {showKmInput && (
            <div className="km-input-container">
              <input
                type="number"
                value={newKmValue}
                onChange={handleKmChange}
                className="km-input"
              />
              <button className="confirm-button" onClick={() => setShowConfirmModal(true)}>Confirmar</button>
            </div>
          )}
        </div>

        <p>Vida Útil: {(lifeSpan / 1000).toFixed(1)} MIL</p>

        <div className="maintenance-record-maintenance-info">
          <label>
            Foi Recapado?
            <input
              type="checkbox"
              checked={isRetreaded}
              onChange={() => setIsRetreaded(!isRetreaded)}
            />
          </label>
          {isRetreaded && (
            <label className="retread-count-label">
              Quantas Vezes?
              <input
                type="number"
                value={retreadCount}
                onChange={(e) => setRetreadCount(e.target.value)}
                min="1"
                max="999"
                className="retread-count-input"
              />
            </label>
          )}
          <label>Última Manutenção</label>
          <input type="date" defaultValue="2024-10-11" className="maintenance-record-date-input" />
        </div>
      </div>

      <div className="maintenance-record-options">
        <label>
          <input
            type="checkbox"
            checked={maintenanceType.review}
            onChange={() => handleMaintenanceTypeChange('review')}
          /> Revisão
        </label>
        <label>
          <input
            type="checkbox"
            checked={maintenanceType.rotation}
            onChange={() => handleMaintenanceTypeChange('rotation')}
          /> Rodízio
        </label>
        <label>
          <input
            type="checkbox"
            checked={maintenanceType.repair}
            onChange={() => handleMaintenanceTypeChange('repair')}
          /> Reparação
        </label>
        <label>
          <input
            type="checkbox"
            checked={maintenanceType.retread}
            onChange={() => handleMaintenanceTypeChange('retread')}
          /> Recapagem
        </label>
        <label>
          <input
            type="checkbox"
            checked={maintenanceType.replacement}
            onChange={() => handleMaintenanceTypeChange('replacement')}
          /> Substituição
        </label>
        <label>
          <input
            type="checkbox"
            checked={isTireDowngraded}
            onChange={() => setIsTireDowngraded(!isTireDowngraded)}
          /> Baixar Pneu
        </label>
      </div>

      {isTireDowngraded && (
        <div className="downgrade-reason-container">
          <label>Motivo para Baixar Pneu</label>
          <textarea
            placeholder="Explique o motivo..."
            value={downgradeReason}
            onChange={handleDowngradeReasonChange}
          />
        </div>
      )}

      <div className="maintenance-record-additional-details">
        <label>Nota</label>
        <textarea
          placeholder="Descreva detalhes da manutenção..."
          value={note}
          onChange={handleNoteChange}
        />
      </div>

      <div className="maintenance-record-history-button-container">
        <button className="maintenance-record-history-button">Histórico de Manutenções</button>
      </div>

      {showConfirmModal && (
        <div className="confirm-modal">
          <p>Confirma a atualização do Km Atual para {newKmValue}?</p>
          <button onClick={confirmKmUpdate}>Sim</button>
          <button onClick={() => setShowConfirmModal(false)}>Não</button>
        </div>
      )}

      {errorMessage && (
        <div className="error-modal">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Fechar</button>
        </div>
      )}

      <div className="maintenance-record-footer">
        <button className="maintenance-record-footer-button maintenance-record-back-button" onClick={onBack}>⬅️</button>
        <button className="maintenance-record-footer-button maintenance-record-save-button">Salvar</button>
        <button className="maintenance-record-footer-button maintenance-record-cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default MaintenanceRecord;

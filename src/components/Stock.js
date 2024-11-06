// src/components/Stock.js
import React, { useState } from 'react';
import './Stock.css';
import tireIcon from '../assets/tire_estoque.png';
import sm2Logo from '../assets/Logo_SM2.png';

function Stock({ onAdjustStock, onMainMenu, onBack }) {
  const [search, setSearch] = useState("");
  const [newTire, setNewTire] = useState({
    size: "295/80",
    rim: "22.5",
    serial: "",
    state: "Novo",
    quantity: 0,
  });

  const tiresData = [
    { id: "P-295", serial: 3286, size: "295/80", rim: "22.5", state: "Novo", quantity: 200 },
    { id: "P-275", serial: 8556, size: "275/80", rim: "22.5", state: "Recapado", quantity: 1 },
    { id: "P-300", serial: 7890, size: "215/75", rim: "17.5", state: "Usado", quantity: 3 },
    { id: "P-310", serial: 1011, size: "235/75", rim: "17.5", state: "Novo", quantity: 50 },
  ];

  const handleNewTireChange = (field, value) => {
    setNewTire(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="stock-container">
      <div className="header-stock">
        <img src={sm2Logo} alt="SM2 Logo" className="sm2-logo-stock" />
        <h2>Estoque</h2>
      </div>

      <div className="stock-search-bar">
        <label>Buscar Pneus:</label>
        <input
          type="text"
          placeholder="Ex: 295/80 R22.5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="stock-results">
        <p>Resultados:</p>
        <div className="stock-items-container">
          {tiresData.map((tire, index) => {
            // Definindo a cor do contêiner com base na quantidade
            let quantityClass = "";
            if (tire.quantity < 10) {
              quantityClass = "red";
            } else if (tire.quantity < 50) {
              quantityClass = "yellow";
            } else {
              quantityClass = "green";
            }

            return (
              <div key={index} className={`stock-item ${quantityClass}`}>
                <p className="stock-item-id">{tire.id}</p>
                <img src={tireIcon} alt="Tire Icon" className="stock-item-icon" />
                {tire.size && <p>N° Série: {tire.serial}</p>}
                {tire.size && <p>Pneu: {tire.size}</p>}
                {tire.rim && <p>Aro: {tire.rim}</p>}
                {tire.state && <p>Estado: {tire.state}</p>}
                {tire.quantity !== undefined && (
                  <p className={`stock-item-quantity ${quantityClass}`}>
                    Quantidade: {tire.quantity} Un
                  </p>
                )}
                <button className="stock-item-use-button">Usar</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stock-add-tire">
        <p className="add-tire-title">Adicionar Pneu:</p>
        <div className="stock-add-tire-fields">
          <div className="add-tire-image-container">
            <img src={tireIcon} alt="New Tire Icon" className="add-tire-icon" />
            <span className="edit-icon">✏️</span>
          </div>
          <div className="add-tire-input-group">
            <label>Medida:</label>
            <input
              type="text"
              placeholder="Ex: 295/80"
              value={newTire.size}
              onChange={(e) => handleNewTireChange("size", e.target.value)}
            />
            <label>Aro:</label>
            <input
              type="text"
              placeholder="Ex: 22.5"
              value={newTire.rim}
              onChange={(e) => handleNewTireChange("rim", e.target.value)}
            />
            <label>N° Série:</label>
            <input
              type="text"
              placeholder="Ex: 3286"
              value={newTire.serial}
              onChange={(e) => handleNewTireChange("serial", e.target.value)}
            />
            <label>Estado:</label>
            <input
              type="text"
              placeholder="Ex: Novo, Recapado, Usado"
              value={newTire.state}
              onChange={(e) => handleNewTireChange("state", e.target.value)}
            />
            <label>Quantidade:</label>
            <input
              type="number"
              placeholder="Quantidade"
              value={newTire.quantity}
              onChange={(e) => handleNewTireChange("quantity", e.target.value)}
            />
            <button className="add-tire-button">Adicionar</button>
          </div>
        </div>
      </div>

      <div className="stock-footer">
        <button className="footer-button back-button" onClick={onBack}>⬅️ Voltar</button>
        <button className="footer-button" onClick={onAdjustStock}>Ajustar Estoque</button>
        <button className="footer-button" onClick={onMainMenu}>Tela Principal</button>
      </div>
    </div>
  );
}

export default Stock;

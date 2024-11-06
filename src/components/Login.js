// src/components/Login.js
import React from 'react';
import './Login.css';
import logo from '../assets/logo.png';

function Login({ onLogin }) {
  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="SM2 Logo" className="logo-image" /> {/* Corrigido para usar a variável logo */}
      </div>
      <h2>Login</h2>
      <p>Faça login para continuar...</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(); // Chama a função de login ao submeter o formulário
        }}
        className="login-form"
      >
        <div className="input-group">
          <label htmlFor="email">E-MAIL</label>
          <input type="email" id="email" placeholder="exemplo@sm2.com" />
        </div>
        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" placeholder="Senha" />
        </div>
        <button type="submit" className="login-button">Log in</button>
      </form>
      <div className="login-footer">
        <a href="/forgot-password">Esqueceu a senha?</a> | <a href="/support">suporte</a>
      </div>
    </div>
  );
}

export default Login;

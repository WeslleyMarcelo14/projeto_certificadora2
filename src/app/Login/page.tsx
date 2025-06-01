'use client';
import React, { useState } from 'react';
import Head from 'next/head';
// Se você preferir usar o componente Image do Next.js para a logo (requer configuração para base64 ou usar um path),
// você pode descomentar. Para base64 direto, <img> é mais simples.
// import Image from 'next/image';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email, 'Senha:', password);
    alert('Acesso Solicitado!\nE-mail: ' + email + "\n(Em um app Next.js, você faria uma chamada de API e/ou navegaria para outra página aqui)");
  };

  const handleGoToRegister = () => {
    alert('Navegando para a Tela de Registro... (Implementar navegação com Link ou router.push)');
  };

  const logoBase64 =
    'data:image/png;base64,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';

  return (
    <>
      <Head>
        <meta name="theme-color" content="#1e1e1e" />
        <title>Login - Ninho de Pardais</title>
      </Head>
      <div className="loginScreen-safeArea">

        <main className="loginScreen-container">
          <div className="loginScreen-formBox">
            <h2 className="loginScreen-formTitle">Login</h2>
            
            <div className="loginScreen-formGroup">
              <label htmlFor="email" className="loginScreen-label">E-mail:</label>
              <input
                id="email"
                type="email"
                className="loginScreen-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className="loginScreen-formGroup">
              <label htmlFor="password" className="loginScreen-label">Senha:</label>
              <input
                id="password"
                type="password"
                className="loginScreen-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <button type="button" className="loginScreen-submitButton" onClick={handleLogin}>
              Acessar
            </button>
          </div>
        </main>

        <img
          src={logoBase64}
          alt="Logo Ninho de Pardais"
          className="loginScreen-logoBottomRight"
        />
      </div>

      {/* Estilos JSX embutidos */}
      <style jsx>{`
        /* Estilos globais como reset de body são melhor colocados em um arquivo CSS global (_app ou layout) */
        /* Mas para manter tudo neste arquivo, podemos usar :global() com cautela */
        :global(body, html) {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        :global(*, *:before, *:after) {
          box-sizing: inherit;
        }

        .loginScreen-safeArea {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #1e1e1e;
          position: relative; /* Para o posicionamento absoluto do logo */
        }

        .loginScreen-header {
          background-color: #FDD835;
          padding: 15px 30px;
          text-align: left;
        }

        .loginScreen-headerTitle {
          color: white;
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }

        .loginScreen-container {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .loginScreen-formBox {
          background-color: #1e1e1e;
          padding: 30px 40px;
          border: 1px solid #FDD835;
          width: 100%;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loginScreen-formTitle {
          color: #FDD835;
          font-size: 32px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 30px;
        }

        .loginScreen-formGroup {
          margin-bottom: 20px;
          width: 100%;
        }

        .loginScreen-label {
          display: block;
          margin-bottom: 8px;
          color: white;
          font-size: 16px;
          text-align: left;
        }

        .loginScreen-input {
          width: 100%;
          padding: 12px;
          border-radius: 4px;
          background-color: white;
          color: #333;
          font-size: 16px;
          border: 1px solid #ccc;
        }

        .loginScreen-input::placeholder {
          color: #888;
        }
        
        .loginScreen-input[autocapitalize="none"] {
          text-transform: none;
        }

        .loginScreen-submitButton {
          background-color: white;
          padding: 12px 30px;
          border-radius: 25px;
          margin-top: 10px;
          color: #1e1e1e;
          font-size: 18px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          text-align: center;
        }

        .loginScreen-submitButton:hover {
          opacity: 0.9;
        }

        .loginScreen-registerLinkContainer {
          margin-top: 25px;
        }

        .loginScreen-registerLinkText {
          color: white;
          text-decoration: none;
          font-size: 14px;
          cursor: pointer;
        }

        .loginScreen-registerLinkText:hover {
          text-decoration: underline;
        }

        .loginScreen-logoBottomRight {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 80px;
          height: 80px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default LoginScreen;
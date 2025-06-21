'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


// export const metadata = {
//   title: 'Login - Ninho de Pardais',
// };

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log('Email:', email, 'Senha:', password);
    
    // Aqui viria sua lógica de autenticação (ex: chamada de API)
    // Se o login for bem-sucedido:
    router.push('/Principal'); // Navega para a página Principal
  };

  // Função de exemplo para registro
  const handleGoToRegister = () => {
    // router.push('/Register'); // Exemplo de como navegaria para o registro
    alert('Navegação para registro a ser implementada.');
  };

  return (
    <>
      {/* O <Head> de 'next/head' não é mais usado no App Router.
        O título da página agora é gerenciado pelo `metadata` exportado no `layout.tsx` ou `page.tsx` pai.
      */}
      <div className="loginScreen-safeArea">
        <main className="loginScreen-container">
          {/* 5. Usar a tag <form> com o evento onSubmit */}
          <form className="loginScreen-formBox" onSubmit={handleLogin}>
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
                required // Adicionar validação de formulário
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
                required // Adicionar validação de formulário
              />
            </div>

            {/* O botão dentro de um form pode ser do tipo 'submit' */}
            <button type="submit" className="loginScreen-submitButton">
              Acessar
            </button>
          </form>
        </main>

        <img
          src="/img/logo_png.png"
          alt="Logo Ninho de Pardais"
          className="logo-bottom-right"
        />
      </div>

      {/* Seus estilos JSX permanecem os mesmos */}
      <style jsx>{`
        /* Estilos globais como reset de body... */
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
          position: relative;
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
          transition: opacity 0.2s;
        }
        .loginScreen-submitButton:hover {
          opacity: 0.9;
        }
        .logo-bottom-right {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 80px;
          height: auto; /* Pode manter para o componente Image se width/height forem definidos */
          z-index: 1000;
        }
      `}</style>
    </>
  );
};

export default LoginScreen;
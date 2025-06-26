'use client';

import './style.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';




const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    console.log('Email:', email, 'Senha:', password);
    
    
    router.push('/Principal'); 
  };

  
  const handleGoToRegister = () => {
    alert('Navegação para registro a ser implementada.');
  };

  return (
    <>
      <div className="loginScreen-safeArea">
        <main className="loginScreen-container">
          
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
                required 
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
                required
              />
            </div>

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

    </>
  );
};

export default LoginScreen;
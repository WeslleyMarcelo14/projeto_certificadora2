'use client';

import './style.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/Components/Logo';
import { useAuth } from '@/contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 
  const { login, isAuthenticated, loading } = useAuth();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/Principal');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      console.log('Usuário autenticado com sucesso!');
      router.push('/Principal'); 
    } catch (err: any) {
      console.error("Erro na autenticação:", err.code);
      
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('E-mail ou senha incorretos.');
      } else {
        setError('Ocorreu um erro ao tentar fazer o login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
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

            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
            
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

            <button type="submit" className="loginScreen-submitButton" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Acessar'}
            </button>
          </form>
        </main>

        <Logo />
      </div>
    </>
  );
};

export default LoginScreen;
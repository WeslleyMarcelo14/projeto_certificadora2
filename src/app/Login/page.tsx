'use client';

import './style.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/Components/Logo';
// 1. Importe o 'auth' do seu arquivo de configuração e a função de login
import { auth } from '@/firebase/configBD';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 2. Adicione um estado para guardar a mensagem de erro
  const [error, setError] = useState('');
  const router = useRouter(); 

  // 3. Transforme a função em 'async' para poder usar 'await'
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(''); // Limpa qualquer erro anterior

    // 4. Validação básica para evitar chamadas desnecessárias à API
    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }

    try {
      // 5. Tente fazer o login com a função do Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('Usuário autenticado com sucesso!');
      
      // Se o login for bem-sucedido, navega para a página Principal
      router.push('/Principal'); 

    } catch (err: any) {
      // 6. Se o Firebase retornar um erro, capture-o aqui
      console.error("Erro na autenticação:", err.code);
      
      // Define uma mensagem de erro amigável para o usuário
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('E-mail ou senha incorretos.');
      } else {
        setError('Ocorreu um erro ao tentar fazer o login. Tente novamente.');
      }
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

            <button type="submit" className="loginScreen-submitButton">
              Acessar
            </button>
          </form>
        </main>

        <Logo />
      </div>
    </>
  );
};

export default LoginScreen;
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigator({ }) {
    const { isAuthenticated, logout, user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/Login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="brand-icon">🏠</div>
                    <div className="brand-text">
                        <span className="brand-title">Ninho de Pardais</span>
                        <span className="brand-subtitle">Sistema de Monitoramento</span>
                    </div>
                </div>
                <div className="navbar-navigation">
                    <a href="/Principal" className="nav-button nav-button-primary">
                        <span className="nav-icon">🏡</span>
                        <span className="nav-text">Início</span>
                    </a>
                    {isAuthenticated && (
                        <>
                            <a href="/Motor" className="nav-button">
                                <span className="nav-icon">⚙️</span>
                                <span className="nav-text">Motor</span>
                            </a>
                            <a href="/Historico" className="nav-button">
                                <span className="nav-icon">📊</span>
                                <span className="nav-text">Gráficos</span>
                            </a>
                        </>
                    )}
                    <a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2" target="_blank" rel="noopener noreferrer" className="nav-button nav-button-external">
                        <span className="nav-icon">💻</span>
                        <span className="nav-text">Código</span>
                    </a>
                    {isAuthenticated ? (
                        <div className="nav-user-section">
                            <span className="nav-user-email">{user?.email}</span>
                            <button onClick={handleLogout} className="nav-button nav-button-logout">
                                <span className="nav-icon">🚪</span>
                                <span className="nav-text">Sair</span>
                            </button>
                        </div>
                    ) : (
                        <a href="/Login" className="nav-button nav-button-login">
                            <span className="nav-icon">🔑</span>
                            <span className="nav-text">Login</span>
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}

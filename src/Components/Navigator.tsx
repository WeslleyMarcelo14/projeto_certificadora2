'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './Navigator.module.css';

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

    const getUserDisplayName = (email: string | null | undefined): string => {
        if (!email) return 'Usuário';
        
        const namePart = email.split('@')[0];
        
        const cleanName = namePart
            .replace(/[._-]/g, ' ')
            .replace(/\d+/g, '')
            .trim();
            
        return cleanName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ') || 'Usuário';
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                {}
                <div className={styles.navbarBrand}>
                    <div className={styles.brandIcon}>🏠</div>
                    <div className={styles.brandText}>
                        <span className={styles.brandTitle}>Ninho de Pardais</span>
                        <span className={styles.brandSubtitle}>Sistema de Monitoramento</span>
                    </div>
                </div>

                {}
                {isAuthenticated && (
                    <div className={styles.userGreetingSection}>
                        <span className={styles.greetingText}>Olá,</span>
                        <span className={styles.userName}>
                            {getUserDisplayName(user?.email)}
                        </span>
                    </div>
                )}
                
                {}
                <div className={styles.navbarNavigation}>
                    {}
                    <a href="/Principal" className={`${styles.navButton} ${styles.navButtonPrimary}`}>
                        <span className={styles.navIcon}>🏡</span>
                        <span className={styles.navText}>Início</span>
                    </a>
                    
                    {isAuthenticated && (
                        <>
                            <a href="/Motor" className={styles.navButton}>
                                <span className={styles.navIcon}>⚙️</span>
                                <span className={styles.navText}>Motor</span>
                            </a>
                            <a href="/Historico" className={styles.navButton}>
                                <span className={styles.navIcon}>📊</span>
                                <span className={styles.navText}>Gráficos</span>
                            </a>
                        </>
                    )}
                    
                    {}
                    <a 
                        href="https://github.com/WeslleyMarcelo14/projeto_certificadora2" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${styles.navButton} ${styles.navButtonExternal}`}
                    >
                        <span className={styles.navIcon}>💻</span>
                        <span className={styles.navText}>Código</span>
                    </a>
                    
                    {}
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLogout} 
                            className={`${styles.navButton} ${styles.navButtonLogout}`}
                            title="Fazer logout"
                        >
                            <span className={styles.navIcon}>🚪</span>
                            <span className={styles.navText}>Sair</span>
                        </button>
                    ) : (
                        <a href="/Login" className={`${styles.navButton} ${styles.navButtonLogin}`}>
                            <span className={styles.navIcon}>🔑</span>
                            <span className={styles.navText}>Login</span>
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
}

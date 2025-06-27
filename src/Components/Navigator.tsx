export default function Navigator({ }) {
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
                    <a href="/Motor" className="nav-button">
                        <span className="nav-icon">⚙️</span>
                        <span className="nav-text">Motor</span>
                    </a>
                    <a href="/Historico" className="nav-button">
                        <span className="nav-icon">📊</span>
                        <span className="nav-text">Gráficos</span>
                    </a>
                    <a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2" target="_blank" rel="noopener noreferrer" className="nav-button nav-button-external">
                        <span className="nav-icon">💻</span>
                        <span className="nav-text">Código</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

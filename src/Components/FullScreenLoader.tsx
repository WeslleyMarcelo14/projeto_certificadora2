import React from 'react';
import styles from './FullScreenLoader.module.css';

interface FullScreenLoaderProps {
  message?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ 
  message = "Carregando..." 
}) => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>🏠</div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Ninho de Pardais</span>
            <span className={styles.logoSubtitle}>Sistema de Monitoramento</span>
          </div>
        </div>
        
        <div className={styles.loadingSection}>
          <div className={styles.spinner}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          <p className={styles.loadingMessage}>{message}</p>
          <div className={styles.loadingDots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenLoader;

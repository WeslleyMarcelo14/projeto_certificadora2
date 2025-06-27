'use client';

import './style.css';
import React from 'react';
import Head from 'next/head';
import Logo from '@/Components/Logo'; 

const ProjectPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Ninho de Pardais - Projeto</title>
      </Head>

      <div className="page-container">
        <main className="content-wrapper">
          <div className="main-container">
            <h1 className="project-title">Projeto Ninho de Pardais</h1>
            
            <div className="hero-section">
              <p className="hero-text">
                Um projeto de extensão universitária que transforma vidas através da educação, cultura e inclusão social.
              </p>
            </div>

            <div className="image-gallery">
              <img 
                src="/img/principal_imagem_1.png" 
                alt="Crianças participando de atividades educativas no Projeto Ninho de Pardais" 
                className="project-image" 
              />
              <img 
                src="/img/principal_imagem_2.png" 
                alt="Comunidade unida nas ações do Projeto Ninho de Pardais" 
                className="project-image" 
              />
            </div>

            <section className="mission-section">
              <h2>Nossa Missão</h2>
              <div className="mission-content">
                <p>
                  Promover o acolhimento e desenvolvimento integral de crianças e adolescentes em situação de vulnerabilidade social, através de ações educativas, culturais e de apoio psicossocial.
                </p>
              </div>
            </section>

            <section className="about-section">
              <h2>Sobre o Projeto</h2>
              <div className="about-content">
                <div className="info-card">
                  <h3>🏛️ Origem Institucional</h3>
                  <p>
                    Programa de extensão da Universidade Tecnológica Federal do Paraná – Câmpus Cornélio Procópio (UTFPR-CP), que conecta conhecimento acadêmico com responsabilidade social.
                  </p>
                </div>

                <div className="info-card">
                  <h3>🎯 Metodologia</h3>
                  <p>
                    Integramos ações pedagógicas, culturais e sociais através de oficinas especializadas, atividades lúdicas e educativas, complementadas por acompanhamento psicológico e social personalizado.
                  </p>
                </div>

                <div className="info-card">
                  <h3>👥 Equipe Multidisciplinar</h3>
                  <p>
                    Coordenado por professores experientes e apoiado por estudantes bolsistas e voluntários comprometidos, criando um ambiente de aprendizado colaborativo e enriquecedor.
                  </p>
                </div>

                <div className="info-card">
                  <h3>🌱 Impacto Social</h3>
                  <p>
                    Fortalecemos a relação entre universidade e comunidade, promovendo inclusão, cidadania e acesso a oportunidades, enquanto contribuímos para a formação integral de todos os envolvidos.
                  </p>
                </div>
              </div>
            </section>

            <section className="values-section">
              <h2>Nossos Valores</h2>
              <div className="values-grid">
                <div className="value-item">
                  <span className="value-icon">📚</span>
                  <h4>Educação</h4>
                  <p>Conhecimento transformador</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">🌟</span>
                  <h4>Esperança</h4>
                  <p>Futuro mais promissor</p>
                </div>
                <div className="value-item">
                  <span className="value-icon">💪</span>
                  <h4>Empoderamento</h4>
                  <p>Autonomia e crescimento</p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Logo />
      </div>
    </>
  );
};

export default ProjectPage;
'use client';

import './style.css';
import React from 'react';
import Head from 'next/head'; 

const ProjectPage = () => {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ninho de Pardais - Projeto</title>
      </Head>

      <div className="page-container"> {}

        <main className="content-wrapper">
          <div className="main-container">
            <h2 className="project-title">O que é o Projeto Ninho de Pardais</h2>

            <div className="image-gallery">
              <img src="\img\principal_imagem_1.png" alt="Imagem do Projeto 1" className="project-image" />
              <img src="\img\principal_imagem_2.png" alt="Imagem do Projeto 2" className="project-image" />
            </div>

            <div className="about-section">
              <h2>Sobre o projeto</h2>
              <>
                <p>
                  O Ninho de Pardais é um programa de extensão da Universidade Tecnológica Federal do Paraná – Câmpus Cornélio Procópio (UTFPR-CP), voltado ao acolhimento e apoio a crianças e adolescentes em situação de vulnerabilidade social.
                </p>
                <p>
                  O projeto busca integrar ações pedagógicas, culturais e sociais, promovendo o desenvolvimento integral dos participantes por meio de oficinas, atividades lúdicas e educativas, além de acompanhamento psicológico e social.
                </p>
                <p>
                 Coordenado por professores da universidade, com o apoio de estudantes bolsistas e voluntários, o programa visa também fortalecer a relação da UTFPR com a comunidade externa, contribuindo para a formação cidadã e acadêmica dos envolvidos.
                </p>
                <p>
                  Ele reforça o papel social da universidade ao atuar diretamente na promoção da inclusão, da cidadania e do acesso a oportunidades para crianças em contextos de risco.
                </p>
            </>
            </div>
          </div>
        </main>

        <img src="\img\logo_png.png" alt="Logo Ninho de Pardais" className="logo-bottom-right" />
      </div>

    </>
  );
};

export default ProjectPage;
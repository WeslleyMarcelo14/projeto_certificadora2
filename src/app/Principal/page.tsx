'use client';
import React from 'react';
import Head from 'next/head'; 

const ProjectPage = () => {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ninho de Pardais - Projeto</title>
        {/* theme-color can also be managed here if using Next.js */}
        {/* <meta name="theme-color" content="#1e1e1e" /> */}
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
              <p>
                O Ninho de Pardais é um programa de extensão da Universidade Tecnológica Federal do Paraná – Câmpus Cornélio Procópio (UTFPR-CP),
                voltado ao acolhimento e apoio a crianças e adolescentes em situação de vulnerabilidade social. O projeto busca integrar ações pedagógicas,
                culturais e sociais, promovendo o desenvolvimento integral dos participantes por meio de oficinas, atividades lúdicas e educativas,
                além de acompanhamento psicológico e social.

                Coordenado por professores da universidade, com o apoio de estudantes bolsistas e voluntários, o programa visa também fortalecer a relação da UTFPR com a comunidade externa,
                contribuindo para a formação cidadã e acadêmica dos envolvidos. Ele reforça o papel social da universidade ao atuar diretamente na promoção da inclusão,
                da cidadania e do acesso a oportunidades para crianças em contextos de risco.
              </p>
            </div>
          </div>
        </main>

        <img src="\img\logo_png.png" alt="Logo Ninho de Pardais" className="logo-bottom-right" />
      </div>

      <style jsx global>{`
        /* It's good practice to put truly global styles (like body resets) 
           in a global CSS file (e.g., styles/globals.css in Next.js or index.css in CRA)
           However, for this example, we'll keep them here using 'global'. */
        body {
          margin: 0;
          font-family: Arial, sans-serif; /* Consider using a more modern font stack like in the example if preferred */
          background-color: #1e1e1e;
          color: white;
          /* display: flex and flex-direction: column from body are now handled by .page-container */
          min-height: 100vh;
        }

        /* Specific component styles */
        .page-container { /* Equivalent to your original body styling for flex layout */
            display: flex;
            flex-direction: column;
            min-height: 100vh; /* Ensures footer (if any) or logo is pushed down */
        }

        .header-nav { /* Original .header */
            background-color: #FDD835;
            padding: 15px 30px;
            text-align: left;
        }

        .header-nav h1 {
            margin: 0;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }

        .content-wrapper {
            flex-grow: 1; /* Allows this section to take up available space */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 20px;
            margin-top: 20px;
            margin-bottom: 80px; /* Ensure space for the fixed logo */
        }

        .main-container {
            background-color: #1e1e1e;
            border: 1px solid #FDD835;
            padding: 30px 40px;
            width: 100%;
            max-width: 900px;
            box-sizing: border-box;
        }

        .project-title {
            color: #FDD835;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            margin-top: 0;
            margin-bottom: 30px;
        }

        .image-gallery {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }

        .project-image {
          width: 45%;
          height: 300px; 
          object-fit: cover;
          border-radius: 4px;
          border: none;
        }

        .about-section h2 {
            color: white;
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 15px;
            text-align: left;
        }

        .about-section p {
            font-size: 16px;
            line-height: 1.6;
            color: white;
            text-align: justify;
            word-break: break-all; /* Be cautious with break-all, consider break-word if needed */
        }

        .logo-bottom-right {
            position: fixed; /* Stays in place during scroll */
            bottom: 20px;
            right: 20px;
            width: 80px;
            height: auto; /* Maintain aspect ratio */
            z-index: 1000; /* Keeps it on top of other content */
        }
      `}</style>
    </>
  );
};

export default ProjectPage;
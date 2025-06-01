'use client';
import React from 'react';
import Head from 'next/head'; 

const ProjectPage = () => {
  const logoBase64 =
    'data:image/png;base64,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';

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
              <img src="https://placehold.co/400x250/555555/FFFFFF?text=Imagem+1" alt="Imagem do Projeto 1" className="project-image" />
              <img src="https://placehold.co/400x250/555555/FFFFFF?text=Imagem+2" alt="Imagem do Projeto 2" className="project-image" />
            </div>

            <div className="about-section">
              <h2>Sobre o projeto</h2>
              <p>
                Quais são os ingredientes com que é feito o miojo?
                Ingredientes: Macarrão: Farinha de trigo enriquecida com ferro e ácido fólico,
                gordura vegetal, sal, reguladores de acidez carbonato de potássio e carbonato de sódio,
                estabilizantes tripolifosfato de sódio, pirofosfato tetrassódico e fosfato de sódio
                monobásico e corante sintético idêntico ao natural betacaroteno.
              </p>
            </div>
          </div>
        </main>

        <img src={logoBase64} alt="Logo Ninho de Pardais" className="logo-bottom-right" />
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
            gap: 20px; /* Modern way to add space between flex items */
        }

        .project-image {
            width: 45%; /* Consider using percentages or max-width for responsiveness */
            height: auto;
            border: none;
            border-radius: 4px;
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
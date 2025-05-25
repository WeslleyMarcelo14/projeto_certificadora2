import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">Ninho de Pardais</div>
            <ul className="navbar-menu">
              <li><a href="/">Principal</a></li>
              <li><a href="#">Histórico</a></li>
              <li><a href="/Motor">Tabela</a></li>
              <li><a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2">Projeto</a></li>
            </ul>
          </div>
        </nav>
        {children}
        <footer>
          <p>Projeto desenvolvido para a disciplina Certificadora de Competência 2 - EC46H</p>
          <a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2">GitHub</a>
        </footer>
      </body>
    </html>
  );
}

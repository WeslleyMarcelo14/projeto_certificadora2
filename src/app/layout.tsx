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
            <div className="navbar-logo"> <a href="/">Ninho de Pardais </a> </div>
            <ul className="navbar-menu">
              <li><b><a href="#">Histórico</a></b></li>
              <li><b><a href="/Motor">Tabela</a></b></li>
              <li><b><a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2">Projeto</a></b></li>
            </ul>
          </div>
        </nav>
        {children}
        <footer>
          <a href="https://github.com/WeslleyMarcelo14/projeto_certificadora2">Projeto desenvolvido para a disciplina Certificadora de Competência 2 - EC46H</a>
        </footer>
      </body>
    </html>
  );
}
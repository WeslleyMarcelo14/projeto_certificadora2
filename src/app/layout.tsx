import "./globals.css";
import Navigator from "../Components/Navigator";
import Footer from "@/Components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <Navigator/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
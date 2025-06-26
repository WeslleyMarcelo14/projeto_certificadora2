import Navigator from "../../Components/Navigator";
import Footer from "@/Components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <Navigator />
      {children}
      <Footer />
    </>
  );
}
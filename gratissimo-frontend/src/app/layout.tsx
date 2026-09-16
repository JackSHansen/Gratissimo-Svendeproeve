import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <Navbar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
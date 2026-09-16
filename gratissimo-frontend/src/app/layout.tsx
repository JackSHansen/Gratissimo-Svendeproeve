import "./globals.scss";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loginpromt from "@/components/Loginpromt/Loginpromt";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>
        <Header />
        <Navbar />
        <Loginpromt />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
// @ts-ignore
import "./ui/global.css";
import { roboto, merriweather } from "@/app/ui/fonts";
import Navbar from "./ui/components/navbar";
import Footer from "./ui/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased flex min-h-screen flex-col`}
      >
        <Navbar />

        {children}
        
        <Footer />
      </body>
    </html>
  );
}

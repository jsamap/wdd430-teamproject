import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts';
import Navbar from "@/app/ui/components/Navbar";
import Footer from "@/app/ui/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex min-h-screen flex-col`}>
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

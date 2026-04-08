import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts';
import Navbar from "@/app/ui/components/navbar";
import Footer from "@/app/ui/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex min-h-screen flex-col`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

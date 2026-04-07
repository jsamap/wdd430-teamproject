import '@/app/ui/global.css';
import { roboto, merriweather } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${merriweather.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

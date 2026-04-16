import "@/app/ui/global.css";
import { roboto } from "@/app/ui/fonts";
import Navbar from "@/app/ui/components/Navbar";
import Footer from "@/app/ui/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

/** So `auth()` runs on each request and the client navbar gets an up-to-date session after login. */
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex min-h-screen flex-col`}>
        <SessionProvider
          session={session}
          key={session?.user?.id ?? "guest"}
        >
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

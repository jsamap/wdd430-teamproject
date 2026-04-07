import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;

      // Check if the user is authorized to access the requested page
      const isProtectedByAdmin = nextUrl.pathname.startsWith("/admin");
      const isProtectedBySeller = nextUrl.pathname.startsWith("/seller");

      if (isProtectedByAdmin) {
        if (isLoggedIn && userRole === "admin") return true;
        return false;
      }

      if (isProtectedBySeller) {
        if (isLoggedIn && userRole === "seller") return true;
        return false;
      }

      return true;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      if (token?.role) {
        // Add role to session for role-based access control
        (session.user as any).role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

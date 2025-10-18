// NextAuth - Comentado temporariamente
// TODO: Descomentar quando quiser integrar autenticação

/*
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: session.user, token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
*/

// Mock handlers para não quebrar
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth desabilitado temporariamente" });
}

export async function POST() {
  return NextResponse.json({ message: "Auth desabilitado temporariamente" });
}


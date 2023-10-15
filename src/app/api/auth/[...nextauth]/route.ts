import NextAuth, { Session, User, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { JWT } from 'next-auth/jwt';
import prisma from '@/lib/prismaClient';
import { sendVerificationRequest } from '@/lib/sendVerificationRequest';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    {
      id: 'email',
      type: 'email',
      name: 'Email',
      server: '',
      from: '',
      maxAge: 60 * 60 * 24,
      options: {},
      sendVerificationRequest
    }
  ],
  callbacks: {
    async session({ session, token, user }: { session: Session; token: JWT; user: User }) {
      session.user.id = user.id;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

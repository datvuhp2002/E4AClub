import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {
  InActiveAccountError,
  InvalidEmailPasswordError,
} from "./common/errors";
import LoginServices from "./services/login-services";
import { IUser } from "./types/next-auth";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await LoginServices.Login({
          email: credentials.email,
          password: credentials.password,
        });
        if (res) {
          return {
            email: credentials.email as string,
            role: res.role as string,
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
          };
        } else {
          throw new InvalidEmailPasswordError();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

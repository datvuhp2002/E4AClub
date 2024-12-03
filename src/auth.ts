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
        try {
          const res = await LoginServices.Login({
            email: credentials.email,
            password: credentials.password,
          });
          if (!res) {
            throw new InvalidEmailPasswordError(); // Gửi lỗi cụ thể
          }
          return {
            email: credentials.email as string,
            role: res.role as string,
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
          };
        } catch (error) {
          console.error("Authorize error:", error); // Log lỗi để debug
          throw new Error("Invalid credentials"); // Trả lỗi chung chung cho người dùng
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

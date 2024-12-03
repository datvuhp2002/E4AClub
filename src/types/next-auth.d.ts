import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Define IUser interface to shape the user object
interface IUser {
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

// Extend JWT interface to include custom properties
declare module "next-auth/jwt" {
  interface JWT {
    access_token: string; // Access token from the backend
    refresh_token: string; // Refresh token from the backend
    user: IUser; // Custom user object
    access_expires: number; // Expiration timestamp for access token
    error?: string; // Optional error message
  }
}

// Extend Session interface to include custom properties for the session object
declare module "next-auth" {
  interface Session {
    user: IUser; // Custom user object
    access_token: string; // Access token available in session
    refresh_token: string; // Refresh token available in session
    access_expires: number; // Expiration timestamp available in session
    error?: string; // Optional error message
  }
}

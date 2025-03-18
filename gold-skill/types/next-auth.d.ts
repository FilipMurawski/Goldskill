import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    referralId?: string | null;
    isActive?: boolean;
    role?: string | null;
    userSubscription?: UserSubscription[]
  }
  interface Session {
    user: User;
  }
}
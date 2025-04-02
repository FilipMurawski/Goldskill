import NextAuth, { CredentialsSignin, Session } from "next-auth";
import prisma from "@/lib/db";
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "next-auth"
import getPartnerIdByReference from "./getPartnerId";
import { verifyPassword } from "./utility/password";
import { JWT } from "next-auth/jwt";
import { UserSubscriptionType } from "../../types/UserType";

class NotVerifiedError extends CredentialsSignin {
  code = "not_verified_error"
 }

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Facebook({ 
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      async profile(profile, tokens) {
      return { role: profile.role ?? "USER", id: profile.id, name: profile.name, email: profile.email, isActive: profile.isActive, referralId: tokens.refId || undefined, userSubscription: profile.userSubscription} as User
    }}),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile, tokens){
      return { role: profile.role ?? "USER", id: profile.id, name: profile.name, email: profile.email, isActive: profile.isActive, referralId: tokens.refId || undefined, userSubscription: profile.userSubscription} as User
    },
}),
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || typeof credentials.password !== "string") {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
          include: {
            userSubscription: {
              select: {
                isActive: true,
                subscription: {
                  select: {
                    id: true,
                  }
                }
              }
            }
          }
        });
        if(!user) {
          throw new CredentialsSignin("Invalid credentials")
        }
        if(!user.password){
          throw new CredentialsSignin("Password is missing")
        }
        const isMatch = await verifyPassword(credentials.password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin("Invalid credentials");
        }
        if (user.emailVerified === null) {
          throw new NotVerifiedError("Email not confirmed");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          subscription: user.userSubscription
        };
      },
    }),
  ],
  events: {
      async createUser({ user }:{ user: User}) {
        if (!user.referralId) {
          return
        }
          const referralId = user.referralId || null;
          const partnerId = await getPartnerIdByReference(referralId)
          if (partnerId) {
              await prisma.user.update({
                  where: { id: user.id },
                  data: { partnerId: partnerId},
              });
          }
      },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/panel", "/regulamin-systemu-prowizyjnego"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/sign-in", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    jwt: ({ token, user}) => {
      if (user) {
        const u = user as User;
        token.role = u.role;
        token.isActive = u.isActive;
        token.referralId = u.referralId || null;
        token.userSubscription = u.userSubscription;
        return {
          ...token,
          id: u.id,
          role: u.role,
          isActive: u.isActive,
          referralId: u.referralId || null,
          userSubscription: u.userSubscription
        };
      }
      return token;
    },
    session: ({session, token}:{session: Session, token: JWT}) =>{
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          randomKey: token.randomKey,
          role: token.role as "USER" | "ACTIVE_USER" | "ADMIN",
          isActive: token.isActive as boolean,
          referralId: typeof token.referralId === "string" ? token.referralId : null,
          userSubscription: token.userSubscription as UserSubscriptionType[] || undefined
        },
      };
    },
  },
});

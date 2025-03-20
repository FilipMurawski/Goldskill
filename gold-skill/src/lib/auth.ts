import NextAuth, { CredentialsSignin, Session } from "next-auth";
import prisma from "@/lib/db";
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "next-auth"
import getPartnerIdByReference from "./getPartnerId";
import { verifyPassword } from "./utility/password";
import { redirect } from "next/navigation";
import { UserSubscription } from "@prisma/client";

class NotVerifiedError extends CredentialsSignin {
  code = "not_verified_error"
 }

const hasSubscription = ({userSubscriptions}:
   {userSubscriptions: 
    {isActive: boolean, 
      subscription: {
  isActive: boolean
}[]
}[]
}) => {
    if (!userSubscriptions || userSubscriptions.filter((userSubssciption) => userSubssciption.isActive).length === 0) {
    return false
    } else 
    return true
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Facebook({async profile(profile, tokens) {
      return { role: profile.role ?? "USER", id: profile.id, name: profile.name, email: profile.email, isActive: profile.isActive, referralId: tokens.refId || undefined, userSubscription: profile.userSubscription} as User
    }}),
    google({async profile(profile, tokens) {
      return { role: profile.role ?? "USER", id: profile.id, name: profile.name, email: profile.email, isActive: profile.isActive, referralId: tokens.refId || undefined, userSubscription: profile.userSubscription} as User
    }}),
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
          throw new NotVerifiedError();
        }
        if (!user.userSubscription || user.userSubscription.filter((userSubscription) => userSubscription.isActive).length === 0) {
          redirect("/subscription"); // Redirect if no active subscription
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
      if(auth?.user.userSubscription || auth?.user?.userSubscription?.filter((userSubscription) => userSubscription.isActive).length === 0) {
        redirect("/subscription"); // Redirect if no active subscription
      }
      return true;
    },
    jwt: ({ token, user}) => {
      if (user) {
        const u = user as unknown as any;
        token.role = u.role;
        token.isActive = u.isActive;
        token.referralId = u.referralId || null;
        token.userSubscription = u.userSubscription;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          role: u.role,
          isActive: u.isActive,
          referralId: u.referralId || null,
          userSubscription: u.userSubscription
        };
      }
      return token;
    },
    session: ({session, token}:{session: Session, token: any}) =>{
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          randomKey: token.randomKey,
          role: token.role,
          isActive: token.isActive,
          referralId: token.referralId || null,
          userSubscription: token.userSubscription || null
        },
      };
    },
  },
});

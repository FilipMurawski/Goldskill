import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import { Provider } from "next-auth/providers/index"

export const {handlers, signIn, signOut, auth } = NextAuth({
  providers: [Facebook({clientId: process.env.AUTH_FACEBOOK_ID as string, clientSecret: process.env.AUTH_FACEBOOK_SECRET as string}), Google({clientId: process.env.AUTH_GOOGLE_ID as string, clientSecret: process.env.AUTH_GOOGLE_SECRET as string})] as Provider[],
})
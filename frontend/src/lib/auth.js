import NextAuth from "next-auth";
import Google from "next-auth/providers/google"

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
    })],
    session: {
      strategy: "jwt",
    },
    trustHost: true,
    callbacks: {
      async session({ session, token }) {
        if (token.access_token) {
          session.access_token = token.access_token; // Attach the access token to the session
        }
        return session;
      },
      async jwt({ token, account, profile }) {
        if (account) {
          token.access_token = account.access_token; // Attach the access token to the token
        }
  
        return token;
      },
    }
})

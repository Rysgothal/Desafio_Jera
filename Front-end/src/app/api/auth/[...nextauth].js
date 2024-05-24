import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
  },
  database: process.env.DATABASE_URL,
})

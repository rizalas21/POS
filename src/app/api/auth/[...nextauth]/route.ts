import { Login } from "@/lib/Login";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-session",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const user = await Login(credentials.email, credentials.password);
          if (!user?.email) return null;
          console.log("authorize user: ", user);
          return user;
        } catch (error) {
          console.log("error when author => ", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }
      const isExpired = token.exp && Date.now() / 1000 > token.exp;
      if (isExpired) token.expired = true;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.expired) return null;
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        role: token.role,
        exp: token.exp,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };

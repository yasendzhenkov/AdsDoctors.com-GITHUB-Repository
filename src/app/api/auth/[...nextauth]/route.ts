import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const password = credentials?.password;
        if (!password) return null;

        const expected = process.env.ADMIN_PASSWORD;
        if (!expected) {
          throw new Error("ADMIN_PASSWORD is not configured");
        }

        if (password === expected) {
          return { id: "admin", name: "Admin" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
});

export { handler as GET, handler as POST };


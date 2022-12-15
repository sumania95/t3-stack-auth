import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { prisma } from "../../../server/db/client";
import { isValid, number } from "zod";
import { loginSchema } from "../../../server/common/auth";

interface FormData {
    email: string;
    password: string;
}

interface User {
  user_id: number;
  user_email: string;
  user_password: string;
}

type UserSession = {
  id: number;
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials,request) =>{
        const creds = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: creds.email,
          }})
          .then(async(user) => {
            if (!user) {
              return null;
            }
    
            const isValidPassword = await verify(user.password, creds.password);
    
            if (!isValidPassword) {
              return null;
            }
    
            return {
              id: user.id,
              email: user.email,
            };
          })
          .catch(err => {console.error(err)})
          return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
  },
  secret: "super-secret",
};


export default NextAuth(authOptions);
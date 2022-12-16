import NextAuth, { type NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
// import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { verify } from "argon2";
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session:{
    strategy:'jwt',
  },
  pages: {
    signIn: "/login",
  },
  secret: "super-secret",
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
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
      authorize: async (credentials) =>{
        const{email,password} = credentials as {email:string,password:string};
        const user = await prisma.user.findFirst({where:{email:email}});
        console.log(user)
        
        if(!user){
          return null;
        }
        const invalidPassword = await verify(user.password,password);
        console.log(invalidPassword)
        if (!invalidPassword) {
          return null;
        }
        const name = user.firstname + " " + user.lastname;
        return {id: user.id,email: user.email, name: name} as any
      }
    }),
  ],
};

export default NextAuth(authOptions);

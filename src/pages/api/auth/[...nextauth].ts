import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { verify } from "argon2";

export const authOptions: NextAuthOptions = {
  session:{
    strategy:'jwt',
  },
  pages: {
    signIn: "/login",
  },
  secret: env.NEXTAUTH_SECRET,
  
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
        if(!user){
          return null;
        }
        const invalidPassword = await verify(user.password,password);
        if (!invalidPassword) {
          return null;
        }
        const name = user.firstname + " " + user.lastname;
        return {
          id:user.id,
          email: user.email, 
          name: name,
        } as any
      }
    }),
  ],
  callbacks: {
    async session({ session,token, user }) {
      console.log(token)
      const authUser = await prisma.user.findFirst({where:{email:user?.email as string}})
      if (authUser) {
        session.user.id = authUser.id
        session.user.is_admin = authUser.is_admin as boolean
        session.user.is_editor = authUser.is_editor as boolean
        session.user.firstname = authUser.firstname
        session.user.lastname = authUser.lastname
        return session
      }
      // Send properties to the client, like an access_token and user id from a provider.
      // session?.user?.id = user.id,
      // session.user?.is_admin = token.accessToken
      // session.user.id = token.id
      
      return session
    }
  },
};

export default NextAuth(authOptions);

import { z } from "zod";
import { hash } from "argon2";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  me: protectedProcedure
  .query(async({input,ctx}) =>{
    const user = await ctx.prisma.user.findUnique({
      where:{
        email : ctx.session.user.email
      }
    })

    if (user?.role !== "Admin") return false;
    return true;

  }),
  
  login: publicProcedure
  .input(z.object({
      email: z.string(),
      password: z.string() 
  }))
  .query(async ({ input, ctx }) => {
      const { email, password } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });
  
      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }
      const hashedPassword = await hash(password);
      const result = await ctx.prisma.user.create({
        data: { email, password: hashedPassword },
      });
  
      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
    signup: publicProcedure
    .input(z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        password: z.string() 
    }))
    .mutation(async ({ input, ctx }) => {
        const { email, password, firstname, lastname } = input;
        const exists = await ctx.prisma.user.findFirst({
          where: { email },
        });
    
        if (exists) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "User already exists.",
          });
        }
    
        const hashedPassword = await hash(password);
    
        const result = await ctx.prisma.user.create({
          data: { email, firstname:firstname, lastname:lastname, password: hashedPassword },
        });
    
        return {
          status: 201,
          message: "Account created successfully",
          result: result.email,
        };
      }),
});

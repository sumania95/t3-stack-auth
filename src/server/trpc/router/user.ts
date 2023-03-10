import { z } from "zod";
import { hash } from "argon2";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  me: protectedProcedure
  .query(async({ctx}) =>{
    const {email} = ctx.session.user as {
      email: string
    };
    return await ctx.prisma.user.findFirst({
      where:{
        email
      },
      select:{
        email:true,
        firstname:true,
        lastname:true,
      }
    })
  }),

  update: protectedProcedure
  .input(z.object({
    firstname: z.string(),
    lastname: z.string(),
  }))
  .mutation(async({input,ctx}) =>{
    const {firstname, lastname} = input as {
      firstname: string,
      lastname: string
    };
 
    const {email} = ctx.session.user as {
      email: string
    };
    return await ctx.prisma.user.update({
      data:{
        firstname,
        lastname,
      },
      where:{
        email
      }
    })
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
        if(!email ||!password ||!firstname ||!lastname) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Empty fields are not allowed"
          })
        }
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

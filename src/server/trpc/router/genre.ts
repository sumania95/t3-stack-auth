import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const genreRouter = router({
  create: publicProcedure
    .input(z.object({ 
        genre: z.string().nullish(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
       const isExist = await ctx.prisma.genre.findFirst({
        where: {
          genre: input?.genre,
        }
       })
       if (isExist) {
          throw new Error("Genre already exists")
       }
       const result = await ctx.prisma.genre.create({
        data: {genre:input?.genre,}
        })
      return {
        status: 201,
        message: "New genre created successfully",
        result: result.genre,
      };
    }),
  update: publicProcedure
    .input(z.object({ 
        id: z.string(),
        genre: z.string().nullish(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
       const result = await ctx.prisma.genre.update({
        data: {genre:input?.genre},
        where: {id: input?.id}
        })
      return {
        status: 201,
        message: "Genre updated successfully",
        result: result.genre,
      };
    }),
  delete: publicProcedure
    .input(z.object({ 
        id: z.string(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
       const result = await ctx.prisma.genre.delete({
        where: {id: input?.id}
        })
      return {
        status: 201,
        message: "Genre deleted successfully",
        result: result.genre,
      };
    }),
  getAll: publicProcedure
    .input(z.object({ 
        genre: z.string(),
    }).nullish())
    .query(async({ input,ctx }) => {
      if (input?.genre) {
        const result = await ctx.prisma.genre.findMany({
          where: {
              genre: {
                startsWith: input?.genre,
              },
          }, 
          select:{
            id: true,
            genre: true,
          }
        })
        return {
          result
        };
      }else{
        const result = await ctx.prisma.genre.findMany({
          select:{
            id: true,
            genre: true,
          }
        })
        return {
          result
        };
      }
    }),

});
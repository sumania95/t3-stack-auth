import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const genreRouter = router({
  create: publicProcedure
    .input(z.object({ 
        genre: z.string(),
    }))
    .mutation(async ({ input,ctx }) => {
       const { genre} = input as { genre: string };
       const isExist = await ctx.prisma.genre.findFirst({
        where: {
          genre,
        }
       })
       if (isExist) {
          throw new Error("Genre already exists")
       }
      return await ctx.prisma.genre.create({
        data: {genre}
      })
    }),
  update: publicProcedure
    .input(z.object({ 
        id: z.string(),
        genre: z.string().nullish(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
      const { id, genre} = input as { id: string,genre: string };
      return await ctx.prisma.genre.update({
        data: {genre},
        where: {id}
      })
    }),
  delete: publicProcedure
    .input(z.object({ 
        id: z.string(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
      const { id } = input as { id: string };
      const isExist = ctx.prisma.genre.findUnique({
        where: {id}
      })
      if (!isExist) {
        throw new Error("Genre already deleted")
      }
      return await ctx.prisma.genre.delete({
        where: {id}
      })
    }),
  gedId: publicProcedure
    .input(z.object({ 
        id: z.string().nullish(),
    }).nullish())
    .query(async ({ input,ctx }) => {
        const { id } = input as { id: string };
        return await ctx.prisma.genre.findFirst({
          where: { id },
        })
    }),
  getAll: publicProcedure
    .input(z.object({ 
        genre: z.string(),
    }).nullish())
    .query(async({ input,ctx }) => {
      const { genre } = input as { genre: string };

      if (input?.genre) {
        return await ctx.prisma.genre.findMany({
          where: {
              genre: {
                startsWith: genre,
              },
          }, 
          select:{
            id: true,
            genre: true,
          }
        })
      }else{
        return await ctx.prisma.genre.findMany({
          select:{
            id: true,
            genre: true,
          }
        })
      }
    }),

});
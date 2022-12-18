import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const subGenreRouter = router({
  create: publicProcedure
    .input(z.object({ 
        genreId: z.string(),
        sub_genre: z.string(),
    }))
    .mutation(async ({ input,ctx }) => {
       const { sub_genre,genreId } = input as { sub_genre: string, genreId: string};
       try {
         const isExist = await ctx.prisma.subGenre.findFirst({
          where: {
            sub_genre,
            genreId,
          }
         })
         if (isExist) {
            throw new Error("Sub Genre already exists")
         }
        return await ctx.prisma.subGenre.create({
          data:{
            genreId,
            sub_genre,
          }
        })
       }catch(e) {
         throw new Error("Invalid genre please try again")
       }
    }),
  update: publicProcedure
    .input(z.object({ 
        id: z.string(),
        genreId: z.string(),
        sub_genre: z.string().nullish(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
      const { sub_genre,genreId } = input as { sub_genre: string, genreId: string};
      return await ctx.prisma.subGenre.update({
        data: {
          sub_genre,
          genreId,
        },
        where: {id: input?.id}
        })
    }),
  delete: publicProcedure
    .input(z.object({ 
        id: z.string(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
      const { id } = input as { id: string };
      return await ctx.prisma.subGenre.delete({
        where: { id }
        })
    }),
  gedId: publicProcedure
  .input(z.object({ 
      id: z.string().nullish(),
  }).nullish())
  .query(async ({ input,ctx }) => {
      const { id } = input as { id: string };
      return await ctx.prisma.subGenre.findUnique({
        where: { id },
      })
  }),
  getAll: publicProcedure
    .input(z.object({ 
      sub_genre: z.string(),
    }).nullish())
    .query(async({ input,ctx }) => {
      const { sub_genre } = input as { sub_genre: string };
      if (sub_genre){
        return await ctx.prisma.subGenre.findMany({
          where: {
              sub_genre: {
                startsWith: sub_genre,
              },
          }, 
          include:{
            genre: true,
          }
        })
      }else{
        return await ctx.prisma.subGenre.findMany({
          include:{
            genre: true,
          }
        })
      }
    }),

});
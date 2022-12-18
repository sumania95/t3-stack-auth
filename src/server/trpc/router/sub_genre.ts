import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const subGenreRouter = router({
  create: publicProcedure
    .input(z.object({ 
        genreId: z.string(),
        sub_genre: z.string(),
    }))
    .mutation(async ({ input,ctx }) => {
       const isExist = await ctx.prisma.subGenre.findFirst({
        where: {
          sub_genre: input?.sub_genre,
          genreId: input?.genreId,
        }
       })
       if (isExist) {
          throw new Error("Genre already exists")
       }
       const result = await ctx.prisma.subGenre.create({
          data:{
            genreId: input?.genreId,
            sub_genre: input?.sub_genre,
          }
        })
      return {
        status: 201,
        message: "New sub genre created successfully",
        result: result.sub_genre,
      };
    }),
  update: publicProcedure
    .input(z.object({ 
        id: z.string(),
        genreId: z.string(),
        sub_genre: z.string().nullish(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
       const result = await ctx.prisma.subGenre.update({
        data: {
          sub_genre:input?.sub_genre,
          genreId:input?.genreId,
        },
        where: {id: input?.id}
        })
      return {
        status: 201,
        message: "Genre updated successfully",
        result: result.sub_genre,
      };
    }),
  delete: publicProcedure
    .input(z.object({ 
        id: z.string(),
    }).nullish())
    .mutation(async ({ input,ctx }) => {
       const result = await ctx.prisma.subGenre.delete({
        where: {id: input?.id}
        })
      return {
        status: 201,
        message: "Genre deleted successfully",
        result: result.sub_genre,

      };
    }),
  gedId: publicProcedure
  .input(z.object({ 
      id: z.string().nullish(),
  }).nullish())
  .query(async ({ input,ctx }) => {
      const { id } = input as { id: string };
      const result = await ctx.prisma.subGenre.findFirst({
        where: { id:id },
      })
      return {
        data:result?.sub_genre,
      };
  }),
  getAll: publicProcedure
    .input(z.object({ 
      sub_genre: z.string(),
    }).nullish())
    .query(async({ input,ctx }) => {
      if (input?.sub_genre){
        const result = await ctx.prisma.subGenre.findMany({
          where: {
              sub_genre: {
                startsWith: input?.sub_genre,
              },
          }, 
          include:{
            genre: true,
          }
        })
        return {
          result
        };
      }else{
        const result = await ctx.prisma.subGenre.findMany({
          include:{
            genre: true,
          }
        })
        return {
          result
        };
      }
    }),

});
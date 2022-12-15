import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  // me:protectedProcedure.query(({ctx}) => {
  //   const id:number = ctx.session.user.id;
  //   const user = ctx.prisma.user.findFirst({ 
  //     where: { id: id },
  //     select: {
  //       email: true,
  //       firstname: true,
  //       lastname: true,
  //       role: true,
  //     },
  //   });
  //   return user;
  // }),
});

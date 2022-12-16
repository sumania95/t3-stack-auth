import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { verify } from "argon2";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

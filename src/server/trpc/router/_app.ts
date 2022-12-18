import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { genreRouter } from "./genre";
import { subGenreRouter } from "./sub_genre";
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  genre:genreRouter,
  subgenre:subGenreRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

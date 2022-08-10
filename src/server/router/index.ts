// src/server/router/index.ts
import { createRouter } from "./context"
import superjson from "superjson"
import { foodRouter } from "./food"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("food.", foodRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

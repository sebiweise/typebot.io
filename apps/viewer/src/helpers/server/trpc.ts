import * as Sentry from "@sentry/nextjs";
import { initTRPC } from "@trpc/server";
import type { OpenApiMeta } from "@typebot.io/trpc-openapi/types";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().meta<OpenApiMeta>().create({
  transformer: superjson,
});

const injectUser = t.middleware(({ next, ctx }) => {
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const sentryMiddleware = t.middleware(Sentry.trpcMiddleware());

export const middleware = t.middleware;

export const router = t.router;

export const publicProcedure = t.procedure
  .use(sentryMiddleware)
  .use(injectUser);

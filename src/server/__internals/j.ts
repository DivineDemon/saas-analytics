import { Context } from "hono";

import { env } from "@/env";

import { Procedure } from "./procedure";

const baseProcedure = new Procedure();

type MiddlewareFunction<T = {}, R = void> = (params: {
  ctx: T;
  next: <B>(args: B) => Promise<B & T>;
  c: Context<{ Bindings: typeof env }>;
}) => Promise<R>;

export const j = {
  middleware: <T = {}, R = void>(
    fn: MiddlewareFunction<T, R>
  ): MiddlewareFunction<T, R> => {
    return fn;
  },
  procedure: baseProcedure,
};

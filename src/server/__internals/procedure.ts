import { Context, TypedResponse } from "hono";
import { StatusCode } from "hono/utils/http-status";
import superjson from "superjson";
import { z } from "zod";



import { env } from "@/env";



import { Middleware, MutationOperation, QueryOperation } from "./types";


declare module "hono" {
  interface Context {
    superjson: <T>(data: T, status?: number) => SuperJSONTypedResponse<T>;
  }
}

type SuperJSONParsedType<T> = ReturnType<typeof superjson.parse<T>>;
export type SuperJSONTypedResponse<
  T,
  U extends StatusCode = StatusCode,
> = TypedResponse<SuperJSONParsedType<T>, U, "json">;

export class Procedure<ctx = object> {
  private readonly middlewares: Middleware<ctx>[] = [];

  private superjsonMiddleware: Middleware<ctx> =
    async function superjsonMiddleware({ c, next }) {
      type JSONRespond = typeof c.json;

      c.superjson = (<T>(data: T, status?: StatusCode): Response => {
        const serialized = superjson.stringify(data);
        return new Response(serialized, {
          status: status || 200,
          headers: { "Content-Type": "application/superjson" },
        });
      }) as JSONRespond;

      return await next();
    };

  constructor(middlewares: Middleware<ctx>[] = []) {
    this.middlewares = middlewares;

    if (!this.middlewares.some((mw) => mw.name === "superjsonMiddleware")) {
      this.middlewares.push(this.superjsonMiddleware);
    }
  }

  use<T, Return = void>(
    fn: ({
      ctx,
      next,
      c,
    }: {
      ctx: ctx;
      next: <B>(args?: B) => Promise<B & ctx>;
      c: Context<{ Bindings: typeof env }>;
    }) => Promise<Return>
  ): Procedure<ctx & T & Return> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Procedure<ctx & T & Return>([...this.middlewares, fn as any]);
  }

  input = <Schema extends Record<string, unknown>>(
    schema: z.ZodSchema<Schema>
  ) => ({
    query: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: typeof env }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>
    ): QueryOperation<Schema, Output> => ({
      type: "query",
      schema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: fn as any,
      middlewares: this.middlewares,
    }),

    mutation: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: typeof env }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>
    ): MutationOperation<Schema, Output> => ({
      type: "mutation",
      schema,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: fn as any,
      middlewares: this.middlewares,
    }),
  });

  query<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: typeof env }>;
    }) =>
      | SuperJSONTypedResponse<Output>
      | Promise<SuperJSONTypedResponse<Output>>
  ): QueryOperation<Record<string, unknown>, Output> {
    return {
      type: "query",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: fn as any,
      middlewares: this.middlewares,
    };
  }

  mutation<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: typeof env }>;
    }) => TypedResponse<Output> | Promise<TypedResponse<Output>>
  ): MutationOperation<Record<string, unknown>, Output> {
    return {
      type: "mutation",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: fn as any,
      middlewares: this.middlewares,
    };
  }
}
import { MiddlewareHandler } from "hono";

import { parseSuperJSON } from "./utils";

export const queryParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawQuery = c.req.query();
  const parsedQuery: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawQuery)) {
    parsedQuery[key] = parseSuperJSON(value);
  }

  c.set("parsedQuery", parsedQuery);
  await next();
};

export const bodyParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawBody = await c.req.json();
  const parsedBody: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawBody)) {
    parsedBody[key] = parseSuperJSON(value as any);
  }

  c.set("parsedBody", parsedBody);
  await next();
};

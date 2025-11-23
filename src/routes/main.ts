import { Scalar } from "@scalar/hono-api-reference";
import { fromHono } from "chanfana";
import { Hono } from "hono";
import { description, version } from "../../package.json";
import { RouteBot, RouteBotConfig } from "./bot";
import { registerLLMRoutes } from "./llms";

export function newHonoApp(): Hono<{ Bindings: CloudflareBindings }> {
  const app = new Hono<{ Bindings: CloudflareBindings }>();
  const openapi = fromHono(app, {
    schema: {
      info: {
        title: "Telegram Bot",
        description,
        version,
      },
    },
  });
  openapi.onError(async (err, c) => {
    console.error(err);
    return c.text(`${err}`, 500);
  });
  openapi.get("/", Scalar({ url: "/openapi.json" }));
  registerLLMRoutes(app, openapi);
  openapi.get("/api/telegram/webhooks", RouteBotConfig);
  openapi.post("/api/telegram/webhooks", RouteBot);
  return app;
}

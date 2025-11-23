import { OpenAPIRoute } from "chanfana";
import { type Bot, webhookCallback } from "grammy";
import { newBot, newCommandGroup } from "../bot";
import type { Context } from "../types";

export class RouteBot extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const bot: Bot = await newBot(c);
    return webhookCallback(bot, "cloudflare-mod")(c.req.raw);
  }
}

export class RouteBotConfig extends OpenAPIRoute {
  override async handle(c: Context): Promise<Response> {
    const bot: Bot = await newBot(c);
    const commands = newCommandGroup();
    await bot.api.setWebhook(c.req.url);
    await commands.setCommands(bot);
    return c.text("Webhook configured");
  }
}

import { Bot } from "grammy";
import { env } from "hono/adapter";
import type { Context } from "../types";
import { newCommandGroup } from "./commands";

export async function newBot(c: Context): Promise<Bot> {
  const bot = new Bot(env(c).BOT_TOKEN);
  const commands = newCommandGroup();
  bot.use(commands);
  return bot;
}

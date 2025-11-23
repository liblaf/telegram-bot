import { CommandGroup } from "@grammyjs/commands";
import type { CommandContext, Context } from "grammy";

export function newCommandGroup(): CommandGroup<Context> {
  const group = new CommandGroup();
  group.command(
    "start",
    "Say Hello",
    async (ctx: CommandContext<Context>): Promise<void> => {
      const name: string = ctx.from?.first_name || "world";
      await ctx.reply(`Hello, ${name}!`);
    },
  );
  group.command(
    "id",
    " Get your chat ID",
    async (ctx: CommandContext<Context>): Promise<void> => {
      const chatId: number = ctx.chat.id;
      await ctx.reply(`<code>${chatId}</code>`, { parse_mode: "HTML" });
    },
  );
  return group;
}

import { WebhookClientData, WebhookMessageCreateOptions } from "discord.js";
import mineflayer from "mineflayer";
import { startBot } from "./bot.js";

export type BotEventKeys = keyof mineflayer.BotEvents;

export type BotEventHandler<T extends BotEventKeys> = (
  ...args: Parameters<mineflayer.BotEvents[T]>
) => string | WebhookMessageCreateOptions;

type AppConfig = {
  requireEmptyInventory: boolean;
  sendEventsToDiscord: {
    [event in BotEventKeys]?: boolean | BotEventHandler<event>;
  };
};

export type Config = {
  bot: mineflayer.BotOptions;
  webhook?: WebhookClientData;
  app: AppConfig;
};

startBot((await import("../bot.config.mjs").then(i => i.default)) as Config);

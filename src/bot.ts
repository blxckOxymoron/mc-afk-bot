import { AttachmentBuilder, WebhookClient, WebhookMessageCreateOptions } from "discord.js";
import { Config } from "./index.js";
import mineflayer from "mineflayer";

type AnyEvent = mineflayer.BotEvents[keyof mineflayer.BotEvents];

export function startBot(config: Config) {
  const bot = mineflayer.createBot(config.bot);

  if (config.webhook) {
    const webhookClient = new WebhookClient(config.webhook);

    type EventConfig = typeof config.app.sendEventsToDiscord;
    type EventConfigEntries = [keyof EventConfig, EventConfig[keyof EventConfig]][];

    for (const [event, handler] of Object.entries(
      config.app.sendEventsToDiscord
    ) as EventConfigEntries) {
      bot.on(event, (...args: Parameters<AnyEvent>): void => {
        if (!handler) return;

        let res: string | WebhookMessageCreateOptions;
        if (typeof handler === "function") {
          res = handler(...(args as never[])); // this is where my typescript knowledge ends
        } else if (args.length > 0) {
          const attachment = new AttachmentBuilder(
            Buffer.from(JSON.stringify(args, null, 2), "utf-8"),
            {
              name: "event.json",
            }
          );

          res = {
            content: `received event \`${event}\``,
            files: [attachment],
          };
        } else {
          res = {
            content: `received event \`${event}\` with no arguments`,
          };
        }

        if (typeof res === "string") res = { content: res };

        webhookClient.send({
          username: bot.player?.username,
          avatarURL: "https://minotar.net/avatar/" + bot.player?.uuid,
          ...res,
        } as WebhookMessageCreateOptions);
      });
    }
  }

  bot.once("playerUpdated", player => {
    if (player.uuid !== bot.player.uuid) return;

    console.log("Joined server");

    if (config.app.requireEmptyInventory) {
      const empty = bot.inventory.slots.every(slot => !slot);
      if (!empty) {
        console.error("Inventory is not empty! Empty the inventory and restart the bot.");
        bot.quit();
      }
    }
  });

  bot.on("kicked", console.log);
  bot.on("error", console.log);
}

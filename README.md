# afk bot for minecraft

join a player on a server and get notified on events
unfortunately mineflayer currently only supports <=1.20.1

## `bot.config.mjs` setup
- set `username` to your microsoft email (login is handled by mineflayer)
- set `host` and `port`
- if you want to use the discord webhook functionality, add your webhook url in `webhook.url`. Ohterwise comment it out
- there are two settings under `app`
  - `requireEmptyInventory` checks the inventory on join and disconnect if the bot's inventory is not empty
  - `sendEventsToDiscord` defines the events that are send to discord. Possible values:
    - `true`, which tells the bot to send the event as json file to the webhook
    - a fuction that takes the arguments from the event and returns a string or discord message payload

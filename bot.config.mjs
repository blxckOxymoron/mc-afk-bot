//@ts-check
/** @type {import("./build/index.js").Config} */
export default {
  bot: {
    auth: "microsoft",
    // set to your microsoft account email
    username: "user@acme.com",
    host: "localhost",
    port: 25565,
  },
  webhook: {
    // your discord webhook url
    url: "https://discord.com/api/webhooks/...",
  },
  app: {
    // checks the inventory on join and disconnect if the bot's inventory is not empty
    requireEmptyInventory: true,
    sendEventsToDiscord: {
      // true => sends the whole parameters as json
      "error": true,
      "kicked": true,
      // return a string to send a message
      "death": () => "NOOOOO I DIED WHILE BEING AFK",
      // return a string based on the event parameters
      "messagestr": (message) => `Chat: **${message}**`,
    }
  }
};
import BaseEvent from "../../utils/structures/BaseEvent";
import { Message } from "discord.js";
import DiscordClient from "../../client/client";

export default class MessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    console.log("message:content", message.content);
    if (message.author.bot) return;
    const config = client.configs.get(message.guildId!);
    console.log("config", config);
    if (!config) {
      message.channel.send("No configuration set.");
      return;
    }
    console.log("config:prefix", config?.prefix);
    if (message.content.startsWith(config.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}

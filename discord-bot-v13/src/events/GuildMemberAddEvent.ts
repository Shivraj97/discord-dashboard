// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    console.log("Guild member joined");
    console.log(`Joined Member: ${member.guild.id} (${member.guild.name})`);
    const config = client.configs.get(member.guild.id);
    console.log(config);
    if (!config) return;
    if (config.welcomeChannelId) {
      const channel = member.guild.channels.cache.get(
        config.welcomeChannelId
      ) as TextChannel;
      if (!channel) console.log("Welcome channel not found.");
      if (channel) {
        channel.send(`Welcome ${member}! Let's rock!`);
      }
    } else {
      console.log("No welcome channel set.");
    }
  }
}

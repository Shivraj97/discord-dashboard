// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import { getRepository } from "typeorm";
import { GuildConfiguration } from "../typeorm/entities/GuildConfiguration";

export default class GuildCreateEvent extends BaseEvent {
  constructor(
    private readonly guildConfigRepository = getRepository(GuildConfiguration)
  ) {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    console.log("Guild Joined");
    console.log(`Guild: ${guild.name} (${guild.id})`);

    const config = await this.guildConfigRepository.findOne({
      where: { guildId: guild.id },
    });
    if (config) {
      console.log("A configuration was found. Skipping creation...");
      client.configs.set(guild.id, config);
      console.log(client.configs);
    } else {
      console.log("A configuration was NOT found. Creating one...");
      const newConfig = this.guildConfigRepository.create({
        guildId: guild.id,
      });
      const savedConfig = await this.guildConfigRepository.save(newConfig);
      client.configs.set(guild.id, savedConfig);
      console.log(client.configs);
    }
  }
}

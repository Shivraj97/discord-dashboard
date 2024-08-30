require("dotenv").config();
import { registerCommands, registerEvents } from "./utils/registry";
import config from "../slappey.json";
import DiscordClient from "./client/client";
import { Collection, Intents } from "discord.js";
import { createConnection, getRepository } from "typeorm";
import { GuildConfiguration } from "./typeorm/entities/GuildConfiguration";
const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

(async () => {
  await createConnection({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.MYSQL_DB_PORT) || 3306,
    username: process.env.MYSQL_DB_USER || "username",
    password: process.env.MYSQL_DB_PASS || "password",
    database: process.env.MYSQL_DB_NAME || "discord_database",
    synchronize: true,
    entities: [GuildConfiguration],
  });
  // client.prefix = config.prefix || client.prefix;
  const configRepo = getRepository(GuildConfiguration);
  const guildConfigs = await configRepo.find();
  const configs = new Collection<string, GuildConfiguration>();
  guildConfigs.forEach((config) => configs.set(config.guildId, config));

  client.configs = configs;
  // console.log(client.configs);
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

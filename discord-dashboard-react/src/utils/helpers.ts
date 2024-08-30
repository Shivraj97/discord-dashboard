import { PartialGuild } from "./types";

export const getIconURL = (guild: PartialGuild) => {
  if (guild.icon && guild.id) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  }
  return "";
};

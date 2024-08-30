import { createContext, useContext } from "react";
import { PartialGuild } from "../types";

type GuildContextType = {
  guild?: PartialGuild;
  updateGuild: (guild: PartialGuild) => void;
};

export const GuildContext = createContext<GuildContextType>({
  updateGuild: () => {},
});

export const useGuildContext = () => useContext(GuildContext);

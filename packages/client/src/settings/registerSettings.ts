import { MODULE_ID } from "@/constants";
import { ActorMappingFormApplication } from "./ActorMappingFormApplication";

export function registerSettings() {
  game.settings?.register(MODULE_ID, "proxyAddress", {
    name: "Proxy Address",
    type: String,
    default: undefined,
    scope: "world",
    config: true,
    requiresReload: true,
  });

  game.settings?.register(MODULE_ID, "sessionToken", {
    name: "Session Token",
    type: String,
    default: undefined,
    scope: "world",
    config: true,
    requiresReload: true,
  });

  game.settings?.register(MODULE_ID, "gameId", {
    name: "Game ID",
    type: Number,
    default: undefined,
    scope: "world",
    config: true,
    requiresReload: true,
  });

  game.settings?.register(MODULE_ID, "userId", {
    name: "User ID",
    type: Number,
    default: undefined,
    scope: "world",
    config: true,
    requiresReload: true,
  });

  game.settings?.register(MODULE_ID, "actorMappings", {
    name: "Actor Mappings",
    type: Object,
    default: undefined,
    scope: "world",
    config: false,
  });

  game.settings?.registerMenu(MODULE_ID, "actorMappingsMenu", {
    name: "Actor Mapping",
    label: "Actor Mapping",
    hint: "Map DnD Beyond character IDs to Foundry actors.",
    icon: "fas fa-users-gear",
    type: ActorMappingFormApplication,
    restricted: true,
  });
}

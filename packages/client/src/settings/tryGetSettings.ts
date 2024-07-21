import { MODULE_ID } from "@/constants";
import type { Settings } from "@/types/Settings";

export function tryGetSettings(): Settings | undefined {
  if (!game.user?.isGM) return;

  const proxyAddress = game.settings.get(MODULE_ID, "proxyAddress");
  const sessionToken = game.settings.get(MODULE_ID, "sessionToken");
  const userId = game.settings.get(MODULE_ID, "userId");
  const gameId = game.settings.get(MODULE_ID, "gameId");

  if (proxyAddress === null || proxyAddress.length === 0) return;
  if (sessionToken === null || sessionToken.length === 0) return;
  if (userId === null || isNaN(userId)) return;
  if (gameId === null || isNaN(gameId)) return;

  return { proxyAddress, sessionToken, userId, gameId };
}

import type { Settings } from "@/types/Settings";

export async function tryGetSocket({
  proxyAddress,
  sessionToken,
  userId,
  gameId,
}: Settings): Promise<WebSocket | undefined> {
  const res = await fetch(`${proxyAddress}/user-token/${sessionToken}`);
  const cobalt: unknown = await res.json();

  if (typeof cobalt !== "object" || cobalt === null) return;
  if (!("token" in cobalt)) return;
  if (typeof cobalt.token !== "string") return;

  return new WebSocket(
    `wss://game-log-api-live.dndbeyond.com/v1?gameId=${encodeURIComponent(gameId)}&userId=${encodeURIComponent(userId)}&stt=${encodeURIComponent(cobalt.token)}`,
  );
}

import { tryGetSettings } from "@/settings/tryGetSettings";
import { onSocketMessage } from "./onSocketMessage";
import { tryGetSocket } from "./tryGetSocket";

export async function ready() {
  const settings = tryGetSettings();
  if (settings === undefined) return;

  const socket = await tryGetSocket(settings);
  if (socket === undefined) return;

  socket.addEventListener("open", () => {
    setInterval(
      () => {
        socket.send(JSON.stringify({ data: "ping" }));
      },
      3 * 60 * 1000,
    );
  });

  socket.addEventListener("message", onSocketMessage);
}

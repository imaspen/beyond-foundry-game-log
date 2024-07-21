import { createServer } from "node:http";
import { fetchToken } from "./fetchToken.js";
import { getArgs } from "./getArgs.js";

export function startServer() {
  const { host, port, corsOrigin } = getArgs();

  const server = createServer(async (req, res) => {
    const url = new URL(`http://localhost${req.url ?? ""}`);

    const pathParts = url.pathname.slice(1).split("/");
    const sessionToken = pathParts[1];

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", corsOrigin);

    if (
      req.method !== "GET" ||
      pathParts.length !== 2 ||
      pathParts[0] !== "user-token" ||
      !sessionToken?.length
    ) {
      console.warn(`invalid request received: ${req.method} ${req.url}`);
      res.writeHead(404);
      res.end(JSON.stringify({ status: 404, error: "Not Found" }));
      return;
    }

    try {
      console.info(`fetching token for session`);

      const token = await fetchToken(sessionToken);

      console.info("token fetched");

      res.writeHead(200);
      res.end(JSON.stringify({ token }));
    } catch (e) {
      const error = typeof e === "string" ? e : "failed to get token";

      console.error(error);

      res.writeHead(400);
      res.end(JSON.stringify({ status: 400, error }));
    }
  });

  server.listen(port, host, () => {
    console.info(
      `listening for forge extension from ${corsOrigin} on ${host}:${port}/user-token/{session}`,
    );
  });
}

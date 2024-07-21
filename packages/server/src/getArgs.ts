import { parseArgs } from "node:util";

export function getArgs(): { host: string; port: number; corsOrigin: string } {
  const args = parseArgs({
    options: {
      host: {
        short: "h",
        type: "string",
        default: "localhost",
      },
      port: {
        short: "p",
        type: "string",
        default: "8080",
      },
      "cors-origin": {
        short: "c",
        type: "string",
        default: "*",
      },
    },
  });

  const host = args.values.host ?? "";
  const port = Number(args.values.port);
  const corsOrigin = args.values["cors-origin"] ?? "";

  if (!host.length) {
    throw new TypeError(`string expected for host, nothing received`);
  }

  if (isNaN(port)) {
    throw new TypeError(
      `number expected for port, "${args.values.port}" received`,
    );
  }

  if (corsOrigin !== "*" && !new URL(corsOrigin)) {
    throw new TypeError("cors origin invalid");
  }

  return {
    host,
    port,
    corsOrigin,
  };
}

# Beyond Foundry Game Log - Proxy Server

Runs a proxy server to allow the Beyond Foundry Game Log to get a user token to
authenticate against the game log web sockets server.

This server does not use HTTPS! If you need to expose it to the public internet,
you should run it behind a [reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
configured to use HTTPS to prevent sending your D&D Beyond token in plain text.

Also, if exposed to the public internet, you should use the CORS origin flag
set to your Forge instances URL, to prevent unauthorized access.

## Usage

```
npx @beyond-foundry-game-log/server [options]
  options:
    --host, -h        [string] hostname to bind
    --port, -p        [number] port to bind
    --cors-origin, -c [string] value to set for Access-Control-Allow-Origin header
```

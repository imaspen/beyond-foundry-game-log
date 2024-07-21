export async function fetchToken(sessionToken: string) {
  const token = await fetch(
    "https://auth-service.dndbeyond.com/v1/cobalt-token",
    {
      method: "POST",
      headers: {
        cookie: `CobaltSession=${sessionToken}`,
      },
    },
  );

  const data = await token.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("token" in data) ||
    typeof data.token !== "string" ||
    data.token.length === 0
  ) {
    throw "failed to get token";
  }

  return data.token;
}

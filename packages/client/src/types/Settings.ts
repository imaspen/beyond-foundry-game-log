import type { MODULE_ID } from "@/constants";

type Value<T extends string> = NonNullable<
  ClientSettings.Values[`${typeof MODULE_ID}.${T}`]
>;

export interface Settings {
  proxyAddress: Value<"proxyAddress">;
  sessionToken: Value<"sessionToken">;
  userId: Value<"userId">;
  gameId: Value<"gameId">;
}

import { hasKeyOfType, isObject } from "@/utils/object";
import { isBeyondData, type BeyondData } from "./BeyondData";

export interface BeyondMessage {
  data: BeyondData;
  eventType: "dice/roll/fulfilled";
  messageScope: "gameId";
}

export function isBeyondMessage(object: unknown): object is BeyondMessage {
  if (!isObject(object)) return false;

  if (!hasKeyOfType(object, "data", Object)) return false;
  if (!hasKeyOfType(object, "eventType", String)) return false;
  if (!hasKeyOfType(object, "messageScope", String)) return false;

  if (object.eventType !== "dice/roll/fulfilled") return false;
  if (object.messageScope !== "gameId") return false;

  if (!isBeyondData(object.data)) return false;

  return true;
}

import { hasKeyOfType, isObject } from "@/utils/object";
import { isBeyondRoll, type BeyondRoll } from "./BeyondRoll";

export interface BeyondData {
  action: string;
  context: {
    entityType: "character";
    entityId: string;
    name: string;
  };
  rolls: [BeyondRoll];
}

export function isBeyondData(data: unknown): data is BeyondData {
  if (!isObject(data)) return false;

  if (!hasKeyOfType(data, "action", String)) return false;
  if (!hasKeyOfType(data, "context", Object)) return false;

  const context = data.context;

  if (!hasKeyOfType(context, "entityType", String)) return false;
  if (!hasKeyOfType(context, "entityId", String)) return false;
  if (!hasKeyOfType(context, "name", String)) return false;

  if (context.entityType !== "character") return false;

  if (!hasKeyOfType(data, "rolls", Array)) return false;
  if (data.rolls.length < 1) return false;
  if (!isBeyondRoll(data.rolls[0])) return false;

  return true;
}

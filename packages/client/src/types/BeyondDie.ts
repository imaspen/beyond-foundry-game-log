import { hasKeyOfType, isObject } from "@/utils/object";

export interface BeyondDie {
  dieType: string;
  dieValue: number;
}

export function isBeyondDie(die: unknown): die is BeyondDie {
  if (!isObject(die)) return false;

  if (!hasKeyOfType(die, "dieType", String)) return false;
  if (!hasKeyOfType(die, "dieValue", Number)) return false;

  return true;
}

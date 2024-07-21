import { hasKeyOfType, isObject } from "@/utils/object";
import { type BeyondDie, isBeyondDie } from "./BeyondDie";

export enum BeyondOperation {
  Flat = 0,
  Disadvantage = 1,
  Advantage = 2,
}

export interface BeyondDiceSet {
  count: number;
  dieType: string;
  operation: BeyondOperation;
  dice: BeyondDie[];
}

export function isBeyondDiceSet(set: unknown): set is BeyondDiceSet {
  if (!isObject(set)) return false;

  if (!hasKeyOfType(set, "count", Number)) return false;
  if (!hasKeyOfType(set, "dieType", String)) return false;
  if (!hasKeyOfType(set, "operation", Number)) return false;
  if (![0, 1, 2].includes(set.operation)) return false;
  if (!hasKeyOfType(set, "dice", Array)) return false;
  if (!set.dice.every((die) => isBeyondDie(die))) return false;

  return true;
}

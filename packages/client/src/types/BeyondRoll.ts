import { hasKeyOfType, isObject } from "@/utils/object";
import { isBeyondDiceSet, type BeyondDiceSet } from "./BeyondDiceSet";

export interface BeyondRoll {
  rollType: string;
  result: {
    constant: number;
    total: number;
    text: string;
    values: number[];
  };
  diceNotation: {
    constant: number;
    set: BeyondDiceSet[];
  };
}

export function isBeyondRoll(roll: unknown): roll is BeyondRoll {
  if (!isObject(roll)) return false;

  if (!hasKeyOfType(roll, "result", Object)) return false;
  if (!hasKeyOfType(roll, "rollType", String)) return false;
  if (!hasKeyOfType(roll, "diceNotation", Object)) return false;

  const result = roll.result;

  if (!hasKeyOfType(result, "constant", Number)) return false;
  if (!hasKeyOfType(result, "total", Number)) return false;
  if (!hasKeyOfType(result, "text", String)) return false;
  if (!hasKeyOfType(result, "values", Array)) return false;
  if (!result.values.every((value) => typeof value === "number")) return false;

  const diceNotation = roll.diceNotation;

  if (!hasKeyOfType(diceNotation, "constant", Number)) return false;
  if (!hasKeyOfType(diceNotation, "set", Array)) return false;
  if (!diceNotation.set.every((s) => isBeyondDiceSet(s))) return false;

  return true;
}

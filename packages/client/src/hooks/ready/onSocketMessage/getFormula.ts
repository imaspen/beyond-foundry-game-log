import type { BeyondDiceSet } from "@/types/BeyondDiceSet";
import type { BeyondRoll } from "@/types/BeyondRoll";
import { getArgumentForOperation } from "./getArgumentForOperation";

function getEntry({ count, dieType, operation }: BeyondDiceSet): string {
  return "".concat(
    count.toFixed(0),
    dieType,
    getArgumentForOperation(operation) ?? "",
  );
}

export function getFormula({
  set,
  constant,
}: BeyondRoll["diceNotation"]): string {
  return set
    .map(getEntry)
    .join("+")
    .concat(constant < 0 ? "-" : "+")
    .concat(Math.abs(constant).toFixed(0));
}

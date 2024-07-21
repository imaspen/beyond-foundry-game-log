import { type BeyondDiceSet, BeyondOperation } from "@/types/BeyondDiceSet";
import type { BeyondDie } from "@/types/BeyondDie";
import { getArgumentForOperation } from "./getArgumentForOperation";

function getIsDiceActive(
  index: number,
  dice: BeyondDie[],
  operation: BeyondOperation,
): boolean {
  if (operation === BeyondOperation.Flat) return true;

  if (dice[0] === dice[1]) {
    return index === 0;
  }

  if (dice[index].dieValue < dice[(index + 1) % 2].dieValue) {
    return operation === BeyondOperation.Disadvantage;
  }

  return operation === BeyondOperation.Advantage;
}

export function getTerms(set: BeyondDiceSet[]): DiceTerm.Data[] {
  return set.map(({ count, dieType, dice, operation }) => ({
    class: "Die",
    faces: Number(dieType.slice(1)),
    number: count,
    arguments: getArgumentForOperation(operation),
    results: dice.map(({ dieValue }, index) => ({
      result: dieValue,
      active: getIsDiceActive(index, dice, operation),
    })),
  }));
}

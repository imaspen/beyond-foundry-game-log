import { BeyondOperation } from "@/types/BeyondDiceSet";

export function getArgumentForOperation(
  operation: BeyondOperation,
): string | undefined {
  switch (operation) {
    case BeyondOperation.Flat:
      return undefined;
    case BeyondOperation.Disadvantage:
      return "kl";
    case BeyondOperation.Advantage:
      return "kh";
  }
}

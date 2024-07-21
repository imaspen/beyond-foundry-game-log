import { MODULE_ID } from "@/constants";
import { isActorMappings } from "@/types/ActorMapping";
import { isBeyondMessage } from "@/types/BeyondMessage";
import { getFormula } from "./getFormula";
import { getTerms } from "./getTerms";

function parseAction(action: string): string {
  switch (action) {
    case "str":
      return "Strength";
    case "dex":
      return "Dexterity";
    case "con":
      return "Constitution";
    case "int":
      return "Intelligence";
    case "wis":
      return "Wisdom";
    case "cha":
      return "Charisma";
    default:
      return action;
  }
}

export function onSocketMessage(event: MessageEvent<unknown>) {
  if (typeof event.data !== "string") return;
  if (event.data === "pong") return;

  try {
    const message: unknown = JSON.parse(event.data);

    if (!isBeyondMessage(message)) return;

    const { diceNotation, result, rollType } = message.data.rolls[0];

    const formula = getFormula(diceNotation);
    const terms = getTerms(diceNotation.set);

    const setting = game.settings?.get(MODULE_ID, "actorMappings");
    const mappings = isActorMappings(setting) ? setting.mappings : [];
    const actor = mappings.find(
      ({ beyondId }) => beyondId === message.data.context.entityId,
    )?.actorId;

    void Roll.fromData({
      formula,
      results: result.values,
      total: result.total,
      terms,
    }).toMessage({
      speaker: { actor },
      flavor: `${parseAction(message.data.action)} ${rollType}`,
    });
  } catch (e) {
    console.error(e);
  }
}

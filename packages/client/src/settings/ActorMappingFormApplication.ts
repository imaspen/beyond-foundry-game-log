import { MODULE_ID } from "@/constants";
import {
  isActorMappings,
  type ActorMapping,
  type ActorMappings,
} from "@/types/ActorMapping";
import { hasKeyOfType, isObject } from "@/utils/object";

function isActorPlayer(actor: unknown): boolean {
  if (!isObject(actor)) return false;
  if (!hasKeyOfType(actor, "type", String)) return false;
  return actor.type === "character";
}

export class ActorMappingFormApplication extends FormApplication {
  constructor() {
    super({
      closeOnSubmit: true,
    });
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: `modules/${MODULE_ID}/templates/actor-mappings.hbs`,
      id: "actor-mappings-form-application",
      title: "Actor Mappings",
    };
  }

  getData() {
    const setting = game.settings?.get(MODULE_ID, "actorMappings");
    const rawMappings = isActorMappings(setting) ? setting.mappings : [];
    const mappingsPairs = rawMappings.map(({ actorId, beyondId }) => [
      actorId,
      beyondId,
    ]);
    const mappings = Object.fromEntries(mappingsPairs) as Record<
      string,
      string
    >;

    const actors = Array.from(Actors.instance.entries())
      .filter(([, actor]) => isActorPlayer(actor))
      .map(([id, actor]) => ({ id, actor, mapping: mappings[id] }));

    return { actors };
  }

  protected async _updateObject(_: Event, formData?: object): Promise<void> {
    if (formData === undefined) return;

    const entries = Array.from(Object.entries(formData));

    function isMappingPair(
      entry: [string, unknown],
    ): entry is [string, string] {
      if (typeof entry[1] !== "string") return false;
      return true;
    }

    if (!entries.every(isMappingPair)) return;

    const mappings: ActorMapping[] = entries.map(([actorId, beyondId]) => ({
      actorId,
      beyondId,
    }));

    await game.settings?.set(MODULE_ID, "actorMappings", {
      mappings,
    } satisfies ActorMappings);
  }
}

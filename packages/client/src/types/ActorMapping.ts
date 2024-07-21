import { hasKeyOfType, isObject } from "@/utils/object";

export interface ActorMapping {
  beyondId: string;
  actorId: string;
}

export interface ActorMappings {
  mappings: ActorMapping[];
}

export function isActorMapping(object: unknown): object is ActorMapping {
  if (!isObject(object)) return false;

  if (!hasKeyOfType(object, "beyondId", String)) return false;
  if (!hasKeyOfType(object, "actorId", String)) return false;

  return true;
}

export function isActorMappings(object: unknown): object is ActorMappings {
  if (!isObject(object)) return false;

  if (!hasKeyOfType(object, "mappings", Array)) return false;
  if (!object.mappings.every((val) => isActorMapping(val))) return false;

  return true;
}

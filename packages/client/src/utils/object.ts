export function isObject(object: unknown): object is object {
  return typeof object === "object" && object !== null;
}

export function hasKey<T extends object, U extends string>(
  object: T,
  key: U,
): object is T & Record<typeof key, unknown> {
  return key in object;
}

export function hasKeyOfType<
  T extends object,
  U extends string,
  V extends
    | typeof String
    | typeof Number
    | typeof Boolean
    | typeof Object
    | typeof Array,
>(
  object: T,
  key: U,
  type: V,
): object is T & Record<U, V extends typeof Object ? object : ReturnType<V>> {
  if (!hasKey(object, key)) return false;

  if (type === Object) return isObject(object[key]);
  if (type === Array) return Array.isArray(object[key]);

  return (
    typeof object[key] ===
    typeof (type as Exclude<V, typeof Object | typeof Array>)()
  );
}

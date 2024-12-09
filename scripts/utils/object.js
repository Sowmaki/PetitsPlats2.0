/**
 * @param mapper (value, key, index)=>newValue
 */
export function objectMap(object, mapper) {
  return Object.fromEntries(Object.entries(object).map(([key, value], index) => [key, mapper(value, key, index)]))
}

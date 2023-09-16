export function arrayToString(array) {
  if (Array.isArray(array)) {
    return array?.join(", ");
  }
  return array;
}

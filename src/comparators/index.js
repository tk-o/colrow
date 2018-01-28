export function defaultComparator(a, b) {
  a = (a === null || a === undefined) ? -Infinity : a;
  b = (b === null || b === undefined) ? -Infinity : b;

  if ([typeof a, typeof b].every(type => type === 'string')) {
    return a.localeCompare(b);
  }

  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }

  return 0;
}

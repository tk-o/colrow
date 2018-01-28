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

export function stringLengthComparator(a, b) {
  try {
    const aStringValue = a.toString();
    const bStringValue = b.toString();

    if (a.length > b.length) {
      return 1;
    } else if (a.length < b.length) {
      return -1;
    }
  } catch (e) {
  }

  return 0;
}

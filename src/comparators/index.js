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
    const aStringLength = a.toString().length;
    const bStringLength = b.toString().length;

    return defaultComparator(aStringLength, bStringLength);
  } catch (e) {
    return 0;
  }
}

export function wordsCountComparator(a, b) {
  try {
    const aWordsCount = a.toString().split(' ').length;
    const bWordsCount = b.toString().split(' ').length;

    return defaultComparator(aWordsCount, bWordsCount);
  } catch (e) {
    return 0;
  }
}

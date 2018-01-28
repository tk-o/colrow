export default function sort({
  comparator,
  direction,
  collection,
  itemKey,
}) {
  const sortedCollection = [...collection].sort((a, b) => {
    const valueA = a[itemKey];
    const valueB = b[itemKey];

    return typeof comparator === 'function'
      ? comparator(valueA, valueB)
      : 0;
  });

  return direction !== SortingDirection.DESC
    ? sortedCollection
    : sortedCollection.reverse();
}

export const SortingDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});

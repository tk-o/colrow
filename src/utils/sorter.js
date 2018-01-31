export default function sort({
  comparator,
  direction,
  collection,
  itemKey,
  valueResolver,
} = {}) {
  if (!Array.isArray(collection)) {
    throw TypeError('Input collection needs to be provied as an array');
  }

  if (typeof comparator !== 'function') {
    return collection;
  }

  const resolveValue = typeof valueResolver === 'function'
    ? valueResolver
    : (item) => item[itemKey];

  const sortedCollection = collection.sort((a, b) =>
    comparator(
      resolveValue(a),
      resolveValue(b)
    )
  );

  return direction !== SortingDirection.DESC
    ? sortedCollection
    : sortedCollection.reverse();
}

export const SortingDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});

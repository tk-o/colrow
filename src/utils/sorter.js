export default function sort({
  comparator,
  direction,
  collection,
}) {
  const sortedCollection = [...collection];

  return direction !== SortingDirection.DESC
    ? sortedCollection
    : sortedCollection.reverse();
}

export const SortingDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});

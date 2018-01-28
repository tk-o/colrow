export default function sort({
  comparator,
  direction,
  collection,
}) {
  return collection;
}

export const SortingDirection = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
});

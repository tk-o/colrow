import always from 'ramda/src/always';
import defaultValueResolver from './valueResolver';

export default function sort({
  comparator,
  collection,
  itemKey,
  direction = null,
  valueResolver: resolveValue = defaultValueResolver,
} = {}) {
  if (!Array.isArray(collection)) {
    throw TypeError('Input collection needs to be provied as an array');
  }

  const isThereNoNeedToSort = typeof comparator !== 'function' || direction === null;

  if (isThereNoNeedToSort) {
    return collection;
  }

  const sortedCollection = collection.sort((a, b) =>
    comparator(
      resolveValue(a, itemKey),
      resolveValue(b, itemKey)
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

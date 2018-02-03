import { always } from 'ramda';
import defaultValueResolver from './valueResolver';

export default function sort({
  comparator,
  direction,
  collection,
  itemKey,
  valueResolver: resolveValue = defaultValueResolver,
} = {}) {
  if (!Array.isArray(collection)) {
    throw TypeError('Input collection needs to be provied as an array');
  }

  if (typeof comparator !== 'function') {
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

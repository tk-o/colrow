import sort, { SortingDirection } from '../sorter';
import { defaultComparator } from '../../comparators';

test('sorter returns collection of the same length as input one', () => {
  const notSortedCollection = [1, 2, 3];
  const sortedCollection = sort({ collection: notSortedCollection });

  expect(Array.isArray(sortedCollection)).toBeTruthy();
  expect(sortedCollection).toHaveLength(notSortedCollection.length);
});

test('sorter returns collection using proper direction', () => {
  const notSortedCollection = [1, 2, 3];

  let sortedCollection = sort({
    collection: notSortedCollection,
    direction: SortingDirection.DESC,
  });

  expect(sortedCollection).toMatchObject(notSortedCollection.reverse());

  sortedCollection = sort({
    collection: notSortedCollection,
    direction: SortingDirection.ASC,
  });

  expect(sortedCollection).toMatchObject(notSortedCollection);
});

test('sorter can sort collection of objects', () => {
  const notSortedCollection = [
    { x: 1, y: 'd', z: 9.87 },
    { x: 2, y: 'a', z: -1.23 },
    { x: 3, y: 'c', z: 0 },
    { x: 4, y: 'b', z: -Infinity },
  ];

  let sortedColumn = sortAndExtractColumn(notSortedCollection, 'x')
  expect(sortedColumn).toMatchObject([1, 2, 3, 4]);

  sortedColumn = sortAndExtractColumn(notSortedCollection, 'y')
  expect(sortedColumn).toMatchObject(['a', 'b', 'c', 'd']);
});

function sortAndExtractColumn(collection, itemKey) {
  return sort({ collection, itemKey, comparator: defaultComparator })
    .map(item => item[itemKey]);
}

import { zipObj } from 'ramda';

import sort, { SortingDirection } from '../sorter';
import { defaultComparator, stringLengthComparator } from '../../comparators';

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
  const {
    notSortedCollection,
    sortedColumnMap,
  } = setupSortData({
      objectKeys: ['x', 'y', 'z']
    });

  Object.entries(sortedColumnMap).forEach(([itemKey, expectedCollection]) => {
    const actualCollection = sortAndExtractColumn({
      collection: notSortedCollection,
      itemKey,
    });

    expect(actualCollection).toMatchObject(expectedCollection);
  });
});

test('sorter can sort collection of arrays', () => {
  const {
    notSortedCollection,
    sortedColumnMap,
  } = setupSortData();

  sortedColumnMap.forEach((expectedCollection, idx) => {
    const actualCollection = sortAndExtractColumn({
      collection: notSortedCollection,
      itemKey: idx,
    });

    expect(actualCollection).toMatchObject(expectedCollection);
  });
});

test('sorter uses custom comparator', () => {
  const {
    notSortedCollection,
    sortedColumnMap,
  } = setupSortData({
      customComparators: [undefined, undefined, stringLengthComparator]
  });

  sortedColumnMap.forEach((expectedCollection, idx) => {
    const actualCollection = sortAndExtractColumn({
      collection: notSortedCollection,
      itemKey: idx,
    });

    expect(actualCollection).toMatchObject(expectedCollection);
  });
});

function sortAndExtractColumn({ collection, itemKey, comparator = defaultComparator }) {
  return sort({ collection, itemKey, comparator })
    .map(item => item[itemKey]);
}

function setupSortData({
  objectKeys = null,
} = {}) {
  const collection = [
    [1, 'd', 9.87],
    [2, 'a', -1.234567],
    [3, 'c', 0],
    [4, 'b', -Infinity],
  ];

  const columnMap = [
    [1, 2, 3, 4],
    ['a', 'b', 'c', 'd'],
    [-Infinity, -1.234567, 0, 9.87],
  ];

  let notSortedCollection;
  let sortedColumnMap;

  if (Array.isArray(objectKeys)) {
    notSortedCollection = collection.map((row) => zipObj(objectKeys, row));
    sortedColumnMap = columnMap.reduce(
      (acc, column, idx) => ({ ...acc, [objectKeys[idx]]: column }),
      {}
    );
  } else {
    notSortedCollection = [...collection];
    sortedColumnMap = [...columnMap];
  }

  return { notSortedCollection, sortedColumnMap };
}

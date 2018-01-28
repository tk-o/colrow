import sort, { SortingDirection } from '../sorter';

test('sorter returns collection of the same length as input one', () => {
  const notSortedArray = [1, 2, 3];
  const sortedArray = sort({ collection: notSortedArray });

  expect(Array.isArray(sortedArray)).toBeTruthy();
  expect(sortedArray).toHaveLength(notSortedArray.length);
});

test('sorter returns collection using proper direction', () => {
  const notSortedArray = [1, 2, 3];

  let sortedArray = sort({
    collection: notSortedArray,
    direction: SortingDirection.DESC,
  });

  expect(sortedArray).toMatchObject(notSortedArray.reverse());

  sortedArray = sort({
    collection: notSortedArray,
    direction: SortingDirection.ASC,
  });

  expect(sortedArray).toMatchObject(notSortedArray);
});

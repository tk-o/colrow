import sort from '../sorter';

test('sorter returns array of the same length as input one', () => {
  const notSortedArray = [1, 2, 3];
  const sortedArray = sort({ collection: notSortedArray });

  expect(Array.isArray(sortedArray)).toBeTruthy()
  expect(sortedArray).toHaveLength(notSortedArray.length);
});

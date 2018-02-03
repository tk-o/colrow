import {
  setup,
  SortingDirection,
  stringLengthComparator,
  wordsCountComparator,
} from './Colrow.main';
import defaultValueResolver from '../../utils/valueResolver';


test('handler returns `sort` action', () => {
  const { sort } = setup();

  expect(typeof sort === 'function').toBeTruthy();
});

test('`sort` action should call `onSorting` and then `onSorted` actions', () => {
  const onSortingSpy = jest.fn();
  const onSortedSpy = jest.fn();

  const { sort } = setup({
    onSorting: onSortingSpy,
    onSorted: onSortedSpy,
  });

  sort({ columnIdx: 0, direction: SortingDirection.ASC });

  expect(onSortingSpy).toHaveBeenCalledTimes(1);
  expect(onSortedSpy).toHaveBeenCalledTimes(1);
  expect(onSortingSpy.mock.timestamps[0]).not.toBeGreaterThan(onSortedSpy.mock.timestamps[0])
});


test('`sort` action should not trigger sorter if sorting data is the same as previous one', () => {
  const onSortedSpy = jest.fn();
  const { sort } = setup({
    onSorted: onSortedSpy,
  });

  sort({ columnIdx: 0, direction: SortingDirection.ASC });
  expect(onSortedSpy).toHaveBeenCalled();
  onSortedSpy.mockClear();

  sort({ columnIdx: 0, direction: SortingDirection.ASC });
  expect(onSortedSpy).not.toHaveBeenCalled();
});

test('`sort` action should change sort direction to the explicit direction when provided', () => {
  const onSortedSpy = jest.fn();
  const { sort } = setup({
    onSorted: onSortedSpy,
  });

  expect.assertions(3);

  sort({ columnIdx: 0, direction: SortingDirection.ASC });
  expect(onSortedSpy).toHaveBeenCalledWith({
    prevSorting: {
      columnIdx: -1,
      direction: null,
    },
    sorting: {
      columnIdx: 0,
      direction: SortingDirection.ASC,
    },
  });
  onSortedSpy.mockClear();

  sort({ columnIdx: 0, direction: SortingDirection.ASC });
  expect(onSortedSpy).not.toHaveBeenCalled();
  onSortedSpy.mockClear();

  sort({ columnIdx: 0, direction: SortingDirection.DESC });
  expect(onSortedSpy).toHaveBeenCalledWith({
    prevSorting: {
      columnIdx: 0,
      direction: SortingDirection.ASC,
    },
    sorting: {
      columnIdx: 0,
      direction: SortingDirection.DESC,
    },
  });
});

test('`sort` action should change sort direction to the opposite on when explicit direction is not provided', () => {
  const onSortedSpy = jest.fn();
  const { sort } = setup({
    onSorted: onSortedSpy,
  });

  expect.assertions(3);

  sort({ columnIdx: 0 });
  expect(onSortedSpy).toHaveBeenLastCalledWith({
    prevSorting: {
      columnIdx: -1,
      direction: null,
    },
    sorting: {
      columnIdx: 0,
      direction: SortingDirection.ASC,
    },
  });

  sort({ columnIdx: 0 });
  expect(onSortedSpy).toHaveBeenLastCalledWith({
    prevSorting: {
      columnIdx: 0,
      direction: SortingDirection.ASC,
    },
    sorting: {
      columnIdx: 0,
      direction: SortingDirection.DESC,
    },
  });

  sort({ columnIdx: 0 });
  expect(onSortedSpy).toHaveBeenLastCalledWith({
    prevSorting: {
      columnIdx: 0,
      direction: SortingDirection.DESC,
    },
    sorting: {
      columnIdx: 0,
      direction: SortingDirection.ASC,
    },
  });
});

test('use custom sorter if defined for the column', () => {
  const columns = [
    { name: 'Column 1' },
    { name: 'Column 2', comparator: stringLengthComparator },
    { name: 'Column 3', comparator: wordsCountComparator },
  ];

  const rows = [
    [1, 'abcdefg',  'a few very short words...'],
    [2, 'a',        'a few very short words to...'],
    [3, 'abcdef',   'a few...'],
    [4, 'abcd',     'a...'],
    [5, 'abc',      'a few very short words to read'],
  ];

  const columnsSorting = [
    [0, SortingDirection.DESC, [5, 4, 3, 2, 1]],
    [1, SortingDirection.ASC, ['a', 'abc', 'abcd', 'abcdef', 'abcdefg']],
    [2, SortingDirection.ASC, ['a...', 'a few...', 'a few very short words...', 'a few very short words to...', 'a few very short words to read']],
  ];

  expect.assertions(columnsSorting.length);

  columnsSorting.forEach(columnSorting => {
    const [columnIdx, direction, expectedSortedColumnState] = columnSorting;
    const { sort, wrapper } = setup({
      columns: [...columns],
      rows: [...rows],
    });

    sort({ columnIdx, direction });

    const sortedColumnState = wrapper.state().rows.map(row => row[columnIdx]);
    expect(sortedColumnState).toMatchObject(expectedSortedColumnState);
  });
});

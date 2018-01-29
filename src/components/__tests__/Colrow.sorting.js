import { setup, SortingDirection } from './Colrow';

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
});

test('`sort` action should change sort direction to the opposite to current one', () => {
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

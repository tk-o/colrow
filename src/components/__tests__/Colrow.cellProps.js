import { setup, SortingDirection } from './Colrow.main';

test('getCellProps returns value revsolver function', () => {
  const { getCellProps } = setup();

  expect(typeof getCellProps).toBe('function');
});

test('getCellProps throws when required arguments missing', () => {
  const { getCellProps } = setup();

  expect(() => getCellProps()).toThrow();
});

test('getCellProps retruns a value given required arguments', () => {
  const { getCellProps } = setup();
  const row = [10];
  const idx = 0;

  expect(() => getCellProps({ idx })).not.toThrow();
});

test('getCellProps retruns a sorting direction indicator when a column is sorting subject', () => {
  const { getCellProps, sort } = setup();
  const row = [10];
  const idx = 0;

  expect.assertions(3);

  expect(
    getCellProps({ row, idx }).sortingDirection
  ).toBeFalsy();

  sort({ columnIdx: idx, direction: SortingDirection.ASC })
  expect(
    getCellProps({ row, idx }).sortingDirection
  ).toBe(SortingDirection.ASC);

  sort({ columnIdx: idx, direction: SortingDirection.DESC })
  expect(
    getCellProps({ row, idx }).sortingDirection
  ).toBe(SortingDirection.DESC);
});


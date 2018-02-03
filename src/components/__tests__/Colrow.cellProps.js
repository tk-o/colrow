import { setup } from './Colrow.main';

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

  expect(() => getCellProps({ row, idx })).not.toThrow();
});


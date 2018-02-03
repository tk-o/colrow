import noop from '../noop';

test('noop is a function', () => {
  const type = typeof noop;
  expect(type).toBe('function');
});

test('noop returns undefined for any arguments', () => {
  const input = ['', 'a', 0, 1.2345, {}, [], NaN, -Infinity, Symbol()];
  const output = input.map(noop);

  output.forEach(value => expect(value).toBeUndefined());
  expect.assertions(input.length);
});

import { noop } from '../';

describe('noop', () => {
  it('is a function', () => {
    const type = typeof noop;
    expect(type).toBe('function');
  });

  it('returns undefined for any arguments', () => {
    const input = ['', 'a', 0, 1.2345, {}, [], NaN, -Infinity, Symbol()];
    const hasReturnedUndefined = input.map(noop)
      .forEach(value => expect(value).toBeUndefined());
    expect.assertions(input.length);
  });
});

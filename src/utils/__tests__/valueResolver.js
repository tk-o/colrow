import valueResolver from '../valueResolver';

test('sorter can use itemKey for both: not-nested and nested properties', () => {
  const nestedProperty = 'x.y.z';
  const notNestedProperty = 'a';
  const object = { x: { y: { z: 97 } }, a: 'text' };

  expect.assertions(2);
  expect(valueResolver(object, nestedProperty)).toEqual(97);
  expect(valueResolver(object, notNestedProperty)).toEqual('text');
});

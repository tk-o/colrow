import * as comparatorsMap from '../index';

function createComparatorTest(comparator) {
  return function assertInput(input) {
    const output = input.sort(comparator);

    expect(output).toMatchSnapshot();
  }
}

function testComparator(assertInput) {
  test('sorting strings', () => {
    assertInput(['bac', 'abcd', 'aecd', '_acd', 'bbc', '', ' ', null, undefined]);
  });

  test('sorting numbers', () => {
    assertInput([1.23, -0.43, 123235235234, -Infinity, +Infinity, 0, -1234322343432, null, undefined]);
  });
}

const comparators = [...Object.values(comparatorsMap)];

comparators
  .map(createComparatorTest)
  .forEach(testComparator);

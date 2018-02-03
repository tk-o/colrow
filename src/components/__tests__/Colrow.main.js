import React from 'react';
import { shallow } from 'enzyme';
import Colrow from '../Colrow';
export { SortingDirection } from '../../utils/sorter';
export * from '../../comparators';

test('Colrow requires at least one column passed via props', () => {
  expect(() => setup({ columns: [] })).toThrow(Error);
  expect(() => setup({ columns: [{}] })).not.toThrow(Error);
});

export function setup({
  render = Colrow.defaultProps.render,
  columns = generateColumnCollection({ maxLength: 1 }),
  ...props
} = {}) {
  const renderSpy = typeof render === 'function' ? jest.fn(render) : render;
  const wrapper = shallow(<Colrow render={renderSpy} columns={columns} {...props} />);
  const renderProps = renderSpy.mock.calls[0][0];

  return { wrapper, renderSpy, ...renderProps };
}

export function getEmptyArrayOf(n) {
  return Array(n).fill();
}

export function getEmptyMatrixOf(m, n) {
  return getEmptyArrayOf(m).map(() => getEmptyArrayOf(n));
}

export function generateCollection({
  length = 10,
  itemFactory = (_, idx) => idx,
} = {}) {
  return getEmptyArrayOf(length).map(itemFactory);
}

export function generateColumnCollection({ ...args } = {}) {
  const itemFactory = (_, idx) => ({
    name: `Column ${idx}`,
  });
  return generateCollection({ ...args, itemFactory })
}

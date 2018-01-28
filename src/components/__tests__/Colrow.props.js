import React from 'react';
import { shallow } from 'enzyme';
import { generateCollection, generateColumnCollection } from './utils';
import Colrow from '../Colrow';

test('component should not throw for valid render prop', () => {
  const validRenderer = () => <div />;
  expect(() => {
    setup({ render: validRenderer })
  }).not.toThrow();
});

test('component should throw for invalid render prop', () => {
  const invalidRenderers = [null, undefined, false, 1, '2', Math.PI, [], 8];

  expect.assertions(invalidRenderers.length);
  invalidRenderers.forEach(invalidRenderer => {
    expect(() => {
      setup({ render: validRenderer })
    }).toThrow();
  });
});

test('render prop handler is being called', () => {
  const { wrapper, renderSpy } = setup();

  expect(renderSpy).toHaveBeenCalled();
});

test('handler returns columns', () => {
  const inputColumns = generateColumnCollection();
  const { columns: outputColumns } = setup({
    columns: inputColumns,
  });

  expect(Array.isArray(outputColumns)).toBeTruthy();
  expect(outputColumns.length).toEqual(inputColumns.length);
});

test('handler returns rows', () => {
  const inputRows = generateCollection();
  const { rows: outputRows } = setup({
    rows: inputRows,
  });

  expect(Array.isArray(outputRows)).toBeTruthy();
  expect(outputRows.length).toEqual(inputRows.length);
});

test('handler returns visible rows', () => {
  const inputRows = generateCollection();
  const {
    visibleRows,
    rows: outputRows,
  } = setup({
    rows: inputRows,
  });

  expect(Array.isArray(visibleRows)).toBeTruthy();
  const areVisibleRowsSubsetOfAllRows = Boolean(visibleRows.length) && visibleRows.every(
    visibleRow => outputRows.includes(visibleRow)
  );
  expect(areVisibleRowsSubsetOfAllRows).toBeTruthy();
});

function setup({
  render = () => <div />,
  columns = generateColumnCollection({ maxLength: 1 }),
  ...props,
} = {}) {
  let renderProps;
  const renderSpy = jest.fn(renderArgs => {
    renderProps = renderArgs
    return render(renderProps);
  });
  const wrapper = shallow(<Colrow render={renderSpy} columns={columns} {...props} />);

  return { wrapper, renderSpy, ...renderProps };
}

import React from 'react';
import { shallow } from 'enzyme';
import { generateCollection, generateColumnCollection } from './utils';
import Colrow, { SortingDirection } from '../Colrow';

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
  expect(outputColumns).toHaveLength(inputColumns.length);
});

test('handler returns rows', () => {
  const inputRows = generateCollection();
  const { rows: outputRows } = setup({
    rows: inputRows,
  });

  expect(Array.isArray(outputRows)).toBeTruthy();
  expect(outputRows).toHaveLength(inputRows.length);
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

test('handler returns `sort` action', () => {
  const {
    renderSpy,
    sort,
  } = setup();

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

function setup({
  render = () => <div />,
  columns = generateColumnCollection({ maxLength: 1 }),
  ...props,
} = {}) {
  const renderSpy = jest.fn(render);
  const wrapper = shallow(<Colrow render={renderSpy} columns={columns} {...props} />);
  const renderProps = renderSpy.mock.calls[0][0];

  return { wrapper, renderSpy, ...renderProps };
}

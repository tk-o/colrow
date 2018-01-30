import React from 'react';
import Colrow, { setup, generateCollection, generateColumnCollection } from './Colrow';

test('component should not throw for valid render prop', () => {
  const validRenderer = () => <div />;
  const { renderSpy } = setup({ render: validRenderer });

  expect(renderSpy).not.toThrow();
});

test('component should throw for invalid render prop', () => {
  const invalidRenderers = [null, false, 1, '2', Math.PI, [], 8];
  const consoleErrorSpy = jest.spyOn(console, 'error')
    .mockImplementation(() => {});

  expect.assertions(invalidRenderers.length + 1);
  invalidRenderers.forEach(invalidRenderer => {
    expect(() => {
      setup({ render: invalidRenderer })
    }).toThrow(TypeError);
  });
  expect(consoleErrorSpy).toHaveBeenCalled();
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

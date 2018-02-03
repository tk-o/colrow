import { generateCollection, setup } from './Colrow.main';

test('it displays unlimited number of rows by default', () => {
  const rowsTotal = 100;
  const inputRows = generateCollection({ length: rowsTotal });
  const { visibleRows, rows } = setup({ rows: inputRows });

  expect(visibleRows).toHaveLength(rowsTotal);
  expect(visibleRows).toMatchObject(rows);
});

test('it can display a limited number of rows', () => {
  const rowsTotal = 100;
  const rowsToDisplay = 10;
  const inputRows = generateCollection({ length: rowsTotal });
  const { visibleRows, rows } = setup({
    rows: inputRows,
    pageSize: rowsToDisplay,
  });

  expect(rows).toEqual(expect.arrayContaining(visibleRows));
  expect(visibleRows).toHaveLength(rowsToDisplay);
});

test('it can display required portion of rows', () => {
  const rowsTotal = 100;
  const rowsToDisplay = 10;
  const pageNo = 3;
  const inputRows = generateCollection({ length: rowsTotal });
  const expectedStartIdx = (pageNo - 1) * rowsToDisplay;
  const expectedCollection = inputRows.slice(expectedStartIdx, expectedStartIdx + rowsToDisplay)
  const { visibleRows, rows } = setup({
    pageNo,
    rows: inputRows,
    pageSize: rowsToDisplay,
  });

  expect(visibleRows).toMatchObject(expectedCollection);
});

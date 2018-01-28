import React from 'react';
import { render } from 'react-dom';
import Colrow, { Cell } from './components/Colrow';

const someRows = [
  [1, 2, 3, 4, 5],
  [0, 9, 8, 7, 6],
];

const ColrowTable = () => (
  <Colrow rows={someRows}>
    {(rows) => rows.map((row, idx) => (
      <Cell isHeading={true}>Lol </Cell>
    ))}
  </Colrow>
);

const CustomTable = () => (
  <Colrow render={TableLike} rows={someRows} />
);

function TableLike({ rows, columns }) {
  return (
    <section className="table-like">
      {rows.map((row, idx) => (
        <RowLike row={row} key={idx} />
      ))}
    </section>
  );
}

function RowLike({ row: columns }) {
  return (
    <article className="row-like">
      {columns.map((column, idx) => (
        <CellLike column={column} key={idx} />
      ))}
    </article>
  )
}

function CellLike({ column }) {
  return (
    <div className="cell-like">{column}</div>
  )
}

const rootNode = document.getElementById('root');
render([<ColrowTable />, <CustomTable />], rootNode);

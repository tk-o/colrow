import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import unnest from 'ramda/src/unnest';

import Colrow, { SortingDirection } from '../lib/colrow.umd';

class App extends Component {
  renderList() {
    const { columns, rows } = this.props;

    return (
      <aside>
        <header>
          <strong>List example (without <i>Symbol</i> column)</strong>
        </header>
        <Colrow columns={columns}
          rows={rows}
          render={renderList}
        />
      </aside>
    )
  }

  renderTable() {
    const { columns, rows } = this.props;
    return (
      <aside>
        <header>
          <strong>Table example (all columns)</strong>
        </header>
        <Colrow columns={columns}
          rows={rows}
          render={renderTable}
        />
      </aside>
    )
  }

  render() {
    return (
      <section>
        {this.renderList()}
        {this.renderTable()}
      </section>
    )
  }
}
const props = {
  columns: getColumns(),
  rows: getRows(),
};

const rootNode = document.getElementById('root');
render(<App {...props} />, rootNode);

function renderList({ sort, rows, visibleRows, columns, getCellProps }) {
  const sortData = (event) => {
    const [idx, direction] = event.target.value.split(':');
    sort({ columnIdx: idx, direction });
  };

  const columnsWithoutSymbol = columns.filter(column => column.name !== 'Sybmol');

  const sortableColumns = unnest(
    columnsWithoutSymbol.map((column, idx) =>
      [[SortingDirection.ASC, idx, column], [SortingDirection.DESC, idx, column]]
    )
  );

  return (
    <Fragment>
      <label htmlFor="sortListBy">
        Sort list by
      </label>
      <select id="sortListBy" onChange={sortData}>
        <option value="-1:null">None</option>
        {sortableColumns.map(([sortingDirection, columnIdx, { name }], idx) => (
          <option value={`${columnIdx}:${sortingDirection}`} key={idx} onClick={sortData}>{name} ({sortingDirection})</option>
        ))}
      </select>
      <ol>
        {visibleRows.map((row, idx) => (
          <li key={idx}>
            <dl>
              {columns.map((column, idx) => {
                const { value, sortingDirection } = getCellProps({ row, column, idx });
                const { name } = column;
                return (
                  <Fragment key={idx}>
                    <dt data-sorting={sortingDirection}>{name}</dt>
                    <dd>{value}</dd>
                  </Fragment>
                )
              })}
            </dl>
          </li>
        ))}
      </ol>
    </Fragment>
  )
}

function renderTable({ sort, rows, visibleRows, columns, getCellProps }) {
  const sortData = (idx) => () => sort({ columnIdx: idx });
  const unsort = () => sort({ columnIdx: -1 });
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ name }, idx) => {
            const { sortingDirection } = getCellProps({ idx });
            return (
              <th key={idx}
                onClick={sortData(idx)}
                data-sorting={sortingDirection}
              >{name}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {visibleRows.map((row, idx) => (
          <tr key={idx}>
            {columns.map((column, idx) => {
              const { value } = getCellProps({ row, column, idx });
              return (
                <td key={idx}>{value}</td>
              )
            })}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button onClick={unsort}>Unsort table</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

function getColumns() {
  return [
    {
      itemKey: 'rank',
      name: 'Rank',
      valueResolver(item, itemKey) {
        return parseInt(item[itemKey], 10);
      },
    },
    { itemKey: 'symbol', name: 'Sybmol' },
    { itemKey: 'name', name: 'Name' },
    {
      itemKey: 'price_usd',
      name: 'Price (USD)',
      valueResolver(item, itemKey) {
        return parseFloat(item[itemKey]);
      },
    },
  ];
}

function getRows() {
  return [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', rank: '1', price_usd: '8385.16' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', rank: '2', price_usd: '883.953' },
    { id: 'ripple', name: 'Ripple', symbol: 'XRP', rank: '3', price_usd: '0.745409' },
    { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH', rank: '4', price_usd: '1135.81' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', rank: '5', price_usd: '0.312246' },
    { id: 'neo', name: 'NEO', symbol: 'NEO', rank: '6', price_usd: '103.823' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', rank: '7', price_usd: '122.262' },
    { id: 'stellar', name: 'Stellar', symbol: 'XLM', rank: '8', price_usd: '0.347072' },
    { id: 'eos', name: 'EOS', symbol: 'EOS', rank: '9', price_usd: '8.26931' },
    { id: 'nem', name: 'NEM', symbol: 'XEM', rank: '10', price_usd: '0.509215' },
  ];
}

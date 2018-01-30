import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pipe, curry } from 'ramda';

import { defaultComparator } from '../comparators';
import noop from '../utils/noop';
import sort, { SortingDirection } from '../utils/sorter';

export default class Colrow extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.any,
    ),
    render: PropTypes.func,
    comparator: PropTypes.func,
    sortingColumnIdx: PropTypes.number,
    sortingColumnDirection: PropTypes.oneOf(
      [SortingDirection.ASC, SortingDirection.DESC]
    ),
    onSorting: PropTypes.func,
    onSorted: PropTypes.func,
    onLoading: PropTypes.func,
    onLoaded: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    rows: [],
    render: DefaultRenderer,
    comparator: defaultComparator,
    sortByColumnIdx: -1,
    sortDirection: null,
    onSorting: noop,
    onSorted: noop,
    onLoading: noop,
    onLoaded: noop,
    isLoading: false,
  }

  state = {
    visibleRows: this.props.rows,
    rows: this.props.rows,
    columns: this.props.columns,
    sorting: {
      columnIdx: this.props.sortByColumnIdx,
      direction: this.props.sortDirection,
    },
  }

  componentDidMount() {
    if (this.state.columns.length === 0) {
      throw Error('At least one column definition must be provided');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkLoadingState(this.props.isLoading, nextProps.isLoading);
  }

  render() {
    const { render, ...props = {} } = this.props;

    if (typeof render !== 'function') {
      throw TypeError('`render` prop should be a React component factory');
    }

    return render(this.getTableProps());
  }

  getTableProps = () => {
    const {
      state,
      sort,
    } = this;
    const {
      rows,
      columns,
      visibleRows,
    } = state;

    const actions = {
      sort,
    };
    const stateItems = {
      rows,
      visibleRows,
      columns,
    };

    const tableProps = {
      ...actions,
      ...stateItems,
    };

    return tableProps;
  }

  sort = ({ columnIdx = -1, direction = null }) => {
    const beforeSort = pipe(
      this.onSorting,
      this.props.onSorting,
    );

    const afterSort = pipe(
      this.onSorted,
      this.props.onSorted,
    );

    const { sorting, columns } = this.state;
    const { comparator: tableComparator, rows: collection } = this.props;
    const columnToSort = columns[columnIdx];
    const comparator = columnToSort.comparator || tableComparator;
    const itemKey = columnToSort.itemKey || columnIdx;
    const opositDirection = sorting.direction !== SortingDirection.ASC
      ? SortingDirection.ASC
      : SortingDirection.DESC;

    const nextSorting = {
      columnIdx,
      direction: direction != null
        ? direction
        : opositDirection,
    };

    beforeSort({ sorting, nextSorting });

    const sortedRows = sort({
      collection,
      itemKey,
      comparator,
      direction,
    });

    this.setState(() => ({
      sorting: nextSorting,
      rows: sortedRows,
    }), () => {
      afterSort({ prevSorting: sorting, sorting: nextSorting });
    });
  }

  onSorting = (sortingState) => {
    const { sorting, nextSorting } = sortingState;

    return sortingState;
  }

  onSorted = (sortingState) => {
    const { prevSorting, sorting } = sortingState;

    return sortingState;
  }

  checkLoadingState = (prevIsLoading, nextIsLoading) => {
    const hasToggledLogging = prevIsLoading !== nextIsLoading;

    if (hasToggledLogging) {
      if (nextIsLoading) {
        this.onLoading();
      } else {
        this.onLoaded();
      }
    }
  }

  onLoading = () => {
    this.props.onLoading();
  }

  onLoaded = () => {
    this.props.onLoaded();
  }
}

function DefaultRenderer(params) {
  return <div />
}

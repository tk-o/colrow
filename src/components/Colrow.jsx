import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pipe, curry } from 'ramda';

import { defaultComparator } from '../comparators';
import noop from '../utils/noop';
import sorter, { SortingDirection } from '../utils/sorter';

export default class Colrow extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.any,
    ),
    sortingColumnIdx: PropTypes.number,
    sortingColumnDirection: PropTypes.oneOf(
      [SortingDirection.ASC, SortingDirection.DESC]
    ),
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    render: DefaultRenderer,
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

  componentWillReceiveProps(nextProps) {
    const { isLoading } = this.props;
    const hasToggledLogging = isLoading !== nextProps.isLoading;

    if (hasToggledLogging) {
      if (nextProps.isLoading) {
        this.onLoading();
      } else {
        this.onLoaded();
      }
    }
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

    const sorting = { ...this.state.sorting };
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

    // real sorting part
    this.setState(() => ({
      sorting: nextSorting,
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

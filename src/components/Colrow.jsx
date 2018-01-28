import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pipe } from 'ramda';

import { defaultComparator } from '../comparators';
import { noop } from '../utils';

export default class Colrow extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    rows: PropTypes.arrayOf(
      PropTypes.any,
    ),
  }

  static defaultProps = {
    render: DefaultRenderer,
  }

  state = {
    visibleRows: this.props.rows,
    rows: this.props.rows,
    columns: this.props.columns,
  }

  render() {
    const { render, ...props = {} } = this.props;

    if (typeof render !== 'function') {
      throw new Error('`render` prop should be a React component factory');
    }

    return render(this.getTableProps());
  }

  getTableProps = () => {
    const {
      state,
    } = this;
    const {
      rows,
      columns,
      visibleRows,
    } = state;

    const propsGetters = {
    };
    const stateItems = {
      rows,
      visibleRows,
      columns,
    };

    const tableProps = {
      ...propsGetters,
      ...stateItems,
    };

    return tableProps;
  }
}

function DefaultRenderer(params) {
  return <div />
}

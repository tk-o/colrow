# Colrow
Simple toolset to build super-powered table components in React 🗓

[![CircleCI](https://img.shields.io/circleci/project/github/kopacki/colrow.svg?style=flat-square)](https://circleci.com/gh/kopacki/colrow)
[![Coveralls github](https://img.shields.io/coveralls/github/kopacki/colrow.svg?style=flat-square)](https://circleci.com/gh/kopacki/colrow)

> This project has been inspired by [downshift](https://github.com/paypal/downshift) project and [Advanced React Component Patterns](https://egghead.io/courses/advanced-react-component-patterns) online course. [Kent C. Dodds](https://kentcdodds.com/) thanks for creating these!

## Problem
Recently I faced this situation when you are supposed to deliver something for yesterday. I had to create a few similar components to present the same collection, however each single one in unique way:
- table
- carousel
- definition list

Of course all of these variations required sorting feature.

I couldn't find any existing library which already addresses that kind of problem. Therefore I wrote it all myself.

## Solution
As I mentioned, my inspiration was [downshift](https://github.com/paypal/downshift) project. Once I looked at its code I already knew I would like to use [render props pattern](https://reactjs.org/docs/render-props.html) for my project. This very pattern allows to easily decouple JSX syntax from the logic. This is really powerful, as you have full flexibility on how you structure your template while the logic remain the same and is at hand when needed.

## Demo
I prepared small demo that presents what I wrote about above. Two templates - totally different. One logic available via set of primitives. That's it. It works. Please, have a glance 🙃:

[![Edit colrow](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5w7om43qqp?view=preview)

### Features
- [x] displays columns
- [x] displays rows
- [x] sorts collection by given column
- [x] sorting reset
- [x] custom value resolver for cell - provide raw value for sorting
- [ ] custom value presenter for cell - provide decorated value for presentation
- [ ] pagination features
- [ ] loading state
- [ ] predefined table components
- [ ] storybook

### Installation
> This project's _peerDependencies_ require `react` and `prop-types` packages to be available.
```
yarn add colrow
```

### Usage
```jsx
import Colrow, { SortingDirection } from 'colrow';
//
// define props (please glance at "Prop definitions" section below
//
// Colrow instance somewhere in your app
<Colrow columns={columns}
  rows={rows}
  render={render}
  comparator={comparator}
  sortByColumnIdx={sortByColumnIdx}
  sortDirection={sortDirection}
  onSorting={onSorting}
  onSorted={onSorted}
/>
```
#### Prop definitions

**columns**
>This one is required to be an array and contains at least one object (as we're about to present some data ;))
>You can define any properties within `columnItem`, so feel free to put there whatever you'd need to present.
>One important thing about `columnItem` is you can enhance it with `itemKey` and `valueResolver` properties.
>Please have a look at the explanation beneath.
```jsx
const columnItem1 = {
  itemKey: 'x.y.z',
  // default `valueResolver` will evaluate 'x.y.z' string and extract value from a particular row object
  // for row object `{ x: { y: { z: 1 } } } the cell will have value `1`
};

const columnItem2 = {
  valueResolver(currentRow, itemKey) {
    return (
      <button onClick={doSomethingWithCurrentRowData(currentRow)}>
        Button in column no. {itemKey}
      </button>
    );
  }
  // default `itemKey` is 0-based index of columnItem that indicates its position in `columns` array
};

const columnItem3 = {
  valueResolver(currentRow, itemKey) {
    const someRowPropertyValue = currentRow[itemKey];
    const { link, label } = someRowPropertyValue;
    return (
      <a href={link}>{label}</a>
    );
  },
  itemKey: 'someRowPropertyName',
  // for row object
  // { someRowPropertyName: { link: 'https://twitter.com/tomasz_kopacki', label: 'Follow Tomasz on Twitter' } }
  // it'll display the following contents inside the cell
  // <a href="https://twitter.com/tomasz_kopacki">Follow Tomasz on Twitter</a>
  
};

const columns = [
  columnItem1,
  columnItem2,
  columnItem3,
];
```

**rows**
>This one is should be an array (either of nested arrays or plain objects). And that's all :) Of course it'd be better for rows array not being empty, as again, we'd like to present some data.

_rows as array of arrays_
```jsx
const rows = [
  ['Bitcoin', 'BTC', '1234.98'],
  ['Litecoin', 'LTC', '321.03'],
  ['Ripple', 'XRP', '2.12'],
];
const columnsExample = [
  { label: 'Name'},
  { label: 'Symbol' },
  {
    label: 'Price',
    valueResolver(row, itemKey) {
      const stringPrice = row[itemKey]; // row[itemKey] is equal to row[2]
      return parseFloat(stringPrice); // we want a numeric value for `Price` (especially for sorting)
    }
  },
];
```
_rows as array of plain objects_
```jsx
// nested arrays
const rows = [
  [{ texts: ['Bitcoin', 'BTC'], { numbers: { price: 1234.98 } },
  [{ texts: ['Litecoin', 'LTC'], { numbers: { price: 321.03 } },
  [{ texts: ['Ripple', 'XRP'], { numbers: { price: 2.12 } },
];
const columnsExample = [
  {
    label: 'Name',
    itemKey: 'texts',
    valueResolver(row, itemKey) {
      const texts = row[itemKey]
      const coinName = texts[0];
      return coinName;
    }
  },
  {
    label: 'Symbol',
    valueResolver(row) {
      const coinSymbol = row.texts[1];
      return coinSymbol;
    }
  },
  {
    label: 'Price',
    valueResolver(row, itemKey) {
      return parseFloat(row[itemKey]); // we want a numeric value for `Price`
    }
    itemKey: 'numbers.price',
  },
];
```
### License
MIT

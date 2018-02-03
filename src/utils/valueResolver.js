import { path } from 'ramda';

export default function defaultValueResolver(item, itemKey) {
  const itemKeyWrapped = typeof itemKey === 'string'
    ? itemKey.split('.')
    : [itemKey];
  const value = path(itemKeyWrapped, item);

  return value;
}

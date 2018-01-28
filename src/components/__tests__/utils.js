test(() => assert.always());

export function getEmptyArrayOf(n) {
  return Array(n).fill();
}

export function getEmptyMatrixOf(m, n) {
  return getEmptyArrayOf(m).map(_ => getEmptyArrayOf(n));
}

export function generateCollection({
  length,
  maxLength = 10,
  itemFactory = (_, idx) => idx,
} = {}) {
  const collectionLength = length != null
    ? length
    : Math.ceil(Math.random() * maxLength) + 1;

  return getEmptyArrayOf(collectionLength).map(itemFactory);
}

export function generateColumnCollection({ ...args } = {}) {
  const itemFactory = (_, idx) => ({
    name: `Column ${idx}`,
  });
  return generateCollection({ ...args, itemFactory })
}

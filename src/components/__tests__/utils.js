test(() => assert.always());

export function getEmptyArrayOf(n) {
  return Array(n).fill();
}

export function getEmptyMatrixOf(m, n) {
  return getEmptyArrayOf(m).map(_ => getEmptyArrayOf(n));
}

export function generateCollection({
  length = 10,
  itemFactory = (_, idx) => idx,
} = {}) {
  return getEmptyArrayOf(length).map(itemFactory);
}

export function generateColumnCollection({ ...args } = {}) {
  const itemFactory = (_, idx) => ({
    name: `Column ${idx}`,
  });
  return generateCollection({ ...args, itemFactory })
}

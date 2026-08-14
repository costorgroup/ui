export const getNextListIndex = (
  current: number,
  delta: number,
  count: number,
) => {
  if (count <= 0) {
    return -1;
  }

  if (current < 0) {
    return delta > 0 ? 0 : count - 1;
  }

  return (current + delta + count) % count;
};

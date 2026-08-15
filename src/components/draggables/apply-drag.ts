import { TDropResult } from './types';

export const applyDrag = <Item,>(
  list: Item[],
  result: TDropResult,
): Item[] => {
  const { removedIndex, addedIndex, payload } = result;

  if (removedIndex === null && addedIndex === null) {
    return list;
  }

  const next = [...list];
  let item = payload as Item;

  if (removedIndex !== null) {
    [item] = next.splice(removedIndex, 1);
  }

  if (addedIndex !== null) {
    next.splice(addedIndex, 0, item);
  }

  return next;
};

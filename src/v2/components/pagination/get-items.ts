import {
  TPaginationItemData,
  TPaginationItemType,
} from './types';

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => start + index);
};

type TGetPaginationItemsOptions = {
  count: number;
  page: number;
  disabled?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
};

export const getPaginationItems = ({
  count,
  page,
  disabled = false,
  hidePrevButton = false,
  hideNextButton = false,
  showFirstButton = false,
  showLastButton = false,
  siblingCount = 1,
  boundaryCount = 1,
}: TGetPaginationItemsOptions): TPaginationItemData[] => {
  const safeCount = Math.max(0, Math.floor(count));
  const safePage = Math.min(Math.max(1, page), Math.max(1, safeCount));

  const startPages = range(1, Math.min(boundaryCount, safeCount));
  const endPages = range(
    Math.max(safeCount - boundaryCount + 1, boundaryCount + 1),
    safeCount,
  );

  const siblingsStart = Math.max(
    Math.min(
      safePage - siblingCount,
      safeCount - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      safePage + siblingCount,
      boundaryCount + siblingCount * 2 + 2,
    ),
    endPages.length > 0 ? endPages[0] - 2 : safeCount - 1,
  );

  const itemList: Array<TPaginationItemType | number> = [
    ...(showFirstButton ? (['first'] as const) : []),
    ...(hidePrevButton ? [] : (['previous'] as const)),
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['start-ellipsis'] as const)
      : boundaryCount + 1 < safeCount - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < safeCount - boundaryCount - 1
      ? (['end-ellipsis'] as const)
      : safeCount - boundaryCount > boundaryCount
        ? [safeCount - boundaryCount]
        : []),
    ...endPages,
    ...(hideNextButton ? [] : (['next'] as const)),
    ...(showLastButton ? (['last'] as const) : []),
  ];

  const buttonPage = (type: TPaginationItemType): number | null => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return safePage - 1;
      case 'next':
        return safePage + 1;
      case 'last':
        return safeCount;
      default:
        return null;
    }
  };

  return itemList.map((item) => {
    if (typeof item === 'number') {
      return {
        type: 'page',
        page: item,
        selected: item === safePage,
        disabled,
      };
    }

    const targetPage = buttonPage(item);

    return {
      type: item,
      page: targetPage,
      selected: false,
      disabled:
        disabled ||
        targetPage === null ||
        item === 'start-ellipsis' ||
        item === 'end-ellipsis' ||
        (item === 'next' || item === 'last'
          ? safePage >= safeCount
          : safePage <= 1),
    };
  });
};

export const defaultGetItemAriaLabel = (
  type: TPaginationItemType,
  page: number,
  selected: boolean,
) => {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }

  return `Go to ${type} page`;
};

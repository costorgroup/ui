import { HTMLAttributes, ReactNode, Ref } from 'react';

export type TFlipbookHandle = {
  next: () => void;
  prev: () => void;
  goTo: (page: number) => void;
  getPage: () => number;
  getPageCount: () => number;
};

export type TFlipbookBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> & {
  children?: ReactNode;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  width?: number | string;
  height?: number | string;
  flippingTime?: number;
  showControls?: boolean;
  showCover?: boolean;
  flipbookRef?: Ref<TFlipbookHandle>;
};

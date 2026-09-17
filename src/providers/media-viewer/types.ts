import { ReactNode } from 'react';
import { TMediaViewerItem } from '../../components/media-viewer/types';

export type TMediaViewerContextValue = {
  open: (items: TMediaViewerItem[], index?: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  setIndex: (index: number) => void;
  items: TMediaViewerItem[];
  index: number;
  active: TMediaViewerItem | null;
  isOpen: boolean;
};

export type TMediaViewerProviderProps = {
  children?: ReactNode;
};

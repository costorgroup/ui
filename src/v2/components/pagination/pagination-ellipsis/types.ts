import { HTMLAttributes } from 'react';
import type { TButtonSize } from '../../button/types';

export type TPaginationEllipsisProps = HTMLAttributes<HTMLSpanElement> & {
  size?: TButtonSize;
};

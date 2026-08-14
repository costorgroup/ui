import { HTMLAttributes } from 'react';
import { TButtonSize } from '../../button/types';

export type TPaginationEllipsisProps = HTMLAttributes<HTMLSpanElement> & {
  size?: TButtonSize;
};

import { HTMLAttributes, ReactNode } from 'react';
import type { TAlertAlign } from '../alert-base/types';

export type TAlertActionsProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Horizontal when AlertBody places actions at the `bottom` (default
   * `end`, i.e. right); vertical when placed at the `end` (default
   * `center`). */
  align?: TAlertAlign;
};

export type TSAlertActionsProps = {
  align?: TAlertAlign;
};

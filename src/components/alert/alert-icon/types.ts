import { HTMLAttributes, ReactNode } from 'react';
import type { TAlertAlign } from '../alert-base/types';

export type TAlertIconProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
  /** Vertical alignment against the body (message + actions). */
  align?: TAlertAlign;
};

export type TSAlertIconProps = {
  align: TAlertAlign;
};

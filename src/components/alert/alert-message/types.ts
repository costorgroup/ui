import { HTMLAttributes, ReactNode } from 'react';

/** Wraps AlertTitle + AlertContent so they move as one block next to or
 * above AlertActions. */
export type TAlertMessageProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

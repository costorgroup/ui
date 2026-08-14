import { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export type TTableCellAs = 'td' | 'th';

export type TTableCellAlign = 'left' | 'center' | 'right' | 'justify';

export type TTableCellProps = Omit<
  HTMLAttributes<HTMLTableCellElement>,
  'color' | 'children' | 'align'
> &
  Pick<TdHTMLAttributes<HTMLTableCellElement>, 'colSpan' | 'rowSpan'> &
  Pick<ThHTMLAttributes<HTMLTableCellElement>, 'scope'> & {
    children?: ReactNode;
    as?: TTableCellAs;
    align?: TTableCellAlign;
  };

export type TSTableCellProps = {
  align: TTableCellAlign;
};

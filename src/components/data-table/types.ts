import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TPanelElevation, TPanelRadius, TPanelVariant } from '../panel/types';
import type { TTableSize } from '../table/table-root/context';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TCardHeaderProps } from '../card/card-header/types';
import type { TCardTitleProps } from '../card/card-title/types';
import type { TCardDescriptionProps } from '../card/card-description/types';
import type { TCardActionProps } from '../card/card-action/types';
import type { TCardContentProps } from '../card/card-content/types';
import type { TCardFooterProps } from '../card/card-footer/types';
import type { TTextFieldProps } from '../text-field/types';
import type { TTableProps } from '../table/table-root/types';
import type { TTableHeadProps } from '../table/table-head/types';
import type { TTableBodyProps } from '../table/table-body/types';
import type { TTableRowProps } from '../table/table-row/types';
import type { TTableCellProps } from '../table/table-cell/types';
import type { TPaginationProps } from '../pagination/types';

export type TDataTableVariant = TPanelVariant;

export type TDataTableRow = Record<string, unknown> & {
  id?: string | number;
};

export type TDataTableRenderCellParams<T extends TDataTableRow = TDataTableRow> =
  {
    value: unknown;
    row: T;
    column: TDataTableColumn<T>;
    rowIndex: number;
    columnIndex: number;
    data: T[];
  };

export type TDataTableColumn<T extends TDataTableRow = TDataTableRow> = {
  id: string | number;
  key: string;
  name: string;
  renderCell?: (params: TDataTableRenderCellParams<T>) => ReactNode;
};

export type TDataTableSlotProps = TSlotProps<{
  header: TCardHeaderProps;
  title: TCardTitleProps;
  description: TCardDescriptionProps;
  action: TCardActionProps;
  search: TTextFieldProps;
  content: TCardContentProps;
  table: TTableProps;
  tableHead: TTableHeadProps;
  headRow: TTableRowProps;
  headCell: TTableCellProps;
  tableBody: TTableBodyProps;
  row: TTableRowProps;
  cell: TTableCellProps;
  footer: TCardFooterProps;
  pagination: TPaginationProps;
}>;

export type TDataTableProps<T extends TDataTableRow = TDataTableRow> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'title' | 'children'
> & {
  columns: TDataTableColumn<T>[];
  data: T[];
  title?: ReactNode;
  description?: ReactNode;
  color?: TPaletteColor;
  variant?: TDataTableVariant;
  elevation?: TPanelElevation;
  radius?: TPanelRadius;
  size?: TTableSize;
  pageSize?: number;
  searchPlaceholder?: string;
  search?: string;
  defaultSearch?: string;
  onSearchChange?: (value: string) => void;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  getRowId?: (row: T, index: number) => string | number;
  slotProps?: TDataTableSlotProps;
};

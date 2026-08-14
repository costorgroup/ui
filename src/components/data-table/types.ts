import { HTMLAttributes, ReactNode } from 'react';
import { TTableSize } from '../table/table-base/context';
import { TPaletteColor } from '../../theme/types';

export type TDataTableVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

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
};

export type TSDataTableProps = {
  color: TPaletteColor;
  variant: TDataTableVariant;
};

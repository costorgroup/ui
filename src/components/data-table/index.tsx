import React, { ChangeEvent, forwardRef, useEffect, useMemo, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { SearchIcon } from '../../icons';
import { Card } from '../card';
import { CardAction } from '../card/card-action';
import { CardContent } from '../card/card-content';
import { CardDescription } from '../card/card-description';
import { CardHeader } from '../card/card-header';
import { CardTitle } from '../card/card-title';
import type { TCardSize } from '../card/types';
import { Pagination } from '../pagination';
import { Table } from '../table/table-root';
import { TableBody } from '../table/table-body';
import { TableCell } from '../table/table-cell';
import { TableHead } from '../table/table-head';
import { TableRow } from '../table/table-row';
import type { TTableSize } from '../table/table-root/context';
import { Text } from '../text';
import { TextField } from '../text-field';
import { dataTableClasses } from './classes';
import { SDataTableBox, SDataTableFooter, SDataTableScroll } from './styles';
import {
  TDataTableProps,
  TDataTableRenderCellParams,
  TDataTableRow,
} from './types';

const CARD_SIZE_BY_TABLE_SIZE: Record<TTableSize, TCardSize> = {
  xs: 'sm',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'lg',
};

const getCellValue = <T extends TDataTableRow>(row: T, key: string) => {
  if (Object.prototype.hasOwnProperty.call(row, key)) {
    return row[key];
  }

  return undefined;
};

const stringifyValue = (value: unknown) => {
  if (value == null) {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
};

const defaultRenderCell = <T extends TDataTableRow>(
  params: TDataTableRenderCellParams<T>,
) => stringifyValue(params.value);

type TDataTableComponent = <T extends TDataTableRow>(
  props: TDataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

const DataTableInner = <T extends TDataTableRow>(
  {
    columns,
    data,
    title,
    description,
    color = 'default',
    variant = 'surface',
    elevation = 1,
    radius = 'xl',
    size = 'md',
    pageSize = 10,
    searchPlaceholder = 'Search…',
    search: searchProp,
    defaultSearch = '',
    onSearchChange,
    page: pageProp,
    defaultPage = 1,
    onPageChange,
    getRowId,
    className,
    ...props
  }: TDataTableProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const isSearchControlled = searchProp !== undefined;
  const isPageControlled = pageProp !== undefined;
  const [uncontrolledSearch, setUncontrolledSearch] = useState(defaultSearch);
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);

  const search = isSearchControlled ? searchProp : uncontrolledSearch;
  const page = isPageControlled ? Number(pageProp) : uncontrolledPage;

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((row) =>
      columns.some((column) =>
        stringifyValue(getCellValue(row, column.key))
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [columns, data, search]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize) || 1);
  const currentPage = Math.min(Math.max(page, 1), pageCount);

  useEffect(() => {
    if (!isPageControlled && page !== currentPage) {
      setUncontrolledPage(currentPage);
    }
  }, [currentPage, isPageControlled, page]);

  const startIndex = (currentPage - 1) * pageSize;
  const pageRows = filteredData.slice(startIndex, startIndex + pageSize);
  const from = filteredData.length === 0 ? 0 : startIndex + 1;
  const to = Math.min(startIndex + pageSize, filteredData.length);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;

    if (!isSearchControlled) {
      setUncontrolledSearch(next);
      setUncontrolledPage(1);
    }

    onSearchChange?.(next);

    if (isPageControlled) {
      onPageChange?.(1);
    }
  };

  const handlePageChange = (_event: unknown, nextPage: number) => {
    if (!isPageControlled) {
      setUncontrolledPage(nextPage);
    }

    onPageChange?.(nextPage);
  };

  return (
    <Card
      ref={ref}
      variant={variant}
      elevation={elevation}
      radius={radius}
      size={CARD_SIZE_BY_TABLE_SIZE[size]}
      {...props}
      className={mergeClasses(dataTableClasses.root, className)}
    >
      <CardHeader>
        {title != null ? <CardTitle>{title}</CardTitle> : null}
        {description != null ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
        <CardAction>
          <TextField
            fullWidth
            size="sm"
            color={color}
            variant="surface"
            startIcon={<SearchIcon />}
            placeholder={searchPlaceholder}
            value={search}
            onChange={handleSearchChange}
            aria-label={searchPlaceholder}
            className={dataTableClasses.search}
          />
        </CardAction>
      </CardHeader>

      <CardContent>
        <SDataTableBox>
          <SDataTableScroll>
            <Table size={size} color={color}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {pageRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Math.max(columns.length, 1)}>
                      No matching entries
                    </TableCell>
                  </TableRow>
                ) : (
                  pageRows.map((row, rowIndex) => {
                    const absoluteIndex = startIndex + rowIndex;
                    const rowKey =
                      getRowId?.(row, absoluteIndex) ?? row.id ?? absoluteIndex;

                    return (
                      <TableRow key={rowKey}>
                        {columns.map((column, columnIndex) => {
                          const value = getCellValue(row, column.key);
                          const params: TDataTableRenderCellParams<T> = {
                            value,
                            row,
                            column,
                            rowIndex: absoluteIndex,
                            columnIndex,
                            data,
                          };

                          return (
                            <TableCell key={column.id}>
                              {(column.renderCell ?? defaultRenderCell)(params)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </SDataTableScroll>
        </SDataTableBox>
      </CardContent>

      <SDataTableFooter variant="muted">
        <Text size="sm" color="default">
          {filteredData.length === 0
            ? '0 entries'
            : `Showing ${from} to ${to} of ${filteredData.length} entries`}
        </Text>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="default"
          size="sm"
        />
      </SDataTableFooter>
    </Card>
  );
};

const DataTable = forwardRef(DataTableInner) as TDataTableComponent;

(DataTable as { displayName?: string }).displayName = 'DataTable';

export type {
  TDataTableProps,
  TDataTableColumn,
  TDataTableRow,
  TDataTableVariant,
  TDataTableRenderCellParams,
} from './types';
export { dataTableClasses } from './classes';
export { DataTable };
export default DataTable;

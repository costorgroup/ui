import React, { ChangeEvent, forwardRef, useEffect, useMemo, useState } from 'react';
import { TableBase } from '../table/table-base';
import { TableBody } from '../table/table-body';
import { TableCell } from '../table/table-cell';
import { TableHead } from '../table/table-head';
import { TableRow } from '../table/table-row';
import { Heading } from '../heading';
import { Pagination } from '../pagination';
import { Text } from '../text';
import { TextField } from '../text-field';
import {
  SDataTable,
  SDataTableEntries,
  SDataTableFooter,
  SDataTableHeader,
  SDataTableScroll,
  SDataTableSearch,
  SDataTableToolbar,
} from './styles';
import {
  TDataTableProps,
  TDataTableRenderCellParams,
  TDataTableRow,
} from './types';

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
    color = 'primary',
    variant = 'subtle',
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
    <SDataTable ref={ref} color={color} variant={variant} {...props}>
      <SDataTableToolbar>
        <SDataTableHeader>
          {title != null ? (
            <Heading as="h3" color={variant === 'solid' ? 'light' : 'default'}>
              {title}
            </Heading>
          ) : null}
          {description != null ? (
            <Text
              size="sm"
              color={variant === 'solid' ? 'light' : 'default'}
            >
              {description}
            </Text>
          ) : null}
        </SDataTableHeader>
        <SDataTableSearch>
          <TextField
            fullWidth
            size="sm"
            color={color}
            variant="outline"
            placeholder={searchPlaceholder}
            value={search}
            onChange={handleSearchChange}
            aria-label={searchPlaceholder}
          />
        </SDataTableSearch>
      </SDataTableToolbar>

      <SDataTableScroll>
        <TableBase size={size} color={color}>
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
                  getRowId?.(row, absoluteIndex) ??
                  row.id ??
                  absoluteIndex;

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
        </TableBase>
      </SDataTableScroll>

      <SDataTableFooter>
        <SDataTableEntries>
          <Text size="sm" color={variant === 'solid' ? 'light' : 'default'}>
            {filteredData.length === 0
              ? '0 entries'
              : `Showing ${from} to ${to} of ${filteredData.length} entries`}
          </Text>
        </SDataTableEntries>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color={color}
          variant={variant === 'solid' ? 'outline' : 'solid'}
          size="sm"
        />
      </SDataTableFooter>
    </SDataTable>
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
export { DataTable };
export default DataTable;

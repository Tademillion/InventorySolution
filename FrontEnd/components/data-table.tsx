"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get } from "http";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  serverMode?: boolean;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearchChange?: (value: string) => void;
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  serverMode = false,
  pageIndex,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // 

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(false);
  const [internalPagination, setInternalPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pagination = serverMode
    ? { pageIndex: pageIndex ?? 0, pageSize: pageSize ?? 10 }
    : internalPagination;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: serverMode ? undefined : getPaginationRowModel(),
    manualPagination: serverMode,
    pageCount: serverMode ? pageCount ?? -1 : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: serverMode
      ? (updater) => {
          const next =
            typeof updater === "function"
              ? (updater as any)(pagination)
              : updater;
          if (next.pageIndex !== pagination.pageIndex)
            onPageChange?.(next.pageIndex);
          if (next.pageSize !== pagination.pageSize)
            onPageSizeChange?.(next.pageSize);
        }
      : setInternalPagination,
  });

  const currentSearchValue = searchKey
    ? (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
    : "";

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        {searchKey && (
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={
                serverMode
                  ? currentSearchValue
                  : (table.getColumn(searchKey)?.getFilterValue() as string) ??
                    ""
              }
              onChange={(event) => {
                const val = event.target.value;
                // Always update internal filter so the input reflects text
                table.getColumn(searchKey)?.setFilterValue(val);
                // In server mode, also notify parent to fetch
                if (serverMode && onSearchChange) onSearchChange(val);
              }}
              className="pl-8 border-gray-200 w-full"
            />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-200 bg-transparent"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Mobile Card View */}
      {isMobile ? (
        <div className="space-y-4">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                {row.getVisibleCells().map((cell) => {
                  const header = cell.column.columnDef.header;
                  const headerText =
                    typeof header === "string" ? header : cell.column.id;
                  return (
                    <div
                      key={cell.id}
                      className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {headerText}:
                      </span>
                      <div className="text-sm text-gray-900 text-right flex-1 ml-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No results found.
            </div>
          )}
        </div>
      ) : (
        /* Desktop Table View */
        <div className="rounded-md border border-gray-200 overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-gray-900 whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {/* Responsive Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-2 order-2 sm:order-1">
          <span className="text-sm text-gray-700 text-center sm:text-left">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {serverMode ? pageCount ?? 1 : table.getPageCount()}
            {!isMobile && ` (${table.getFilteredRowModel().rows.length} items)`}
          </span>
        </div>

        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={
              serverMode
                ? pagination.pageIndex <= 0 || loading
                : !table.getCanPreviousPage()
            }
            className="h-8 w-8 p-0 border-gray-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Show fewer page numbers on mobile */}
          <div className="flex items-center space-x-1">
            {isMobile ? (
              // Mobile: Show only current page
              <Button
                variant="default"
                size="sm"
                className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white border-green-500"
              >
                {table.getState().pagination.pageIndex + 1}
              </Button>
            ) : (
              // Desktop: Show all pages (limited to reasonable number)
              Array.from(
                {
                  length: Math.min(
                    serverMode ? pageCount ?? 1 : table.getPageCount(),
                    5
                  ),
                },
                (_, i) => {
                  const pageNumber = i + 1;
                  const currentPage = table.getState().pagination.pageIndex + 1;
                  const startPage = Math.max(1, currentPage - 2);
                  const actualPageNumber = startPage + i;

                  if (
                    actualPageNumber >
                    (serverMode ? pageCount ?? 1 : table.getPageCount())
                  )
                    return null;

                  return (
                    <Button
                      key={actualPageNumber}
                      variant={
                        currentPage === actualPageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => table.setPageIndex(actualPageNumber - 1)}
                      className={`h-8 w-8 p-0 ${
                        currentPage === actualPageNumber
                          ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                          : "border-gray-300"
                      }`}
                      disabled={loading}
                    >
                      {actualPageNumber}
                    </Button>
                  );
                }
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={
              serverMode
                ? (pageCount !== undefined
                    ? pagination.pageIndex + 1 >= pageCount
                    : false) || loading
                : !table.getCanNextPage()
            }
            className="h-8 w-8 p-0 border-gray-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 order-3">
          <span className="text-sm text-gray-700 hidden sm:inline">
            Page size:
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              if (serverMode && onPageSizeChange) {
                onPageSizeChange(Number(value));
              } else {
                table.setPageSize(Number(value));
              }
            }}
          >
            <SelectTrigger className="h-8 w-16 border-gray-300">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export function SortableHeader({
  column,
  children,
}: {
  column: any;
  children: React.ReactNode;
}) {
  const sortDirection = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="h-auto p-0 font-semibold text-gray-900 hover:bg-foreground justify-start"
    >
      {children}
      {sortDirection === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {sortDirection === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
    </Button>
  );
}

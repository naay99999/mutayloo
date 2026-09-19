import * as React from 'react'
import {
  columnFilteringFeature, columnVisibilityFeature, createFilteredRowModel,
  createPaginatedRowModel, createSortedRowModel, filterFn_includesString,
  FlexRender, rowPaginationFeature, rowSelectionFeature, rowSortingFeature,
  sortFn_alphanumeric, tableFeatures, useTable,
  type ColumnDef, type ColumnFiltersState, type ColumnVisibilityState,
  type RowData, type SortingState,
} from '@tanstack/react-table'
import { ArrowDown01Icon, ArrowLeft01Icon, ArrowLeftDoubleIcon, ArrowRight01Icon, ArrowRightDoubleIcon, LeftToRightListBulletIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@workspace/ui/components/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@workspace/ui/components/empty'
import { Input } from '@workspace/ui/components/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'

const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

export type AdminDataTableFeatures = typeof features

type AdminDataTableProps<TData extends RowData> = {
  columns: ColumnDef<AdminDataTableFeatures, TData>[]
  data: TData[]
  filterColumn: string
  filterPlaceholder: string
  emptyDescription: string
  emptyTitle: string
}

export function AdminDataTable<TData extends RowData>({ columns, data, filterColumn, filterPlaceholder, emptyDescription, emptyTitle }: AdminDataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const table = useTable({
    features, data, columns,
    state: { columnFilters, columnVisibility, pagination, rowSelection, sorting },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
  })
  const searchableColumn = table.getColumn(filterColumn)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input className="sm:max-w-sm" placeholder={filterPlaceholder} value={(searchableColumn?.getFilterValue() as string) ?? ''} onChange={(event) => searchableColumn?.setFilterValue(event.target.value)} />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button className="sm:ml-auto" variant="outline" />}>
            <HugeiconsIcon data-icon="inline-start" icon={LeftToRightListBulletIcon} strokeWidth={2} />
            Columns
            <HugeiconsIcon data-icon="inline-end" icon={ArrowDown01Icon} strokeWidth={2} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40"><DropdownMenuGroup>
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} className="capitalize" onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {column.id.replaceAll('-', ' ')}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup></DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">{table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>{headerGroup.headers.map((header) => <TableHead key={header.id} colSpan={header.colSpan}>{header.isPlaceholder ? null : header.column.getCanSort() ? <Button className="-ml-2" onClick={() => header.column.toggleSorting(header.column.getIsSorted() === 'asc')} size="sm" variant="ghost"><FlexRender header={header} /><HugeiconsIcon data-icon="inline-end" icon={ArrowDown01Icon} strokeWidth={2} /></Button> : <FlexRender header={header} />}</TableHead>)}</TableRow>)}</TableHeader>
          <TableBody>{table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}><FlexRender cell={cell} /></TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={columns.length} className="p-0"><Empty className="min-h-48 border-0"><EmptyHeader><EmptyTitle>{emptyTitle}</EmptyTitle><EmptyDescription>{emptyDescription}</EmptyDescription></EmptyHeader></Empty></TableCell></TableRow>}</TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground">{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.</p>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Select items={[10, 20, 30, 40, 50].map((pageSize) => ({ label: `${pageSize}`, value: `${pageSize}` }))} value={`${table.state.pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger aria-label="Rows per page" className="w-20" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent side="top"><SelectGroup>{[10, 20, 30, 40, 50].map((pageSize) => <SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>)}</SelectGroup></SelectContent>
          </Select>
          <span className="min-w-28 text-center font-medium">Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}</span>
          <Button aria-label="Go to first page" className="hidden sm:inline-flex" disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)} size="icon" variant="outline"><HugeiconsIcon icon={ArrowLeftDoubleIcon} strokeWidth={2} /></Button>
          <Button aria-label="Go to previous page" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} size="icon" variant="outline"><HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} /></Button>
          <Button aria-label="Go to next page" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} size="icon" variant="outline"><HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} /></Button>
          <Button aria-label="Go to last page" className="hidden sm:inline-flex" disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)} size="icon" variant="outline"><HugeiconsIcon icon={ArrowRightDoubleIcon} strokeWidth={2} /></Button>
        </div>
      </div>
    </div>
  )
}

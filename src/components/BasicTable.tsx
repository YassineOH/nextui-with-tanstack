import { ChangeEvent, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnSort,
  type RowSelectionState,
  type ColumnFiltersState,
} from '@tanstack/react-table';

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  type SortDescriptor,
  Input,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';

import columns from '../utils/table';

import { useAppContext } from '../hooks/context';
import PaginationTable from './PaginationTable';
import { data } from '../utils/data';

function BasicTable() {
  const { state, dispatch } = useAppContext()!;
  const [filterBy, setFilterBy] = useState('auto');
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [selected, setSelected] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFiltering] = useState('');
  const [sortDesc, setSortDesc] = useState<SortDescriptor>({});
  const table = useReactTable({
    data: state.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
      rowSelection: selected,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFiltering,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    meta: {},
  });
  const handleLoadUsers = () => {
    dispatch({ type: 'LOAD_USERS', payload: data });
  };

  const handleDispatchingFilter = (e: ChangeEvent<HTMLInputElement>) => {
    if (filterBy === 'auto') {
      setGlobalFiltering(e.target.value);
    } else {
      table.getColumn(filterBy)?.setFilterValue(e.target.value);
    }
  };

  return (
    <div className="my-6 space-y-4 rounded-md border p-4 shadow-sm">
      <div className="flex w-full items-stretch gap-x-4">
        <Input
          value={
            filterBy === 'auto'
              ? globalFilter
              : (table.getColumn(filterBy)?.getFilterValue() as string) || ''
          }
          onChange={handleDispatchingFilter}
          label="filter"
          className="flex-grow-1"
          placeholder="ex: yassine"
        />
        <Select
          label="column"
          variant="faded"
          placeholder="select a column to filter by"
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
            if (filterBy === 'auto') {
              setGlobalFiltering('');
            } else {
              table.getColumn(filterBy)?.setFilterValue('');
            }
          }}
        >
          {['auto', 'fullName', 'age', 'email'].map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Table
        aria-label="Example static collection table"
        sortDescriptor={sortDesc}
        onSortChange={(s) => setSortDesc(s)}
        bottomContent={
          <PaginationTable
            numberOfPages={table.getPageCount()}
            onChangePage={table.setPageIndex}
          />
        }
      >
        <TableHeader>
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableColumn
              allowsSorting
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={<Button onClick={handleLoadUsers}>Load Users</Button>}
        >
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Manual pagination button */}
      {/* <div className="flex w-full items-center justify-start gap-x-2">
        <Button onClick={() => table.setPageIndex(0)}>First Page</Button>
        <Button onClick={() => table.previousPage()}>Prev Page</Button>
        <Button onClick={() => table.nextPage()}>Next Page</Button>
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          First Page
        </Button>
      </div> */}
    </div>
  );
}
export default BasicTable;

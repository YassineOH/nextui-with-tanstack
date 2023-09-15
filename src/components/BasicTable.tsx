import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnSort,
  type RowSelectionState,
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
} from '@nextui-org/react';

import columns from '../utils/table';

import { useAppContext } from '../hooks/context';
import PaginationTable from './PaginationTable';
import { data } from '../utils/data';

function BasicTable() {
  const { state, dispatch } = useAppContext()!;
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [selected, setSelected] = useState<RowSelectionState>({});
  const [filtering, setFiltering] = useState('');
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
      globalFilter: filtering,
      rowSelection: selected,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onRowSelectionChange: setSelected,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    meta: {},
  });
  const handleLoadUsers = () => {
    dispatch({ type: 'LOAD_USERS', payload: data });
  };

  return (
    <div className="my-6 space-y-4 rounded-md border p-4 shadow-sm">
      <Input
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        label="filter"
      />
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

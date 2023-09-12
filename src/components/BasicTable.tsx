import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnSort,
} from '@tanstack/react-table';

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Pagination,
  type SortDescriptor,
} from '@nextui-org/react';

import columns from '../table';

import { useAppContext } from '../hooks/context';

function BasicTable() {
  const { state } = useAppContext()!;
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [sortDesc, setSortDesc] = useState<SortDescriptor>({});
  const table = useReactTable({
    data: state.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // const keys = table.getHeaderGroups()[0].headers.map((h) => h.id);

  return (
    <div className="my-4">
      <Table
        aria-label="Example static collection table"
        sortDescriptor={sortDesc}
        onSortChange={(s) => setSortDesc(s)}
        bottomContent={
          <div className="my-1 flex justify-center gap-x-2">
            <Pagination
              showShadow
              isCompact
              showControls
              color="secondary"
              total={table.getPageCount()}
              onChange={(p) => {
                table.setPageIndex(p - 1);
              }}
            />
          </div>
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
        <TableBody>
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
      {/* Manual button */}
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

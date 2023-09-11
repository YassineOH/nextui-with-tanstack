import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
} from '@nextui-org/react';

{
  /* */
}

import columns from '../table';

import { useAppContext } from '../hooks/context';

function BasicTable() {
  const { state } = useAppContext()!;
  const table = useReactTable({
    data: state.users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="my-4">
      <Table aria-label="Example static collection table">
        <TableHeader>
          {table.getHeaderGroups()[0].headers.map((header) => (
            <TableColumn key={header.id}>
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
    </div>
  );
}
export default BasicTable;

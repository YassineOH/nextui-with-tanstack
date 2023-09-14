import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { type UserType } from './schemaValidation';
import { Button } from '@nextui-org/react';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const columnHelper = createColumnHelper<UserType>();

const defaultColumns = [
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-x-2">
        <Button
          isIconOnly
          onClick={() => row.toggleSelected(true)}
          color="success"
          variant="ghost"
          className="border-none"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button
          isIconOnly
          onClick={() => row.toggleSelected(false)}
          color="danger"
          variant="ghost"
          className="border-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    ),
  }),
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('fullName', {
    header: 'Full Name',
    footer: 'Full Name',
  }),

  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: (info) => (info.getValue() == 'Female' ? 'F' : 'M'),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    footer: 'Age',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    footer: 'Email',
  }),
  columnHelper.accessor('active', {
    header: 'Active User',
  }),
  columnHelper.accessor('createdAt', {
    header: 'Creation date',
    cell: (info) => format(new Date(info.getValue()), 'Pp'),
  }),
];

export default defaultColumns;

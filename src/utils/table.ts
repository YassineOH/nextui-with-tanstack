import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

import { type UserType } from '../utils/schemaValidation';

const columnHelper = createColumnHelper<UserType>();

const defaultColumns = [
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

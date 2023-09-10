import { createColumnHelper } from '@tanstack/react-table';

import { type UserType } from './components/Form';

const columnHelper = createColumnHelper<UserType>();

const defaultColumns = [
  columnHelper.accessor('fullName', {
    header: 'Full Name',
    footer: 'Full Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    footer: 'Email',
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    footer: 'Age',
  }),
];

export default defaultColumns;

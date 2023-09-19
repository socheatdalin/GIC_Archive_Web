import ColumnFilter from './ColumnFilter';

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Gender',
    Footer: 'Gender',
    accessor: 'gender',
    Filter: ColumnFilter,
  },
  {
    Header: 'Year',
    Footer: 'Year',
    accessor: 'year',
    Filter: ColumnFilter,
  },
  {
    Header: 'Group',
    Footer: 'Group',
    accessor: 'group',
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },

];

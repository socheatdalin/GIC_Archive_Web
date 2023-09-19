import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Box } from '@mui/system';
import React from 'react';
import { usePagination, useTable } from 'react-table';
// import { Spinner } from '../../../../components/loader';
// import {COLUMNS} from './columns'
// import MOCK_DATA from './MOCK_DATA.json'
import './table.css';

export default function Pagination({ columns, data }) {
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    usePagination
  );

  return (
    <Box pos="relative" h="full">
      <Table
        h="max-content"
        overflow="auto"
        size="sm"
        variant="simple"
        {...getTableProps()}
      >
        <Thead
          h="4"
          maxH="4"
          minH="4"
          zIndex="2"
          pos="sticky"
          top="0"
          fontSize="small"
          color="#668284"
          textTransform="uppercase"
        >
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  py="4"
                  {...column.getHeaderProps}
                  fontFamily="sans-serif"
                  fontSize="md"
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody fontSize='15px' color="#506266" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                cursor="pointer"
                _hover={{ bg: 'gray.50' }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      fontWeight="normal"
                      py="2"
                      style={{ cursor: 'default' }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* <Box component="div" m="10px 10px">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </Box> */}
    </Box>
  );
}

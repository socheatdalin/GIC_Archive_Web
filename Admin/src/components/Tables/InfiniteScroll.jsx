import {
  Box,
  Button,
  Center,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { BiServer } from 'react-icons/all';
import { Spinner } from '../loader';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../utils/hooks';
import { useTable } from 'react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
const MotionRow = motion(Tr);

export default function InfiniteScroll({ columns, ...props }) {
  let {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = props;
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMount(true);
    }, 2000);
  }, [isLoading]);

  const flatData = useMemo(() => {
    let flatArray = [].concat.apply(
      [],
      data?.pages?.map(({ modifiedData }) => modifiedData?.map((elem) => elem))
    );

    return flatArray?.map((e, i) => ({ ...e, n: i + 1 }));
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: flatData || [],
    });
  const loadMoreButtonRef = useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <Box pos="relative" h="full">
      <Table
        h="max-content"
        overflow="auto"
        {...getTableProps()}
        size="sm"
        variant="simple"
      >
        <Thead
          h="4"
          maxH="4"
          minH="4"
          zIndex="2"
          pos="sticky"
          top="0"
          bg="gray.50"
        >
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  py="4"
                  {...column.getHeaderProps()}
                  fontFamily="Kantumruy Pro, sans-serif"
                  fontSize="md"
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        {!isMount ? (
          <Tbody>
            <Spinner />
          </Tbody>
        ) : (
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <MotionRow
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <Td
                      py="2"
                      style={{ cursor: 'default' }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </MotionRow>
              );
            })}
          </Tbody>
        )}
      </Table>
      <Box hidden={!isMount} h="min-content">
        {isFetchingNextPage ? (
          <Progress size="xs" colorScheme="brand" isIndeterminate />
        ) : hasNextPage ? (
          <Center w="full">
            <Button
              fontSize="md"
              fontWeight="normal"
              color="gray.400"
              variant="ghost"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              Load more
            </Button>
          </Center>
        ) : (
          !isFetching && (
            <Center py="3" w="full" h="full" color="gray.400">
              <BiServer size="1.3rem" />{' '}
              <Text fontSize="md">&nbsp;No more data.</Text>
            </Center>
          )
        )}
        {isFetching && !isFetchingNextPage && <Spinner />}
      </Box>

      <button
        ref={loadMoreButtonRef}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      ></button>
    </Box>
  );
}

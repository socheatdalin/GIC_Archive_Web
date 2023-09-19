import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Button, styled } from '@mui/material';
import React, { forwardRef, useMemo, useState } from 'react';
import { BiAddToQueue, BiSearchAlt2 } from 'react-icons/bi';
import Pagination from '../table/Pagination';
import USER from '../table/user.json';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { Input } from '@mui/base';
// import InfiniteScrollTable from '../../../../components/Tables/InfiniteScrollTable';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
    width: 250px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[200]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const CustomInput = forwardRef(function CustomInput(props, ref) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export default function List() {
  const [selected, setSelected] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const { onOpen: onDeleteModalOpen } = useDisclosure();

  const parentUrl = `/${pathname.split('/')[1]}`;

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
      {
        Header: 'Created Date',
        accessor: 'created_date',
      },
      {
        Header: 'Action',
        Cell: ({ row: { original } }) => (
          <Center spacing={2} gap="6">
            {console.log(id)}
            <IconButton
              onClick={() => history.push(`${parentUrl}/view/${original.id}`)}
              variant="ghost"
              color="#78909c"
              cursor="pointer"
              bg="none"
              size="sm"
              border="none"
              icon={<MdRemoveRedEye size="1.3rem" />}
            />

            <IconButton
              onClick={() => history.push(`${parentUrl}/edit/${original.id}`)}
              variant="ghost"
              cursor="pointer"
              color="#78909c"
              border="none"
              bg="none"
              size="sm"
              icon={<HiOutlinePencilAlt size="1.3rem" />}
            />
            <IconButton
              onClick={() => {
                setSelected(original);
                onDeleteModalOpen();
              }}
              size="sm"
              variant="ghost"
              cursor="pointer"
              border="none"
              bg="none"
              color="#78909c"
              icon={<HiOutlineTrash size="1.3rem" />}
            />
          </Center>
        ),
      },
    ],
    //eslint-disable-next-line
    []
  );

  const [, setFilter] = useState({ searchText: '' });

  return (
    <Flex flexDir="column" bg="white" borderRadius="10px" h="full">
      <Grid
        as="form"
        templateColumns="auto max-content"
        p="3"
        mb="3"
        boxShadow="sm"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const formProps = Object.fromEntries(formData);
          setFilter((prev) => ({
            ...prev,
            searchText: formProps.searchText,
          }));
        }}
      >
        <Grid
          ml="10px"
          mt="10px"
          variant="standard"
          templateColumns="15vw max-content"
          gap="4"
          display="flex"
        >
          <CustomInput aria-label="Demo input" placeholder="Search" />
          <Button
            sx={{ width: '10px', height: '42px', borderRadius: '8px' }}
            variant="contained"
            onClick={() => history.push(`${parentUrl}/add`)}
          >
            <BiSearchAlt2 style={{ width: '100%', height: '100%' }} />
          </Button>
        </Grid>
        <Grid mt="10px" h="42px">
          <HStack h="100%" w="90px" mr="10px">
            <Button
              sx={{ height: '100%' }}
              variant="contained"
              onClick={() => history.push(`${parentUrl}/add`)}
              startIcon={<BiAddToQueue />}
            >
              Add
            </Button>
          </HStack>
        </Grid>
      </Grid>
      <Box mt="10px" mb="20px" flex="1" overflow="auto">
        <Pagination columns={columns} data={USER} />
      </Box>
    </Flex>
  );
}

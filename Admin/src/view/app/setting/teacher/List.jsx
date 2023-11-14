import {
  Center,
  Flex,
  Grid,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SELECT_OPTIONS from 'react-select';
import Table from '@mui/joy/Table';
import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ModalEdit from '@mui/joy/Modal';
import ModalView from '@mui/joy/Modal';
import ModalDelete from '@mui/joy/Modal';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Typography,
} from '@mui/joy';

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'teacher_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: true,
    label: 'Userame',
  },
  {
    id: 'first_name',
    numeric: true,
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'last_name',
    numeric: true,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },

  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead style={{ backgroundColor: 'tomato' }}>
      <tr>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              style={{
                textAlign: 'center',
                backgroundColor: '#23395d',
                color: 'white',
              }}
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: 'ascending', desc: 'descending' }[order]
                  : undefined
              }
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && order === 'desc'
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
const gender = [
  { value: 'F', label: 'Female' },
  { value: 'M', label: 'Male' },
];
const Roles = [
  { value: '1', label: 'teacher' },
  { value: '2', label: 'student' },
];

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

var countSearch = 1;
export default function List() {
  var [teacher, setTeacher] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [inputName, setInputName] = React.useState('');
  const [inputFirstname, setInputFirstname] = React.useState('');
  const [inputLastname, setInputLastname] = React.useState('');
  const [inputGender, setInputGender] = React.useState('');
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [inputPhoto, setInputPhoto] = React.useState('');
  const [openEdit, setOpenEdit] = React.useState(false);
  const [Name, setName] = React.useState('');
  const [FirstName, setFirstname] = React.useState('');
  const [LastName, setLastname] = React.useState('');
  const [Gender, setGender] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Password, setPassword] = React.useState('old');
  const [oldID, set_oldID] = React.useState('');
  const [ID, setID] = React.useState('');
  const [Photo, setPhoto] = React.useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState('');
  const rows = teacher;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [courses, setCoures] = React.useState([]);
  const [tos, setTos] = React.useState([]);
  const [, setFilter] = useState({ searchText: '' });

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onDeleteModalOpen = async (id) => {
    setDeleteID(id);
    setOpenDelete(true);
  };

  const handlePassword = async (e) => {
    setPassword(e.target.value);
  };

  const handleInputName = async (e) => {
    setInputName(e.target.value);
  };

  const handleSelectGender = async (event) => {
    setInputGender(event);
  };

  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputFirstname = async (e) => {
    setInputFirstname(e.target.value);
  };
  const handleInputLastname = async (e) => {
    setInputLastname(e.target.value);
  };

  const handleInputPhoto = (e) => {
    // console.warn(e.target.files)
    setInputPhoto(e.target.files[0]);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleName = async (e) => {
    setName(e.target.value);
  };

  const handleGender = async (event) => {
    setGender(event.value);
  };

  const handleID = async (e) => {
    setID(e.target.value);
  };

  const handleEmail = async (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = async (e) => {
    setInputPassword(e.target.value);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    teachers();
  }, []);

  const handleSearch = (e) => {
    // console.log(search)
    axios
      .post('http://localhost:3001/admin/teacher/all/name', {
        username: inputName,
      })
      .then((result) => {
        setTeacher(result.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async () => {
    axios
      .post('http://localhost:3001/admin/teacher/delete/' + deleteID)
      .then((result) => {
        window.location.replace('/home/teacher/list');
      })
      .catch((error) => console.log(error));
  };

  const handleView = async (teacher_id) => {
    await axios
      .get('http://localhost:3001/admin/teacher/' + teacher_id)
      .then((result) => {
        // setAddress(result.data[0].address)
        setEmail(result.data[0].email);
        setInputName(result.data[0].username);
        setID(result.data[0].teacher_id);
        setGender(result.data[0].gender);
        setInputFirstname(result.data[0].first_name);
        setInputLastname(result.data[0].last_name);
        setInputPhoto(result.data[0].filepath);
      })
      .catch((error) => console.log(error));
    setOpenView(true);
  };
  const teachers = async () => {
    axios
      .get('http://localhost:3001/admin/teacher/all')
      .then((result) => {
        setTeacher(result.data);
        teacher();
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = async (teacher_id) => {
    console.log(teacher_id);
    await axios
      .get('http://localhost:3001/admin/teacher/' + teacher_id)
      .then((result) => {
        setEmail(result.data[0].email);
        setName(result.data[0].username);
        setID(result.data[0].id);
        set_oldID(result.data[0].id);
        setGender(result.data[0].gender);
        setInputPhoto(result.data[0].filepath);
      })
      .catch((error) => console.log(error));
    setOpenEdit(true);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', inputName);
    formData.append('first_name', inputFirstname);
    formData.append('last_name', inputLastname);
    formData.append('gender', inputGender.value);
    formData.append('email', inputEmail);
    formData.append('password', inputPassword);
    formData.append('image', inputPhoto);
    console.log(formData.get('image'));
    axios
      .post('http://localhost:3001/admin/signup/teacher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        console.log(result);
        window.location.replace('/home/teacher/list');
      })
      .catch((error) => console.log(error));
  };

  const handleSubmitEdit = async (teacher_id) => {
    const formData = FormData();
    formData.set('username', inputName);
    formData.set('email', inputEmail);
    formData.set('first_name', inputFirstname);
    formData.set('last_name', inputLastname);
    formData.append('gender', inputGender.value);
    formData.append('password', inputPassword);
    formData.append('image', inputPhoto);
    console.log(formData.get('image'));
    axios
      .post(
        `http://localhost:3001/admin/teacher/update/${teacher_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((result) => {
        console.log(result);
        window.location.replace('/home/teacher/list');
      })
      .catch((error) => console.log(error));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];


    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Flex flexDir="column" bg="white" borderRadius="10px" h="full">
      {/* Popup */}
      <Box>
        <ModalDelete
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 350,
              height: 170,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
              marginTop: '-100',
            }}
          >
            <Flex
              style={{
                marginTop: '20px',
                justifyContent: 'space-between',
                textAlign: 'center',
                margin: 'auto',
                alignItems: 'center',
              }}
            >
              <p> Are you sure you want to delete this teacher?</p>
            </Flex>
            <div
              style={{
                justifyConten: 'space-between',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  mr: '10px',
                  mt: '20px',
                  backgroundColor: '#CD3700',
                  color: 'white',
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                sx={{
                  mr: '10px',
                  mt: '20px',
                  backgroundColor: '#23395d',
                  color: 'white',
                }}
                onClick={handleCloseDelete}
                variant="solid"
              >
                Cancel
              </Button>
            </div>
          </Sheet>
        </ModalDelete>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 700,
              height: 380,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
              }}
            />
            <Flex mb="10px" justifyContent="space-between" alignItems="center">
              <Typography level="h4">Create Teacher</Typography>
              <Button
                onClick={handleSubmit}
                sx={{ mr: '10px', backgroundColor: '#23395d', color: 'white' }}
                variant="solid"
              >
                Create
              </Button>
            </Flex>
            <Grid templateColumns="repeat(4,1fr)  " gap="2">
              <VStack spacing="3">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Username</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    type="text"
                    id="username"
                    defaultValue=""
                    variant="outlined"
                    color="neutral"
                    onChange={handleInputName}
                  />
                  <FormLabel required>First Name</FormLabel>
                  <Input
                    placeholder="Please enter your firstname"
                    variant="outlined"
                    defaultValue=""
                    type="text"
                    color="neutral"
                    onChange={handleInputFirstname}
                  />
                  <FormLabel required>Last Name</FormLabel>
                  <Input
                    placeholder="Please enter your lastname"
                    variant="outlined"
                    defaultValue=""
                    type="text"
                    color="neutral"
                    onChange={handleInputLastname}
                  />
                  <FormLabel required>Gender</FormLabel>
                  <SELECT_OPTIONS
                    variant="outlined"
                    color="neutral"
                    //type='text'
                    placeholder="Select gender"
                    onChange={handleSelectGender}
                    defaultValue={[gender[4], gender[5]]}
                    options={gender}
                  />
                </FormControl>
              </VStack>
              <VStack spacing="3" ml="40px">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Email</FormLabel>
                  <Input
                    placeholder="Please enter email"
                    variant="outlined"
                    defaultValue=""
                    color="neutral"
                    onChange={handleInputEmail}
                  />
                  <FormLabel required>Password</FormLabel>
                  <Input
                    startDecorator={<KeyRoundedIcon />}
                    placeholder="Password"
                    type="password"
                    id="password"
                    defaultValue=""
                    endDecorator={
                      <IconButton color="neutral">
                        <VisibilityRoundedIcon />
                      </IconButton>
                    }
                    onChange={handleInputPassword}
                  />
                </FormControl>
                <Grid sx={{ mt: 10 }}>
                  <input
                    style={{
                      marginTop: '20px',
                      marginBottom: '20px',
                      marginLeft: '3px',
                    }}
                    type="file"
                    name="image"
                    onChange={handleInputPhoto}
                  />
                </Grid>
              </VStack>
            </Grid>
          </Sheet>
        </Modal>
      </Box>

      <Box>
        <ModalEdit
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 700,
              height: 400,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
              }}
            />
            <Flex mb="10px" justifyContent="space-between" alignItems="center">
              <Typography level="h4">Update Teacher</Typography>
              <Button
                onClick={handleSubmitEdit}
                sx={{ mr: '10px', background: '#23395d' }}
                variant="solid"
              >
                Update
              </Button>
            </Flex>
            <Grid templateColumns="repeat(4,1fr)  " gap="2">
              <VStack spacing="3">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Name</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    defaultValue=""
                    variant="outlined"
                    color="neutral"
                    value={Name}
                    onChange={handleName}
                  />
                  <FormLabel required>First-Name</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    defaultValue=""
                    variant="outlined"
                    color="neutral"
                    value={inputFirstname}
                    onChange={handleInputFirstname}
                  />
                  <FormLabel required>Last-Name</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    defaultValue=""
                    variant="outlined"
                    color="neutral"
                    value={inputLastname}
                    onChange={handleInputLastname}
                  />
                  <FormLabel required>Email</FormLabel>
                  <Input
                    placeholder="Please enter email"
                    variant="outlined"
                    defaultValue=""
                    color="neutral"
                    value={Email}
                    onChange={handleEmail}
                  />
                </FormControl>
              </VStack>
              <VStack spacing="3" ml="40px">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Gender</FormLabel>
                  <SELECT_OPTIONS
                    variant="outlined"
                    color="neutral"
                    placeholder="Select gender"
                    onChange={handleGender}
                    defaultValue={[{ label: Gender, value: Gender }]}
                    options={gender}
                  />
                  <FormLabel required>Password</FormLabel>
                  <Input
                    startDecorator={<KeyRoundedIcon />}
                    placeholder="Password"
                    type="password"
                    defaultValue=""
                    endDecorator={
                      <IconButton color="neutral">
                        <VisibilityRoundedIcon />
                      </IconButton>
                    }
                    onChange={handlePassword}
                  />
                  <Grid sx={{ mt: 10 }}>
                    <input
                      style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        marginLeft: '3px',
                      }}
                      type="file"
                      name="image"
                      onChange={handlePhoto}
                    />
                  </Grid>
                </FormControl>
              </VStack>
            </Grid>
          </Sheet>
        </ModalEdit>
      </Box>

      <Box>
        <ModalView
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openView}
          onClose={() => setOpenView(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 600,
              height: 350,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
              bgcolor: 'white',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: '#23395d',
                color: 'white',
              }}
            />
            <Flex mb="10px" justifyContent="space-between" alignItems="center">
              <Typography level="h4">View Teacher</Typography>
            </Flex>
            <Grid templateColumns="repeat(2,1fr)  " gap="1">
              <VStack spacing="1">
                <span
                  style={{
                    marginLeft: '70px',
                    marginTop: '30px',
                    width: 200,
                    height: 200,
                    border: '1px  solid #23395d',
                    borderRadius: '3px',
                  }}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={`http://localhost:3001/static/${inputPhoto}`}
                  />
                </span>
              </VStack>
              <VStack>
                <div
                  style={{
                    paddingLeft: '40px',
                    paddingTop: '40px',
                    width: 320,
                    height: 240,
                    borderRadius: '3px',
                  }}
                >
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      <b>Name : </b>
                    </span>
                    <span style={{ marginLeft: '33px', color: '#517388' }}>
                      {inputName}
                    </span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      <b>ID : </b>
                    </span>
                    <span style={{ marginLeft: '68px', color: '#517388' }}>
                      {ID}
                    </span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      <b>Gender : </b>
                    </span>
                    <span style={{ marginLeft: '33px', color: '#517388' }}>
                      {Gender}
                    </span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      <b>Email : </b>
                    </span>
                    <span style={{ marginLeft: '48px', color: '#517388' }}>
                      {Email}
                    </span>
                  </div>
                </div>
              </VStack>
            </Grid>
          </Sheet>
        </ModalView>
      </Box>

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
        <Box
          borderRadius="8px"
          mt="10px"
          h="60px"
          display="flex"
          flexDir="row"
          justifyContent="space-between"
        >
          <Flex
            width="100%"
            ml="10px"
            variant="standard"
            templateColumns="15vw max-content"
            gap="4"
          >
            <span>
              <Input
                sx={{
                  '&:hover': { '& svg': { opacity: 1 } },
                  width: '200px',
                  left: '910px',
                  position: 'absolute',
                  transition: 'width 3s',
                }}
                placeholder="search by username..."
                variant="outlined"
                color="neutral"
                onChange={handleInputName}
              />
            </span>
            <Button
              onClick={() => handleSearch()}
              style={{ backgroundColor: '#23395d' }}
              sx={{ position: 'absolute', right: '105px' }}
              variant="solid"
            >
              <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
            </Button>
          </Flex>
          <Grid h="42px" mr="10px">
            <Button
              sx={{ width: '75px', backgroundColor: '#23395d' }}
              variant="solid"
              onClick={() => setOpen(true)}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          borderRadius: 1,
          marginTop: '20px',
          marginRight: '40px',
          marginBottom: '20px',
        }}
      >
        <Sheet
          sx={{
            mt: '10px',
            ml: 1,
            width: '99%',
            height: '100%',
            borderRadius: 'sm',
          }}
        >
          <Table aria-labelledby="tableTitle" hoverRow>
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <tbody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  return (
                    <tr
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      spacing={2}
                      style={{
                        textAlign: 'center',
                      }}
                      key={row.teacher_id}
                    >
                      <td>{row.teacher_id}</td>
                      <td>{row.username}</td>
                      <td>{row.first_name}</td>
                      <td>{row.last_name}</td>
                      <td>{row.gender}</td>
                      <td>{row.email}</td>

                      <td>
                        <Center spacing={2} gap="6">
                          {/* {console.log(id)} */}
                          <IconButton
                            onClick={() => handleView(row.teacher_id)}
                            variant="ghost"
                            color="#78909c"
                            cursor="pointer"
                            bg="none"
                            size="sm"
                            border="none"
                            icon={
                              <MdRemoveRedEye color="#4682B4" size="1.3rem" />
                            }
                          />

                          <IconButton
                            variant="ghost"
                            cursor="pointer"
                            color="#78909c"
                            border="none"
                            bg="none"
                            size="sm"
                            icon={
                              <HiOutlinePencilAlt
                                color="#03A89E"
                                size="1.3rem"
                              />
                            }
                            onClick={() => {
                              handleEdit(row.teacher_id);
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              onDeleteModalOpen(row.teacher_id);
                            }}
                            size="sm"
                            variant="ghost"
                            cursor="pointer"
                            border="none"
                            bg="none"
                            color="#78909c"
                            icon={
                              <HiOutlineTrash color="#CD3700" size="1.3rem" />
                            }
                          />
                        </Center>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <FormControl orientation="horizontal" size="sm">
                      <FormLabel>Rows per page:</FormLabel>
                      <Select
                        onChange={handleChangeRowsPerPage}
                        value={rowsPerPage}
                      >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                      </Select>
                    </FormControl>
                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                      {labelDisplayedRows({
                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: rows.length === -1 ? -1 : rows.length,
                      })}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: 'background.surface' }}
                      >
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          rows.length !== -1
                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                            : false
                        }
                        onClick={() => handleChangePage(page + 1)}
                        sx={{ bgcolor: 'background.surface' }}
                      >
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      </Box>
    </Flex>
  );
}

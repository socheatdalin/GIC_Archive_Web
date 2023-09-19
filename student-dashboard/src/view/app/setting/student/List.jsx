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
import { HiOutlinePencilAlt, HiOutlineTrash, FiSearch, HiSearch } from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModalEdit from '@mui/joy/Modal'
import ModalView from '@mui/joy/Modal'
import ModalDelete from '@mui/joy/Modal'

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
  Typography
} from '@mui/joy';
// import InfiniteScrollTable from '../../../../components/Tables/InfiniteScrollTable';


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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
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
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
  },
  {
    id: 'group_name',
    numeric: true,
    disablePadding: false,
    label: 'Group',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const groups = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' }
]

const Years = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
]

const gender = [
  { value: 'F', label: 'Female' },
  { value: 'M', label: 'Male' },
]

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
              style={{ textAlign: 'center', backgroundColor: '#23395d', color: 'white' }}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

var countSearch = 0;

export default function List() {
  var [student, setStudent] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [inputName, setInputName] = React.useState('');
  const [inputGender, setInputGender] = React.useState('');
  const [inputAddress, setInputAddress] = React.useState('');
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPhone, setInputPhone] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [inputFrom, setInputFrom] = React.useState('');
  const [inputTo, setInputTo] = React.useState('');
  const [inputYear, setInputYear] = React.useState('');
  const [inputGroup, setInputGroup] = React.useState('');
  const [inputID, setInputID] = React.useState('')
  const [oldID, set_oldID] = React.useState('')
  const [Name, setName] = React.useState('');
  const [Gender, setGender] = React.useState('');
  const [Address, setAddress] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [From, setFrom] = React.useState('');
  const [To, setTo] = React.useState('');
  const [Year1, setYear1] = React.useState('');
  const [ID, setID] = React.useState('');
  const [Group, setGroup] = React.useState('');
  const [Password, setPassword] = React.useState('old');
  const [Photo, setPhoto] = React.useState('');
  const [inputPhoto, setInputPhoto] = React.useState('');

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState('');
  const handleCloseDelete = () => {
    setOpenDelete(false)
   }
  
   const onDeleteModalOpen = async (id) => {
    setDeleteID(id)
    setOpenDelete(true)
  }
  const handleDelete = async () => {
    axios.get("http://localhost:3000/admin/delete/student/"+ deleteID,{ withCredentials: true })
    .then((result) => {
      window.location.replace('/student/list')
      })
    .catch(error => console.log(error));
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  
  const handlePhoto = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setPhoto(base64)
  }

  const handleSelectGender = async (event) => {
    setInputGender(event);
  };

  const handleSelectYear = (e) => {
    setInputYear(e)
    handleSort(inputFrom,inputTo,e.value,inputGroup)
  }

  const handleInputPhoto = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setInputPhoto(base64)
  }
  const [toYear, setToYear] = React.useState([]);
  const [fromYear, setFromYear] = React.useState([]);
  useEffect(() => {
    students();
    axios.get("http://localhost:3000/year/schedule", { withCredentials: true })
      .then((result) => {
        let fromYears = []
        let toYears = []
        // console.log(result.data.result[0])
        for (var i = 0; i < result.data.result.length; i++) {
          fromYears.push({ label: result.data.result[i].FromYear, value: result.data.result[i].FromYear })
          toYears.push({ label: result.data.result[i].ToYear, value: result.data.result[i].ToYear })
          setToYear(toYears)
          setFromYear(fromYears)
        }
      })
  }, [])

  const handleInputName = async (e) => {
    setInputName(e.target.value)
  }
  const handleInputID = async (e) => {
    setInputID(e.target.value)
  }

  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputAddress = async (e) => {
    setInputAddress(e.target.value)
  }

  const handleInputPhone = async (e) => {
    setInputPhone(e.target.value)
  }

  const handleInputFrom = async (e) => {
    setInputFrom(e.target.value)
  }

  const handleInputTo = async (e) => {
    setInputTo(e.target.value)
  }

  const handleSelectGroup = (e) => {
    setInputGroup(e)
    handleSort(inputFrom,inputTo,inputYear,e.value)
  }

  const handleInputPassword = async (e) => {
    setInputPassword(e.target.value)
  }

  const handleName = async (e) => {
    setName(e.target.value)
  }

  const handleGender = async (event) => {
    setGender(event.value);
  };

  const handleID = async (e) => {
    setID(e.target.value)
  }

  const handleEmail = async (e) => {
    setEmail(e.target.value)
  }

  const handleAddress = async (e) => {
    setAddress(e.target.value)
  }

  const handlePhone = async (e) => {
    setPhone(e.target.value)
  }

  const handleFrom = async (e) => {
    setFrom(e.target.value)
  }

  const handleTo = async (e) => {
    setTo(e.target.value)
  }

  const handleGroup = (e) => {
    setGroup(e.value)
  }

  const handlePassword = async (e) => {
    setPassword(e.target.value)
  }

  const handleYear = (e) => {
    setYear1(e.value)
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSubmit = async () => {
    axios.post("http://localhost:3000/admin/signUp/student", { address: inputAddress, name: inputName, email: inputEmail, FromYear: inputFrom, gender: inputGender.value, group: inputGroup.value, id: inputID, password: inputPassword, ToYear: inputTo, Year: inputYear.value, phone: inputPhone, photo: inputPhoto }, { withCredentials: true })
      .then((result) => {
        window.location.replace('/student/list')
      })
      .catch(error => console.log(error));
  }

  const handleView = async (student_id) => {
    await axios.get("http://localhost:3000/admin/displayOne/student/" + student_id, { withCredentials: true })
      .then((result) => {
        setAddress(result.data.results[0].address)
        setEmail(result.data.results[0].email)
        setName(result.data.results[0].name)
        setID(result.data.results[0].student_id)
        set_oldID(result.data.results[0].student_id)
        setGender(result.data.results[0].gender)
        setTo(result.data.results[0].ToYear)
        setFrom(result.data.results[0].FromYear)
        setPhone(result.data.results[0].phone)
        setGroup(result.data.results[0].group_name)
        setYear1(result.data.results[0].year)
        setPhoto(result.data.results[0].photo)
      })
      .catch(error => console.log(error));
    setOpenView(true);
  }

  const handleEdit = async (student_id) => {
    await axios.get("http://localhost:3000/admin/displayOne/student/" + student_id, { withCredentials: true })
      .then((result) => {
        setAddress(result.data.results[0].address)
        setEmail(result.data.results[0].email)
        setName(result.data.results[0].name)
        setID(result.data.results[0].student_id)
        set_oldID(result.data.results[0].student_id)
        setGender(result.data.results[0].gender)
        setTo(result.data.results[0].ToYear)
        setFrom(result.data.results[0].FromYear)
        setPhone(result.data.results[0].phone)
        setGroup(result.data.results[0].group_name)
        setYear1(result.data.results[0].year)
        setPhoto(result.data.results[0].photo)
      })
      .catch(error => console.log(error));
    setOpenEdit(true);
  }

  const handleSubmitEdit = async () => {
    await axios.post("http://localhost:3000/admin/update/student", { address: Address, name: Name, email: Email, FromYear: From, gender: Gender, group: Group, old_id: oldID, new_id: ID, password: Password, ToYear: To, year: Year1, phone: Phone, photo: Photo }, { withCredentials: true })
      .then((result) => {
        console.log(Photo)
        setOpenEdit(false);
        window.location.replace('/student/list')
      })
      .catch(error => console.log(error));
  }

  const students = async () => {
    axios.get("http://localhost:3000/admin/displayAll/student", { withCredentials: true })
      .then((result) => {
        setStudent(result.data.results)
        // console.log(result.data.results)
      })
      .catch(error => console.log(error));
  };
  const rows = student;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [, setFilter] = useState({ searchText: '' });
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

  const handleSearch = (e) => {
    // console.log(search)
    axios.post("http://localhost:3000/admin/search/student",{search:e.target.value},{ withCredentials: true })
    .then((result) => {
      setStudent(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleSort = (fromYear,toYear,Year,group) => {
    axios.post("http://localhost:3000/admin/sort/student", {fromYear: fromYear, toYear: toYear, Year: Year, group: group},{ withCredentials: true })
    .then((result) => {
      setStudent(result.data.results)
      })
    .catch(error => console.log(error));
  }
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
  const [inputFromYear, setFromYear1] = React.useState('');
  const [inputToYear, setToYear1] = React.useState('');
  const handleFromYear = (e) => {
    setFromYear1(e.value)
    handleSort(e.value,inputToYear,inputYear,inputGroup)
  }

  const handleToYear = (e) => {
    setToYear1(e.value)
    handleSort(inputFromYear,e.value,inputYear,inputGroup)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <Flex flexDir="column" bg="white" borderRadius="10px" h="full">
      {/* Popup */}
      <Box>
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
              width: 750,
              height: 500,
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
              <Typography level="h4">Create Student</Typography>
              <Button onClick={handleSubmit} sx={{ mr: '10px', backgroundColor: '#23395d', color:'white'}} variant="solid">
                Create
              </Button>
            </Flex>
            <Grid templateColumns="repeat(3,1fr)  " gap="2">
              <VStack spacing="3">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Name</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    variant="outlined"
                    color="neutral"
                    value={inputName}
                    onChange={handleInputName}
                  />
                  <FormLabel required>ID</FormLabel>
                  <Input
                    placeholder="Please enter id"
                    variant="outlined"
                    color="neutral"
                    value={inputID}
                    onChange={handleInputID}
                  />
                  <FormLabel required>Gender</FormLabel>
                  <SELECT_OPTIONS
                    variant="outlined"
                    color="neutral"
                    placeholder="Select gender"
                    onChange={handleSelectGender}
                    defaultValue={[gender[6], gender[6]]}
                    options={gender}
                  />
                  <FormLabel required>Email</FormLabel>
                  <Input
                    placeholder="Please enter email"
                    variant="outlined"
                    color="neutral"
                    value={inputEmail}
                    onChange={handleInputEmail}
                  />
                  <FormLabel required>Address</FormLabel>
                  <Input
                    placeholder="Please enter address"
                    variant="outlined"
                    color="neutral"
                    value={inputAddress}
                    onChange={handleInputAddress}
                  />
                  <FormLabel required>Phone Number</FormLabel>
                  <Input
                    placeholder="Please enter phone number"
                    variant="outlined"
                    color="neutral"
                    value={inputPhone}
                    onChange={handleInputPhone}
                  />
                </FormControl>
              </VStack>
              <VStack spacing="3" ml="40px">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Password</FormLabel>
                  <Input
                    startDecorator={<KeyRoundedIcon />}
                    placeholder="Password"
                    type="password"
                    endDecorator={
                      <IconButton color="neutral">
                        <VisibilityRoundedIcon />
                      </IconButton>
                    }
                    onChange={handleInputPassword}
                  />
                  <FormLabel required>From</FormLabel>
                  <Input
                    placeholder="Please enter started year"
                    variant="outlined"
                    color="neutral"
                    value={inputFrom}
                    onChange={handleInputFrom}
                  />
                  <FormLabel required>To</FormLabel>
                  <Input
                    placeholder="Please enter end year"
                    variant="outlined"
                    color="neutral"
                    value={inputTo}
                    onChange={handleInputTo}
                  />
                  <FormLabel required>Year</FormLabel>
                  <SELECT_OPTIONS
                    onChange={handleSelectYear}
                    placeholder="Select year"
                    defaultValue={[Years[6], Years[6]]}
                    options={Years}
                  >
                  </SELECT_OPTIONS>

                  <FormLabel required>Group</FormLabel>
                  <SELECT_OPTIONS
                    onChange={handleSelectGroup}
                    placeholder="Select group"
                    defaultValue={[groups[5], groups[5]]}
                    options={groups}
                  />
                  <Grid sx={{ mt: 10, }}>
                    <input style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '3px' }} type="file" onChange={handleInputPhoto} />
                  </Grid>
                </FormControl>
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
              width: 750,
              height: 500,
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
                color: 'white',
                bgcolor: '#23395d',
              }}
            />
            <Flex mb="10px" justifyContent="space-between" alignItems="center">
              <Typography level="h4">Update Student</Typography>
              <Button onClick={handleSubmitEdit} sx={{ mr: '10px', background:'#23395d' }} variant="solid">
                Update
              </Button>
            </Flex>
            <Grid templateColumns="repeat(3,1fr)  " gap="2">
              <VStack spacing="3">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Name</FormLabel>
                  <Input
                    placeholder="Please enter name"
                    variant="outlined"
                    color="neutral"
                    defaultValue={Name}
                    onChange={handleName}
                  />
                  <FormLabel required>ID</FormLabel>
                  <Input
                    placeholder="Please enter id"
                    variant="outlined"
                    color="neutral"
                    defaultValue={ID}
                    onChange={handleID}
                  />
                  <FormLabel required>Gender</FormLabel>
                  <SELECT_OPTIONS
                    variant="outlined"
                    color="neutral"
                    placeholder="Select gender"
                    onChange={handleGender}
                    defaultValue={[{ label: Gender, value: Gender }]}
                    options={gender}
                  />
                  <FormLabel required>Email</FormLabel>
                  <Input
                    placeholder="Please enter email"
                    variant="outlined"
                    color="neutral"
                    defaultValue={Email}
                    onChange={handleEmail}
                  />
                  <FormLabel required>Address</FormLabel>
                  <Input
                    placeholder="Please enter address"
                    variant="outlined"
                    color="neutral"
                    defaultValue={Address}
                    onChange={handleAddress}
                  />
                  <FormLabel required>Phone Number</FormLabel>
                  <Input
                    placeholder="Please enter phone number"
                    variant="outlined"
                    color="neutral"
                    defaultValue={Phone}
                    onChange={handlePhone}
                  />
                </FormControl>
              </VStack>
              <VStack spacing="3" ml="40px">
                <FormControl sx={{ width: '300px' }}>
                  <FormLabel required>Password</FormLabel>
                  <Input
                    startDecorator={<KeyRoundedIcon />}
                    placeholder="Password"
                    type="password"
                    endDecorator={
                      <IconButton color="neutral">
                        <VisibilityRoundedIcon />
                      </IconButton>
                    }
                    onChange={handlePassword}
                  />
                  <FormLabel required>From</FormLabel>
                  <Input
                    placeholder="Please enter started year"
                    variant="outlined"
                    color="neutral"
                    defaultValue={From}
                    onChange={handleFrom}
                  />
                  <FormLabel required>To</FormLabel>
                  <Input
                    placeholder="Please enter end year"
                    variant="outlined"
                    color="neutral"
                    defaultValue={To}
                    onChange={handleTo}
                  />
                  <FormLabel required>Year</FormLabel>
                  <SELECT_OPTIONS
                    onChange={handleYear}
                    placeholder="Select year"
                    defaultValue={[{ label: Year1, value: Year1 }]}
                    options={Years}
                  >
                  </SELECT_OPTIONS>
                  <FormLabel required>Group</FormLabel>
                  <SELECT_OPTIONS
                    onChange={handleGroup}
                    placeholder="Select group"
                    defaultValue={[{ label: Group, value: Group }]}
                    options={groups}
                  />
                  <Grid sx={{ mt: 10, }}>
                    <input style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '3px' }} type="file" onChange={handlePhoto} />
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
              width: 430,
              height: 500,
              margiTop: -30,
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
                color:'white'
              }}
            />
            <Flex mb="10px" justifyContent="space-between" alignItems="center">
              <Typography level="h4">View Student</Typography>
            </Flex>
            <Grid templateColumns="repeat(3,1fr)  " gap="2">
              <VStack spacing="3">
                <span style={{ marginLeft: '-120px', marginTop: '10px', width: 150, height: 150, border: '1px  solid gray', borderRadius: '3px', }}>
                  <img style={{ width: '100%', height: '100%' }} src={Photo} />
                </span>
                <div style={{ paddingLeft: '30px', paddingTop: '20px', width: 350, height: 300, borderRadius: '3px' }}>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Gender : </b></span>
                    <span style={{ marginLeft: '33px', color:'#517388' }}>{Gender}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Email  : </b></span>
                    <span style={{ marginLeft: '48px' , color:'#517388' }}>{Email}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Address  : </b></span>
                    <span style={{ marginLeft: '28px', color:'#517388'  }}>{Address}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Phone  : </b></span>
                    <span style={{ marginLeft: '40px', color:'#517388' }}>{Phone}</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Year   : </b></span>
                    <span style={{ marginLeft: '55px' , color:'#517388' }}>{Year1}</span>
                    <span style={{color:'#517388' }}>  [{From}-{To}]</span>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <span><b>Group     : </b></span>
                    <span style={{ marginLeft: '40px' , color:'#517388' }}>{Group}</span>
                  </div>
                </div>
                <span style={{ marginLeft: '30px', width: '110%', backgroundColor: '#23395d', marginTop: '-60px', height: 6, border: '2px  solid white ', borderRadius: '3px' }}></span>
              </VStack>
              <VStack style={{ marginTop: '40px', textAlign: 'center', fontSize: '16px' }}>
                <div>
                  <b><span style={{ marginLeft: '-110px', color:'#517388', fontSize: '20px', textTransform: 'upperCase' }}>{Name}</span></b>
                </div>
                <div>
                  <span style={{ marginLeft: '-110px', color: '#23395d' }}>{ID}</span>
                </div>
              </VStack>
            </Grid>
          </Sheet>
        </ModalView>
      </Box>

      <ModalDelete
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 350,
            height: 170,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            marginTop: '-100'
          }}
        >
          <Flex style={{marginTop:'20px',justifyContent:"space-between", textAlign:"center", margin:'auto', alignItems:"center"}}>
            <p> Are you sure you want to delete this student?</p>
          </Flex>
          <div style={{justifyConten:"space-between",textAlign:"center", alignItems:"center"}}>
            <Button sx={{ mr: '10px',mt:'20px', backgroundColor:'#CD3700', color:'white'}} onClick={handleDelete}>
                Delete
              </Button>
              <Button sx={{ mr: '10px',mt:'20px', backgroundColor:'#23395d', color:'white'}} onClick={handleCloseDelete} variant="solid">
                Cancel
            </Button>
          </div>
        </Sheet>
      </ModalDelete>


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
            {/* <Input
              sx={{ width: '80px', ml: '5px' }}
              placeholder="Start"
              variant="outlined"
              color="neutral"
            />
            <Input
              sx={{ width: '80px', ml: '5px' }}
              placeholder="end"
              variant="outlined"
              color="neutral"
            /> */}
            <FormControl sx={{ width: '200px' }}>
              <SELECT_OPTIONS
                onChange={handleFromYear}
                placeholder="From Year"
                defaultValue={[fromYear[20], fromYear[20]]}
                options={fromYear}
              >
              </SELECT_OPTIONS>
            </FormControl>
            <FormControl sx={{ width: '200px' }}>
              <SELECT_OPTIONS
                onChange={handleToYear}
                placeholder="To Year"
                defaultValue={[toYear[20], toYear[20]]}
                options={toYear}
              >
              </SELECT_OPTIONS>
            </FormControl>
            <FormControl sx={{ width: '200px'}}>
              <SELECT_OPTIONS
                onChange={handleSelectYear}
                placeholder="Select Year"
                defaultValue={[Years[20], Years[20]]}
                options={Years}
              >
              </SELECT_OPTIONS>
            </FormControl>
            <FormControl sx={{ width: '200px'}}>
              <SELECT_OPTIONS
                onChange={handleSelectGroup}
                placeholder="Select Group"
                defaultValue={[groups[20], groups[20]]}
                options={groups}
              >
              </SELECT_OPTIONS>
            </FormControl>
            <span>
            <Input
                sx={{
                  '&:hover': { '& svg': { opacity: 1 } },
                  width: '200px',  left: '910px', position:"absolute", transition: 'width 3s'
                }}
                placeholder="search ..."
                variant="outlined"
                color="neutral"
                onChange={handleSearch}
              /> 
            </span>
            <Button
            onClick={() =>
              handleSearch()
            }
            style={{ backgroundColor: '#23395d' }}
            sx={{ marginLeft: '280px' }}
            variant="solid"
            // onClick={() => history.push(`${parentUrl}/add`)}
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
          marginBottom: '20px'
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
                .map((row) => {
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
                      key={row.id}
                    >
                      <td>{row.student_id}</td>
                      <td>{row.name}</td>
                      <td>{row.gender}</td>
                      <td>{row.email}</td>
                      <td>{row.year}</td>
                      <td>{row.group_name}</td>
                      <td>
                        <Center spacing={2} gap="6">
                          <IconButton
                            onClick={() =>
                              handleView(row.student_id)
                            }
                            variant="ghost"
                            color="#78909c"
                            cursor="pointer"
                            bg="none"
                            size="sm"
                            border="none"
                            icon={<MdRemoveRedEye color="#4682B4" size="1.3rem" />}
                          />

                          <IconButton
                            variant="ghost"
                            cursor="pointer"
                            color="#78909c"
                            border="none"
                            bg="none"
                            size="sm"
                            icon={<HiOutlinePencilAlt color="#03A89E" size="1.3rem" />}
                            onClick={() => {
                              handleEdit(row.student_id)
                            }
                            }
                          />
                          <IconButton
                            onClick={() => {
                              onDeleteModalOpen(row.student_id);
                            }}
                            size="sm"
                            variant="ghost"
                            cursor="pointer"
                            border="none"
                            bg="none"
                            color="#78909c"
                            icon={<HiOutlineTrash color="#CD3700" size="1.3rem" />}
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
                    <Typography textAlign="center" fontSize="12px" sx={{ minWidth: 80 }}>
                      {labelDisplayedRows({
                        from:
                          rows.length === 0 ? 0 : page * rowsPerPage + 1,
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
                            ? page >=
                            Math.ceil(rows.length / rowsPerPage) - 1
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

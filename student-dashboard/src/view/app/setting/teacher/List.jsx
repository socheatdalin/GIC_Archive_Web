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
import axios from "axios";
import PropTypes from 'prop-types';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
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
  return new Promise((resolve,reject) => {
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
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
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
              style={{ textAlign: 'center', backgroundColor: '#23395d', color:'white' }}
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


const Years = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
]

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
  const [inputName,setInputName] = React.useState('');
  const [inputGender,setInputGender] = React.useState('');
  const [inputAddress,setInputAddress] = React.useState('');
  const [inputEmail,setInputEmail] = React.useState('');
  const [inputPhone,setInputPhone] = React.useState('');
  const [inputPassword,setInputPassword] = React.useState('');
  const [inputID,setInputID] = React.useState('')
  const [inputPhoto,setInputPhoto] = React.useState('')
  const [openEdit, setOpenEdit] = React.useState(false);
  const [Name,setName] = React.useState('');
  const [Gender,setGender] = React.useState('');
  const [Address,setAddress] = React.useState('');
  const [Email,setEmail] = React.useState('');
  const [Phone,setPhone] = React.useState('');
  const [Password,setPassword] = React.useState('old');
  const [oldID,set_oldID] = React.useState('')
  const [ID,setID] = React.useState('')
  const [Photo,setPhoto] = React.useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [inputFromYear1, setFromYear1] = React.useState('');
  const [inputToYear1, setToYear1] = React.useState('');
  const [inputYear, setInputYear] = React.useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState('');

  const handleCloseDelete = () => {
    setOpenDelete(false)
   }
  
  const onDeleteModalOpen = async (id) => {
    setDeleteID(id)
    setOpenDelete(true)
  }

  const handleSearch = (e) => {
    // console.log(search)
    axios.post("http://localhost:3000/admin/search/teacher",{search:e.target.value},{ withCredentials: true })
    .then((result) => {
      setTeacher(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleSort = (fromYear,toYear,Year) => {
    axios.post("http://localhost:3000/admin/sort/teacher", {fromYear: fromYear, toYear: toYear, Year: Year},{ withCredentials: true })
    .then((result) => {
      setTeacher(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleDelete = async () => {
    axios.get("http://localhost:3000/admin/delete/teacher/"+ deleteID,{ withCredentials: true })
    .then((result) => {
      window.location.replace('/teacher/list')
      })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    teachers();
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

  const handleSelectYear = (e) => {
    setInputYear(e.value)
    handleSort(inputFromYear1,inputToYear1,e.value)
  }

  const handleFromYear = (e) => {
    setFromYear1(e.value)
    handleSort(e.value,inputToYear1,inputYear)
  }

  const handleToYear = (e) => {
    setToYear1(e.value)
    handleSort(inputFromYear1,e.value,inputYear)
  }

  const gender = [
    { value: 'F', label: 'Female' },
    { value: 'M', label: 'Male' },
  ]

  const handlePassword = async (e) => {
    setPassword(e.target.value)
  }
  
  const handleInputName = async (e) => {
    setInputName(e.target.value)
  }

  const handleInputID = async (e) => {
    setInputID(e.target.value)
  }

  const handleSelectGender = async (event) => {
      setInputGender(event);
  };

  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputAddress = async (e) => {
    setInputAddress(e.target.value)
  }

  const handleInputPhone = async (e) => {
    setInputPhone(e.target.value)
  }

  const handleInputPhoto = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setInputPhoto(base64)
  }

  const handlePhoto = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setPhoto(base64)
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
  
  const handleEdit = async (teacher_id) => {
    console.log(teacher_id)
    await axios.get("http://localhost:3000/admin/displayOne/teacher/"+teacher_id,{ withCredentials: true })
        .then((result) => {
            setAddress(result.data.results[0].address)
            setEmail(result.data.results[0].email)
            setName(result.data.results[0].name)
            setID(result.data.results[0].id)
            set_oldID(result.data.results[0].id)
            setGender(result.data.results[0].gender)
            setPhone(result.data.results[0].phone)
            setPhoto(result.data.results[0].photo)
          })
        .catch(error => console.log(error));
    setOpenEdit(true);
  }
const [courses,setCoures] = React.useState([])
const [years,setYears] = React.useState([])
const [froms,setFroms] = React.useState([])
const [tos,setTos] = React.useState([])
function courseTable() {
  return (
    <div style={{border:'1px solid silver',boxShadow:'2px 2px 2px gray',margin:'auto',marginTop:'-10px', padding: '20px'}}>
      <span>COURSETABLE</span>
      <Grid templateColumns="repeat(4,2fr)" gap="2">
        <VStack spacing="5" style={{margin:'auto'}}>
          <div style={{textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black',backgroundColor: '#23395d', color: 'white'}}>Course</div>
          {(
            courses.map((date,index) =>
            <span style={{ margin: '0px',textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black'}}>
              <div>
                {date}
              </div>
            </span>
            ))
          }
        </VStack>
        <VStack spacing="5" style={{margin:'auto'}}>
          <div style={{textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black',backgroundColor: '#23395d', color: 'white'}}>Year</div>
          {(
            years.map((year) =>
            <span style={{ margin: '0px',textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black'}}>
              <div>
                {year}
              </div>
            </span>
            ))
          }
        </VStack>
        <VStack spacing="5" style={{margin:'auto'}}>
          <div style={{textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black',backgroundColor: '#23395d', color: 'white'}}>From</div>
          {(
            froms.map((room,index) =>
            <span style={{ margin: '0px',textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black'}}>
              <div>
                {room}
              </div>
            </span>
            ))
          }
        </VStack>
        <VStack spacing="5" style={{margin:'auto'}}>
          <div style={{textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black',backgroundColor: '#23395d', color: 'white'}}>To</div>
          {(
            tos.map((group,index) =>
            <span style={{ margin: '0px',textAlign:'center',paddingTop:'10px', paddingBottom:'10px', width:'120px', border:'1px solid black'}}>
              <div>
                {group}
              </div>
            </span>
            ))
          }
        </VStack>
      </Grid>
    </div>
  )
}
  const handleView = async (teacher_id) => {
    await axios.get("http://localhost:3000/admin/seeDetail/teacher/"+teacher_id,{ withCredentials: true })
        .then((result) => {
            setAddress(result.data.results.address)
            setEmail(result.data.results.email)
            setName(result.data.results.name)
            setID(result.data.results.teacher_id)
            setGender(result.data.results.gender)
            setPhone(result.data.results.phone)
            setPhoto(result.data.results.photo)
            // console.log(result.data.results.photo)
            setCoures(result.data.results.course)
            setYears(result.data.results.year)
            setFroms(result.data.results.FromYear)
            setTos(result.data.results.ToYear)
          })
        .catch(error => console.log(error));
    setOpenView(true);
  }

  const handleSubmit = async () => {
    axios.post("http://localhost:3000/admin/signUp/teacher",{address:inputAddress, name: inputName, email: inputEmail,gender: inputGender.value,id: inputID,password: inputPassword, phone: inputPhone, photo: inputPhoto},{ withCredentials: true })
        .then((result) => {
          window.location.replace('/teacher/list')
          })
        .catch(error => console.log(error));
  }

  const handleInputPassword = async (e) => {
    setInputPassword(e.target.value)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSubmitEdit = async () => {
    await axios.post("http://localhost:3000/admin/update/teacher",{address:Address, name: Name, email: Email,old_id: oldID,gender: Gender, new_id: ID,password: Password, phone: Phone, photo: Photo},{ withCredentials: true })
               .then((result) => {
                    console.log("hello")
                    setOpenEdit(false);
                    window.location.replace('/teacher/list')
                })
               .catch(error => console.log(error));
        }

  const teachers = async () => {
      axios.get("http://localhost:3000/admin/displayAll/teacher",{ withCredentials: true })
        .then((result) => {
          setTeacher(result.data.results)
          })
        .catch(error => console.log(error));
  };
  
  const rows = teacher;
  const [toYear, setToYear] = React.useState([]);
  const [fromYear, setFromYear] = React.useState([]);
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
            <p> Are you sure you want to delete this teacher?</p>
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
              <Flex
                mb="10px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography level="h4">Create Teacher</Typography>
                <Button onClick={handleSubmit} sx={{ mr: '10px', backgroundColor: '#23395d', color:'white'}} variant="solid">
                  Create
                </Button>
              </Flex>
              <Grid templateColumns="repeat(4,1fr)  " gap="2">
                <VStack spacing="3">
                  <FormControl sx={{ width: '300px' }}>
                    <FormLabel required>Name</FormLabel>
                    <Input
                      placeholder="Please enter name"
                      defaultValue=''
                      variant="outlined"
                      color="neutral"
                      onChange={handleInputName}
                    />
                    <FormLabel required>Gender</FormLabel>
                    <SELECT_OPTIONS
                      variant="outlined"
                      color="neutral"
                      placeholder="Select gender"
                      onChange={handleSelectGender}
                      defaultValue={[gender[4], gender[5]]}
                      options={gender}
                    />
                    <FormLabel required>ID</FormLabel>
                    <Input
                      placeholder="Please enter id"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      onChange={handleInputID}
                    />
                    <FormLabel required>Email</FormLabel>
                    <Input
                      placeholder="Please enter email"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      onChange={handleInputEmail}
                    />
                  </FormControl>
                </VStack>
                <VStack spacing="3" ml="40px">
                  <FormControl sx={{ width: '300px' }}>
                    <FormLabel required>Address</FormLabel>
                    <Input
                      placeholder="Please enter address"
                      variant="outlined"
                      color="neutral"
                      onChange={handleInputAddress}
                    />
                    <FormLabel required>Phone Number</FormLabel>
                    <Input
                      placeholder="Please enter phone number"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      onChange={handleInputPhone}
                    />
                    <FormLabel required>Password</FormLabel>
                    <Input
                      startDecorator={<KeyRoundedIcon />}
                      placeholder="Password"
                      type="password"
                      defaultValue=''
                      endDecorator={
                        <IconButton color="neutral">
                          <VisibilityRoundedIcon />
                        </IconButton>
                      }
                      onChange={handleInputPassword}
                    />
                  </FormControl>
                  <Grid sx={{mt:10,}}>
                    <input style={{marginTop: '20px', marginBottom: '20px', marginLeft:'3px'}} type="file" onChange={handleInputPhoto}/>
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
              <Flex
                mb="10px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography level="h4">Update Teacher</Typography>
                <Button onClick={handleSubmitEdit} sx={{ mr: '10px',background:'#23395d'  }} variant="solid">
                  Update
                </Button>
              </Flex>
              <Grid templateColumns="repeat(4,1fr)  " gap="2">
                <VStack spacing="3">
                  <FormControl sx={{ width: '300px' }}>
                    <FormLabel required>Name</FormLabel>
                    <Input
                      placeholder="Please enter name"
                      defaultValue=''
                      variant="outlined"
                      color="neutral"
                      value={Name}
                      onChange={handleName}
                    />
                    <FormLabel required>Gender</FormLabel>
                    <SELECT_OPTIONS
                      variant="outlined"
                      color="neutral"
                      placeholder="Select gender"
                      onChange={handleGender}
                      defaultValue={[{label:Gender, value: Gender}]}
                      options={gender}
                    />
                    <FormLabel required>ID</FormLabel>
                    <Input
                      placeholder="Please enter id"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      value={ID}
                      onChange={handleID}
                    />
                    <FormLabel required>Email</FormLabel>
                    <Input
                      placeholder="Please enter email"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      value={Email}
                      onChange={handleEmail}
                    />
                  </FormControl>
                </VStack>
                <VStack spacing="3" ml="40px">
                  <FormControl sx={{ width: '300px' }}>
                    <FormLabel required>Address</FormLabel>
                    <Input
                      placeholder="Please enter address"
                      variant="outlined"
                      color="neutral"
                      value={Address}
                      onChange={handleAddress}
                    />
                    <FormLabel required>Phone Number</FormLabel>
                    <Input
                      placeholder="Please enter phone number"
                      variant="outlined"
                      defaultValue=''
                      color="neutral"
                      value={Phone}
                      onChange={handlePhone}
                    />
                    <FormLabel required>Password</FormLabel>
                    <Input
                      startDecorator={<KeyRoundedIcon />}
                      placeholder="Password"
                      type="password"
                      defaultValue=''
                      endDecorator={
                        <IconButton color="neutral">
                          <VisibilityRoundedIcon />
                        </IconButton>
                      }
                      onChange={handlePassword}
                    />
                    <Grid sx={{mt:10,}}>
                      <input style={{marginTop: '20px', marginBottom: '20px', marginLeft:'3px'}} type="file" onChange={handlePhoto}/>
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
                width: 660,
                height: 680,
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
              <Flex
                mb="10px"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography level="h4">View Teacher</Typography>
              </Flex>
              <Grid  templateColumns="repeat(2,1fr)  " gap="1">
                <VStack spacing="1">
                  <span style={{marginLeft:'70px' , marginTop:'40px', width: 150, height: 150, border:'1px  solid #23395d', borderRadius: '3px', }}>
                    <img style={{width:'100%', height:'100%'}} src={Photo} />
                  </span>
                </VStack>
                <VStack>
                      <div style={{ paddingLeft: '40px',paddingTop:'20px' ,width: 320, height: 240, borderRadius: '3px' }}>
                          {/* <div>
                            <b><span style={{marginTop:'-10px', marginLeft:'80px', color:'#517388',fontSize:'20px',textTransform:'upperCase'}}>{Name}</span></b>
                          </div>
                          <div>
                            <span style={{marginLeft:'80px',color:'#1E3A4C'}}>{ID}</span>
                          </div> */}
                          <div style={{marginTop:'10px'}}>
                            <span><b>Name : </b></span>
                            <span style={{marginLeft:'33px', color:'#517388'}}>{Name}</span>
                          </div>
                          <div style={{marginTop:'10px'}}>
                            <span><b>ID  : </b></span>
                            <span style={{marginLeft:'68px', color:'#517388'}}>{ID}</span>
                          </div>
                          <div style={{marginTop:'10px'}}>
                            <span><b>Gender : </b></span>
                            <span style={{marginLeft:'33px', color:'#517388'}}>{Gender}</span>
                          </div>
                          <div style={{marginTop:'10px'}}>
                            <span><b>Email  : </b></span>
                            <span style={{marginLeft:'48px', color:'#517388'}}>{Email}</span>
                          </div>
                          <div style={{marginTop:'10px'}}>
                            <span><b>Address  : </b></span>
                            <span style={{marginLeft:'28px', color:'#517388'}}>{Address}</span>
                          </div>
                          <div style={{marginTop:'10px'}}>
                            <span><b>Phone  : </b></span>
                            <span style={{marginLeft:'40px', color:'#517388'}}>{Phone}</span>
                          </div>
                      </div>
                      <div style={{position: 'absolute', top:'330px', left:'68px'}}>
                        {courseTable()}
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
          ><FormControl sx={{ width: '200px' }}>
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
            sx={{ position:'absolute',right:'105px' }}
            variant="solid"
            // onClick={() => history.push(`${parentUrl}/add`)}
            >
              <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
            </Button>
          </Flex>
          <Grid h="42px" mr="10px">
            <Button
              sx={{ width: '75px',backgroundColor: '#23395d' }}
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
                ml:1,
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
                          key={row.name}
                        >
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          <td>{row.gender}</td>
                          <td>{row.email}</td>
                          <td>{row.phone}</td>
                          <td>{row.address}</td>
                          <td>
                          <Center spacing={2} gap="6">
                            {/* {console.log(id)} */}
                            <IconButton
                              onClick={() => 
                                handleView(row.id)
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
                                  handleEdit(row.id)
                                }
                              }
                            />
                            <IconButton
                              onClick={() => {
                                onDeleteModalOpen(row.id);
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
                        <Typography textAlign="center" sx={{ minWidth: 80 }}>
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

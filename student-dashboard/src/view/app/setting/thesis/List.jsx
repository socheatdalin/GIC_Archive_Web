import { Center, Flex, Grid, IconButton, InputGroup, VStack, useDisclosure, } from '@chakra-ui/react';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SELECT_OPTIONS from 'react-select';
import Table from '@mui/joy/Table';
import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlusCircle, HiDocumentText } from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import { useEffect } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModalEdit from '@mui/joy/Modal'
import ModalDelete from '@mui/joy/Modal'
import ModalCreate from '@mui/joy/Modal'
import ModalView from '@mui/joy/Modal'
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalClose, Option, Select, Sheet, Typography } from '@mui/joy';

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

const columnsHeight = 0;
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'Title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'student_id',
    numeric: false,
    disablePadding: false,
    label: 'Student Name',
  },
  {
    id: 'teacher_id',
    numeric: false,
    disablePadding: false,
    label: 'Supervisor Name',
  },
  {
    id: 'field',
    numeric: true,
    disablePadding: false,
    label: 'field',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'Company',
  },

  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

const Fields = [
  { value: 'Web', label: 'Web' },
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Network', label: 'Network' },
  { value: 'Data Science', label: 'Data Science' },
]
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const animatedComponents = makeAnimated();
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
              style={{ textAlign: 'center', backgroundColor: '#23395d', color: 'white', width: '100%' }}
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

var countSearch = 1;
var countClick = 1;
export default function List() {
  const [searchOpen, setSearchOpen] = useState(false)
  // const { onOpen: onDeleteModalOpen } = useDisclosure();
  const [thesis, setthesis] = React.useState([]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [inputName, setInputName] = React.useState('');
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const [inputGit, setInputGit] = React.useState('');
  const [inputType, setInputType] = React.useState('');
  const [inputCompany, setInputCompany] = React.useState('');
  const [inputTag, setInputTags] = React.useState('');
  const [ID, setID] = React.useState('')
  const [Name, setName] = React.useState('');
  const [Desc, setDesc] = React.useState('');
  const [InputTeacherName, setInputTeacher_name] = React.useState('');
  const [Type, setType] = React.useState('');
  const [id, setid] = React.useState('');
  const [Photo, setPhoto] = React.useState('');
  const [deleteID, setDeleteID] = React.useState('');
  const [inputFile, setInputFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [inputField, setInputField] = React.useState('');
  const [inputPhoto, setInputPhoto] = React.useState('');
  const [Teacher, setTeacher] = React.useState('');
  const [Files, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [length, setLength] = useState([])
  const [index, setIndex] = useState('');

  const rows = thesis;
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
  useEffect(() => {

    Thesis();
  }, [])

  const [search1, setSearch1] = useState('');
  const searchValue = (e) => {
    setSearch1(e.target.value)
  }
  const handlePhoto = async (e) => {
    setInputPhoto(e.target.files[0]);
  }
  const handleInputGit = (e) => {
    setInputGit(e.target.value)
  }
  const handleSelectType = (e) => {
    setInputType(e)
  }

  const handleInputName = async (e) => {
    setInputName(e.target.value)
  }

  const handleInputCompany = async (e) => {
    setInputCompany(e.target.value)
  }
  const handleInputFile = async (e) => {
    setInputFile(e.target.files[0])
  }
  const handleInputTitle = async (e) => {
    setInputTitle(e.target.value)
  }
  const handleInputTags = async (e) => {
    setInputTags(e.target.value)
  }
  const handleInputDesc = async (e) => {
    setInputDesc(e.target.value)
  }

  const handleInputField = async (e) => {
    setInputField(e.target.value)
  }
  const handleOpenUpload = async () => {
    // setOpen(true);
    window.location.replace(`http://localhost:3000/upload`);
  };

  const handleName = async (e) => {
    setName(e.target.value)
  }

  const handleID = async (e) => {
    setID(e.target.value)
  }
  const handleTeacherName = async (e) => {
    setInputTeacher_name(e.target.value)
  }

  const handleDesc = async (e) => {
    setDesc(e.target.value)
  }
  const handleOpenFile = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSearch = (e) => {
    // console.log(search)
    axios.post("http://localhost:3001/admin/thesis/all/field", { field: inputField }
    ).then((result) => {
      setthesis(result.data)
    })
      .catch(error => console.log(error));
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDisplay = async () => {

    const response = await axios.get("http://localhost:3001/admin/team_project/all");
    setName(response.data[0].project_name)
    setID(response.data[0].id)
    setDesc(response.data[0].descr)
  }

  const handleView = async (thesis_id) => {

    await axios.get("http://localhost:3001/admin/thesis/all/" + thesis_id)
      .then((result) => {
        console.log(result.data);
        setID(result.data[0].thesis_id);
        setInputName(result.data[0].student_username);
        setInputTitle(result.data[0].title);
        setInputDesc(result.data[0].descr);
        setInputCompany(result.data[0].company);
        setInputTags(result.data[0].tags);
        setInputType(result.data[0].field);
        setInputTeacher_name(result.data[0].teacher_username)
        setInputGit(result.data[0].github_url);
        setFileName(result.data[0].fileName);
        setInputFile(result.data[0].filepath);
      })

      .catch(error => console.log(error));
    setOpenView(true);
  }

  const handleSubmitEdit = async () => {

    setOpenEdit(false);
    window.location.replace('/home/thesis/list')
  }
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', inputName);
    formData.append('title', inputTitle);
    formData.append('field', inputType.value);
    formData.append('company', inputCompany);
    formData.append('teacher_name', InputTeacherName)
    formData.append('descr', inputDesc);
    formData.append('github_url', inputGit);
    formData.append('tags', inputTag);
    formData.append('file', inputFile);
    console.log(formData.get('file'));

    axios.post("http://localhost:3001/admin/thesis/create", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((result) => {
        console.log(result);
        // console.log("hello");
        window.location.replace('/home/thesis/list')
      })
      .catch(error => console.log(error));
  }

  const onDeleteModalOpen = async (id) => {
    setDeleteID(id)
    setOpenDelete(true)
  }
  const handleCreate = async (course_id) => {
    setid(course_id)
    setOpenCreate(true);
  }

  const Thesis = async () => {
    axios.get("http://localhost:3001/me", {
      headers: {
        'Authorization': sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then((result) => {
        console.log(result.data);
        console.log(result.data.name);
        axios.get("http://localhost:3001/student/thesis/" + result.data.name)
          .then((results) => {
            setthesis(results.data)
            console.log(results.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => {
        console.log("Server error:", err);
      });

  };

  const handleDelete = async () => {
    axios.post("http://localhost:3001/admin/project/delete/" + deleteID)
      .then((result) => {
        console.log("delete success");
        window.location.replace('/home/project/list')
      })
      .catch(error => console.log(error));
  }

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
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <Flex flexDir="column" mt='10px' bg="white" borderRadius="10px" h="full">
      {/* Popup */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 700,
            height: 460,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            marginTop: '-100'
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
              bgcolor: 'white',
            }}
          />
          <Flex mb="10px" justifyContent="space-between" alignItems="center">
            <Typography level="h4">Create Thesis</Typography>
            <Button onClick={handleSubmit} sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d' }} variant="solid">
              Create
            </Button>
          </Flex>
          <Grid templateColumns="repeat(4,1fr)  " gap="2">
            <VStack spacing="3">
              <FormControl sx={{ width: '300px' }}>
                <FormLabel required>Title</FormLabel>
                <Input
                  placeholder="Please enter title"
                  type='text'
                  id='title'
                  defaultValue=''
                  variant="outlined"
                  color="neutral"
                  onChange={handleInputTitle}
                />
                <FormLabel required>Student Name</FormLabel>
                <Input
                  placeholder="Please enter student's name "
                  type='text'
                  id='username'
                  defaultValue=''
                  variant="outlined"
                  color="neutral"
                  onChange={handleInputName}
                />
                <FormLabel required>Supervisor Name</FormLabel>
                <Input
                  placeholder="Please enter supervisor's name "
                  type='text'
                  id='teacher_name'
                  defaultValue=''
                  variant="outlined"
                  color="neutral"
                  onChange={handleTeacherName}
                />
                <FormLabel required>Company </FormLabel>
                <Input
                  placeholder="Please enter your company"
                  variant="outlined"
                  defaultValue=''
                  type='text'
                  color="neutral"
                  onChange={handleInputCompany}
                />
                <FormLabel required>Field</FormLabel>
                <SELECT_OPTIONS
                  variant="outlined"
                  color="neutral"
                  placeholder="Select Field"
                  onChange={handleSelectType}
                  defaultValue={[Fields[4], Fields[5]]}
                  options={Fields}
                />

              </FormControl>
            </VStack>
            <VStack spacing="3" ml="40px">
              <FormControl sx={{ width: '300px' }}>
                <FormLabel required>tags</FormLabel>
                <Input
                  placeholder="Please enter your intro project"
                  variant="outlined"
                  defaultValue=''
                  type='text'
                  color="neutral"
                  onChange={handleInputTags}
                />
                <FormLabel required>Git</FormLabel>
                <Input
                  placeholder="Please enter your link URL"
                  variant="outlined"
                  defaultValue=''
                  type='url'
                  color="neutral"
                  onChange={handleInputGit}
                />
                <FormLabel required>Description</FormLabel>
                <TextField
                  multiline
                  rows={3}
                  placeholder="Type your message here"
                  variant="outlined"
                  defaultValue=""
                  value={inputDesc}
                  onChange={handleInputDesc}
                  fullWidth
                  required
                />
              </FormControl>
              <Grid sx={{ mt: 10, }}>
                <input style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '3px' }} type="file" name='file' onChange={handleInputFile} />
              </Grid>
            </VStack>
          </Grid>
        </Sheet>
      </Modal>

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
          <Flex style={{ marginTop: '20px', justifyContent: "space-between", textAlign: "center", margin: 'auto', alignItems: "center" }}>
            <p> Are you sure you want to delete this course?</p>
          </Flex>
          <div style={{ justifyConten: "space-between", textAlign: "center", alignItems: "center" }}>
            <Button sx={{ mr: '10px', mt: '20px', backgroundColor: '#CD3700', color: 'white' }} onClick={handleDelete}>
              Delete
            </Button>
            <Button sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d', color: 'white' }} onClick={handleCloseDelete} variant="solid">
              Cancel
            </Button>
          </div>
        </Sheet>
      </ModalDelete>
      <ModalEdit
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 900,
            height: 700,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            marginTop: '-100',
            overflowX: 'auto'
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
              bgcolor: 'white',
            }}
          />
          <Flex mb="10px" justifyContent="space-between" alignItems="center">
            <Typography level="h4">Update Course</Typography>
            <Button sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d', color: 'white' }} onClick={handleSubmitEdit} variant="solid">
              Update
            </Button>
          </Flex>
          <Grid templateColumns="repeat(4,1fr)  ">
            <VStack>
              <FormControl sx={{ width: '150px' }}>
                <FormLabel required>ID</FormLabel>
                <Input
                  placeholder="Please enter course id"
                  variant="outlined"
                  color="neutral"
                  value={ID}
                  onChange={handleID}
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl sx={{ width: '150px', marginLeft: '-50px' }}>
                <FormLabel required>Name</FormLabel>
                <Input
                  placeholder="Please enter course name"
                  variant="outlined"
                  color="neutral"
                  value={Name}
                  onChange={handleName}
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl sx={{ width: '150px', marginLeft: '-50px', marginBottom: '30px' }}>
                <FormLabel required>Teacher ID</FormLabel>
                <Input
                  placeholder="Please enter teacher ID"
                  variant="outlined"
                  color="neutral"
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl sx={{ width: '150px', marginLeft: '-50px' }}>
                <FormLabel required>Semester</FormLabel>
                <FormLabel required>Type</FormLabel>
                <Input
                  placeholder="Please enter Type"
                  variant="outlined"
                  color="neutral"
                  value={Type}
                // onChange={handleTeach}
                />
              </FormControl>
            </VStack>
          </Grid>
          <Grid templateColumns="repeat(1,1fr) " gap="2" style={{ marginLeft: '30px', marginRight: '50px' }}>
            <FormControl>
              <Grid mt={-10}>
                <input style={{ marginBottom: '20px', marginLeft: '3px' }} type="file" name='pdfFiles' onChange={handlePhoto} />
              </Grid>
              <FormLabel style={{ marginTop: '-10px' }} required>Description</FormLabel>
              <TextField
                multiline
                rows={3}
                placeholder="Type your message here"
                variant="outlined"
                defaultValue={Desc}
                onChange={handleDesc}
                fullWidth
                required
              />
              {/* {handleData()} */}
            </FormControl>
          </Grid>
        </Sheet>
      </ModalEdit>

      <ModalView
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openView}
        onClose={() => setOpenView(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 600,
            height: 450,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            marginTop: '-100',
            overflowX: 'auto'
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '10%',
              bgcolor: 'white',
              right: '10px',
              top: '10px'
            }}
          />
          <Flex mb="10px" justifyContent="space-between" alignItems="center">
            <Typography level="h4">Thesis</Typography>
          </Flex>
          <Grid >
            <VStack style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px' }}>
              <div style={{ paddingLeft: '30px', width: 500, height: 200, borderRadius: '3px' }}>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Title : </b></span>
                  <span style={{ marginLeft: '170px', color: '#517388' }}>{inputTitle}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Student Name : </b></span>
                  <span style={{ marginLeft: '95px', color: '#517388' }}>{inputName}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Supervisor Name : </b></span>
                  <span style={{ marginLeft: '75px', color: '#517388' }}>{InputTeacherName}</span>
                </div>
                <div style={{ marginTop: '10px', display: 'flex' }}>
                  <div><b>Description : </b></div>
                  <span style={{ marginLeft: '125px', color: '#517388', display: 'block', width: 250 }}>{inputDesc}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Company: </b></span>
                  <span style={{ marginLeft: '150px', color: '#517388' }}>{inputCompany}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Tag:</b></span>
                  <span style={{ marginLeft: '180px', color: '#517388' }}>{inputTag}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span><b>Field   : </b></span>
                  <span style={{ marginLeft: '180px', color: '#517388' }}>{inputType}</span>
                </div>
                <div style={{ marginTop: '20px', display: 'flex' }} >
                  <div><b>File:</b></div>
                  <button onClick={() => handleOpenFile(`http://localhost:3001/static/${inputFile}`)} style={{ marginLeft: '180px', borderRadius: '5px', backgroundColor: 'skyblue', padding: '5px' }} type='button' >{fileName}</button>
                </div>
              </div>
            </VStack>
          </Grid>
        </Sheet>
      </ModalView>

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
                  width: '200px', left: '910px', position: "absolute", transition: 'width 3s'
                }}
                placeholder="search by field ..."
                variant="outlined"
                color="neutral"
                onChange={handleInputField}
              />
            </span>
            <Button
              onClick={() =>
                handleSearch()
              }
              style={{ backgroundColor: '#23395d' }}
              sx={{ position: 'absolute', right: '105px' }}
              variant="solid"
            >
              <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
            </Button>
          </Flex>
          <Grid h="42px" mr="10px">
            <Link to="/upload">
              <Button
                sx={{ width: '75px', backgroundColor: '#23395d' }}
                variant="solid"
                // onClick={() => setOpen(true)}
                onClick={handleOpenUpload}
              >
                Add
              </Button>
            </Link>
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
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  return (
                    <tr
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      spacing={2}
                      style={{
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                      key={row.name}
                    >
                      <td>{row.thesis_id}</td>
                      <td>{row.title}</td>
                      <td>{row.student_username}</td>
                      <td>{row.teacher_username}</td>
                      <td>{row.field}</td>
                      <td>{row.company}</td>
                      <td>
                        <Center spacing={2} gap="8">
                          <IconButton
                            onClick={() => handleView(row.thesis_id)}
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
                              handleDisplay(row.thesis_id, 'edit')
                            }
                            }
                          />
                          <IconButton
                            onClick={() => {
                              onDeleteModalOpen(row.thesis_id);
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
                <td colSpan={9}>
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
    </Flex >
  );
} 

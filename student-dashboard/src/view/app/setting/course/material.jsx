import {
    Center,
    Flex,
    Grid,
    IconButton,
    VStack,
    useDisclosure,
  } from '@chakra-ui/react';
  import makeAnimated from 'react-select/animated';
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
      label: 'No',
    },
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Title',
    },
    {
      id: 'date',
      numeric: true,
      disablePadding: false,
      label: 'Upload At',
    },
    {
      id: 'time',
      numeric: false,
      disablePadding: false,
      label: 'Time',
    },
    {
        id: 'group',
        numeric: false,
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
                style={{ textAlign: 'center', textDecoration: 'bold', backgroundColor: '#23395d', color: 'white', borderColor: 'skyblue' }}
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
  
  const groups = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' }
  ]
  
  export default function Materials() {
    const { onOpen: onDeleteModalOpen } = useDisclosure();
    var [material, setMaterial] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [inputTitle,setInputTitle] = React.useState('');
    const [inputFile,setInputFile] = React.useState('')
    const [openEdit, setOpenEdit] = React.useState(false);
    const [Group, setGroup] = useState([]);

    useEffect(() => {
      materials();
    }, [])
  
    const handleInputTitle = async (e) => {
      setInputTitle(e.target.value)
    }
    
    const handleInputGroup = async (e) => {
      setInputGroup(e.target.value)
    }

    const handleInputFile = async (e) => {
      const base64 = await convertToBase64(e.target.files[0]);
      setInputFile(base64)

    }
  

    const handleSelectGroup = (e) => {
        setGroup(e)
      }
    
    
  const handleEdit = async (id) => {
      let course_id = localStorage.getItem('course_id')
      localStorage.setItem('id',id)
      axios.post("http://localhost:3000/admin/displayOne/material",{course_id:course_id,id: id},{ withCredentials: true })
      .then((result) => {
          // console.log(result.data.results[0])
          // setMaterial(result.data.results[0])
          setInputTitle(result.data.results[0].title)
          setInputGroup(result.data.results[0]._group)
          setInputFile(result.data.results[0]._file)
          console.log()
          // window.location.replace(`/course/${course_id}/material/${id}`)
        })
      .catch(error => console.log(error));
      setOpenEdit(true);
    }
 
const handleUpload = async () => {
    var now = new Date();
    const time = now.getHours() +':'+ now.getMinutes()
    const date =  now.getDate() + '-' + (now.getMonth() + 1) +'-'+ now.getFullYear();
    let id = localStorage.getItem('course_id')
    for (let i=0 ; i<Group.length ; i++){
        axios.post("http://localhost:3000/admin/upload/material",{course_id: id,title: inputTitle, time: time, date: date, group: Group[i].value,file: inputFile},{ withCredentials: true })
            .catch(error => console.log(error));
        }
        window.location.replace(`/course/${id}/materials`)
    }
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSubmitEdit = async () => {
      let id = localStorage.getItem('id')
      axios.post("http://localhost:3000/admin/update/material",{id: id, title: inputTitle, group: inputGroup,file: inputFile },{ withCredentials: true })
          .then((result) => {
            // console.log(result.data.results)
            setOpenEdit(false);
            })
          .catch(error => console.log(error));
            window.location.replace(`/course/${id}/materials`)
          }
    const materials = async () => {
        let id = localStorage.getItem('course_id')
        axios.get("http://localhost:3000/admin/displayAll/material/"+id,{ withCredentials: true })
          .then((result) => {
            // console.log(result.data.results)
            setMaterial(result.data.results)
            })
          .catch(error => console.log(error));
    };
    const [inputGroup,setInputGroup] = useState('')

    const handleView = async (id) => {
        let course_id = localStorage.getItem('course_id')
        localStorage.setItem('id',id)
          window.location.replace(`/course/${course_id}/material/${id}`)
        }

    const rows = material;
    const [searchOpen, setSearchOpen] = useState(false)
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
    const animatedComponents = makeAnimated();
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
    var countSearch = 1;
    const handleSearch = () => {
      countSearch = countSearch + 1
      if (countSearch % 2 === 0) {
        setSearchOpen(true)
      } else {
        setSearchOpen(false)
      }
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
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
    
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
                  width: 350,
                  height: 300,
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
                  <Typography level="h4">Upload Material</Typography>
                  <Button onClick={handleUpload} sx={{ mr: '10px',mt:'10px', backgroundColor:'#23395d', color:'white' }} variant="solid">
                    Upload
                  </Button>
                </Flex>
                <Grid templateColumns="repeat(4,1fr)  " gap="2">
                  <VStack spacing="3">
                    <FormControl sx={{ width: '300px' }}>
                      <FormLabel required>Titile </FormLabel>
                      <Input
                        placeholder="Please enter title"
                        defaultValue=''
                        variant="outlined"
                        color="neutral"
                        onChange={handleInputTitle}
                      />
                      <FormLabel required>Group</FormLabel>
                        <SELECT_OPTIONS
                        onChange={handleSelectGroup}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={[groups[20], groups[20]]}
                        isMulti
                        options={groups}
                        />    
                       <Grid sx={{mt:10,}}>
                        <input style={{marginTop: '20px', marginBottom: '20px', marginLeft:'3px'}} type="file" onChange={handleInputFile}/>
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
                  width: 350,
                  height: 300,
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
                  <Typography level="h4">Update material</Typography>
                  <Button onClick={handleSubmitEdit} sx={{ mr: '10px',mt:'10px', backgroundColor:'#23395d', color:'white' }} variant="solid">
                    Update
                  </Button>
                </Flex>
                <Grid templateColumns="repeat(4,1fr)  " gap="2">
                  <VStack spacing="3">
                    <FormControl sx={{ width: '300px' }}>
                      <FormLabel required>Titile </FormLabel>
                      <Input
                        placeholder="Please enter title"
                        variant="outlined"
                        color="neutral"
                        value={inputTitle}
                        onChange={handleInputTitle}
                      />
                      <FormLabel required>Group</FormLabel>
                      <Input
                        placeholder="Please enter title"
                        variant="outlined"
                        color="neutral"
                        value={inputGroup}
                        onChange={handleInputGroup}
                      />
                       <Grid sx={{mt:10,}}>
                        <input style={{marginTop: '20px', marginBottom: '20px', marginLeft:'3px'}} type="file" onChange={handleInputFile}/>
                       </Grid>
                    </FormControl>
                  </VStack>
                </Grid>
              </Sheet>
            </ModalEdit>
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
                  width: '200px',  left: '910px', position:"absolute", transition: 'width 3s'
                }}
                placeholder="search ..."
                variant="outlined"
                color="neutral"
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
                            onClick={(event) => handleClick(event, row.title)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            spacing={2}
                            style={{
                              textAlign: 'center',
                            }}
                            key={row.name}
                          >
                            <td>{index+1}</td>
                            <td>{row.title}</td>
                            <td>{row.date}</td>
                            <td>{row.time}</td>
                            <td>{row._group}</td>
                            <td>
                            <Center spacing={2} gap="6">
                              {/* {console.log(id)} */}
                              <IconButton
                                onClick={() => {
                                    handleView(row.id)
                                }}
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
                                  setSelected([]);
                                  onDeleteModalOpen();
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
                      <td colSpan={6}>
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
  
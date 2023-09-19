import {
  Center,
  Flex,
  Grid,
  IconButton,
  VStack,
  // useDisclosure,
} from '@chakra-ui/react';
import SELECT_OPTIONS from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';
import Table from '@mui/joy/Table';
import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
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
    id: 'year',
    numeric: false,
    disablePadding: true,
    label: 'Year',
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: true,
    label: 'Start',
  },
  {
    id: 'end',
    numeric: true,
    disablePadding: false,
    label: 'End',
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
              style={{ textAlign: 'center',backgroundColor: '#23395d', color: 'white'  }}
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
const animatedComponents = makeAnimated();
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
var Group = [];
export default function List() {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [, setFilter] = useState({ searchText: '' });
  var [year, setYear] = useState([]);
  var [selectedYear, setSelectedYear] = useState('');
  var [selectedGroup, setSelectedGroup] = useState('');
  const [inputFrom,setInputFrom] = React.useState('');
  const [inputTo,setInputTo] = React.useState('');
  const [From,setFrom] = React.useState('');
  const [To,setTo] = React.useState('');
  const [Year1,setYear1] = React.useState('');
  const [Group1,setGroup1] = React.useState([]);
  const [toYear, setToYear] = React.useState([]);
  const [fromYear, setFromYear] = React.useState([]);
  const [inputFromYear, setFromYear1] = React.useState('');
  const [inputToYear, setToYear1] = React.useState('');
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

  const handleYear = (e) => {
    setYear1(e.value)
  }

  const handleGroup = (e) => {
    setGroup1(e.value)
  }

  const handleInputFrom = async (e) => {
    setInputFrom(e.target.value)
  }

  const handleFrom = async (e) => {
    setFrom(e.target.value)
  }

  const handleTo = async (e) => {
    setTo(e.target.value)
  }

  const handleInputTo = async (e) => {
    setInputTo(e.target.value)
  }

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

  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    years();
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectYear = (e) => {
    setSelectedYear(e)
    handleSort(inputFromYear,inputToYear,e.value)
  }

  const handleSelectGroup = (e) => {
    setSelectedGroup(e)
  }

  const handleSubmit = async () => {
    for(let i=0 ; i<selectedGroup.length ; i++){
      axios.post("http://localhost:3000/admin/create/year",{year:selectedYear.value,FromYear: inputFrom, ToYear: inputTo, group: selectedGroup[i].value },{ withCredentials: true });
    }
    window.location.replace('/year/list')
  };

  const handleSubmitEdit = async () => {
    await axios.post("http://localhost:3000/admin/update/year",{FromYear: From ,group: Group1,Year: To,year: Year1},{ withCredentials: true })
               .then((result) => {
                    // console.log("hello")
                    setOpenEdit(false);
                    window.location.replace('/year/list')
                })
               .catch(error => console.log(error));
        }

  const years = async () => {
    axios.get("http://localhost:3000/admin/displayAll/year",{ withCredentials: true })
      .then((result) => {
        setYear(result.data.results)
        })
      .catch(error => console.log(error));
  };

  const handleEdit = async (year_id) => {
    Group = [];
    await axios.get("http://localhost:3000/admin/displayOne/year/"+year_id,{ withCredentials: true })
        .then((result) => {
            setFrom(result.data.results[0].FromYear)
            setTo(result.data.results[0].ToYear)
            setYear1(result.data.results[0].year)
            for(var i = 0 ; i<result.data.results[0].group.length ; i++){
              Group.push({label: result.data.results[0].group[i], value: result.data.results[0].group[i]})
            }
          })
        .catch(error => console.log(error));
    setOpenEdit(true);
  }

  const handleDelete = async () => {
    axios.post("http://localhost:3000/admin/delete/year/"+ deleteID,{ withCredentials: true })
    .then((result) => {
      window.location.replace('/year/list')
      })
    .catch(error => console.log(error));
  }

  const rows = year;

  const handleFromYear = (e) => {
    setFromYear1(e.value)
    handleSort(e.value,inputFromYear,inputYear)
  }

  const handleSort = (fromYear,toYear,Year) => {
    axios.post("http://localhost:3000/admin/sort/year", {fromYear: fromYear, toYear: toYear, Year: Year},{ withCredentials: true })
    .then((result) => {
      setYear(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleSearch = (e) => {
    axios.post("http://localhost:3000/admin/search/year", {search: e.target.value},{ withCredentials: true })
    .then((result) => {
      setYear(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleToYear = (e) => {
    setToYear1(e.value)
    handleSort(inputFromYear,e.value,inputYear)
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
            width: 460,
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
            <Typography level="h4">Create Year</Typography>
            <Button onClick={handleSubmit} sx={{ mr: '5px', backgroundColor:'#23395d'  }} variant="solid">
              Create
            </Button>
          </Flex>
          <Grid templateColumns="repeat(3,1fr)  " gap="2">
            <VStack spacing="3">
              <FormControl sx={{ width: '400px' }}>
                <FormLabel required>Start</FormLabel>
                <Input
                  placeholder="Please enter started year"
                  variant="outlined"
                  color="neutral"
                  onChange={handleInputFrom}
                />
                <FormLabel required>End</FormLabel>
                <Input
                  placeholder="Please enter end year"
                  variant="outlined"
                  color="neutral"
                  onChange={handleInputTo}
                />
                <FormLabel required>Group</FormLabel>
                <SELECT_OPTIONS
                  onChange={handleSelectGroup}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[groups[4], groups[5]]}
                  isMulti
                  options={groups}
                />
                <FormLabel required>Year</FormLabel>
                <SELECT_OPTIONS
                  onChange={handleSelectYear}
                  placeholder="Select year"
                  defaultValue={[Years[5], Years[6]]}
                  options={Years}
                >
                </SELECT_OPTIONS>
              </FormControl>
            </VStack>
          </Grid>
        </Sheet>
      </Modal>
          
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
            width: 500,
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
            <Typography level="h4">Create Year</Typography>
            <Button onClick={handleSubmitEdit} sx={{ mr: '10px' }} variant="solid">
                Update
            </Button>
          </Flex>
          <Grid templateColumns="repeat(3,1fr)  " gap="2">
            <VStack spacing="3">
              <FormControl sx={{ width: '400px' }}>
                <FormLabel required>Start</FormLabel>
                <Input
                  placeholder="Please enter started year"
                  variant="outlined"
                  color="neutral"
                  value={From}
                  onChange={handleFrom}
                />
                <FormLabel required>End</FormLabel>
                <Input
                  placeholder="Please enter end year"
                  variant="outlined"
                  value={To}
                  color="neutral"
                  onChange={handleTo}
                />
                <FormLabel required>Group</FormLabel>
                <SELECT_OPTIONS
                  onChange={handleGroup}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={Group}
                  isMulti
                  options={groups}
                />
                <FormLabel required>Year</FormLabel>
                <SELECT_OPTIONS
                  onChange={handleYear}
                  placeholder="Select year"
                  defaultValue={[{label:Year1, value: Year1}]}
                  options={Years}
                >
                </SELECT_OPTIONS>
              </FormControl>
            </VStack>
          </Grid>
        </Sheet>
      </ModalEdit>
      
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
            <p> Are you sure you want to delete this year?</p>
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
                          <td>{index+1}</td>
                          <td>{row.year}</td>
                          <td>{row.FromYear}</td>
                          <td>{row.ToYear}</td>
                          <td>
                          <Center spacing={3} gap="4">
                            <IconButton
                              onClick={() => {
                                handleEdit(row.year_id)
                              }
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
                                  handleEdit(row.year_id)
                                }
                              }
                            />
                            <IconButton
                              onClick={() => {
                                onDeleteModalOpen(row.year_id);
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
                    <td colSpan={5}>
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

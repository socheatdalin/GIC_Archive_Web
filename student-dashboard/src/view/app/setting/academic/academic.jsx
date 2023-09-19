import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Sheet,
  Typography,
} from '@mui/joy';
import {
  Center,
  Flex,
  Grid,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Table from '@mui/joy/Table';
import { BiSearchAlt2 } from 'react-icons/bi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { MdRemoveRedEye } from 'react-icons/md';
import { visuallyHidden } from '@mui/utils';
import axios from "axios";
import PropTypes from 'prop-types';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SELECT_OPTIONS from 'react-select';

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

const arrayStudent = [];
const headCells = [
  {
    id: '',
    numeric: false,
    disablePadding: true,
    label: '',
  },
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
    id: 'Year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
  },
  {
    id: 'Group',
    numeric: true,
    disablePadding: false,
    label: 'Group',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
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


const Years = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
]


const semesters = [
  { value: '1', label: '1st semester' },
  { value: '2', label: '2nd semester' },
]

const groups = [
  { value: 'all', label: 'All' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
]

export default function Academic() {
  const [year, setYear] = React.useState('');
  const [inputFromYear, setFromYear1] = React.useState('');
  const [inputToYear, setToYear1] = React.useState('');
  const [fromYear, setFromYear] = React.useState([]);
  const [toYear, setToYear] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [group, setGroup] = useState('')
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [selectedStudent,setSelectedStudent]= useState([])
  var [student, setStudent] = useState([]);
  // const [click,setClick] = useState(false);
  const [, setFilter] = useState({ searchText: '' });
  // const [fill,setFill] = useState(false)

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleCheckbox = (status,id) => {
  //   if(status===true){
  //     arrayStudent.push(id)
  //   }else if(status===false){
  //     for(var i=0 ; i<arrayStudent.length ; i++){
  //       if(arrayStudent[i]===id){
  //         arrayStudent.splice(i,1)
  //       }
  //     }
  //   }
  //   setSelectedStudent(arrayStudent)
  // }
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleSelectYear = (e) => {
    setYear(e.value)
  }

  const handleFromYear = (e) => {
    setFromYear1(e.value)
  }

  const handleSelectGroup = (e) => {
    setGroup(e.value)
  }

  const handleToYear = (e) => {
    setToYear1(e.value)
  }
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSelectAll = (e) => {
    var student_id = []
    if (e.target.checked == true) {
      var ele = document.getElementsByName('checkbox');
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = true;
        student_id.push(student[i].student_id)
      }
      setCheckedItems(student_id)
    } else if (e.target.checked == false) {
      var ele = document.getElementsByName('checkbox');
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].type == 'checkbox')
          ele[i].checked = false;
      }
      setCheckedItems([])
    }

  }

  headCells[0].label = <input type="checkbox" onChange={handleSelectAll} />

  useEffect(() => {
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

  const handleCheck = (itemId) => {
    var newCheckedItems = [...checkedItems];
    if (newCheckedItems.includes(itemId)) {
      newCheckedItems = newCheckedItems.filter((id) => id !== itemId);
    } else {
      newCheckedItems.push(itemId);
    }
    setCheckedItems(newCheckedItems);
  };


  const students = async () => {
      axios.post("http://localhost:3000/admin/updateClass/display/student", { fromYear: inputFromYear, toYear: inputToYear, year: year, group: group }, { withCredentials: true })
        .then((result) => {
          setStudent(result.data.results)
        })
        .catch(error => console.log(error));
  };

  // function pass (status) {
  //   if(status==='yes'){
  // return (
  //   <div style={{border:'1px solid 1',color:'white', backgroundColor:'rgb(64, 224, 208)', borderRadius:'10px', width:'45px', margin:'auto'}}>
  //     pass
  //   </div>
  // )
  //   }
  // }

  const upgrade = async () => {
    var ele = document.getElementsByName('checkbox');
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == 'checkbox' && ele[i].checked == true && ele[i].value !== '') {
        axios.post("http://localhost:3000/admin/updateClass/student", { student_id: ele[i].value }, { withCredentials: true })
          .then((result) => {
            alert("Student Upgrade Successfully!")
          })
          .catch(error => console.log(error));
      }
    }
    window.location.replace('/academic/academic')
  }
  const rows = student;

  return (
    <div>
      <Grid templateColumns="repeat(9,1fr)" gap="2" >
        <VStack style={{ marginLeft: '20px' }}>
          <FormControl sx={{ width: '200px', marginLeft: '10px' }}>
            <SELECT_OPTIONS
              onChange={handleFromYear}
              placeholder="From Year"
              defaultValue={[fromYear[20], fromYear[20]]}
              options={fromYear}
            >
            </SELECT_OPTIONS>
          </FormControl>
        </VStack>
        <VStack>
          <FormControl sx={{ width: '200px', marginLeft: '5px' }}>
            <SELECT_OPTIONS
              onChange={handleToYear}
              placeholder="To Year"
              defaultValue={[toYear[20], toYear[20]]}
              options={toYear}
            >
            </SELECT_OPTIONS>
          </FormControl>
        </VStack>
        <VStack>
          <FormControl sx={{ width: '200px', marginLeft: '3px' }}>
            <SELECT_OPTIONS
              onChange={handleSelectYear}
              placeholder="Select Year"
              defaultValue={[Years[20], Years[20]]}
              options={Years}
            >
            </SELECT_OPTIONS>
          </FormControl>
        </VStack>
        <VStack>
          <FormControl sx={{ width: '200px', marginLeft: '5px' }}>
            <SELECT_OPTIONS
              onChange={handleSelectGroup}
              placeholder="Select Group"
              defaultValue={[groups[20], groups[20]]}
              options={groups}
            >
            </SELECT_OPTIONS>
          </FormControl>
        </VStack>
        <VStack>
          <Button
            style={{ backgroundColor: '#23395d' }}
            sx={{ marginLeft: '240px' }}
            onClick={students}
            variant="solid"
          // onClick={() => history.push(`${parentUrl}/add`)}
          >
            <BiSearchAlt2 style={{ width: '20px', height: '20px' }} />
          </Button>
        </VStack>
        <VStack>
          <Grid h="42px">
            <Button
              sx={{ width: '75px' }}
              variant="solid"
              style={{ position: "absolute", right: '40px', backgroundColor: '#23395d' }}
              onClick={upgrade}
            >
              Upgrade
            </Button>
          </Grid>
        </VStack>
      </Grid>
      <Flex>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            borderRadius: 1,
            marginTop: '20px',
            marginRight: '70px',
            marginBottom: '20px'
          }}
        >
          <Sheet
            sx={{
              mt: '10px',
              ml: 3,
              width: '100%',
              height: '600px',
              borderRadius: 'sm',
            }}
          >
            <Table aria-labelledby="tableTitle" hoverRow style={{ marginLeft: '0px', marginTop: '0px' }}>
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
                          backgroundColor: 'white'
                        }}
                        key={row.student_id}
                      >
                        <td>
                          <input
                            // checked={checkedItems.includes(index)}
                            onChange={() => handleCheck(row.student_id)}
                            type="checkbox" name="checkbox" value={row.student_id} />
                        </td>
                        <td>{row.student_id}</td>
                        <td>{row.name}</td>
                        <td>{row.gender}</td>
                        <td>{row.year}</td>
                        <td>{row.group_name}</td>
                        <td><span>
                          {checkedItems.includes(row.student_id) ? <span>
                            <div style={{ border: '1px solid 1', color: 'white', backgroundColor: 'rgb(64, 224, 208)', borderRadius: '10px', width: '45px', margin: 'auto' }}>
                              pass</div>
                          </span> : <span>
                            <div style={{ border: '1px solid 1', color: 'white', backgroundColor: 'orange', borderRadius: '10px', fontSize: '12px', width: '60px', margin: 'auto' }}>
                              progress </div>
                          </span>}
                        </span></td>
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
    </div>
  );
}
import {
    Center,
    Flex,
    Grid,
    IconButton,
    InputGroup,
    VStack,
    useDisclosure,
} from '@chakra-ui/react';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';

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
        id: 'course_id',
        numeric: true,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'course_name',
        numeric: false,
        disablePadding: true,
        label: 'Course',
    },
    {
        id: 'teacher_id',
        numeric: false,
        disablePadding: false,
        label: 'Taught By',
    },

    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

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
    const [course, setCourse] = useState([]);
    const [inputID, setInputID] = React.useState('');
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [inputName, setInputName] = React.useState('');
    const [inputTeacher_name, setInputTeacher_name] = React.useState('');
    const [teacher_name, setteacher_name] = React.useState('');
    const [ID, setID] = React.useState('');
    const [Name, setName] = React.useState('');
    const [Desc, setDesc] = React.useState('');
    const [Photo, setPhoto] = React.useState('');
    const [deleteID, setDeleteID] = React.useState('');
    const [inputPhoto, setInputPhoto] = React.useState(null);
    const [Teacher, setTeacher] = React.useState('');
    const [courseName, setCourseName] = useState('');

    const handleInputPhoto = async (e) => {
        setInputPhoto(e.target.files[0])
    }

    const handlePhoto = async (e) => {
        setPhoto(e.target.value)
    }
    const [length, setLength] = useState([])
    const [index, setIndex] = useState('')



    const handleInputName = async (e) => {
        setInputName(e.target.value)
    }

    const handleInputTeacher_name = async (e) => {
        setInputTeacher_name(e.target.value)
    }

    const handleNewName = async (e) => {
        setCourseName(e.target.value);
    }
    const handleName = async (e) => {
        setName(e.target.value)
    }
    useEffect(() => {

        courses();
    }, [])


    const [open, setOpen] = React.useState(false);
    const rows = course;
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
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDisplay = async (course_id) => {
        const response =
            await axios.get("http://localhost:3001/course/" + course_id)
                .then((result) => {
                    setCourseName(result.data[0].course_name);
                }).catch((error) => console.log(error));
        setOpenEdit(true);
    }
    const handleSearch = (e) => {
        // console.log(search)
        axios.post("http://localhost:3001/search/course", { course_name: inputName })
            .then((result) => {
                setCourse(result.data)
            })
            .catch(error => console.log(error));
    }
    const handleView = async (course_id) => {
        await axios.get("http://localhost:3001/course/" + course_id)
            .then((result) => {
                console.log(result);
                setName(result.data[0].course_name);
                setID(result.data[0].course_id);
                setTeacher(result.data[0].fullname);
                setInputPhoto(result.data[0].filepath);
            })
            .catch(error => console.log(error));
        setOpenView(true);
    }
    const handleSubmitEdit = async (course_id) => {
        console.log(course_id);
        try {
            const headers = {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            };

            await axios.post('http://localhost:3001/course/update/' + course_id,
                { course_name: courseName },
                { headers: headers }
            )
                .then((result) => {
                    console.log(result.data);
                    window.location.replace('/home/course/list');
                })
                .catch((error) => console.log(error));

            setOpenEdit(true);
        } catch (error) {
            console.log(error);
        }
    };


    const onDeleteModalOpen = async (id) => {
        setDeleteID(id)
        setOpenDelete(true)
    }
    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append('course_name', inputName);
        formData.append('username', inputTeacher_name);
        formData.append('image', inputPhoto);
        axios.post("http://localhost:3001/course/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((result) => {
                console.log(result.data);

            })
            .catch(error => console.log(error))
        window.location.replace('/home/course/list');
    }

    const handleCreate = async () => {

    }

    const courses = async () => {
        axios.get("http://localhost:3001/course/all")
            .then((result) => {
                setCourse(result.data);
                // course();
            })
            .catch(error => console.log(error));
    };

    const handleDelete = async () => {
        axios.post("http://localhost:3001/course/remove/" + deleteID)
            .then((result) => {
                window.location.replace('/home/course/list')
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
                        width: 400,
                        height: 350,
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
                        <Typography level="h4">Create Course</Typography>
                        <Button onClick={handleSubmit} sx={{ mr: '10px', mt: '20px', backgroundColor: '#23395d' }} variant="solid">
                            Create
                        </Button>
                    </Flex>
                    <Grid>
                        <VStack>
                            <FormControl sx={{ width: '300px' }}>
                                <FormLabel required>Name</FormLabel>
                                <Input
                                    placeholder="Please enter course name"
                                    variant="outlined"
                                    color="neutral"
                                    value={inputName}
                                    onChange={handleInputName}
                                />
                                <FormLabel required>Teacher Name</FormLabel>
                                <Input
                                    placeholder="Please enter teacher name"
                                    variant="outlined"
                                    color="neutral"
                                    value={inputTeacher_name}
                                    onChange={handleInputTeacher_name}
                                />
                                <Grid sx={{ mt: 10 }} >
                                    <input style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '3px' }} type="file" name='image' onChange={handleInputPhoto} />
                                </Grid>
                            </FormControl>
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
                        width: 400,
                        height: 400,
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
                    <Grid >
                        <VStack>
                            <FormControl sx={{ width: '150px', marginLeft: '-50px' }}>
                                <FormLabel required>Name</FormLabel>
                                <Input
                                    placeholder="Please enter course name"
                                    variant="outlined"
                                    color="neutral"
                                    value={courseName}
                                    onChange={handleNewName}
                                />
                                {/* <FormLabel required>Teacher Name</FormLabel>
                                <Input
                                    placeholder="Please enter teacher ID"
                                    variant="outlined"
                                    color="neutral"
                                    value={teacher_name}
                                // onChange={handleTeach}
                                /> */}
                                {/* <div style={{marginTop: '20px' }}>
                 <input style={{ marginBottom: '20px', marginLeft: '3px' }} type="file" onChange={handlePhoto} />
              </div> */}
                            </FormControl>
                        </VStack>
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
                        width: 650,
                        height: 350,
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
                        <Typography level="h4">Course</Typography>
                    </Flex>
                    <Grid templateColumns="repeat(2,2fr)  " gap="2">
                        <VStack spacing="3">
                            <span style={{ marginLeft: '30px', marginTop: '10px', width: 250, height: 200, border: '2px  solid #6f2da8 ', borderRadius: '5px', boxShadow: '2px 2px 2px gray' }}>
                                <img style={{ width: '100%', height: '100%' }} src={`http://localhost:3001/static/${inputPhoto}`} />
                            </span>
                        </VStack>
                        <VStack style={{ marginTop: '60px', textAlign: 'left', fontSize: '16px' }}>
                            <div>
                                <b><span style={{ marginLeft: '-20px', color: '#517388', fontSize: '20px', textTransform: 'upperCase' }}>{Name}</span></b>
                            </div>
                            <div style={{ paddingLeft: '70px', width: 330, borderRadius: '3px' }}>
                                <div style={{ marginTop: '10px' }}>
                                    <span><b>Taught By : </b></span>
                                    <span style={{ marginLeft: '20px', color: '#517388' }}>{Teacher}</span>
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
                                    width: '200px', left: '900px', position: "absolute", transition: 'width 3s'
                                }}
                                placeholder="search by course ..."
                                variant="outlined"
                                color="neutral"
                                onChange={handleInputName}
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
                        width: '100%',
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
                                    const isItemSelected = isSelected(row.id);
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
                                            <td>{row.course_id}</td>
                                            <td >{row.course_name}</td>
                                            <td >{row.fullname}</td>

                                            <td>
                                                <Center spacing={2} gap="8">
                                                    <IconButton
                                                        onClick={() => handleView(row.course_id)}
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
                                                            handleDisplay(row.course_id)
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={() => {
                                                            onDeleteModalOpen(row.course_id);
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
        </Flex>
    );
}
